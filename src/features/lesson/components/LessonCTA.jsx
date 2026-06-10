import { ArrowClockwise, ArrowRight } from "@phosphor-icons/react";

export function LessonCTA({ canContinue, completed, onContinue, onReplay }) {
  const ready = completed && canContinue;

  return (
    <div className="lesson-video-cta">
      <div className="lesson-video-cta__actions">
        <button
          type="button"
          className="lesson-video-cta__button lesson-video-cta__button--secondary"
          onClick={onReplay}
        >
          <ArrowClockwise size={18} weight="bold" />
          <span>Phát lại</span>
        </button>

        <button
          type="button"
          className="lesson-video-cta__button"
          disabled={!ready}
          onClick={onContinue}
        >
          <span>Bài tiếp theo</span>
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
