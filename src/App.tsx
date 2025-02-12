import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import { useState, useEffect } from "react";
import Timings from "./components/Timings";
import Themes from "./components/Themes";
import {
  AlertsJSON,
  ErrorProps,
  ModalHandlerProps,
  ModuleData,
  PriceData,
} from "./types";
import Settings from "./pages/Settings";
import Footer from "./elements/Footer";
import Header from "./elements/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ModalHandler from "./elements/ModalHandler";
import NotificationsHandle from "./components/NotificationsHandle";

function App() {
  const [priceData, setPriceData] = useState<PriceData | undefined>(undefined); // Price data
  const [alertData, setAlerts] = useState<AlertsJSON>({}); // Alert data
  const [moduleData, setModuleData] = useState<ModuleData | undefined>(
    undefined
  ); // Module data

  const [DataReadyState, setDataReadyState] = useState<boolean>(false);
  const [hasTomorrowData, setHasTomorrowData] = useState<boolean>(false);
  const [APIError, setAPIError] = useState<undefined | ErrorProps>(undefined);

  const [displayLoading, setDisplayLoading] = useState<boolean>(false); // Display loading spinner
  const [modalHandler, setModalHandler] = useState<
    undefined | ModalHandlerProps
  >();

  useEffect(() => {
    Themes.initTheme();

    //init priceData
    if (priceData == null) {
      Timings.day_mumber = new Date().getDate();
      fetchNewData();
    }

    async function fetchNewData() {
      // Display loading spinner if data is not ready
      const timer = setTimeout(() => {
        if (!DataReadyState && priceData === undefined && !displayLoading) {
          setDisplayLoading(true);
        }
      }, 500);

      if (
        (localStorage.getItem("subscriptionId") !== null ||
          localStorage.getItem("subscriptionId") !== undefined) &&
        NotificationsHandle.checkForSW() == null
      ) {
        localStorage.removeItem("subscriptionId");
      }

      fetch(
        "https://api.epossu.fi/v2/production?subscriptionId=" +
          localStorage.getItem("subscriptionId")
      )
        .then((response) => response.json())
        .then((response) => {
          // Handling the possible server error
          if (response == null || response == undefined) {
            setDataReadyState(true);
            setPriceData(undefined);
            setModuleData(undefined);
            setAPIError({
              message:
                "Palvelin ei palauttanut hintoja, päivitä sivu ja yritä uudelleen. Jos ongelma jatkuu, ota yhteyttä ylläpitoon. (E1)",
              isCritical: true,
            });
            return;
          }

          // setting tomorrows data status
          setHasTomorrowData(response.data.marketData.tomorrow.data_ok);

          // setting the data
          setPriceData(response.data.marketData);

          // setting the module data
          setModuleData(response.data.modules);

          // setting alerts
          if (response.data.alerts.length > 0) {
            const dismissed = localStorage.getItem("dismissed-alerts");
            const newAlerts: AlertsJSON = {};
            for (const alert of response.data.alerts) {
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

          // setting the data ready state
          setDataReadyState(true);
        })
        .catch(() => {
          setDataReadyState(true);
          setPriceData(undefined);
          setAPIError({
            message:
              "Palvelin ei palauttanut hintoja, päivitä sivu ja yritä uudelleen. Jos ongelma jatkuu, ota yhteyttä ylläpitoon. (E2)",
            isCritical: true,
          });
        });

      return () => clearTimeout(timer);
    }

    // function for handling date changes and fetching new data
    function intervalPing() {
      // if is time for new data
      if (!hasTomorrowData && Timings.isTimeForTomorrowsData()) {
        setDataReadyState(false);
        fetchNewData();
      }

      // if the date has changed, fetch new data
      if (Timings.day_mumber !== new Date().getDate()) {
        Timings.day_mumber = new Date().getDate();
        setDataReadyState(false);
        fetchNewData();
      }
    }

    // setting the ping interval for fetching new data
    const interval = setInterval(() => {
      intervalPing();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [priceData, DataReadyState, hasTomorrowData, displayLoading]);

  return (
    <Router>
      <div className="wrap">
        <div className="container">
          {modalHandler !== undefined && (
            <ModalHandler
              title={modalHandler.title}
              jsx={modalHandler.jsx}
              icon={modalHandler.icon}
              closeText={modalHandler.closeText}
              onClose={() => {
                setModalHandler(undefined);
              }}
              action={modalHandler.action}
              disableOutsideClick={modalHandler.disableOutsideClick}
            />
          )}
          <div className="row">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  priceData !== undefined ? (
                    <Main
                      marketData={priceData}
                      alerts={alertData}
                      error={APIError}
                    />
                  ) : (
                    <>
                      <h1 className="title">Pörssisähkön tiedot</h1>
                      <p className="description">
                        Tästä näet pörssisähkön hinnan nyt ja huomenna. Sivun
                        tiedot päivittyvät automaattisesti.
                      </p>

                      {displayLoading && (
                        <div className="alert info">
                          <FontAwesomeIcon
                            icon={faSpinner as IconProp}
                            spin
                            size="10x"
                          />
                          <p>Ladataan hintatietoja...</p>
                        </div>
                      )}
                    </>
                  )
                }
              />
              <Route path="/tietoa" element={<About />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route
                path="/ilmoitukset"
                element={
                  moduleData !== undefined ? (
                    <Notifications
                      moduleData={moduleData}
                      modalCallback={setModalHandler}
                    />
                  ) : (
                    <section className="page notifications">
                      <h1 className="title with-label">Ilmoitukset</h1>
                      <p className="lead">
                        Tältä sivulta voit tilata ilmoitukset laitteellesi
                        valitsemillasi ehdoilla ja haluamallasi sisällöllä.
                        <br />
                        Ilmoitukset ovat <strong>maksuttomia</strong> ja saat ne
                        välittömästi kun valitut ehdot tai aikaikkuna täyttyvät.
                        <br />
                        <br />
                        <strong>
                          Lupaamme ettemme lähetä sinulle turhia ilmoituksia,
                          saat pelkästään ne ilmoitukset jotka olet tilannut.
                        </strong>
                        {displayLoading && (
                          <div className="alert info">
                            <FontAwesomeIcon
                              icon={faSpinner as IconProp}
                              spin
                              size="10x"
                            />
                            <p>Ladataan asetuksia...</p>
                          </div>
                        )}
                      </p>
                    </section>
                  )
                }
              />
              <Route path="/asetukset" element={<Settings />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer marketData={priceData} />
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
