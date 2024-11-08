import { useEffect, useState } from "react";
import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import { PriceData } from "../../types";

type BoxTypes = {
  data: PriceData;
};

const TomorrowInfo = ({ data }: BoxTypes) => {
  const [percentChange, setPercentChange] = useState<string | null>(null);

  useEffect(() => {
    if (data.tomorrow.data_ok) {
      setPercentChange(
        (
          ((data.tomorrow.options.average - data.today.options.average) /
            Math.abs(data.today.options.average)) *
          100
        ).toFixed(2)
      );
    } else setPercentChange("ei tiedossa");
  }, [data]);

  return (
    <>
      {data.tomorrow.data_ok ? (
        <div className="col-row nospacing">
          <div className="col group full">
            <div className="single-box">
              <p className="title">keskihinnan muutos</p>
              <span
                className={`number${
                  percentChange !== "Ei tiedossa" &&
                  percentChange !== null &&
                  Number(percentChange) > 0
                    ? " red"
                    : " green"
                }${
                  percentChange !== null &&
                  (Number(percentChange) >= 5000 ||
                    Number(percentChange) <= -5000)
                    ? " shake"
                    : ""
                }`}
              >
                {percentChange !== null ? Number(percentChange) > 0 && "+" : ""}
                {percentChange}%
              </span>
            </div>
            <div className="single-box">
              <p className="title">Huomisen keskihinta</p>
              <span
                className="number"
                style={{
                  color: `${colorizePrice(data.tomorrow.options.average)}`,
                }}
              >
                {convertNumber(data.tomorrow.options.average)} <p>c/kWh</p>
              </span>
            </div>
            <div className="single-box">
              <p className="title">
                Huomisen alin{" "}
                {
                  <span className="number title-time">
                    {data.tomorrow.options.lowest.date.split(" ")[1]}
                  </span>
                }
              </p>
              <span
                className="number"
                style={{
                  color: `${colorizePrice(data.tomorrow.options.lowest.price)}`,
                }}
              >
                {convertNumber(data.tomorrow.options.lowest.price)} <p>c/kWh</p>
              </span>
            </div>
            <div className="single-box">
              <p className="title">
                Huomisen ylin{" "}
                {
                  <span className="number title-time">
                    {data.tomorrow.options.highest.date.split(" ")[1]}
                  </span>
                }
              </p>
              <span
                className="number"
                style={{
                  color: `${colorizePrice(
                    data.tomorrow.options.highest.price
                  )}`,
                }}
              >
                {convertNumber(data.tomorrow.options.highest.price)}{" "}
                <p>c/kWh</p>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="single-box">
          <p className="title">Huomisen tietoja ei ole vielä saatavilla</p>
          <span className="number time">Tiedot päivittyvät noin klo 14:00</span>
        </div>
      )}
    </>
  );
};

export default TomorrowInfo;
