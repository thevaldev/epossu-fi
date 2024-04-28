import { useEffect, useRef, useState } from "react";
import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import Timings from "../../components/Timings";
import { PriceData, PriceJSON } from "../../types";

type BoxTypes = {
  data: PriceData;
  size?: string;
};

const NextPrice = ({ data, size }: BoxTypes) => {
  const [nextHourPrice, setNextHourPrice] = useState<null | number>(null);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  if (size == undefined) size = "";

  useEffect(() => {
    if (data === null) return;

    function setNewPrice() {
      setNextHourPrice(
        Timings.getNextPrice(data.today, data.tomorrow as PriceJSON)
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
      <p className="title">Seuraava hinta</p>
      <span
        className="number"
        style={{
          color: `${colorizePrice(nextHourPrice)}`,
        }}
      >
        {convertNumber(nextHourPrice)} <p>c/kWh</p>
      </span>
    </div>
  );
};

export default NextPrice;
