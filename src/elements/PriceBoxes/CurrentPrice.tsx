import { useEffect, useRef, useState } from "react";
import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import Timings from "../../components/Timings";
import { PriceData, PriceJSON } from "../../types";

type BoxTypes = {
  data: PriceData;
  size?: string;
};

const CurrentPrice = ({ data, size }: BoxTypes) => {
  const [currentHourPrice, setCurrentHourPrice] = useState<null | number>(null);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  if (size == undefined) size = "";

  useEffect(() => {
    if (data === null) return;

    function setNewPrice() {
      setCurrentHourPrice(
        Timings.getCurrentPrice(data.today, data.tomorrow as PriceJSON)
      );
    }

    if (timer.current !== null) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setNewPrice();
    }, Timings.getTimeLeftToNextHour());
    setNewPrice();

    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [data]);

  return (
    <div className={`single-box ${size}`}>
      <p className="title">Hinta nyt</p>
      <span
        className="number"
        style={{
          color: `${colorizePrice(currentHourPrice)}`,
        }}
      >
        {convertNumber(currentHourPrice)} <p>c/kWh</p>
      </span>
    </div>
  );
};

export default CurrentPrice;
