import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import { useState, useRef, useEffect } from "react";
import Timings from "./components/Timings";
import { AlertsJSON, PriceData } from "./types";

function App() {
  const [priceData, setPriceData] = useState<PriceData | undefined>(undefined); // Price data
  const [alertData, setAlerts] = useState<undefined | AlertsJSON>(); // Alert data

  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null); // Timeout for fetching new data
  const dateChangeHandle = useRef<null | ReturnType<typeof setTimeout>>(null); // Interval for checking if the date has changed
  const [dataRequiresUpdate, setDataRequiresUpdate] = useState<null | boolean>(
    null
  ); // If the data requires an update
  const [dataLoadingReady, setDataLoadingReady] = useState<boolean>(false); // If the data is ready to be loaded

  useEffect(() => {
    if (priceData == null) {
      // init data
      getNewData();
      Timings.day_mumber = new Date().getDate();
    }

    async function getNewData() {
      fetch("https://api.epossu.fi/v2/production")
        .then((response) => response.json())
        .then((response) => {
          if (response === null || response === undefined) {
            setDataLoadingReady(true);
            setPriceData(undefined);
            throw new Error(
              "Tietoja ei saatu ladattua virheen vuoksi: palvelin ei palauttanut dataa."
            );
          }

          // if the data for tomorrow is not ok, we set the dataRequiresUpdate to true and schedule a new data fetch'
          if (response.data.marketData.tomorrow.data_ok === false) {
            setDataRequiresUpdate(true);
            scheduleNewDataFetch();
          } else {
            setDataRequiresUpdate(false);
            scheduleNewDataFetch(true);
          }

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

          // Adding a alert if the server time and the client time are out of sync by 15 minutes
          const time = new Date().getTime() / 1000;
          const diff = Math.abs(time - response.server_time);

          if (diff > 900 || diff < -900) {
            setAlerts((prev) => {
              return {
                ...prev,
                time_sync: {
                  id: "time_out_of_sync",
                  type: "critical",
                  message:
                    "Tietokoneesi aika on epätarkka, päivitä se! Jotkin toiminnot eivät välttämättä toimi oikein ennen ajan päivitystä.",
                  canBeDismissed: false,
                },
              };
            });
          }

          // setting the data and error to null
          setDataLoadingReady(true);
          setPriceData(response.data.marketData);
        })
        .catch((error) => {
          setDataLoadingReady(true);
          setPriceData(undefined);
          throw new Error("Tietoja ei saatu ladattua virheen vuoksi: " + error);
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

    if (dateChangeHandle.current === null && priceData !== null) {
      dateChangeHandle.current = setTimeout(() => {
        handleDateChange();
      }, 2000);
    }
  }, [priceData, dataRequiresUpdate]);

  useEffect(() => {
    return () => {
      if (timeout.current !== null) clearTimeout(timeout.current);
      if (dateChangeHandle.current !== null)
        clearTimeout(dateChangeHandle.current);
    };
  }, [timeout, dateChangeHandle]);

  return (
    <Router>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    _marketData={priceData}
                    _alertData={alertData}
                    isReady={dataLoadingReady}
                  />
                }
              />
              <Route path="/tietoa" element={<About />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route path="/ilmoitukset" element={<Notifications />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
