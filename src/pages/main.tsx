import {
  faCalendarDay,
  faChartArea,
  faCode,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { AlertsJSON, PriceData } from "../types";
import Chart from "../elements/Chart";
import { colorMap, colorizePrice } from "../components/Colorizer";
import "../css/pages/Main.scss";
import Header from "../elements/Header";
import CurrentPrice from "../elements/PriceBoxes/CurrentPrice";
import NextPrice from "../elements/PriceBoxes/NextPrice";
import GeneralInfo from "../elements/PriceBoxes/GeneralInfo";
import TomorrowInfo from "../elements/PriceBoxes/TomorrowsInfo";
import Footer from "../elements/Footer";
import { setMeta } from "../components/Utils";

interface MainProps {
  data: PriceData | undefined;
  isReady: boolean;
}

const Main = ({ data, isReady }: MainProps) => {
  setMeta(
    "Pörssisähkön ajankohtaiset hinnat - epossu.fi",
    "Pörssisähkön hinnat tunneittain. Seuraa sähkönhintoja tuntikohtaisesti kuvaajalta ja hyödynnä edullisimmat tunnit."
  );

  const [error, setError] = useState<number | string>(0); // Error message
  const [alerts, setAlerts] = useState<undefined | AlertsJSON>(); // Alert message
  const [marketData, setMarketData] = useState<undefined | PriceData>(); // Market data
  const [displayLoading, setDisplayLoading] = useState<boolean>(false); // Display loading spinner

  useEffect(() => {
    if (data === undefined && isReady) {
      setError(
        "Tietoja ei saatu ladattua virheen vuoksi, yritä ladata sivu uudelleen. Mikäli virhe toistuu, ota yhteyttä ylläpitoon."
      );
    } else setError(0);

    const timer = setTimeout(() => {
      if (!isReady && data === undefined && !displayLoading) {
        setDisplayLoading(true);
      }
    }, 100);

    async function fetchAlerts() {
      const response = await fetch("https://api.epossu.fi/v2/alerts");
      const alertsData = await response.json();
      if (alertsData.alerts.length > 0) {
        const dismissed = localStorage.getItem("dismissed-alerts");
        const newAlerts: AlertsJSON = {};
        for (const alert of alertsData.alerts) {
          if (
            dismissed === null ||
            !dismissed.includes(alert.id) ||
            !alert.canBeDismissed
          ) {
            newAlerts[alert.id] = alert;
          }
        }

        // sorting alerts by type
        const sortedAlerts: AlertsJSON = {};
        const types = ["critical", "error", "warning", "info", "code"];
        for (const type of types) {
          for (const key in newAlerts) {
            if (newAlerts[key as keyof typeof newAlerts].type === type) {
              sortedAlerts[key as keyof typeof newAlerts] =
                newAlerts[key as keyof typeof newAlerts];
            }
          }
        }

        setAlerts(sortedAlerts);
      }
    }

    if (isReady) {
      fetchAlerts();
      setMarketData(data);
    }

    return () => clearTimeout(timer);
  }, [data, isReady, displayLoading]);

  return (
    <>
      <Header />
      <h1 className="title">Pörssisähkön tiedot</h1>
      <p className="description">
        Täältä näet ajankohtaisen pörssisähkön hinnan. Sivun tiedot päivittyvät
        automaattisesti.
      </p>

      {displayLoading && !isReady && (
        <div className="alert info">
          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
          <p>Ladataan tietoja...</p>
        </div>
      )}

      {error !== 0 && (
        <div className="alert warning">
          <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
          <p>{error}</p>
        </div>
      )}

      {alerts !== undefined &&
        Object.keys(alerts).map((key, index) => {
          const alert = alerts[key as keyof typeof alerts];
          return (
            <div className={`alert with-button ${alert.type}`} key={index}>
              <p>
                {alert.type === "error" ||
                alert.type === "critical" ||
                alert.type === "warning" ? (
                  <FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>
                ) : alert.type === "code" ? (
                  <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                )}
                {alert.message}
              </p>

              {alert.canBeDismissed && (
                <button
                  className="close"
                  onClick={() => {
                    const dismissed = localStorage.getItem("dismissed-alerts");
                    if (dismissed === null) {
                      localStorage.setItem("dismissed-alerts", key);
                    } else {
                      localStorage.setItem(
                        "dismissed-alerts",
                        `${dismissed},${key}`
                      );
                    }

                    const newAlerts = { ...alerts };
                    delete newAlerts[key as keyof typeof alerts];
                    setAlerts(newAlerts);
                  }}
                >
                  Sulje
                </button>
              )}
            </div>
          );
        })}

      {marketData !== undefined && (
        <>
          <section className="col-row header">
            {marketData !== undefined ? (
              <>
                <div className="col group half">
                  <CurrentPrice data={marketData} size={"half"} />
                  <NextPrice data={marketData} size={"half"} />
                </div>
                <div className="col group third">
                  <GeneralInfo
                    data={marketData}
                    type="average"
                    size={"third"}
                  />
                  <GeneralInfo data={marketData} type="lowest" size={"third"} />
                  <GeneralInfo
                    data={marketData}
                    type="highest"
                    size={"third"}
                  />
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
            <h2 className="title">
              <FontAwesomeIcon icon={faCalendarDay} />
              Huomisen tiedot
            </h2>
            {marketData !== undefined ? (
              <TomorrowInfo data={marketData} />
            ) : (
              <p className="error-notice">
                Tietoja ei voitu ladata virheen vuoksi.
              </p>
            )}
          </section>

          <section className="chart">
            <h3 className="title">
              <FontAwesomeIcon icon={faChartArea}></FontAwesomeIcon>
              Pörssisähkön hinnat taulukolla
            </h3>
            {marketData !== undefined ? (
              <Chart
                data={marketData.chart}
                hasTomorrows={marketData.tomorrow.data_ok}
              />
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
          <Footer />
        </>
      )}
    </>
  );
};
export default Main;
