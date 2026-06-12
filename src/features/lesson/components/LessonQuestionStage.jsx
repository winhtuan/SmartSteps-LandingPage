import { HandHeart, Warning } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";

function AnswerIcon({ type }) {
  return type === "adult" ? (
    <HandHeart size={40} weight="duotone" />
  ) : (
    <Warning size={40} weight="duotone" />
  );
}

export function LessonQuestionStage({ answerOptions, onAnswerSelect, poster, prompt }) {
  const selectionTimerRef = useRef(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");

  useEffect(
    () => () => {
      window.clearTimeout(selectionTimerRef.current);
    },
    [],
  );

  const handleAnswerSelect = (option) => {
    if (selectedAnswerId) {
      return;
    }

    setSelectedAnswerId(option.id);
    selectionTimerRef.current = window.setTimeout(() => onAnswerSelect(option), 220);
  };

  return (
    <section className="lesson-stage lesson-question-stage" aria-labelledby="lesson-question-title">
      <img className="lesson-question-stage__background" src={poster} alt="" aria-hidden="true" />
      <div className="lesson-question-stage__scrim" />

      <div className="lesson-question-stage__content">
        <div className="lesson-question-stage__prompt">
          <img src={mascotSpeaking} alt="Mèo SmartSteps đang đặt câu hỏi" />
          <div className="lesson-question-stage__bubble">
            <span>Con sẽ làm gì?</span>
            <h1 id="lesson-question-title">{prompt}</h1>
          </div>
        </div>

        <div className="lesson-choice-grid" aria-label="Các câu trả lời">
          {answerOptions.map((option) => {
            const selected = selectedAnswerId === option.id;
            const selectedClass = selected
              ? ` lesson-choice--selected-${option.result}`
              : "";

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                className={`lesson-choice${selectedClass}`}
                disabled={Boolean(selectedAnswerId)}
                onClick={() => handleAnswerSelect(option)}
              >
                <span className="lesson-choice__icon" aria-hidden="true">
                  <AnswerIcon type={option.icon} />
                </span>
                <strong>{option.label}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
