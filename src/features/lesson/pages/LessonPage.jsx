import { CheckCircle, Gear, LockKey, SpeakerHigh, XCircle } from "@phosphor-icons/react";
import { useEffect, useReducer, useRef, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { navigateInApp } from "../../../app/navigation";
import responsiveLessonBackground from "../../../assets/images/land/bg-root.png";
import { getAuthSession } from "../../auth/services/authApi";
import { completeSituationProgress } from "../../learning/services/learningApi";
import { markSituationCompleted } from "../../learning/services/learningProgress";
import { getPremiumStatus, getStoredPremiumAccount } from "../../premium/services/premiumApi";
import { LessonBackground } from "../components/LessonBackground";
import { LessonCompletionStage } from "../components/LessonCompletionStage";
import { LessonFeedbackStage } from "../components/LessonFeedbackStage";
import { LessonHeader } from "../components/LessonHeader";
import { LessonOrientationPrompt } from "../components/LessonOrientationPrompt";
import { LessonQuestionStage } from "../components/LessonQuestionStage";
import { LessonSidePanel } from "../components/LessonSidePanel";
import { StoryStage } from "../components/StoryStage";
import { getLessonContent } from "../data/lessonContent";
import { useDesktopLessonLayout } from "../hooks/useDesktopLessonLayout";
import { useLessonIntroVideo } from "../hooks/useLessonIntroVideo";
import {
  initialLessonFlowState,
  LESSON_PHASES,
  lessonFlowReducer,
} from "../state/lessonFlow";
import {
  enterLessonLandscape,
  exitLessonLandscape,
  isSmallLessonViewport,
  isSmallPortraitViewport,
} from "../utils/lessonOrientation";
import "../styles/lesson.css";

export function LessonPage() {
  const { error, lesson, requestedSituationId, retry, status, videoUrl } = useLessonIntroVideo();
  const isDesktop = useDesktopLessonLayout();
  const [flow, dispatchFlow] = useReducer(lessonFlowReducer, initialLessonFlowState);
  const [hasLessonAccess, setHasLessonAccess] = useState(true);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mathAnswerInput, setMathAnswerInput] = useState("");
  const [mathError, setMathError] = useState("");
  const [mathPrompt, setMathPrompt] = useState({ a: 1, b: 1, answer: 2, label: "" });
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showOrientationPrompt, setShowOrientationPrompt] = useState(
    isSmallPortraitViewport,
  );
  const lessonRootRef = useRef(null);
  const orientationModeRequestedRef = useRef(false);
  const stageRef = useRef(null);
  const pendingActionRef = useRef(null);
  const lessonContent = getLessonContent(requestedSituationId, lesson);

  const canContinue = flow.phase === LESSON_PHASES.COMPLETED;
  const currentVideoUrl = flow.feedbackVideoUrl || videoUrl;
  const selectedOption = lessonContent.answerOptions.find(
    (option) => option.id === flow.selectedAnswerId,
  );
  const currentStep =
    flow.phase === LESSON_PHASES.INTRO
      ? 1
      : flow.phase === LESSON_PHASES.COMPLETED
        ? 3
        : 2;
  const desktopAnswersEnabled =
    flow.phase === LESSON_PHASES.QUESTION ||
    (flow.phase === LESSON_PHASES.FEEDBACK_WRONG && flow.feedbackComplete) ||
    flow.phase === LESSON_PHASES.COMPLETED;

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
        if (!ignore) {
          setHasLessonAccess(false);
          window.location.assign("/learning");
        }
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

  useEffect(() => {
    stageRef.current?.focus({ preventScroll: true });
  }, [flow.phase]);

  useEffect(() => {
    if (isCheckingAccess || !hasLessonAccess) {
      return undefined;
    }

    let active = true;
    const updateOrientationPrompt = () => {
      if (active) {
        setShowOrientationPrompt(isSmallPortraitViewport());
      }
    };

    updateOrientationPrompt();
    window.addEventListener("resize", updateOrientationPrompt);
    window.addEventListener("orientationchange", updateOrientationPrompt);
    window.screen?.orientation?.addEventListener?.("change", updateOrientationPrompt);

    if (isSmallLessonViewport()) {
      orientationModeRequestedRef.current = true;
      enterLessonLandscape(lessonRootRef.current).finally(updateOrientationPrompt);
    }

    return () => {
      active = false;
      window.removeEventListener("resize", updateOrientationPrompt);
      window.removeEventListener("orientationchange", updateOrientationPrompt);
      window.screen?.orientation?.removeEventListener?.("change", updateOrientationPrompt);

      if (orientationModeRequestedRef.current) {
        orientationModeRequestedRef.current = false;
        void exitLessonLandscape();
      }
    };
  }, [hasLessonAccess, isCheckingAccess]);

  const handleClose = async () => {
    if (orientationModeRequestedRef.current) {
      orientationModeRequestedRef.current = false;
      await exitLessonLandscape();
    }

    navigateInApp("/learning");
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

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);

    if (flow.phase === LESSON_PHASES.INTRO) {
      dispatchFlow({ type: "INTRO_ENDED" });
      return;
    }

    dispatchFlow({ type: "FEEDBACK_ENDED" });
  };

  const handleAnswerSelect = (option) => {
    dispatchFlow({
      type: "ANSWER_SELECTED",
      correctVideoUrl: lessonContent.correctVideoUrl,
      option,
      wrongVideoUrl: lessonContent.wrongVideoUrl,
    });
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

    if (orientationModeRequestedRef.current) {
      orientationModeRequestedRef.current = false;
      await exitLessonLandscape();
    }

    navigateInApp("/learning");
  };

  if (isCheckingAccess || !hasLessonAccess) {
    return null;
  }

  return (
    <div
      ref={lessonRootRef}
      className={`lesson-page${
        showOrientationPrompt ? " lesson-page--orientation-prompt" : ""
      }`}
      data-lesson-phase={flow.phase}
    >
      <LessonBackground
        imageUrl={lessonContent.backgroundImage}
        responsiveImageUrl={responsiveLessonBackground}
      />
      {showOrientationPrompt ? <LessonOrientationPrompt /> : null}
      <div className="lesson-shell">
        <LessonHeader
          adventureLabel={lessonContent.adventureLabel}
          currentStep={currentStep}
          isDesktop={isDesktop}
          isMuted={isMuted}
          onSettings={() => requestProtectedAction("mở cài đặt", () => setIsSettingsOpen(true))}
          onSound={() => setIsMuted((current) => !current)}
          totalSteps={3}
          title={lessonContent.worldTitle}
          onClose={() => requestProtectedAction("thoát bài học", handleClose)}
        />
        <main
          ref={stageRef}
          className={`lesson-main${isDesktop ? " lesson-main--desktop" : " lesson-main--mobile"}`}
          aria-label="Nội dung bài học"
          tabIndex="-1"
        >
          {isDesktop ? (
            <>
              <StoryStage
                error={error}
                instanceKey={flow.videoInstanceKey}
                isDesktop
                isMuted={isMuted}
                onRetry={retry}
                onVideoEnded={handleVideoEnded}
                onVideoPause={() => setIsVideoPlaying(false)}
                onVideoPlay={() => setIsVideoPlaying(true)}
                poster={lessonContent.videoPoster}
                playbackRate={playbackRate}
                shouldPause={isGateOpen || isSettingsOpen}
                status={status}
                storyTitle={lessonContent.storyTitle}
                takeaway={lessonContent.takeaway}
                videoUrl={currentVideoUrl}
              />
              <LessonSidePanel
                answerOptions={lessonContent.answerOptions}
                answerState={flow.answerState}
                canContinue={canContinue}
                completed={flow.phase === LESSON_PHASES.COMPLETED}
                introCompleted={desktopAnswersEnabled}
                onContinue={handleContinue}
                onReplay={() => dispatchFlow({ type: "REPLAY_INTRO" })}
                onAnswerSelect={(option) => {
                  if (
                    flow.phase === LESSON_PHASES.FEEDBACK_WRONG &&
                    flow.feedbackComplete
                  ) {
                    dispatchFlow({ type: "TRY_AGAIN" });
                  }
                  handleAnswerSelect(option);
                }}
                prompt={lessonContent.prompt}
                selectedAnswerId={flow.selectedAnswerId}
              />
            </>
          ) : null}

          {!isDesktop && flow.phase === LESSON_PHASES.INTRO ? (
            <StoryStage
              error={error}
              instanceKey={flow.videoInstanceKey}
              isMuted={isMuted}
              onRetry={retry}
              onVideoEnded={handleVideoEnded}
              onVideoPause={() => setIsVideoPlaying(false)}
              onVideoPlay={() => setIsVideoPlaying(true)}
              poster={lessonContent.videoPoster}
              playbackRate={playbackRate}
              shouldPause={isGateOpen || isSettingsOpen}
              status={status}
              storyTitle={lessonContent.storyTitle}
              takeaway={lessonContent.takeaway}
              videoUrl={currentVideoUrl}
            />
          ) : null}

          {!isDesktop && flow.phase === LESSON_PHASES.QUESTION ? (
            <LessonQuestionStage
              answerOptions={lessonContent.answerOptions}
              onAnswerSelect={handleAnswerSelect}
              poster={lessonContent.videoPoster}
              prompt={lessonContent.prompt}
            />
          ) : null}

          {!isDesktop &&
          (flow.phase === LESSON_PHASES.FEEDBACK_WRONG ||
            flow.phase === LESSON_PHASES.FEEDBACK_CORRECT) ? (
            <LessonFeedbackStage
              error={error}
              feedbackComplete={flow.feedbackComplete}
              feedbackText={selectedOption?.feedback}
              instanceKey={flow.videoInstanceKey}
              isMuted={isMuted}
              onReplayIntro={() => dispatchFlow({ type: "REPLAY_INTRO" })}
              onRetry={retry}
              onRetryAnswer={() => dispatchFlow({ type: "TRY_AGAIN" })}
              onVideoEnded={handleVideoEnded}
              onVideoPause={() => setIsVideoPlaying(false)}
              onVideoPlay={() => setIsVideoPlaying(true)}
              poster={lessonContent.videoPoster}
              playbackRate={playbackRate}
              shouldPause={isGateOpen || isSettingsOpen}
              status={status}
              videoUrl={currentVideoUrl}
            />
          ) : null}

          {!isDesktop && flow.phase === LESSON_PHASES.COMPLETED ? (
            <LessonCompletionStage
              onContinue={handleContinue}
              takeaway={lessonContent.takeaway}
            />
          ) : null}
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
              className={`lesson-settings-modal__rate${
                playbackRate === rate ? " lesson-settings-modal__rate--active" : ""
              }`}
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
