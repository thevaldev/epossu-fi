import {
  faCalendarDay,
  faChartArea,
  faShareAlt,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import PriceBox from "../elements/PriceBoxes";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { PriceApiResponse, PriceData } from "../types";
import Chart from "../elements/Chart";
import Timings from "../components/Timings";
import { colorMap } from "../components/Colorizer";
import "../css/style.scss";
import { useParams } from "react-router-dom";
import SceneBuilder from "../components/SceneBuilder";

const Main = () => {
  document.title = "epossu.fi | Pörssisähkön ajankohtaiset hinnat Suomessa";

  const [error, setError] = useState<number | string>(0); // Error message
  const [data, setData] = useState<PriceData>(null as unknown as PriceData); // Price data
  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null); // Timeout for fetching new data
  const dateChangeHandle = useRef<null | ReturnType<typeof setTimeout>>(null); // Interval for checking if the date has changed
  const [dataRequiresUpdate, setDataRequiresUpdate] = useState<null | boolean>(
    null
  ); // If the data requires an update
  const sceneID = useParams();

  function copyLink() {
    navigator.clipboard.writeText(
      window.location.origin + "/nakyma/" + sceneID.sceneID
    );
    alert("Linkki kopioitu leikepöydälle!");
  }

  useEffect(() => {
    // if we don't have data, fetching it and setting the current days number
    if (data == null) {
      getNewData();
      Timings.day_mumber = new Date().getDate();
    }

    // function for fetching new data
    async function getNewData() {
      await fetch("https://api.epossu.fi/v2/marketData")
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
    <>
      {sceneID.sceneID !== undefined &&
      sceneID.sceneID.includes("build_scene") ? (
        <>
          <h1 className="title with-label">
            Rakenna näkymä <label>BETA</label>
          </h1>
          <p className="title2">
            Luo oma näkymäsi pörssisähkön tiedoista, voit valita mitä tietoja
            näytetään. <br />
            Tämä on beta-versio, joten kaikki ominaisuudet eivät ole vielä
            käytössä ja ominaisuudet voivat muuttua.
          </p>
        </>
      ) : (
        <h1 className="title">Pörssisähkön tiedot</h1>
      )}
      {error !== 0 && (
        <div className="alert warning">
          <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
          <p>{error}</p>
        </div>
      )}

      {data !== null ? (
        sceneID.sceneID !== undefined ? (
          <>
            <SceneBuilder sceneID={sceneID.sceneID as string} data={data} />

            {!sceneID.sceneID.includes("build_scene") && (
              <div className="box scene">
                <h2>
                  <FontAwesomeIcon icon={faShareAlt} />
                  Näkymän jako-linkki
                </h2>
                <pre>
                  {window.location.origin + "/nakyma/" + sceneID.sceneID}
                </pre>
                <button onClick={copyLink}>Kopioi linkki</button>
              </div>
            )}
          </>
        ) : (
          <>
            <section className="col-row header">
              {data.data !== undefined && (
                <>
                  <div className="col header">
                    <PriceBox type="current_price" data={data} />
                    <PriceBox type="next_price" data={data} />
                  </div>
                  <div className="col header">
                    <PriceBox type="timer_next" />
                    <PriceBox type="timer_tomorrow" />
                  </div>
                </>
              )}
            </section>

            <section className="col-row">
              <div className="col">
                <h3>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                  Tämän päivän tiedot
                </h3>
                {data.data !== undefined && (
                  <PriceBox type="today_info" data={data} />
                )}
              </div>
              <div className="col">
                <h3>
                  <FontAwesomeIcon icon={faCalendarDay} />
                  Huomisen tiedot
                </h3>
                {data.data !== undefined && (
                  <PriceBox type="tomorrow_info" data={data} />
                )}
              </div>
            </section>

            <section className="chart">
              <h3>
                <FontAwesomeIcon icon={faChartArea}></FontAwesomeIcon>
                Pörssisähkön hinnat taulukolla
              </h3>
              {data.data !== undefined && (
                <Chart
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
          </>
        )
      ) : (
        <div className="wrap">
          <div className="container">
            <section className="row center loading">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="10x"
              ></FontAwesomeIcon>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
export default Main;
