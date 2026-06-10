import { VideoLessonCard } from "./VideoLessonCard";

export function StoryStage({
  completed,
  error,
  instanceKey,
  isMuted,
  onRetry,
  onVideoEnded,
  onVideoPause,
  onVideoPlay,
  poster,
  playbackRate,
  status,
  videoUrl,
}) {
  return (
    <section className="lesson-story" aria-labelledby="story-stage-title">
      <VideoLessonCard
        completed={completed}
        error={error}
        instanceKey={instanceKey}
        isMuted={isMuted}
        onRetry={onRetry}
        onVideoEnded={onVideoEnded}
        onVideoPause={onVideoPause}
        onVideoPlay={onVideoPlay}
        poster={poster}
        playbackRate={playbackRate}
        status={status}
        videoUrl={videoUrl}
      />
    </section>
  );
}
