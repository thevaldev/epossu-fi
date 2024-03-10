import Timings from "../components/Timings";
import { colorizePrice } from "../components/Colorizer";
import { useEffect, useRef, useState } from "react";
import { PriceJSON } from "../types";
import { Timer } from "../elements/Timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass1, faHourglass3 } from "@fortawesome/free-solid-svg-icons";
import { convertNumber } from "../components/Utils.ts";

type Props = {
  priceData: PriceJSON;
  show_hourly_data?: boolean;
  fallbackData: PriceJSON;
  isTomorrow: boolean;
};

const PriceBoxes = ({
  priceData,
  show_hourly_data,
  fallbackData,
  isTomorrow,
}: Props) => {
  const [currentHourPrice, setCurrentHourPrice] = useState<null | number>(null); // Current hour price
  const [nextHourPrice, setNextHourPrice] = useState<null | number>(null); // Next hour price
  const timer = useRef<null | ReturnType<typeof setInterval>>(null); // Timer for updating the prices
  const [percentChange, setPercentChange] = useState<null | string>(null); // Percent change between the current and fallback data

  useEffect(() => {
    if (priceData.data_ok) {
      setCurrentHourPrice(Timings.getCurrentPrice(priceData, fallbackData));
      setNextHourPrice(Timings.getNextPrice(priceData, fallbackData));
    }

    if (show_hourly_data) {
      if (timer.current !== null) clearInterval(timer.current);

      // scheduling a new interval for updating the prices every hour
      timer.current = setInterval(() => {
        setCurrentHourPrice(Timings.getCurrentPrice(priceData, fallbackData));
        setNextHourPrice(Timings.getNextPrice(priceData, fallbackData));
      }, Timings.getTimeLeftToNextHour());
    }

    // If the data is ok, we calculate the percent change between the current and fallback data
    if (fallbackData.data_ok) {
      setPercentChange(
        (
          ((priceData.options.average - fallbackData.options.average) /
            fallbackData.options.average) *
          100
        ).toFixed(2)
      );
    } else setPercentChange("ei tiedossa");

    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [priceData, fallbackData, show_hourly_data]);

  return (
    <>
      {(priceData.data_ok && currentHourPrice !== null && (
        <>
          {show_hourly_data && (
            <>
              <div className="col header">
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
                <div className="single-box">
                  <p className="title">Seuraava tunti</p>
                  <span
                    className="number"
                    style={{
                      color: `${colorizePrice(nextHourPrice)}`,
                    }}
                  >
                    {convertNumber(nextHourPrice)} <p>snt/kWh</p>
                  </span>
                </div>
              </div>

              <div className="col header">
                <div className="single-box">
                  <p className="title">Seuraavaan hintaan</p>
                  <span className="number time">
                    <Timer type="today" />
                  </span>
                </div>
                <div className="single-box">
                  <p className="title">Huomisen hintoihin</p>
                  <span className="number time">
                    <Timer type="tomorrow" />
                  </span>
                </div>
              </div>
            </>
          )}

          {!show_hourly_data && (
            <>
              <div className="box">
                <p className="title">Keskihinta</p>
                <span
                  className="number"
                  style={{
                    color: `${colorizePrice(priceData.options.average)}`,
                  }}
                >
                  {convertNumber(priceData.options.average)} <p>snt/kWh</p>
                </span>
                {isTomorrow === true && (
                  <span
                    className={`number percent${
                      percentChange !== "Ei tiedossa" &&
                      percentChange !== null &&
                      Number(percentChange) > 0
                        ? " red"
                        : " green"
                    }`}
                  >
                    Muutos:{" "}
                    {percentChange !== null
                      ? Number(percentChange) > 0 && "+"
                      : ""}
                    {percentChange}%
                  </span>
                )}
              </div>
              <div className="box">
                <p className="title">
                  {Timings.hastimePassed(priceData.options.highest.date) ? (
                    <FontAwesomeIcon
                      icon={faHourglass3}
                      title="Tämä ajankohta on jo mennyt."
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHourglass1}
                      title="Tämä ajankohta ei ole vielä tapahtunut."
                    />
                  )}
                  Kallein tunti
                </p>
                <span
                  className="number"
                  style={{
                    color: `${colorizePrice(priceData.options.highest.price)}`,
                  }}
                >
                  {convertNumber(priceData.options.highest.price)}{" "}
                  <p>snt/kWh</p>
                </span>
                <span className="number time">
                  {priceData.options.highest.date}
                </span>
              </div>
              <div className="box">
                <p className="title">
                  {Timings.hastimePassed(priceData.options.highest.date) ? (
                    <FontAwesomeIcon
                      icon={faHourglass3}
                      title="Tämä ajankohta on jo mennyt."
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHourglass1}
                      title="Tämä ajankohta ei ole vielä tapahtunut."
                    />
                  )}
                  Halvin tunti
                </p>
                <span
                  className="number"
                  style={{
                    color: `${colorizePrice(priceData.options.lowest.price)}`,
                  }}
                >
                  {convertNumber(priceData.options.lowest.price)} <p>snt/kWh</p>
                </span>
                <span className="number time">
                  {priceData.options.lowest.date}
                </span>
              </div>
            </>
          )}
        </>
      )) || (
        <div className="box full">
          <p className="title">Huomisen tietoja ei ole vielä saatavilla</p>
          <span className="number time">
            Hinnat tulevat näkyviin noin klo 14:00
          </span>
        </div>
      )}
    </>
  );
};

export default PriceBoxes;
