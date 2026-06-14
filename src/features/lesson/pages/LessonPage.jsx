import { Gear, SpeakerHigh } from "@phosphor-icons/react";
import { useEffect, useReducer, useRef, useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { navigateInApp } from "../../../app/navigation";
import responsiveLessonBackground from "../../../assets/images/land/bg-root.png";
import { getAuthSession } from "../../auth/services/authApi";
import { completeSituationProgress } from "../../learning/services/learningApi";
import { markSituationCompleted } from "../../learning/services/learningProgress";
import { saveWrongAnswer } from "../../review/services/wrongAnswerStorage";
import { getPremiumStatus, getStoredPremiumAccount } from "../../premium/services/premiumApi";
import { doesSituationRequirePremium } from "../../premium/utils/premiumAccess";
import { LessonBackground } from "../components/LessonBackground";
import { LessonCompletionStage } from "../components/LessonCompletionStage";
import { LessonFeedbackStage } from "../components/LessonFeedbackStage";
import { LessonHeader } from "../components/LessonHeader";
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
import "../styles/lesson.css";

export function LessonPage() {
  const { error, lesson, requestedSituationId, retry, status, videoUrl } = useLessonIntroVideo();
  const isDesktop = useDesktopLessonLayout();
  const [flow, dispatchFlow] = useReducer(lessonFlowReducer, initialLessonFlowState);
  const [hasLessonAccess, setHasLessonAccess] = useState(true);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const stageRef = useRef(null);
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

  // Ẩn header trên mobile khi xem intro video, câu hỏi (flashcard), hoặc khi đang phát video kết quả (feedback video chưa kết thúc)
  const isMobileFullscreen = !isDesktop && (
    flow.phase === LESSON_PHASES.INTRO ||
    flow.phase === LESSON_PHASES.QUESTION ||
    ((flow.phase === LESSON_PHASES.FEEDBACK_WRONG || flow.phase === LESSON_PHASES.FEEDBACK_CORRECT) && !flow.feedbackComplete)
  );

  useEffect(() => {
    let ignore = false;

    // Build a minimal situation object so the shared utility can evaluate premium rules.
    // `lesson` is populated from the API/static data; fall back to situationId only.
    const situationForCheck = lesson
      ? { situationId: requestedSituationId, islandId: lesson.islandId, orderIndex: lesson.orderIndex }
      : { situationId: requestedSituationId };

    if (!doesSituationRequirePremium(situationForCheck)) {
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
  }, [requestedSituationId, lesson]);

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

  const handleClose = () => {
    navigateInApp("/learning");
  };

  const handleVideoEnded = () => {
    if (flow.phase === LESSON_PHASES.INTRO) {
      dispatchFlow({ type: "INTRO_ENDED" });
      return;
    }

    dispatchFlow({ type: "FEEDBACK_ENDED" });
  };

  const handleAnswerSelect = (option) => {
    if (option.result === "wrong") {
      const correctOption = lessonContent.answerOptions.find((o) => o.result === "correct");
      saveWrongAnswer({
        situationId: requestedSituationId,
        lessonTitle: lessonContent.storyTitle,
        islandName: lessonContent.worldTitle,
        questionPrompt: lessonContent.prompt,
        selectedOptionLabel: option.label,
        correctOptionLabel: correctOption?.label || "",
      });
    }

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
    navigateInApp("/learning");
  };

  if (isCheckingAccess || !hasLessonAccess) {
    return null;
  }

  return (
    <div
      className={`lesson-page${isMobileFullscreen ? " lesson-page--mobile-fullscreen" : ""}`}
      data-lesson-phase={flow.phase}
    >
      <LessonBackground
        imageUrl={lessonContent.backgroundImage}
        responsiveImageUrl={responsiveLessonBackground}
      />
      <div className="lesson-shell">
        {/* Ẩn header khi xem intro/video kết quả trên mobile để video full màn hình */}
        {!isMobileFullscreen ? (
          <LessonHeader
            adventureLabel={lessonContent.adventureLabel}
            currentStep={currentStep}
            isDesktop={isDesktop}
            isMuted={isMuted}
            onSettings={() => setIsSettingsOpen(true)}
            onSound={() => setIsMuted((current) => !current)}
            totalSteps={3}
            title={lessonContent.worldTitle}
            onClose={handleClose}
            hideProgress={flow.phase === LESSON_PHASES.FEEDBACK_WRONG || flow.phase === LESSON_PHASES.FEEDBACK_CORRECT}
          />
        ) : null}
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
                onSkip={handleVideoEnded}
                onVideoEnded={handleVideoEnded}
                poster={lessonContent.videoPoster}
                playbackRate={playbackRate}
                shouldPause={isSettingsOpen}
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
                isMuted={isMuted}
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
                voiceFiles={lessonContent.voiceFiles}
              />
            </>
          ) : null}

          {!isDesktop && flow.phase === LESSON_PHASES.INTRO ? (
            <StoryStage
              error={error}
              instanceKey={flow.videoInstanceKey}
              isMuted={isMuted}
              onRetry={retry}
              onSkip={handleVideoEnded}
              onVideoEnded={handleVideoEnded}
              poster={lessonContent.videoPoster}
              playbackRate={playbackRate}
              shouldPause={isSettingsOpen}
              status={status}
              storyTitle={lessonContent.storyTitle}
              takeaway={lessonContent.takeaway}
              videoUrl={currentVideoUrl}
            />
          ) : null}

          {!isDesktop && flow.phase === LESSON_PHASES.QUESTION ? (
            <LessonQuestionStage
              answerOptions={lessonContent.answerOptions}
              isMuted={isMuted}
              onAnswerSelect={handleAnswerSelect}
              poster={lessonContent.videoPoster}
              prompt={lessonContent.prompt}
              voiceFiles={lessonContent.voiceFiles}
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
              isDesktop={isDesktop}
              onReplayIntro={() => dispatchFlow({ type: "REPLAY_INTRO" })}
              onRetry={retry}
              onRetryAnswer={() => dispatchFlow({ type: "TRY_AGAIN" })}
              onSkip={handleVideoEnded}
              onVideoEnded={handleVideoEnded}
              poster={lessonContent.videoPoster}
              playbackRate={playbackRate}
              shouldPause={isSettingsOpen}
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
