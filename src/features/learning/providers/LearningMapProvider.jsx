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
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

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
        [islandId]: enrichSituations(apiSituations),
      }));
    } catch (apiError) {
      setError(apiError);
      setSituationsByIslandId((current) => ({
        ...current,
        [islandId]: current[islandId] || findStaticSituations(islandId),
      }));
    }
  }, []);

  useEffect(() => {
    loadIslands();
  }, [loadIslands]);

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
    () =>
      selectedIsland
        ? situationsByIslandId[selectedIsland.islandId] ||
          findStaticSituations(selectedIsland.islandId)
        : [],
    [selectedIsland, situationsByIslandId],
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

function enrichSituations(apiSituations) {
  if (!Array.isArray(apiSituations)) {
    return [];
  }

  return apiSituations.map((situation, index) => ({
    ...situation,
    state: index === 0 ? "current" : "locked",
  }));
}

function findStaticSituations(islandId) {
  return learningIslands.find((island) => island.islandId === islandId)?.situations || [];
}
