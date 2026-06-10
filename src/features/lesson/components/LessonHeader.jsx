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

export function LessonHeader({ adventureLabel, isMuted = false, onClose, onSettings, onSound, title }) {
  return (
    <header className="lesson-header">
      <div className="lesson-header__spacer" aria-hidden="true" />
      <div className="lesson-wooden-sign">
        <h1>
          <Tree aria-hidden="true" size={42} weight="fill" />
          {title}
        </h1>
        <p>{adventureLabel}</p>
      </div>
      <div className="lesson-header__actions">
        <HeaderAction ariaLabel="Play lesson sound" onClick={onSound}>
          {isMuted ? <SpeakerSlash size={30} weight="fill" /> : <SpeakerHigh size={30} weight="fill" />}
        </HeaderAction>
        <HeaderAction ariaLabel="Open lesson settings" onClick={onSettings}>
          <Gear size={30} weight="fill" />
        </HeaderAction>
        <HeaderAction ariaLabel="Close lesson" danger onClick={onClose}>
          <X size={30} weight="bold" />
        </HeaderAction>
      </div>
    </header>
  );
}
