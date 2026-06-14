import { ArrowCounterClockwise, PlayCircle } from "@phosphor-icons/react";
import { VideoLessonCard } from "./VideoLessonCard";

export function LessonFeedbackStage({
  feedbackComplete,
  feedbackText,
  isDesktop = false,
  onReplayIntro,
  onRetryAnswer,
  ...videoProps
}) {
  const showFullscreen = !isDesktop && !feedbackComplete;

  return (
    <section
      className={`lesson-stage lesson-feedback-stage${showFullscreen ? " lesson-stage--mobile-fullscreen" : ""}`}
      aria-label="Kết quả lựa chọn"
    >
      <VideoLessonCard playPromptMode="hidden" {...videoProps} />

      {feedbackComplete ? (
        <div className="lesson-feedback-stage__review">
          <div className="lesson-feedback-stage__message" role="status">
            <span>Thử lại nhé</span>
            <strong>{feedbackText}</strong>
          </div>
          <div className="lesson-feedback-stage__actions">
            <button type="button" className="lesson-text-button" onClick={onReplayIntro}>
              <PlayCircle size={22} weight="fill" />
              Xem lại tình huống
            </button>
            <button type="button" className="lesson-action-button" onClick={onRetryAnswer}>
              <ArrowCounterClockwise size={22} weight="bold" />
              Chọn lại
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
