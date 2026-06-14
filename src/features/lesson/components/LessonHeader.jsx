import { Gear, SpeakerHigh, SpeakerSlash, Tree, X } from "@phosphor-icons/react";

function HeaderAction({ ariaLabel, children, danger = false, onClick }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`lesson-icon-button${danger ? " lesson-icon-button--danger" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function LessonHeader({
  adventureLabel,
  currentStep,
  isDesktop = false,
  isMuted = false,
  onClose,
  onSettings,
  onSound,
  title,
  totalSteps,
  hideProgress = false,
}) {
  if (isDesktop) {
    return (
      <header className="lesson-header lesson-header--desktop">
        <div className="lesson-header__spacer" aria-hidden="true" />
        <div className="lesson-wooden-sign">
          <h1>
            <Tree aria-hidden="true" size={42} weight="fill" />
            {title}
          </h1>
          <p>{adventureLabel}</p>
        </div>
        <div className="lesson-header__actions">
          <HeaderAction ariaLabel={isMuted ? "Bật âm thanh" : "Tắt âm thanh"} onClick={onSound}>
            {isMuted ? (
              <SpeakerSlash size={30} weight="fill" />
            ) : (
              <SpeakerHigh size={30} weight="fill" />
            )}
          </HeaderAction>
          <HeaderAction ariaLabel="Mở cài đặt video" onClick={onSettings}>
            <Gear size={30} weight="fill" />
          </HeaderAction>
          <HeaderAction ariaLabel="Thoát bài học" danger onClick={onClose}>
            <X size={30} weight="bold" />
          </HeaderAction>
        </div>
      </header>
    );
  }

  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <header className="lesson-header lesson-header--mobile">
      <div className="lesson-header__left">
        <HeaderAction ariaLabel="Thoát bài học" danger onClick={onClose}>
          <X size={24} weight="bold" />
        </HeaderAction>
      </div>

      <div className="lesson-header__lesson">
        <h1>{adventureLabel}</h1>
        {!hideProgress && (
          <div
            className="lesson-header__progress"
            role="progressbar"
            aria-label="Tiến trình bài học"
            aria-valuemin="1"
            aria-valuemax={totalSteps}
            aria-valuenow={currentStep}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <div className="lesson-header__actions">
        <span className="lesson-header__step">
          {currentStep}/{totalSteps}
        </span>
        <HeaderAction ariaLabel={isMuted ? "Bật âm thanh" : "Tắt âm thanh"} onClick={onSound}>
          {isMuted ? (
            <SpeakerSlash size={23} weight="fill" />
          ) : (
            <SpeakerHigh size={23} weight="fill" />
          )}
        </HeaderAction>
        <HeaderAction ariaLabel="Mở cài đặt video" onClick={onSettings}>
          <Gear size={23} weight="fill" />
        </HeaderAction>
      </div>
    </header>
  );
}
