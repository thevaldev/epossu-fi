import {
  faCalendarDay,
  faChartArea,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import PriceBoxes from "./elements/PriceBoxes";
import Footer from "./elements/Footer";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { PriceApiResponse, PriceData } from "./types";
import Graph from "./elements/Chart";
import logo from "./assets/possu.png";
import Timings from "./components/Timings";
import { colorMap } from "./components/Colorizer";

function App() {
  const [error, setError] = useState<number | string>(0); // Error message
  const [data, setData] = useState<PriceData>(null as unknown as PriceData); // Price data
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
      await fetch("https://epossu.fi/API/v1/prices")
        .then((response) => response.json())
        .then((data) => {
          if (data.success == false) {
            // error handling
            if (data.error !== undefined) setError(data.error);
            else {
              setError("Palvelussa tapahtui virhe. Yritä myöhemmin uudelleen.");
            }

            // setting the data to empty
            setData({} as PriceApiResponse);
            return;
          }

          // if the data is null, we set an error
          if (data === null) {
            setError("Palvelussa tapahtui virhe. Yritä myöhemmin uudelleen.");
          } else {
            // if the data for tomorrow is not ok, we set the dataRequiresUpdate to true and schedule a new data fetch
            if (data.data.tomorrow.data_ok === false) {
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
          // error handling
          setError(
            "Sähkötietojen hakeminen epäonnistui. Yritä myöhemmin uudelleen. (" +
              error.message +
              ")"
          );
          setData({} as PriceApiResponse);
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
    <div className="wrap">
      <div className="container">
        <div className="row">
          <header>
            <div className="logo-wrap">
              <img src={logo} alt="ePossu.fi" className="logo" />
              <h1>Sähköpossu</h1>
            </div>
          </header>

          {error !== 0 && (
            <div className="alert warning">
              <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
              <p>{error}</p>
            </div>
          )}

          {data !== null ? (
            <>
              <section className="col-row header">
                {data.data !== undefined && (
                  <PriceBoxes
                    priceData={data.data.today}
                    show_hourly_data={true}
                    fallbackData={data.data.tomorrow}
                    isTomorrow={false}
                  />
                )}
              </section>

              <section className="col-row">
                <div className="col">
                  <h3>
                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    Tämän päivän tiedot
                  </h3>
                  {data.data !== undefined && (
                    <PriceBoxes
                      priceData={data.data.today}
                      fallbackData={data.data.tomorrow}
                      isTomorrow={false}
                    />
                  )}
                </div>
                <div className="col">
                  <h3>
                    <FontAwesomeIcon icon={faCalendarDay} />
                    Huomisen tiedot
                  </h3>
                  {data.data !== undefined && (
                    <PriceBoxes
                      priceData={data.data.tomorrow}
                      fallbackData={data.data.today}
                      isTomorrow={true}
                    />
                  )}
                </div>
              </section>

              <section className="chart">
                <h3>
                  <FontAwesomeIcon icon={faChartArea}></FontAwesomeIcon>
                  Pörssisähkön hinnat taulukolla
                </h3>
                {data.data !== undefined && (
                  <Graph
                    data={data.data.chart}
                    hasTomorrows={data.data.tomorrow.data_ok}
                  />
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
                        const color = colorMap[key as keyof typeof colorMap];
                        if (key.startsWith("-")) return null;
                        return (
                          <span
                            className="color"
                            style={{ backgroundColor: color }}
                            key={index}
                          >
                            <p>{key}</p>
                          </span>
                        );
                      })}
                  </div>
                </div>
              </section>

              <Footer />
            </>
          ) : (
            <div className="wrap">
              <div className="container">
                <section className="row center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    size="10x"
                  ></FontAwesomeIcon>
                </section>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
