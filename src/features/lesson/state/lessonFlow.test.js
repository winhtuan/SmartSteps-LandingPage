import {
  initialLessonFlowState,
  LESSON_PHASES,
  lessonFlowReducer,
} from "./lessonFlow";

const correctOption = { id: "adult", result: "correct" };
const wrongOption = { id: "eat", result: "wrong" };

test("requires the intro to finish before accepting an answer", () => {
  const unchanged = lessonFlowReducer(initialLessonFlowState, {
    type: "ANSWER_SELECTED",
    option: correctOption,
  });

  expect(unchanged).toBe(initialLessonFlowState);
});

test("completes only after the correct feedback video ends", () => {
  const questionState = lessonFlowReducer(initialLessonFlowState, { type: "INTRO_ENDED" });
  const feedbackState = lessonFlowReducer(questionState, {
    type: "ANSWER_SELECTED",
    correctVideoUrl: "correct.mp4",
    option: correctOption,
    wrongVideoUrl: "wrong.mp4",
  });

  expect(feedbackState.phase).toBe(LESSON_PHASES.FEEDBACK_CORRECT);
  expect(feedbackState.feedbackVideoUrl).toBe("correct.mp4");

  const completedState = lessonFlowReducer(feedbackState, { type: "FEEDBACK_ENDED" });
  expect(completedState.phase).toBe(LESSON_PHASES.COMPLETED);
});

test("keeps a wrong answer in feedback until the child chooses to try again", () => {
  const questionState = lessonFlowReducer(initialLessonFlowState, { type: "INTRO_ENDED" });
  const feedbackState = lessonFlowReducer(questionState, {
    type: "ANSWER_SELECTED",
    correctVideoUrl: "correct.mp4",
    option: wrongOption,
    wrongVideoUrl: "wrong.mp4",
  });
  const reviewedState = lessonFlowReducer(feedbackState, { type: "FEEDBACK_ENDED" });

  expect(reviewedState.phase).toBe(LESSON_PHASES.FEEDBACK_WRONG);
  expect(reviewedState.feedbackComplete).toBe(true);

  const retryState = lessonFlowReducer(reviewedState, { type: "TRY_AGAIN" });
  expect(retryState.phase).toBe(LESSON_PHASES.QUESTION);
  expect(retryState.selectedAnswerId).toBe("");
});
