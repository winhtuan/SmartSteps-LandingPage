import { MapTrifold, ShieldCheck, Star } from "@phosphor-icons/react";
import mascotHappy from "../../../assets/images/mascot/mascot-cat-happy.png";

export function LessonCompletionStage({ onContinue, takeaway }) {
  return (
    <section className="lesson-stage lesson-complete-stage" aria-labelledby="lesson-complete-title">
      <div className="lesson-complete-stage__glow" />

      <div className="lesson-complete-stage__mascot">
        <img src={mascotHappy} alt="Mèo SmartSteps chúc mừng" />
      </div>

      <div className="lesson-complete-stage__content">
        <ShieldCheck size={56} weight="fill" aria-hidden="true" />
        <h1 id="lesson-complete-title">Con đã chọn cách an toàn!</h1>
        <div className="lesson-complete-stage__reward">
          <Star size={24} weight="fill" />
          <strong>+10 sao</strong>
        </div>
        <p>{takeaway}</p>
        <button type="button" className="lesson-action-button" onClick={onContinue}>
          <MapTrifold size={24} weight="fill" />
          Về bản đồ
        </button>
      </div>
    </section>
  );
}
