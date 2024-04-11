import { colorizePrice } from "../../components/Colorizer";
import { convertNumber } from "../../components/Utils";
import { PriceData } from "../../types";

type BoxTypes = {
  data: PriceData;
  type: string;
  size?: string;
};

const GeneralInfo = ({ data, type, size }: BoxTypes) => {
  const value =
    type === "average"
      ? data.today.options.average
      : type === "lowest"
      ? data.today.options.lowest.price
      : data.today.options.highest.price;

  const title =
    type === "average"
      ? "Päivän Keskihinta"
      : type === "lowest"
      ? "Päivän ylin"
      : "Päivän alin";

  const time =
    type === "lowest"
      ? data.today.options.lowest.date.split(" ")[1]
      : type === "highest"
      ? data.today.options.highest.date.split(" ")[1]
      : null;

  return (
    <div className={`single-box ${size}`}>
      <p className="title">
        {title}{" "}
        {time !== null ? (
          <span className="number title-time">{time}</span>
        ) : null}
      </p>
      <span
        className="number"
        style={{
          color: `${colorizePrice(value)}`,
        }}
      >
        {convertNumber(value)} <p>c/kWh</p>
      </span>
    </div>
  );
};

export default GeneralInfo;
