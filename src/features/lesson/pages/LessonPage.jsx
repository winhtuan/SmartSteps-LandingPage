import { CheckCircle, Gear, LockKey, SpeakerHigh, XCircle } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { getAuthSession } from "../../auth/services/authApi";
import { completeSituationProgress } from "../../learning/services/learningApi";
import { markSituationCompleted } from "../../learning/services/learningProgress";
import { getPremiumStatus, getStoredPremiumAccount } from "../../premium/services/premiumApi";
import { LessonBackground } from "../components/LessonBackground";
import { LessonHeader } from "../components/LessonHeader";
import { LessonSidePanel } from "../components/LessonSidePanel";
import { StoryStage } from "../components/StoryStage";
import { getLessonContent } from "../data/lessonContent";
import { useLessonIntroVideo } from "../hooks/useLessonIntroVideo";
import "../styles/lesson.css";

export function LessonPage() {
  const { error, lesson, requestedSituationId, retry, status, videoUrl } = useLessonIntroVideo();
  const [hasLessonAccess, setHasLessonAccess] = useState(true);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mathAnswerInput, setMathAnswerInput] = useState("");
  const [mathError, setMathError] = useState("");
  const [mathPrompt, setMathPrompt] = useState({ a: 1, b: 1, answer: 2, label: "" });
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [answerState, setAnswerState] = useState("");
  const [feedbackVideoUrl, setFeedbackVideoUrl] = useState("");
  const [videoInstanceKey, setVideoInstanceKey] = useState(0);
  const pendingActionRef = useRef(null);
  const lessonContent = getLessonContent(requestedSituationId, lesson);

  const canContinue = answerState === "correct";
  const currentVideoUrl = feedbackVideoUrl || videoUrl;

  useEffect(() => {
    let ignore = false;

    if (Number(requestedSituationId) !== 3) {
      setHasLessonAccess(true);
      setIsCheckingAccess(false);
      return () => {
        ignore = true;
      };
    }

    const premiumAccount = getStoredPremiumAccount();

    if (!premiumAccount?.userId) {
      setHasLessonAccess(false);
      window.location.assign("/learning");
      return () => {
        ignore = true;
      };
    }

    setIsCheckingAccess(true);

    getPremiumStatus(premiumAccount.userId)
      .then((premiumStatus) => {
        if (ignore) {
          return;
        }

        const nextAccess = premiumStatus?.hasPremium === true;
        setHasLessonAccess(nextAccess);

        if (!nextAccess) {
          window.location.assign("/learning");
        }
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setHasLessonAccess(false);
        window.location.assign("/learning");
      })
      .finally(() => {
        if (!ignore) {
          setIsCheckingAccess(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [requestedSituationId]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${lessonContent.worldTitle} | SmartSteps`;

    return () => {
      document.title = previousTitle;
    };
  }, [lessonContent.worldTitle]);

  const handleClose = () => {
    window.location.assign("/learning");
  };

  const createMathPrompt = (label) => {
    const a = Math.floor(Math.random() * 5) + 2;
    const b = Math.floor(Math.random() * 4) + 1;

    return { a, answer: a + b, b, label };
  };

  const requestProtectedAction = (label, action) => {
    if (!isVideoPlaying) {
      action();
      return;
    }

    pendingActionRef.current = action;
    setMathPrompt(createMathPrompt(label));
    setMathAnswerInput("");
    setMathError("");
    setIsGateOpen(true);
  };

  const handleGateClose = () => {
    pendingActionRef.current = null;
    setIsGateOpen(false);
    setMathAnswerInput("");
    setMathError("");
  };

  const handleGateSubmit = () => {
    if (Number(mathAnswerInput) !== mathPrompt.answer) {
      setMathError("Chưa đúng rồi. Con thử lại nhé.");
      return;
    }

    const pendingAction = pendingActionRef.current;
    handleGateClose();
    pendingAction?.();
  };

  const handleSettingsAction = () => {
    setIsSettingsOpen(true);
  };

  const handleSoundAction = () => {
    setIsMuted((current) => !current);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    if (!introCompleted) {
      setIntroCompleted(true);
    }
  };

  const handleAnswerSelect = (option) => {
    if (!introCompleted) {
      return;
    }

    setSelectedAnswerId(option.id);
    setAnswerState(option.result);
    setFeedbackVideoUrl(
      option.result === "correct"
        ? lessonContent.correctVideoUrl
        : lessonContent.wrongVideoUrl,
    );
    setVideoInstanceKey((current) => current + 1);
  };

  const handleContinue = async () => {
    if (!canContinue) {
      return;
    }

    const situationId = Number(lesson?.situationId);
    const session = getAuthSession();

    if (session?.email && Number.isInteger(situationId) && situationId > 0) {
      try {
        await completeSituationProgress({
          fullName: session.fullName,
          situationId,
          userEmail: session.email,
        });
      } catch {
        // Keep local progress as a fallback when the API is unavailable.
      }
    }

    markSituationCompleted(situationId);
    window.location.assign("/learning");
  };

  const handleReplay = () => {
    setSelectedAnswerId("");
    setAnswerState("");
    setFeedbackVideoUrl("");
    setVideoInstanceKey((current) => current + 1);
  };

  if (isCheckingAccess) {
    return null;
  }

  if (!hasLessonAccess) {
    return null;
  }

  return (
    <div className="lesson-page">
      <LessonBackground imageUrl={lessonContent.backgroundImage} />
      <div className="lesson-shell">
        <LessonHeader
          adventureLabel={lessonContent.adventureLabel}
          isMuted={isMuted}
          onSettings={() => requestProtectedAction("mở cài đặt", handleSettingsAction)}
          onSound={() => requestProtectedAction("bật hoặc tắt âm thanh", handleSoundAction)}
          title={lessonContent.worldTitle}
          onClose={() => requestProtectedAction("thoát bài học", handleClose)}
        />
        <main className="lesson-main">
          <StoryStage
            completed={introCompleted}
            error={error}
            instanceKey={videoInstanceKey}
            isMuted={isMuted}
            onRetry={retry}
            onVideoEnded={handleVideoEnded}
            onVideoPause={() => setIsVideoPlaying(false)}
            onVideoPlay={() => setIsVideoPlaying(true)}
            poster={lessonContent.videoPoster}
            playbackRate={playbackRate}
            status={status}
            videoUrl={currentVideoUrl}
          />
          <LessonSidePanel
            answerOptions={lessonContent.answerOptions}
            answerState={answerState}
            canContinue={canContinue}
            completed={introCompleted}
            introCompleted={introCompleted}
            onContinue={() => requestProtectedAction("sang bài tiếp theo", handleContinue)}
            onReplay={() => requestProtectedAction("phát lại video", handleReplay)}
            onAnswerSelect={(option) =>
              requestProtectedAction(`chọn đáp án ${option.label}`, () => handleAnswerSelect(option))
            }
            prompt={lessonContent.prompt}
            selectedAnswerId={selectedAnswerId}
          />
        </main>
      </div>

      <Modal open={isGateOpen} onClose={handleGateClose} className="lesson-gate-modal">
        <div className="lesson-gate-modal__header">
          <LockKey size={28} weight="fill" />
          <div>
            <h2>Trả lời câu đố để tiếp tục</h2>
            <p>Con hãy tính thật nhanh để {mathPrompt.label}.</p>
          </div>
        </div>

        <div className="lesson-gate-modal__question">
          {mathPrompt.a} + {mathPrompt.b} = ?
        </div>

        <input
          type="text"
          inputMode="numeric"
          value={mathAnswerInput}
          onChange={(event) => setMathAnswerInput(event.target.value.replace(/[^\d-]/g, ""))}
          className="lesson-gate-modal__input"
          placeholder="Nhập đáp án"
        />

        {mathError ? <p className="lesson-gate-modal__error">{mathError}</p> : null}

        <div className="lesson-gate-modal__actions">
          <button
            type="button"
            className="lesson-gate-modal__button lesson-gate-modal__button--ghost"
            onClick={handleGateClose}
          >
            <XCircle size={18} weight="fill" />
            Hủy
          </button>
          <button type="button" className="lesson-gate-modal__button" onClick={handleGateSubmit}>
            <CheckCircle size={18} weight="fill" />
            Xác nhận
          </button>
        </div>
      </Modal>

      <Modal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        className="lesson-settings-modal"
      >
        <div className="lesson-gate-modal__header">
          <Gear size={28} weight="fill" />
          <div>
            <h2>Cài đặt video</h2>
            <p>Chọn tốc độ phát phù hợp cho bé.</p>
          </div>
        </div>

        <div className="lesson-settings-modal__rates">
          {[0.75, 1, 1.25, 1.5].map((rate) => (
            <button
              key={rate}
              type="button"
              className={`lesson-settings-modal__rate${playbackRate === rate ? " lesson-settings-modal__rate--active" : ""}`}
              onClick={() => setPlaybackRate(rate)}
            >
              {rate}x
            </button>
          ))}
        </div>

        <button
          type="button"
          className="lesson-gate-modal__button lesson-settings-modal__close"
          onClick={() => setIsSettingsOpen(false)}
        >
          <SpeakerHigh size={18} weight="fill" />
          Xong
        </button>
      </Modal>
    </div>
  );
}
