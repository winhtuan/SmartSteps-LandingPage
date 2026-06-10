import lesson1CorrectVideo from "../../../assets/media/videos/Safety_smallitems/lesson1-correct.mp4";
import lesson1WrongVideo from "../../../assets/media/videos/Safety_smallitems/lesson1-wrong.mp4";
import crossroadCorrectVideo from "../../../assets/media/videos/Crossroad/correct.mp4";
import crossroadIntroVideo from "../../../assets/media/videos/Crossroad/intro.mp4";
import crossroadWrongVideo from "../../../assets/media/videos/Crossroad/wrong.mp4";

const DEFAULT_BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLuDehCcKNXypLmQGwQOVrUPeSZyYNbtDFn__bItjuMrs3WynSrPwRiRGNn5pAUW0OjO9ilXusjXcGD5G0JSJDatoT0Vc_rMhB4pv4RNyMNeDCQ0R0fZ3SPD36W1eftQTTBpqRAiC3sF6sB9lAhKkeJoE-XXX9sziJc4EQrpH3dMK5mlXiSpAf4FyHlqPHLVzEIuZhRfwRwNMT3Hur9PE4Zr6BWeH3-aFv50reIUnOEx5WTFXPAvxF6CST_2";

const DEFAULT_VIDEO_POSTER =
  "https://lh3.googleusercontent.com/aida/AP1WRLvJphJcxnXLkSTTAuj39D5mQPNQg-DkgEJMZJY3ThU4szBJXWUHP690W-NegSs3tqk4ZxkC70jk06OYUF4PBpNAgFSczO8Z0yFiw0W4FN8PIF0ifM5QZIm_aA6oYH1zsWbbL_AaRRia_Trt9BOk0iDT_HwmW8BOF1nTP7kwvJnrzKiyAoF3EOPf-9iSc-teCfAiBcBoJoda8j0w3exNO3E9mCvgfyh85ULYAbRTjlX9H14KHOGk_TyCIsKl";

const DEFAULT_WORLD_TITLE = "An toàn cá nhân";

const lessonConfigBySituationId = {
  1: {
    worldTitle: DEFAULT_WORLD_TITLE,
    adventureLabel: "Bài 1 • Phòng tránh hóc và nuốt dị vật",
    storyTitle: "Vật tròn lấp lánh",
    prompt: "Vật nhỏ lấp lánh có phải là đồ ăn không?",
    mapTitle: "Vật tròn lấp lánh",
    mapIntro: "Bé học hỏi người lớn trước khi chạm vào vật lạ.",
    videoPoster: DEFAULT_VIDEO_POSTER,
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
    correctVideoUrl: lesson1CorrectVideo,
    wrongVideoUrl: lesson1WrongVideo,
    answerOptions: [
      {
        id: "adult",
        label: "Đưa cho người lớn",
        icon: "adult",
        result: "correct",
        feedback: "Đúng rồi. Con nên đưa vật lạ cho người lớn kiểm tra.",
      },
      {
        id: "eat",
        label: "Nhặt lên và ăn thử",
        icon: "danger",
        result: "wrong",
        feedback: "Mình cần suy nghĩ lại. Vật lạ có thể gây hóc hoặc nuốt phải dị vật.",
      },
    ],
  },
  2: {
    worldTitle: DEFAULT_WORLD_TITLE,
    adventureLabel: "Bài 2 • Qua đường ở ngã tư",
    storyTitle: "Qua đường an toàn",
    prompt: "Khi qua đường ở ngã tư, con nên làm gì trước?",
    mapTitle: "Qua đường an toàn",
    mapIntro: "Bé luyện cách dừng lại, nhìn đèn giao thông và nắm tay người lớn.",
    videoPoster: DEFAULT_VIDEO_POSTER,
    backgroundImage: DEFAULT_BACKGROUND_IMAGE,
    introVideoUrl: crossroadIntroVideo,
    correctVideoUrl: crossroadCorrectVideo,
    wrongVideoUrl: crossroadWrongVideo,
    answerOptions: [
      {
        id: "wait-and-look",
        label: "Dừng lại, nhìn đèn và nắm tay người lớn",
        icon: "adult",
        result: "correct",
        feedback: "Đúng rồi. Con cần chờ an toàn rồi mới qua đường cùng người lớn.",
      },
      {
        id: "run-fast",
        label: "Chạy thật nhanh sang bên kia",
        icon: "danger",
        result: "wrong",
        feedback: "Chưa an toàn. Chạy vội qua đường rất dễ gặp xe đang tới gần.",
      },
    ],
  },
};

export function getLessonContent(situationId, lesson = null) {
  const normalizedSituationId = Number(situationId);
  const config = lessonConfigBySituationId[normalizedSituationId] || {};
  const titleFromLesson = String(lesson?.title || "").trim();
  const fallbackStoryTitle =
    titleFromLesson.replace(/^Bài\s*\d+\s*[:.\-–—]?\s*/iu, "").trim() || titleFromLesson;

  return {
    worldTitle: config.worldTitle || DEFAULT_WORLD_TITLE,
    adventureLabel:
      config.adventureLabel ||
      buildAdventureLabel(lesson?.orderIndex || normalizedSituationId, fallbackStoryTitle),
    storyTitle: config.storyTitle || fallbackStoryTitle || `Bài ${normalizedSituationId}`,
    prompt: config.prompt || "Con hãy xem video và chọn cách an toàn nhé.",
    videoPoster: config.videoPoster || DEFAULT_VIDEO_POSTER,
    backgroundImage: config.backgroundImage || DEFAULT_BACKGROUND_IMAGE,
    introVideoUrl: config.introVideoUrl || "",
    correctVideoUrl: config.correctVideoUrl || lesson1CorrectVideo,
    wrongVideoUrl: config.wrongVideoUrl || lesson1WrongVideo,
    answerOptions: config.answerOptions || lessonConfigBySituationId[1].answerOptions,
  };
}

export function getSituationPresentationOverride(situationId) {
  const config = lessonConfigBySituationId[Number(situationId)];

  if (!config) {
    return null;
  }

  return {
    title: config.mapTitle || config.storyTitle,
    intro: config.mapIntro || "",
  };
}

export function getRequestedSituationId() {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const routeSituationId = Number(pathSegments[1]);

  if (Number.isInteger(routeSituationId) && routeSituationId > 0) {
    return routeSituationId;
  }

  const params = new URLSearchParams(window.location.search);
  const querySituationId = Number(params.get("situationId"));

  if (Number.isInteger(querySituationId) && querySituationId > 0) {
    return querySituationId;
  }

  return 1;
}

function buildAdventureLabel(orderIndex, storyTitle) {
  if (!storyTitle) {
    return `Bài ${orderIndex}`;
  }

  return `Bài ${orderIndex} • ${storyTitle}`;
}
