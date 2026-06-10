import {
  CheckCircle,
  Eye,
  Gift,
  Lightbulb,
  Medal,
  Star,
} from "@phosphor-icons/react";
import { LessonProgress } from "./LessonProgress";

function StepListIcon({ icon, state }) {
  if (icon === "observe") {
    return <Eye size={18} weight={state === "active" ? "fill" : "duotone"} />;
  }

  if (icon === "think") {
    return <Lightbulb size={18} weight={state === "active" ? "fill" : "duotone"} />;
  }

  if (icon === "choose") {
    return <CheckCircle size={18} weight={state === "active" ? "fill" : "duotone"} />;
  }

  return <Gift size={18} weight={state === "active" ? "fill" : "duotone"} />;
}

export function LessonProgressPanel({ activeStepIndex, rewardXp, safetyTip, steps, totalXp }) {
  return (
    <aside className="lesson-side-panel" aria-labelledby="lesson-side-panel-title">
      <section className="lesson-side-card lesson-side-card--progress">
        <h2 id="lesson-side-panel-title" className="lesson-side-panel__title">
          Các bước bài học
        </h2>
        <LessonProgress steps={steps} />
      </section>

      <section className="lesson-side-card" aria-labelledby="lesson-side-panel-lesson-title">
        <h3 id="lesson-side-panel-lesson-title">Bài học</h3>
        <ol className="lesson-side-card__list">
          {steps.map((step, index) => (
            <li className={`lesson-side-step lesson-side-step--${step.state}`} key={step.id}>
              <span className="lesson-side-step__index">{index + 1}</span>
              <StepListIcon icon={step.icon} state={step.state} />
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="lesson-side-card" aria-labelledby="lesson-side-panel-tip-title">
        <h3 id="lesson-side-panel-tip-title">Mẹo an toàn</h3>
        <div className="lesson-tip">
          <Lightbulb className="lesson-tip__icon" size={18} weight="fill" />
          <p>{safetyTip}</p>
        </div>
      </section>

      <section className="lesson-side-card" aria-labelledby="lesson-side-panel-reward-title">
        <h3 id="lesson-side-panel-reward-title">Phần thưởng</h3>
        <div className="lesson-reward-card">
          <div className="lesson-reward-card__xp">
            <Star size={18} weight="fill" />
            <strong>+{rewardXp} XP</strong>
          </div>
          <div className="lesson-reward-card__total">
            <Medal size={18} weight="fill" />
            <span>Tổng {totalXp} XP</span>
          </div>
          <p>{activeStepIndex > 0 ? "Con đã mở khóa bước tiếp theo." : "Xem hết video để nhận XP."}</p>
        </div>
      </section>
    </aside>
  );
}
