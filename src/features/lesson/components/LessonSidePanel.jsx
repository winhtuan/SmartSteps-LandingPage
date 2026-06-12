import { Circle, SealCheck, WarningCircle } from "@phosphor-icons/react";
import { LessonCTA } from "./LessonCTA";
import { MascotQuestion } from "./MascotQuestion";

function AnswerIcon({ selected, state }) {
  if (!selected) {
    return <Circle size={20} weight="regular" />;
  }

  return state === "correct" ? (
    <SealCheck size={20} weight="fill" />
  ) : (
    <WarningCircle size={20} weight="fill" />
  );
}

export function LessonSidePanel({
  answerOptions,
  answerState,
  canContinue,
  completed,
  introCompleted,
  onContinue,
  onReplay,
  onAnswerSelect,
  prompt,
  selectedAnswerId,
}) {
  const answerFeedback =
    answerState === "correct"
      ? {
          title: completed ? "Chính xác!" : "Đang xem kết quả...",
          detail: completed ? "+10 XP" : "",
          note: completed ? "Bé đã chọn rất tốt!" : "",
          type: "correct",
        }
      : answerState === "wrong"
        ? { title: "Hãy suy nghĩ lại nhé!", detail: "", note: "", type: "wrong" }
        : introCompleted
          ? { title: "Chọn cách an toàn nhất cho bé", detail: "", note: "", type: "neutral" }
          : {
              title: "Xem video trước để mở phần chọn đáp án",
              detail: "",
              note: "",
              type: "muted",
            };

  return (
    <aside className="lesson-side-panel" aria-labelledby="lesson-side-panel-question-title">
      <section className="lesson-side-card lesson-side-card--question">
        <h2 id="lesson-side-panel-question-title" className="lesson-side-panel__title">
          Câu hỏi
        </h2>
        <MascotQuestion prompt={prompt} compact />
      </section>

      <section className="lesson-side-card lesson-side-card--answers">
        <h3>Con sẽ làm gì?</h3>
        <div className="lesson-answer-grid">
          {answerOptions.map((option) => {
            const selected = selectedAnswerId === option.id;
            const stateClass =
              selected && option.result === "correct"
                ? "lesson-answer-card--correct"
                : selected && option.result === "wrong"
                  ? "lesson-answer-card--wrong"
                  : "";

            return (
              <button
                key={option.id}
                type="button"
                className={`lesson-answer-card ${stateClass}`.trim()}
                disabled={!introCompleted}
                onClick={() => onAnswerSelect(option)}
              >
                <span className="lesson-answer-card__icon" aria-hidden="true">
                  <AnswerIcon selected={selected} state={option.result} />
                </span>
                <span className="lesson-answer-card__content">
                  <strong>{option.label}</strong>
                  {selected ? <span>{option.feedback}</span> : null}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`lesson-answer-feedback-panel lesson-answer-feedback-panel--${answerFeedback.type}`}
          aria-live="polite"
        >
          {answerFeedback.type === "correct" ? <SealCheck size={16} weight="fill" /> : null}
          {answerFeedback.type === "wrong" ? <WarningCircle size={16} weight="fill" /> : null}
          <div className="lesson-answer-feedback-panel__copy">
            <strong>{answerFeedback.title}</strong>
            {answerFeedback.detail ? <span>{answerFeedback.detail}</span> : null}
            {answerFeedback.note ? <small>{answerFeedback.note}</small> : null}
          </div>
        </div>
      </section>

      <div className="lesson-side-panel__cta">
        <LessonCTA
          canContinue={canContinue}
          completed={completed}
          onContinue={onContinue}
          onReplay={onReplay}
        />
      </div>
    </aside>
  );
}
