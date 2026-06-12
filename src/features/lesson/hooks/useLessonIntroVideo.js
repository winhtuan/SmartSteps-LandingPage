import { useCallback, useEffect, useState } from "react";
import {
  createSignedMediaUrl,
  getSituationDetail,
} from "../../learning/services/learningApi";
import { getLessonContent, getRequestedSituationId } from "../data/lessonContent";

export function useLessonIntroVideo() {
  const [lesson, setLesson] = useState(null);
  const [requestedSituationId, setRequestedSituationId] = useState(() => getRequestedSituationId());
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    const situationId = getRequestedSituationId();
    const lessonContent = getLessonContent(situationId);
    setRequestedSituationId(situationId);
    setStatus("loading");
    setError(null);

    try {
      if (lessonContent.introVideoUrl) {
        setLesson({
          islandId: 1,
          orderIndex: situationId,
          situationId,
          title: lessonContent.storyTitle,
        });
        setVideoUrl(lessonContent.introVideoUrl);
        setStatus("success");
        return;
      }

      const situation = await getSituationDetail(situationId);
      const introStep = situation?.steps?.find(
        (step) => step.stepType?.toLowerCase() === "intro" && step.mediaUrl,
      );

      if (!introStep) {
        throw new Error("Bài học chưa có video mở đầu.");
      }

      const signedMedia = await createSignedMediaUrl(introStep.stepId);

      if (!signedMedia?.signedUrl) {
        throw new Error("Máy chủ không trả về đường dẫn video.");
      }

      setLesson(situation);
      setVideoUrl(signedMedia.signedUrl);
      setStatus("success");
    } catch (loadError) {
      setLesson(null);
      setVideoUrl("");
      setError(loadError);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    error,
    lesson,
    requestedSituationId,
    retry: load,
    status,
    videoUrl,
  };
}
