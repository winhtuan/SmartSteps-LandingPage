import { ArrowCounterClockwise, PlayCircle, Warning } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

export function WrongAnswerAlert({ open, feedbackText, onRetry, onReplayIntro }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="lesson-wrong-alert-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wrong-alert-title"
    >
      <div
        ref={modalRef}
        tabIndex="-1"
        className="lesson-wrong-alert-card"
      >
        {/* Cartoon Warning Icon */}
        <div className="lesson-wrong-alert-card__icon-wrap">
          <div className="lesson-wrong-alert-card__icon">
            <Warning size={56} weight="fill" />
          </div>
        </div>

        {/* Header Title */}
        <h2 id="wrong-alert-title" className="lesson-wrong-alert-card__title">
          Chưa đúng rồi!
        </h2>

        {/* Short & clear explanation */}
        {feedbackText && (
          <p className="lesson-wrong-alert-card__feedback">
            {feedbackText}
          </p>
        )}

        {/* Direct large action buttons */}
        <div className="lesson-wrong-alert-card__actions">
          <button
            type="button"
            className="lesson-wrong-alert-card__button lesson-wrong-alert-card__button--retry"
            onClick={onRetry}
            aria-label="Chọn lại đáp án"
          >
            <ArrowCounterClockwise size={28} weight="bold" />
            Chọn lại
          </button>
          
          <button
            type="button"
            className="lesson-wrong-alert-card__button lesson-wrong-alert-card__button--replay"
            onClick={onReplayIntro}
            aria-label="Xem lại video tình huống"
          >
            <PlayCircle size={28} weight="fill" />
            Xem lại tình huống
          </button>
        </div>
      </div>
    </div>
  );
}
