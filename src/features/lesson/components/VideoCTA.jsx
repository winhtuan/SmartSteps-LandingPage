import { ArrowRight, CheckCircle, LockKey } from "@phosphor-icons/react";

export function VideoCTA({ canContinue, completed, onContinue }) {
  return (
    <div className="lesson-video-cta">
      <div className="lesson-video-cta__copy">
        <span className={`lesson-video-cta__status${completed ? " lesson-video-cta__status--ready" : ""}`}>
          {completed ? (
            <CheckCircle size={18} weight="fill" />
          ) : (
            <LockKey size={18} weight="fill" />
          )}
          {completed ? "+10 XP" : "Chờ hoàn thành video"}
        </span>
        <strong>Đã xem xong?</strong>
        <p>
          {completed
            ? "Bấm tiếp tục để chuyển sang bước Suy nghĩ."
            : "Nút tiếp tục sẽ sáng lên khi video gần kết thúc."}
        </p>
      </div>
      <button
        type="button"
        className="lesson-video-cta__button"
        disabled={!canContinue}
        onClick={onContinue}
      >
        <span>Tiếp tục</span>
        <ArrowRight size={18} weight="bold" />
      </button>
    </div>
  );
}
