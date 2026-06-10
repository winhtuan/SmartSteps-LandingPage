import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAuthSession, AUTH_SESSION_CHANGED_EVENT } from "../../auth/services/authApi";
import { getIslandSituations, getIslands, getUserLearningProgress } from "../services/learningApi";
import { learningIslands } from "../data/learningMapContent";
import { getSituationPresentationOverride } from "../../lesson/data/lessonContent";
import {
  confirmPremiumPayment,
  getPremiumStatus,
  getStoredPremiumAccount,
  savePremiumAccount,
} from "../../premium/services/premiumApi";
import { getCompletedSituationIds } from "../services/learningProgress";

const islandTones = [
  "bg-green-100 text-green-700",
  "bg-sky-100 text-sky-700",
  "bg-yellow-100 text-yellow-700",
];

const LearningMapContext = createContext(null);

export function LearningMapProvider({ children }) {
  const [islands, setIslands] = useState(() => learningIslands);
  const [selectedIslandId, setSelectedIslandId] = useState(learningIslands[0].islandId);
  const [situationsByIslandId, setSituationsByIslandId] = useState(() =>
    createInitialSituationMap(learningIslands),
  );
  const [premiumAccount, setPremiumAccount] = useState(() => getStoredPremiumAccount());
  const [premiumStatus, setPremiumStatus] = useState(null);
  const [premiumError, setPremiumError] = useState(null);
  const [completedSituationIds, setCompletedSituationIds] = useState(() => getCompletedSituationIds());
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const hasPremium = premiumStatus?.hasPremium === true;

  const loadIslands = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      const apiIslands = await getIslands();
      const enrichedIslands = enrichIslands(apiIslands);
      setIslands(enrichedIslands.length > 0 ? enrichedIslands : learningIslands);

      const nextSelectedIslandId = enrichedIslands[0]?.islandId || learningIslands[0].islandId;
      setSelectedIslandId((current) =>
        enrichedIslands.some((island) => island.islandId === current)
          ? current
          : nextSelectedIslandId,
      );
      setStatus("success");
    } catch (apiError) {
      setError(apiError);
      setStatus("error");
      setIslands(learningIslands);
      setSituationsByIslandId(createInitialSituationMap(learningIslands));
    }
  }, []);

  const loadIslandSituations = useCallback(async (islandId) => {
    try {
      const apiSituations = await getIslandSituations(islandId);
      setSituationsByIslandId((current) => ({
        ...current,
        [islandId]: normalizeSituations(apiSituations),
      }));
    } catch (apiError) {
      setError(apiError);
      setSituationsByIslandId((current) => ({
        ...current,
        [islandId]: current[islandId] || findStaticSituations(islandId),
      }));
    }
  }, []);

  const loadLearningProgress = useCallback(async (accountOverride) => {
    const account = accountOverride || getAuthSession();

    if (!account?.email) {
      setCompletedSituationIds(getCompletedSituationIds());
      return;
    }

    try {
      const progress = await getUserLearningProgress({ userEmail: account.email });
      setCompletedSituationIds(normalizeCompletedSituationIds(progress?.completedSituationIds));
    } catch {
      setCompletedSituationIds(getCompletedSituationIds());
    }
  }, []);

  const refreshPremiumStatus = useCallback(async (accountOverride) => {
    const account = accountOverride || getStoredPremiumAccount();

    if (!account?.userId) {
      setPremiumStatus(null);
      return null;
    }

    try {
      const nextStatus = await getPremiumStatus(account.userId);
      setPremiumAccount(account);
      setPremiumStatus(nextStatus);
      setPremiumError(null);
      return nextStatus;
    } catch (apiError) {
      setPremiumError(apiError);
      return null;
    }
  }, []);

  const applyPremiumSession = useCallback((nextStatus, nextAccount) => {
    if (nextAccount?.userId) {
      savePremiumAccount(nextAccount);
      setPremiumAccount(nextAccount);
    }

    if (nextStatus) {
      setPremiumStatus(nextStatus);
      setPremiumError(null);
    }
  }, []);

  useEffect(() => {
    loadIslands();
  }, [loadIslands]);

  useEffect(() => {
    loadLearningProgress();
  }, [loadLearningProgress]);

  useEffect(() => {
    const account = getStoredPremiumAccount();
    if (account?.userId) {
      setPremiumAccount(account);
      refreshPremiumStatus(account);
    }
  }, [refreshPremiumStatus]);

  useEffect(() => {
    const handleAuthSessionChanged = (event) => {
      if (event.detail?.session) {
        loadLearningProgress(event.detail.session);
        return;
      }

      setPremiumAccount(null);
      setPremiumStatus(null);
      setPremiumError(null);
      setCompletedSituationIds(getCompletedSituationIds());
    };

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
    };
  }, [loadLearningProgress]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentState = params.get("premiumPayment");
    const orderCode = params.get("orderCode");
    const premiumUserId = Number(params.get("premiumUserId") || premiumAccount?.userId || 0);

    if (paymentState !== "success" || !orderCode || !premiumUserId) {
      return;
    }

    let ignore = false;
    confirmPremiumPayment({ orderCode, userId: premiumUserId })
      .then((nextStatus) => {
        if (!ignore) {
          setPremiumStatus(nextStatus);
          setPremiumError(null);
        }
      })
      .catch((apiError) => {
        if (!ignore) {
          setPremiumError(apiError);
        }
      })
      .finally(() => {
        if (!ignore) {
          params.delete("premiumPayment");
          params.delete("orderCode");
          params.delete("premiumUserId");
          const nextSearch = params.toString();
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}`,
          );
        }
      });

    return () => {
      ignore = true;
    };
  }, [premiumAccount?.userId]);

  useEffect(() => {
    if (selectedIslandId) {
      loadIslandSituations(selectedIslandId);
    }
  }, [loadIslandSituations, selectedIslandId]);

  const selectedIsland = useMemo(
    () => islands.find((island) => island.islandId === selectedIslandId) || islands[0],
    [islands, selectedIslandId],
  );

  const selectedSituations = useMemo(
    () => {
      const sourceSituations = selectedIsland
        ? situationsByIslandId[selectedIsland.islandId] ||
          findStaticSituations(selectedIsland.islandId)
        : [];

      return applySituationAccess(sourceSituations, hasPremium, completedSituationIds);
    },
    [completedSituationIds, hasPremium, selectedIsland, situationsByIslandId],
  );

  const currentLesson = useMemo(
    () =>
      selectedSituations.find((situation) => situation.state === "current") ||
      selectedSituations.find((situation) => situation.state === "premium_locked") ||
      selectedSituations[0] ||
      null,
    [selectedSituations],
  );

  const value = useMemo(
    () => ({
      currentLesson,
      error,
      islands,
      premiumAccount,
      premiumError,
      premiumStatus,
      refreshPremiumStatus,
      applyPremiumSession,
      retry: loadIslands,
      selectedIsland,
      selectedIslandId,
      selectedSituations,
      setSelectedIslandId,
      status,
    }),
    [
      currentLesson,
      error,
      islands,
      loadIslands,
      premiumAccount,
      premiumError,
      premiumStatus,
      refreshPremiumStatus,
      applyPremiumSession,
      selectedIsland,
      selectedIslandId,
      selectedSituations,
      status,
    ],
  );

  return <LearningMapContext.Provider value={value}>{children}</LearningMapContext.Provider>;
}

export function useLearningMap() {
  const context = useContext(LearningMapContext);

  if (!context) {
    throw new Error("useLearningMap must be used inside LearningMapProvider");
  }

  return context;
}

function createInitialSituationMap(sourceIslands) {
  return sourceIslands.reduce((result, island) => {
    result[island.islandId] = island.situations;
    return result;
  }, {});
}

function enrichIslands(apiIslands) {
  if (!Array.isArray(apiIslands)) {
    return [];
  }

  return apiIslands.map((island, index) => ({
    ...island,
    tone: islandTones[index % islandTones.length],
  }));
}

function normalizeSituations(apiSituations) {
  if (!Array.isArray(apiSituations)) {
    return [];
  }

  return apiSituations.map((situation) => applySituationPresentationOverride(situation));
}

function findStaticSituations(islandId) {
  return (
    learningIslands.find((island) => island.islandId === islandId)?.situations.map((situation) =>
      applySituationPresentationOverride(situation),
    ) || []
  );
}

function applySituationAccess(situations, hasPremium, completedSituationIds) {
  if (!Array.isArray(situations)) {
    return [];
  }

  const completedSituationIdSet = new Set(normalizeCompletedSituationIds(completedSituationIds));
  const contiguousCompletedCount = getContiguousCompletedCount(situations, completedSituationIdSet);
  const firstIncompleteIndex = situations.findIndex(
    (situation) => !completedSituationIdSet.has(Number(situation.situationId)),
  );

  return situations.map((situation, index) => {
    const completed = completedSituationIdSet.has(Number(situation.situationId));
    const requiresPremium = doesSituationRequirePremium(situation);
    const unlockedByProgress = index <= contiguousCompletedCount;
    const unlocked = unlockedByProgress && (!requiresPremium || hasPremium);
    const current =
      !completed &&
      unlocked &&
      (firstIncompleteIndex === -1 ? index === situations.length - 1 : index === firstIncompleteIndex);
    const premiumLocked =
      !completed &&
      requiresPremium &&
      !hasPremium &&
      unlockedByProgress &&
      (firstIncompleteIndex === -1 ? index === situations.length - 1 : index === firstIncompleteIndex);

    return {
      ...situation,
      state: completed
        ? "open"
        : current
          ? "current"
          : premiumLocked
            ? "premium_locked"
            : unlocked
              ? "open"
              : "locked",
    };
  });
}

function getContiguousCompletedCount(situations, completedSituationIds) {
  let count = 0;

  for (const situation of situations) {
    if (!completedSituationIds.has(Number(situation.situationId))) {
      break;
    }

    count += 1;
  }

  return count;
}

function normalizeCompletedSituationIds(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => Number(value))
    .filter(
      (value, index, source) =>
        Number.isInteger(value) && value > 0 && source.indexOf(value) === index,
    )
    .sort((left, right) => left - right);
}

function applySituationPresentationOverride(situation) {
  const override = getSituationPresentationOverride(situation?.situationId);

  if (!override) {
    return situation;
  }

  return {
    ...situation,
    intro: override.intro || situation.intro,
    title: override.title || situation.title,
  };
}

function doesSituationRequirePremium(situation) {
  return Number(situation?.situationId) === 3;
}
