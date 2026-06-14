import { Circle, SealCheck, SpeakerHigh, WarningCircle } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
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
  isMuted,
  onContinue,
  onReplay,
  onAnswerSelect,
  prompt,
  selectedAnswerId,
  voiceFiles,
}) {
  const confirmedRef = useRef(false);
  const [highlightedAnswerId, setHighlightedAnswerId] = useState("");
  const { speak, speakSequence, cancel } = useTextToSpeech(!isMuted);

  // Khi intro hoàn thành → reset trạng thái + tự động đọc câu hỏi & đáp án
  useEffect(() => {
    if (!introCompleted) return;

    confirmedRef.current = false;
    setHighlightedAnswerId("");

    if (!voiceFiles) return;

    const srcs = [
      voiceFiles.question,
      ...answerOptions.map((o) => voiceFiles.choices?.[o.id]).filter(Boolean),
    ].filter(Boolean);

    if (!srcs.length) return;

    const timer = window.setTimeout(() => speakSequence(srcs, 500), 400);
    return () => {
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introCompleted]);

  // Huỷ TTS khi đã chọn xong
  useEffect(() => {
    if (selectedAnswerId) {
      cancel();
    }
  }, [selectedAnswerId, cancel]);

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

  const handleAnswerClick = (option) => {
    if (!introCompleted || selectedAnswerId) return;

    // Lần 2: đã highlight đúng option này → xác nhận chọn
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
            const isConfirmed = selectedAnswerId === option.id;
            const isHighlighted = !isConfirmed && highlightedAnswerId === option.id;
            const isOtherHighlighted =
              !isConfirmed && highlightedAnswerId && highlightedAnswerId !== option.id;

            const stateClass =
              isConfirmed && option.result === "correct"
                ? "lesson-answer-card--correct"
                : isConfirmed && option.result === "wrong"
                  ? "lesson-answer-card--wrong"
                  : isHighlighted
                    ? "lesson-answer-card--highlighted"
                    : isOtherHighlighted
                      ? "lesson-answer-card--dimmed"
                      : "";

            return (
              <button
                key={option.id}
                type="button"
                className={`lesson-answer-card ${stateClass}`.trim()}
                disabled={!introCompleted}
                onClick={() => handleAnswerClick(option)}
              >
                <span className="lesson-answer-card__icon" aria-hidden="true">
                  <AnswerIcon selected={isConfirmed} state={option.result} />
                </span>
                <span className="lesson-answer-card__content">
                  <strong>{option.label}</strong>
                  {isConfirmed ? <span>{option.feedback}</span> : null}
                  {isHighlighted ? (
                    <span className="lesson-answer-card__tap-hint">
                      <SpeakerHigh size={12} weight="fill" />
                      Nhấn lần nữa để chọn
                    </span>
                  ) : null}
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
