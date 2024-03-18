import { useEffect, useState } from "react";
import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import Timings from "../../components/Timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { PriceData } from "../../types";

type BoxTypes = {
  data: PriceData;
};

const TomorrowInfo = ({ data }: BoxTypes) => {
  const [percentChange, setPercentChange] = useState<string | null>(null);

  useEffect(() => {
    if (data.data.tomorrow.data_ok) {
      setPercentChange(
        (
          ((data.data.tomorrow.options.average -
            data.data.today.options.average) /
            data.data.today.options.average) *
          100
        ).toFixed(2)
      );
    } else setPercentChange("ei tiedossa");
  }, [data]);

  return (
    <>
      {data.data.tomorrow.data_ok ? (
        <>
          <div className="box">
            <p className="title">Keskihinta</p>
            <span
              className="number"
              style={{
                color: `${colorizePrice(data.data.tomorrow.options.average)}`,
              }}
            >
              {convertNumber(data.data.tomorrow.options.average)} <p>snt/kWh</p>
            </span>
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
              {percentChange !== null ? Number(percentChange) > 0 && "+" : ""}
              {percentChange}%
            </span>
          </div>
          <div className="box">
            <p className="title">
              {Timings.hastimePassed(
                data.data.tomorrow.options.highest.date
              ) ? (
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
                color: `${colorizePrice(
                  data.data.tomorrow.options.highest.price
                )}`,
              }}
            >
              {convertNumber(data.data.tomorrow.options.highest.price)}{" "}
              <p>snt/kWh</p>
            </span>
            <span className="number time">
              {data.data.tomorrow.options.highest.date}
            </span>
          </div>
          <div className="box">
            <p className="title">
              {Timings.hastimePassed(
                data.data.tomorrow.options.highest.date
              ) ? (
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
                color: `${colorizePrice(
                  data.data.tomorrow.options.lowest.price
                )}`,
              }}
            >
              {convertNumber(data.data.tomorrow.options.lowest.price)}{" "}
              <p>snt/kWh</p>
            </span>
            <span className="number time">
              {data.data.tomorrow.options.lowest.date}
            </span>
          </div>
        </>
      ) : (
        <div className="box full">
          <p className="title">Huomisen tietoja ei ole vielä saatavilla</p>
          <span className="number time">
            Hinnat tulevat näkyville noin klo 14:00
          </span>
        </div>
      )}
    </>
  );
};

export default TomorrowInfo;
