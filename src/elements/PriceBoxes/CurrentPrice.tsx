import { useEffect, useRef, useState } from "react";
import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import Timings from "../../components/Timings";
import { PriceData, PriceJSON } from "../../types";

type BoxTypes = {
  data: PriceData;
};

const CurrentPrice = ({ data }: BoxTypes) => {
  const [currentHourPrice, setCurrentHourPrice] = useState<null | number>(null);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (data.data === null) return;

    function setNewPrice() {
      setCurrentHourPrice(
        Timings.getCurrentPrice(
          data.data.today,
          data.data.tomorrow as PriceJSON
        )
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
  }, [data.data]);

  return (
    <div className="single-box">
      <p className="title">Nykyinen tunti</p>
      <span
        className="number"
        style={{
          color: `${colorizePrice(currentHourPrice)}`,
        }}
      >
        {convertNumber(currentHourPrice)} <p>snt/kWh</p>
      </span>
    </div>
  );
};

export default CurrentPrice;
