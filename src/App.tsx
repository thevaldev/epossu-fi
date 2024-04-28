import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import ApiDocs from "./pages/apidocs";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import { useState, useRef, useEffect } from "react";
import Timings from "./components/Timings";
import { PriceData } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Scenes from "./pages/Scenes";

function App() {
  const [data, setData] = useState<PriceData | undefined>(undefined); // Price data

  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null); // Timeout for fetching new data
  const dateChangeHandle = useRef<null | ReturnType<typeof setTimeout>>(null); // Interval for checking if the date has changed
  const [dataRequiresUpdate, setDataRequiresUpdate] = useState<null | boolean>(
    null
  ); // If the data requires an update
  const [dataLoadingReady, setDataLoadingReady] = useState<boolean>(false); // If the data is ready to be loaded

  useEffect(() => {
    if (data == null) {
      // init data
      getNewData();
      Timings.day_mumber = new Date().getDate();
    }

    async function getNewData() {
      fetch("https://api.epossu.fi/v2/marketData")
        .then((response) => response.json())
        .then((data) => {
          if (data === null) {
            setDataLoadingReady(true);
            throw new Error(
              "Palvelussa tapahtui virhe. Yritä myöhemmin uudelleen."
            );
          }

          data = data.data; // setting the data to the data.data

          // if the data for tomorrow is not ok, we set the dataRequiresUpdate to true and schedule a new data fetch'
          if (data.tomorrow.data_ok === false) {
            setDataRequiresUpdate(true);
            scheduleNewDataFetch();
          } else {
            setDataRequiresUpdate(false);
            scheduleNewDataFetch(true);
          }

          // setting the data and error to null
          setDataLoadingReady(true);
          setData(data);
        })
        .catch(() => {
          setDataLoadingReady(true);
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
    <Router>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <Routes>
              {dataLoadingReady ? (
                <Route path="/" element={<Main data={data} />} />
              ) : (
                <Route
                  path="/"
                  element={
                    <div className="wrap">
                      <div className="container">
                        <section className="row center loading">
                          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
                          <p className="loading-text">Tietoja ladataan...</p>
                        </section>
                      </div>
                    </div>
                  }
                />
              )}
              <Route path="/tietoa" element={<About />} />
              <Route path="/api" element={<ApiDocs />} />
              <Route path="/ilmoitukset" element={<Notifications />} />
              <Route path="/nakyma/:id" element={<Scenes data={data} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
