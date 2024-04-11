import {
  faCalendarDay,
  faChartArea,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { PriceData } from "../types";
import Chart from "../elements/Chart";
import Timings from "../components/Timings";
import { colorMap, colorizePrice } from "../components/Colorizer";
import "../css/pages/Main.scss";
import Header from "../elements/Header";
import CurrentPrice from "../elements/PriceBoxes/CurrentPrice";
import NextPrice from "../elements/PriceBoxes/NextPrice";
import GeneralInfo from "../elements/PriceBoxes/GeneralInfo";
import TomorrowInfo from "../elements/PriceBoxes/TomorrowsInfo";

const Main = () => {
  document.title = "Pörssisähkön ajankohtaiset hinnat - epossu.fi";

  const [error, setError] = useState<number | string>(0); // Error message
  const [data, setData] = useState<PriceData | undefined>(undefined); // Price data
  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null); // Timeout for fetching new data
  const dateChangeHandle = useRef<null | ReturnType<typeof setTimeout>>(null); // Interval for checking if the date has changed
  const [dataRequiresUpdate, setDataRequiresUpdate] = useState<null | boolean>(
    null
  ); // If the data requires an update

  useEffect(() => {
    // if we don't have data, fetching it and setting the current days number
    if (data == null) {
      getNewData();
      Timings.day_mumber = new Date().getDate();
    }

    // function for fetching new data
    async function getNewData() {
      fetch("https://api.epossu.fi/v2/_marketData")
        .then((response) => response.json())
        .then((data) => {
          // if the data is null, we set an error
          if (data === null) {
            throw new Error(
              "Palvelussa tapahtui virhe. Yritä myöhemmin uudelleen."
            );
          } else {
            // if the data for tomorrow is not ok, we set the dataRequiresUpdate to true and schedule a new data fetch
            if (data.tomorrow.data_ok === false) {
              setDataRequiresUpdate(true);
              scheduleNewDataFetch();
            } else {
              setDataRequiresUpdate(false);
              scheduleNewDataFetch(true);
            }

            // setting the data and error to null
            setData(data);
            setError(0);
          }
        })
        .catch((error) => {
          setError(error.message);
          setData(undefined);
        });
    }

    function scheduleNewDataFetch(forceTomorrow: boolean = false) {
      if (timeout.current !== null) clearTimeout(timeout.current);

      // Set a timeout for fetching new data
      timeout.current = setTimeout(() => {
        getNewData();
      }, Timings.getNextDayPriceTime(forceTomorrow));
    }

    function handleDateChange() {
      if (dateChangeHandle.current !== null)
        clearTimeout(dateChangeHandle.current);

      if (Timings.day_mumber !== new Date().getDate()) {
        Timings.day_mumber = new Date().getDate();
        getNewData();
      }

      dateChangeHandle.current = setTimeout(() => {
        handleDateChange();
      }, Timings.getTimeLeftToDateChange());
    }

    if (dateChangeHandle.current === null && data !== null) {
      dateChangeHandle.current = setTimeout(() => {
        handleDateChange();
      }, 2000);
    }

    return () => {
      if (timeout.current !== null) clearTimeout(timeout.current);
      if (dateChangeHandle.current !== null)
        clearTimeout(dateChangeHandle.current);
    };
  }, [data, dataRequiresUpdate]);

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
      {data !== undefined ? (
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
      ) : (
        <div className="wrap">
          <div className="container">
            <section className="row center loading">
              <FontAwesomeIcon icon={faSpinner} spin size="10x" />
              <p className="loading-text">Tietoja ladataan...</p>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
export default Main;
