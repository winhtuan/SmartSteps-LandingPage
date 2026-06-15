import { HandPointing, SpeakerHigh } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
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

/**
 * readingTarget tracks which element is currently being read aloud.
 * - "question" — the question bubble is being read
 * - optionId  — a specific answer card is being read
 * - ""        — nothing is being read
 */

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
  const [readingTarget, setReadingTarget] = useState("");
  const { speak, speakSequence, cancel } = useTextToSpeech(!isMuted);

  // Build danh sách audio sources: [question, choice0, choice1, ...]
  // và map index → target key cho highlighting
  const buildSequence = useCallback(() => {
    if (!voiceFiles) return { srcs: [], keys: [] };

    const srcs = [];
    const keys = [];

    if (voiceFiles.question) {
      srcs.push(voiceFiles.question);
      keys.push("question");
    }

    for (const o of answerOptions) {
      const src = voiceFiles.choices?.[o.id];
      if (src) {
        srcs.push(src);
        keys.push(o.id);
      }
    }

    return { srcs, keys };
  }, [voiceFiles, answerOptions]);

  // Tự động phát: câu hỏi → lần lượt từng đáp án, với highlight theo từng phần
  useEffect(() => {
    const { srcs, keys } = buildSequence();
    if (!srcs.length) return;

    const timer = window.setTimeout(() => {
      speakSequence(srcs, 500, {
        onItemStart: (index) => setReadingTarget(keys[index] || ""),
        onSequenceEnd: () => setReadingTarget(""),
      });
    }, 400);

    return () => {
      window.clearTimeout(timer);
      cancel();
      setReadingTarget("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bấm vào question bubble để phát lại câu hỏi
  const handleQuestionTap = () => {
    const questionSrc = voiceFiles?.question;
    if (!questionSrc) return;

    setReadingTarget("question");
    // Dùng speak đơn lẻ, khi kết thúc tắt highlight
    cancel();

    const audio = new Audio(questionSrc);
    audio.onended = () => setReadingTarget((prev) => (prev === "question" ? "" : prev));
    audio.onerror = () => setReadingTarget((prev) => (prev === "question" ? "" : prev));

    if (!isMuted) {
      audio.play().catch(() => {
        setReadingTarget("");
      });
    }
  };

  const handleAnswerClick = (option) => {
    // Lần 2: đã highlight chính option này → xác nhận chọn
    if (highlightedAnswerId === option.id) {
      if (confirmedRef.current) return;
      confirmedRef.current = true;
      cancel();
      setReadingTarget("");
      onAnswerSelect(option);
      return;
    }

    // Lần 1: highlight + phát MP3 của đáp án
    setHighlightedAnswerId(option.id);
    setReadingTarget(option.id);
    const choiceSrc = voiceFiles?.choices?.[option.id];
    if (choiceSrc) {
      speak(choiceSrc);
    } else {
      cancel();
    }
  };

  const isQuestionReading = readingTarget === "question";

  return (
    <section
      className="lesson-flashcard-stage"
      aria-labelledby="lesson-question-title"
    >
      {/* Câu hỏi từ mascot — bấm để phát lại */}
      <div className="lesson-flashcard-stage__prompt">
        <img
          className="lesson-flashcard-stage__mascot"
          src={mascotSpeaking}
          alt="Mèo SmartSteps đang đặt câu hỏi"
        />
        <button
          type="button"
          className={`lesson-flashcard-stage__bubble lesson-flashcard-stage__bubble--tappable${
            isQuestionReading ? " lesson-flashcard-stage__bubble--reading" : ""
          }`}
          onClick={handleQuestionTap}
          aria-label="Nghe lại câu hỏi"
        >
          <span className="lesson-flashcard-stage__eyebrow">
            Con sẽ làm gì?
            <SpeakerHigh
              className="lesson-flashcard-stage__speaker-icon"
              size={14}
              weight="fill"
            />
          </span>
          <h1 id="lesson-question-title" className="lesson-flashcard-stage__question">
            {prompt}
          </h1>
        </button>
      </div>

      {/* Lưới 2 card ảnh đáp án */}
      <div className="lesson-choice-cards" aria-label="Các câu trả lời">
        {answerOptions.map((option) => {
          const isHighlighted = highlightedAnswerId === option.id;
          const isOther = highlightedAnswerId && highlightedAnswerId !== option.id;
          const isReading = readingTarget === option.id && !isHighlighted;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isHighlighted}
              className={`lesson-choice-card${
                isHighlighted ? " lesson-choice-card--highlighted" : ""
              }${isOther ? " lesson-choice-card--dimmed" : ""}${
                isReading ? " lesson-choice-card--reading" : ""
              }`}
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
