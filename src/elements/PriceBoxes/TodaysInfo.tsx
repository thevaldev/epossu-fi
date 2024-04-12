import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import Timings from "../../components/Timings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { PriceData } from "../../types";

type BoxTypes = {
  data: PriceData;
};

const TodaysInfo = ({ data }: BoxTypes) => {
  return (
    <>
      <div className="box">
        <p className="title">Keskihinta</p>
        <span
          className="number"
          style={{
            color: `${colorizePrice(data.data.today.options.average)}`,
          }}
        >
          {convertNumber(data.data.today.options.average)} <p>snt/kWh</p>
        </span>
      </div>
      <div className="box">
        <p className="title">
          {Timings.hastimePassed(data.data.today.options.highest.date) ? (
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
            color: `${colorizePrice(data.data.today.options.highest.price)}`,
          }}
        >
          {convertNumber(data.data.today.options.highest.price)} <p>snt/kWh</p>
        </span>
        <span className="number time">
          {data.data.today.options.highest.date}
        </span>
      </div>
      <div className="box">
        <p className="title">
          {Timings.hastimePassed(data.data.today.options.highest.date) ? (
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
            color: `${colorizePrice(data.data.today.options.lowest.price)}`,
          }}
        >
          {convertNumber(data.data.today.options.lowest.price)} <p>snt/kWh</p>
        </span>
        <span className="number time">
          {data.data.today.options.lowest.date}
        </span>
      </div>
    </>
  );
};

export default TodaysInfo;
