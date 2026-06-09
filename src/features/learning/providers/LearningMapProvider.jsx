import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getIslandSituations, getIslands } from "../services/learningApi";
import { learningIslands } from "../data/learningMapContent";
import {
  confirmPremiumPayment,
  getPremiumStatus,
  getStoredPremiumAccount,
  savePremiumAccount,
} from "../../premium/services/premiumApi";
import { AUTH_SESSION_CHANGED_EVENT } from "../../auth/services/authApi";

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
    const account = getStoredPremiumAccount();
    if (account?.userId) {
      setPremiumAccount(account);
      refreshPremiumStatus(account);
    }
  }, [refreshPremiumStatus]);

  useEffect(() => {
    const handleAuthSessionChanged = (event) => {
      if (event.detail?.session) {
        return;
      }

      setPremiumAccount(null);
      setPremiumStatus(null);
      setPremiumError(null);
    };

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
    };
  }, []);

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

      return applySituationAccess(sourceSituations, hasPremium);
    },
    [hasPremium, selectedIsland, situationsByIslandId],
  );

  const currentLesson = useMemo(
    () =>
      selectedSituations.find((situation) => situation.state === "current") ||
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

  return apiSituations;
}

function findStaticSituations(islandId) {
  return learningIslands.find((island) => island.islandId === islandId)?.situations || [];
}

function applySituationAccess(situations, hasPremium) {
  if (!Array.isArray(situations)) {
    return [];
  }

  return situations.map((situation, index) => ({
    ...situation,
    state: index === 0 ? "current" : hasPremium ? "open" : "locked",
  }));
}
