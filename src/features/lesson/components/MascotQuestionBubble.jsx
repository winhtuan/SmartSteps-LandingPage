import { ChatCircleText, Sparkle } from "@phosphor-icons/react";
import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";

export function MascotQuestionBubble({ prompt }) {
  return (
    <div className="lesson-question">
      <img className="lesson-question__mascot" src={mascotSpeaking} alt="SmartSteps cat" />
      <div className="lesson-question__bubble">
        <span className="lesson-question__bubble-icon" aria-hidden="true">
          <ChatCircleText size={22} weight="fill" />
        </span>
        <p>
          <Sparkle aria-hidden="true" size={18} weight="fill" />
          <span>{prompt}</span>
          <Sparkle aria-hidden="true" size={18} weight="fill" />
        </p>
      </div>
    </div>
  );
}
