import { HandPointing } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

// Icon tap SVG để thay thế text "Nhấn lần nữa để chọn"
function TapIcon({ size = 32 }) {
  return (
    <span className="lesson-choice-card__tap-icon" aria-hidden="true">
      <HandPointing size={size} weight="fill" />
    </span>
  );
}

export function LessonQuestionStage({
  answerOptions,
  isMuted,
  onAnswerSelect,
  poster,
  prompt,
  voiceFiles,
}) {
  const confirmedRef = useRef(false);
  const [highlightedAnswerId, setHighlightedAnswerId] = useState("");
  const { speak, speakSequence, cancel } = useTextToSpeech(!isMuted);

  // Tự động phát: câu hỏi → lần lượt từng đáp án
  useEffect(() => {
    if (!voiceFiles) return;

    const srcs = [
      voiceFiles.question,
      ...answerOptions.map((o) => voiceFiles.choices?.[o.id]).filter(Boolean),
    ].filter(Boolean);

    if (!srcs.length) return;

    const timer = window.setTimeout(() => speakSequence(srcs, 500), 400);
    return () => {
      window.clearTimeout(timer);
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerClick = (option) => {
    // Lần 2: đã highlight chính option này → xác nhận chọn
    if (highlightedAnswerId === option.id) {
      if (confirmedRef.current) return;
      confirmedRef.current = true;
      cancel();
      onAnswerSelect(option);
      return;
    }

    // Lần 1: highlight + phát MP3 của đáp án
    setHighlightedAnswerId(option.id);
    const choiceSrc = voiceFiles?.choices?.[option.id];
    if (choiceSrc) {
      speak(choiceSrc);
    } else {
      cancel();
    }
  };

  return (
    <section
      className="lesson-flashcard-stage"
      aria-labelledby="lesson-question-title"
    >
      {/* Câu hỏi từ mascot */}
      <div className="lesson-flashcard-stage__prompt">
        <img
          className="lesson-flashcard-stage__mascot"
          src={mascotSpeaking}
          alt="Mèo SmartSteps đang đặt câu hỏi"
        />
        <div className="lesson-flashcard-stage__bubble">
          <span className="lesson-flashcard-stage__eyebrow">Con sẽ làm gì?</span>
          <h1 id="lesson-question-title" className="lesson-flashcard-stage__question">
            {prompt}
          </h1>
        </div>
      </div>

      {/* Lưới 2 card ảnh đáp án */}
      <div className="lesson-choice-cards" aria-label="Các câu trả lời">
        {answerOptions.map((option) => {
          const isHighlighted = highlightedAnswerId === option.id;
          const isOther = highlightedAnswerId && highlightedAnswerId !== option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isHighlighted}
              className={`lesson-choice-card${
                isHighlighted ? " lesson-choice-card--highlighted" : ""
              }${isOther ? " lesson-choice-card--dimmed" : ""}`}
              onClick={() => handleAnswerClick(option)}
            >
              {/* Ảnh thumbnail */}
              <div className="lesson-choice-card__image-wrap">
                {option.image ? (
                  <img
                    className="lesson-choice-card__image"
                    src={option.image}
                    alt={option.label}
                    draggable="false"
                  />
                ) : (
                  /* Fallback nếu chưa có ảnh */
                  <div className="lesson-choice-card__image-placeholder">
                    <span>{option.icon === "adult" ? "👨‍👧" : "⚠️"}</span>
                  </div>
                )}

                {/* Overlay kết quả khi highlighted */}
                {isHighlighted && (
                  <div className="lesson-choice-card__overlay">
                    <TapIcon size={36} />
                  </div>
                )}

                {/* Badge kết quả type */}
                <span
                  className={`lesson-choice-card__badge lesson-choice-card__badge--${option.result}`}
                  aria-hidden="true"
                >
                  {option.result === "correct" ? "✓" : "!"}
                </span>
              </div>

              {/* Label bên dưới ảnh */}
              <div className="lesson-choice-card__label">
                <strong>{option.label}</strong>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
