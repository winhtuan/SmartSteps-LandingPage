const DEFAULT_BACKGROUND_IMAGE =
  "https://lh3.googleusercontent.com/aida/AP1WRLuDehCcKNXypLmQGwQOVrUPeSZyYNbtDFn__bItjuMrs3WynSrPwRiRGNn5pAUW0OjO9ilXusjXcGD5G0JSJDatoT0Vc_rMhB4pv4RNyMNeDCQ0R0fZ3SPD36W1eftQTTBpqRAiC3sF6sB9lAhKkeJoE-XXX9sziJc4EQrpH3dMK5mlXiSpAf4FyHlqPHLVzEIuZhRfwRwNMT3Hur9PE4Zr6BWeH3-aFv50reIUnOEx5WTFXPAvxF6CST_2";

const DEFAULT_VIDEO_POSTER =
  "https://lh3.googleusercontent.com/aida/AP1WRLvJphJcxnXLkSTTAuj39D5mQPNQg-DkgEJMZJY3ThU4szBJXWUHP690W-NegSs3tqk4ZxkC70jk06OYUF4PBpNAgFSczO8Z0yFiw0W4FN8PIF0ifM5QZIm_aA6oYH1zsWbbL_AaRRia_Trt9BOk0iDT_HwmW8BOF1nTP7kwvJnrzKiyAoF3EOPf-9iSc-teCfAiBcBoJoda8j0w3exNO3E9mCvgfyh85ULYAbRTjlX9H14KHOGk_TyCIsKl";

const DEFAULT_WORLD_TITLE = "An toàn cá nhân";

const CLOUDINARY_CLOUD_NAME = "dtm5a4bwr";
const CLOUDINARY_VIDEO_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;

function buildCloudinaryVideoUrl(publicId) {
  return `${CLOUDINARY_VIDEO_BASE_URL}/${publicId}`;
}

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
    introVideoUrl: "https://res.cloudinary.com/dtm5a4bwr/video/upload/v1781136864/Safety_smallitems_intro_cw1tlh.mp4",
    correctVideoUrl: buildCloudinaryVideoUrl("Safety_smallitems_correct_u5ubla.mp4"),
    wrongVideoUrl: "https://res.cloudinary.com/dtm5a4bwr/video/upload/v1781136866/Safety_smallitems_wrong_pjogba.mp4",
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
    introVideoUrl: "https://res.cloudinary.com/dtm5a4bwr/video/upload/v1781136588/cross-road-intro_tnrhmy.mp4",
    correctVideoUrl: buildCloudinaryVideoUrl("cross-road-correct_r36izw.mp4"),
    wrongVideoUrl: buildCloudinaryVideoUrl("cross-road-wrong_fnc8fg.mp4"),
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
    correctVideoUrl: config.correctVideoUrl || "",
    wrongVideoUrl: config.wrongVideoUrl || "",
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
