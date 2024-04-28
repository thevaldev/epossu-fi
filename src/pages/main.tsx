import {
  faCalendarDay,
  faChartArea,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { PriceData } from "../types";
import Chart from "../elements/Chart";
import { colorMap, colorizePrice } from "../components/Colorizer";
import "../css/pages/Main.scss";
import Header from "../elements/Header";
import CurrentPrice from "../elements/PriceBoxes/CurrentPrice";
import NextPrice from "../elements/PriceBoxes/NextPrice";
import GeneralInfo from "../elements/PriceBoxes/GeneralInfo";
import TomorrowInfo from "../elements/PriceBoxes/TomorrowsInfo";

interface MainProps {
  data: PriceData | undefined;
}

const Main = ({ data }: MainProps) => {
  document.title = "Pörssisähkön ajankohtaiset hinnat - epossu.fi";

  const [error, setError] = useState<number | string>(0); // Error message

  useEffect(() => {
    if (data === undefined || data == null) {
      setError("Tietoja ei voitu ladata virheen vuoksi.");
    }
  }, [data]);

  return (
    <>
      <Header />
      <h1 className="title">Pörssisähkön tiedot</h1>
      <p className="description">
        Täältä näet ajankohtaisen pörssisähkön hinnan. Sivun tiedot päivittyvät
        automaattisesti.
      </p>
      {error !== 0 && (
        <div className="alert warning">
          <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
          <p>{error}</p>
        </div>
      )}
      {data !== undefined && (
        <>
          <section className="col-row header">
            {data !== undefined ? (
              <>
                <div className="col group half">
                  <CurrentPrice data={data} size={"half"} />
                  <NextPrice data={data} size={"half"} />
                </div>
                <div className="col group third">
                  <GeneralInfo data={data} type="average" size={"third"} />
                  <GeneralInfo data={data} type="lowest" size={"third"} />
                  <GeneralInfo data={data} type="highest" size={"third"} />
                </div>
              </>
            ) : (
              <>
                <div className="col group">
                  <div className="single-box" />
                  <div className="single-box" />
                </div>
                <div className="col group">
                  <div className="single-box" />
                  <div className="single-box" />
                  <div className="single-box" />
                </div>
              </>
            )}
          </section>

          <section className="col-row info">
            <h3>
              <FontAwesomeIcon icon={faCalendarDay} />
              Huomisen tiedot
            </h3>
            {data !== undefined ? (
              <TomorrowInfo data={data} />
            ) : (
              <p className="error-notice">
                Tietoja ei voitu ladata virheen vuoksi.
              </p>
            )}
          </section>

          <section className="chart">
            <h3>
              <FontAwesomeIcon icon={faChartArea}></FontAwesomeIcon>
              Pörssisähkön hinnat taulukolla
            </h3>
            {data !== undefined ? (
              <Chart data={data.chart} hasTomorrows={data.tomorrow.data_ok} />
            ) : (
              <p className="error-notice">
                Kuvaaja ei voitu ladata virheen vuoksi.
              </p>
            )}
          </section>

          <section className="box">
            <div className="colors">
              <h2>Värien selitykset</h2>
              <p>Värit muuttuvat sähköhinnan mukaan.</p>
              <div className="color-container">
                {Object.keys(colorMap)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((key, index) => {
                    if (key.startsWith("-")) return null;
                    return (
                      <span
                        className="color"
                        style={{
                          backgroundColor: colorizePrice(parseInt(key)),
                        }}
                        key={index}
                      >
                        <p>{key}</p>
                      </span>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default Main;
