import {
  CheckCircle,
  Circle,
  Medal,
  Star,
} from "@phosphor-icons/react";

function getStepIcon(step, state) {
  if (step.icon === "reward") {
    return <Medal size={20} weight={state === "active" || state === "complete" ? "fill" : "duotone"} />;
  }

  if (state === "complete") {
    return <CheckCircle size={20} weight="fill" />;
  }

  if (state === "active") {
    return <Star size={20} weight="fill" />;
  }

  return <Circle size={20} weight="fill" />;
}

export function LessonProgress({ steps }) {
  return (
    <div
      className={`lesson-progress lesson-progress--count-${steps.length}`}
      aria-label="Tiến trình bài học"
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => (
        <div className="lesson-progress__item" key={step.id}>
          <div
            className={`lesson-progress__node lesson-progress__node--${step.state}`}
            aria-current={step.state === "active" ? "step" : undefined}
          >
            {getStepIcon(step, step.state)}
          </div>
          <span className="lesson-progress__label">{step.shortLabel}</span>
          {index < steps.length - 1 ? (
            <span
              className={`lesson-progress__line lesson-progress__line--${
                step.state === "complete" ? "complete" : "upcoming"
              }`}
              aria-hidden="true"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
