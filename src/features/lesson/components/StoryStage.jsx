import { VideoLessonCard } from "./VideoLessonCard";

export function StoryStage({
  helperText,
  isDesktop = false,
  storyTitle,
  takeaway,
  ...props
}) {
  if (isDesktop) {
    return (
      <section className="lesson-story" aria-label="Video bài học">
        <div className="lesson-video-frame">
          <VideoLessonCard {...props} />
        </div>
      </section>
    );
  }

  // Trên mobile: chỉ render video, ẩn hoàn toàn các sidebar để video full màn hình
  return (
    <section className="lesson-stage lesson-stage--video lesson-stage--mobile-fullscreen" aria-label="Video bài học">
      <VideoLessonCard {...props} />
    </section>
  );
}
