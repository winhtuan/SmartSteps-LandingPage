export const LESSON_PHASES = {
  INTRO: "intro",
  QUESTION: "question",
  FEEDBACK_WRONG: "feedback-wrong",
  FEEDBACK_CORRECT: "feedback-correct",
  COMPLETED: "completed",
};

export const initialLessonFlowState = {
  answerState: "",
  feedbackComplete: false,
  feedbackVideoUrl: "",
  phase: LESSON_PHASES.INTRO,
  selectedAnswerId: "",
  videoInstanceKey: 0,
};

export function lessonFlowReducer(state, action) {
  switch (action.type) {
    case "INTRO_ENDED":
      return state.phase === LESSON_PHASES.INTRO
        ? { ...state, phase: LESSON_PHASES.QUESTION }
        : state;

    case "ANSWER_SELECTED": {
      if (state.phase !== LESSON_PHASES.QUESTION) {
        return state;
      }

      const isCorrect = action.option.result === "correct";

      return {
        ...state,
        answerState: action.option.result,
        feedbackComplete: false,
        feedbackVideoUrl: isCorrect ? action.correctVideoUrl : action.wrongVideoUrl,
        phase: isCorrect ? LESSON_PHASES.FEEDBACK_CORRECT : LESSON_PHASES.FEEDBACK_WRONG,
        selectedAnswerId: action.option.id,
        videoInstanceKey: state.videoInstanceKey + 1,
      };
    }

    case "FEEDBACK_ENDED":
      if (state.phase === LESSON_PHASES.FEEDBACK_CORRECT) {
        return { ...state, feedbackComplete: true, phase: LESSON_PHASES.COMPLETED };
      }

      if (state.phase === LESSON_PHASES.FEEDBACK_WRONG) {
        return { ...state, feedbackComplete: true };
      }

      return state;

    case "TRY_AGAIN":
      if (state.phase !== LESSON_PHASES.FEEDBACK_WRONG || !state.feedbackComplete) {
        return state;
      }

      return {
        ...state,
        answerState: "",
        feedbackComplete: false,
        feedbackVideoUrl: "",
        phase: LESSON_PHASES.QUESTION,
        selectedAnswerId: "",
      };

    case "REPLAY_INTRO":
      return {
        ...initialLessonFlowState,
        videoInstanceKey: state.videoInstanceKey + 1,
      };

    default:
      return state;
  }
}
