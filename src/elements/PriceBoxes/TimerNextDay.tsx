import { Timer } from "../Timer";

const TimerNextDay = () => {
  return (
    <div className="single-box">
      <p className="title">Huomisen hintoihin</p>
      <span className="number time">
        <Timer type="tomorrow" />
      </span>
    </div>
  );
};

export default TimerNextDay;
