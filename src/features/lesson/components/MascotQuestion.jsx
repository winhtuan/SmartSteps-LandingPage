import mascotSpeaking from "../../../assets/images/mascot/mascot-cat-speaking.png";

export function MascotQuestion({ prompt, compact = false }) {
  return (
    <div className={`lesson-question${compact ? " lesson-question--compact" : ""}`}>
      <img className="lesson-question__mascot" src={mascotSpeaking} alt="SmartSteps cat" />
      <div className="lesson-question__bubble">
        <p>{prompt}</p>
      </div>
    </div>
  );
}
