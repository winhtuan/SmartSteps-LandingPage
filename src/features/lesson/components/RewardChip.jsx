import { Lightning, Medal, TrendUp } from "@phosphor-icons/react";

export function RewardChip({ gainedXp, highlight, level, progressPercent }) {
  return (
    <div className={`lesson-reward-chip${highlight ? " lesson-reward-chip--highlight" : ""}`}>
      <div className="lesson-reward-chip__badge">
        <Medal size={18} weight="fill" />
        <span>{level}</span>
      </div>
      <div className="lesson-reward-chip__meta">
        <div className="lesson-reward-chip__headline">
          <Lightning size={16} weight="fill" />
          <strong>{gainedXp > 0 ? `+${gainedXp} XP` : "Sẵn sàng"}</strong>
        </div>
        <div className="lesson-reward-chip__progress">
          <TrendUp size={14} weight="bold" />
          <span>{progressPercent}%</span>
        </div>
      </div>
    </div>
  );
}
