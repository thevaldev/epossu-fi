import { useEffect, useState } from "react";

import Timings from "../components/Timings";

interface types {
  type: "today" | "tomorrow";
}

export const Timer = ({ type }: types) => {
  const [time, setTime] = useState<string>();

  function setTimes(type: string) {
    if (type === "today") setTime(Timings.countdownToNextHour());
    if (type === "tomorrow") setTime(Timings.countdownToNextDay());
  }

  useEffect(() => {
    setTimes(type);

    const interval = setInterval(() => {
      setTimes(type);
    }, 1000);
    return () => clearInterval(interval);
  }, [type]);

  return <>{time}</>;
};
