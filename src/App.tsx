import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import { useState, useEffect } from "react";
import Timings from "./components/Timings";
import Themes from "./components/Themes";
import { AlertsJSON, PriceData } from "./types";
import Settings from "./pages/Settings";
import Footer from "./elements/Footer";
import Header from "./elements/Header";

function App() {
  const [priceData, setPriceData] = useState<PriceData | undefined>(undefined); // Price data
  const [alertData, setAlerts] = useState<undefined | AlertsJSON>(); // Alert data

  const [DataReadyState, setDataReadyState] = useState<boolean>(false);
  const [hasTomorrowData, setHasTomorrowData] = useState<boolean>(false);

  useEffect(() => {
    Themes.initTheme();

    //init priceData
    if (priceData == null) {
      Timings.day_mumber = new Date().getDate();
      fetchNewData();
    }

    async function fetchNewData() {
      fetch("https://api.epossu.fi/v2/production")
        .then((response) => response.json())
        .then((response) => {
          // Handling the possible server error
          if (response == null || response == undefined) {
            setDataReadyState(true);
            setPriceData(undefined);
            throw new Error(
              "Server returned null or undefined. Check the server status: " +
                response
            );
          }

          // setting tomorrows data status
          setHasTomorrowData(response.data.marketData.tomorrow.data_ok);

          // setting the data
          setPriceData(response.data.marketData);

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
        .catch((error) => {
          setDataReadyState(true);
          setPriceData(undefined);
          throw new Error("Data fetch failed due to an error: " + error);
        });
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
  }, [priceData, DataReadyState, hasTomorrowData]);

  return (
    <Router>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    _marketData={priceData}
                    _alertData={alertData}
                    isReady={DataReadyState}
                  />
                }
              />
              <Route path="/tietoa" element={<About />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route path="/ilmoitukset" element={<Notifications />} />
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
