import {
  faCalendarDay,
  faChartArea,
  faCode,
  faExclamationCircle,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { AlertsJSON, ErrorProps, PriceData } from "../types";
import Chart from "../elements/Chart";
import { colorMap, colorizePrice } from "../components/Colorizer";
import "../css/pages/Main.scss";
import CurrentPrice from "../elements/PriceBoxes/CurrentPrice";
import NextPrice from "../elements/PriceBoxes/NextPrice";
import GeneralInfo from "../elements/PriceBoxes/GeneralInfo";
import TomorrowInfo from "../elements/PriceBoxes/TomorrowsInfo";
import { setMeta } from "../components/Utils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MainProps {
  marketData: PriceData;
  alerts: AlertsJSON;
  error: undefined | ErrorProps;
}

const Main = ({ marketData, alerts, error }: MainProps) => {
  setMeta(
    "Pörssisähkön hinnat Suomessa",
    "Pörssisähkön ajankohtaiset hinnat tunneittain. Seuraa sähkönhintoja tuntikohtaisesti kuvaajalta ja hyödynnä edullisimmat tunnit."
  );

  const setAlerts = (newAlerts: AlertsJSON) => {
    alerts = newAlerts;
  };

  return (
    <>
      <h1 className="title">Pörssisähkön tiedot</h1>
      <p className="description">
        Tästä näet pörssisähkön hinnan nyt ja huomenna. Sivun tiedot päivittyvät
        automaattisesti.
      </p>

      {error !== undefined && (
        <div className={`alert ${error.isCritical ? "critical" : "warning"}`}>
          <FontAwesomeIcon icon={faInfoCircle as IconProp}></FontAwesomeIcon>
          <p>{error.message}</p>
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
                  <FontAwesomeIcon
                    icon={faExclamationCircle as IconProp}
                  ></FontAwesomeIcon>
                ) : alert.type === "code" ? (
                  <FontAwesomeIcon icon={faCode as IconProp}></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    icon={faInfoCircle as IconProp}
                  ></FontAwesomeIcon>
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
              <FontAwesomeIcon icon={faCalendarDay as IconProp} />
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
              <FontAwesomeIcon icon={faChartArea as IconProp}></FontAwesomeIcon>
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
              <h3>
                <FontAwesomeIcon icon={faPalette as IconProp} />
                Värien selitykset
              </h3>
              <p>Värit muuttuvat sähköhinnan mukaan.</p>
              <div className="color-container">
                {Object.keys(colorMap)
                  .sort((a, b) => parseInt(a) - parseInt(b))
                  .map((key, index) => {
                    if (key.startsWith("-")) return null;
                    return (
                      <div className="color-wrap" key={index}>
                        <span
                          className="color"
                          style={{
                            backgroundColor: colorizePrice(parseInt(key)),
                          }}
                        ></span>
                        <p>{key}</p>
                      </div>
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
