import { Timer } from "../Timer";

const TimerNextHour = () => {
  return (
    <div className="single-box">
      <p className="title">Seuraavaan hintaan</p>
      <span className="number time">
        <Timer type="today" />
      </span>
    </div>
  );
};

export default TimerNextHour;
