import { Eye, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";
import { VideoLessonCard } from "./VideoLessonCard";

export function StoryStage({
  helperText,
  isDesktop = false,
  storyTitle,
  takeaway,
  ...props
}) {
  if (isDesktop) {
    return (
      <section className="lesson-story" aria-label="Video bài học">
        <div className="lesson-video-frame">
          <VideoLessonCard requireManualStart {...props} />
        </div>
      </section>
    );
  }

  return (
    <section className="lesson-video-layout" aria-label="Video bài học">
      <aside
        className="lesson-video-support lesson-video-support--helper"
        aria-label="Lời nhắc quan sát"
      >
        <div className="lesson-video-support__mascot" aria-hidden="true">
          <img src={mascotSpeaking} alt="" />
          <span className="lesson-video-support__sparkle">
            <Sparkle size={20} weight="fill" />
          </span>
        </div>
        <div className="lesson-video-support__copy">
          <span className="lesson-video-support__eyebrow">
            <Eye size={20} weight="bold" />
            Cùng quan sát
          </span>
          <h2>Nhìn thật kỹ nhé!</h2>
          <p>{helperText || "Con hãy chú ý điều gì đang xảy ra trong video."}</p>
        </div>
      </aside>

      <div className="lesson-stage lesson-stage--video lesson-video-frame">
        <VideoLessonCard requireManualStart {...props} />
      </div>

      <aside
        className="lesson-video-support lesson-video-support--goal"
        aria-label="Mục tiêu bài học"
      >
        <span className="lesson-video-support__goal-icon" aria-hidden="true">
          <ShieldCheck size={34} weight="fill" />
        </span>
        <div className="lesson-video-support__copy">
          <span className="lesson-video-support__eyebrow">Mục tiêu bài học</span>
          <h2>{storyTitle || "Bài học an toàn"}</h2>
          <p>{takeaway || "Quan sát, suy nghĩ và chọn cách xử lý an toàn."}</p>
        </div>
        <div className="lesson-video-support__steps" aria-label="Ba bước học">
          <span>Xem</span>
          <span>Nghĩ</span>
          <span>Chọn</span>
        </div>
      </aside>
    </section>
  );
}
