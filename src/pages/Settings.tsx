import "../css/pages/Settings.scss";
import { setMeta } from "../components/Utils";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faExclamationCircle,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import Themes from "../components/Themes";

const Settings = () => {
  setMeta("Sivun asetukset", "Muokkaa ja hallinnoi sivuston asetuksia");

  const [theme, setTheme] = useState(
    Themes.getTheme() == "light" ? "Vaalea" : "Tumma"
  );

  const [DeviceTime, setDeviceTime] = useState<undefined | number>(undefined);
  const [ServerTime, setServerTime] = useState<undefined | number>(undefined);
  const [timeDifference, setTimeDifference] = useState<undefined | number>(
    undefined
  );

  function switchTheme() {
    Themes.saveTheme(theme == "Tumma" ? "light" : "dark");
    setTheme(theme == "Tumma" ? "Vaalea" : "Tumma");

    Themes.initTheme();
  }

  function testTime() {
    fetch("https://api.epossu.fi/v2/timePing")
      .then((response) => response.json())
      .then((data) => {
        setTimeDifference(
          Math.abs(
            Math.floor(
              new Date(data).getTime() / 1000 -
                Math.floor(new Date().getTime() / 1000)
            )
          )
        );

        setServerTime(data);
        setDeviceTime(new Date().getTime());
      });
  }

  return (
    <>
      <section className="page settings">
        <h1 className="title">Sivun asetukset</h1>
        <p className="lead">
          Tältä sivulta voit muuttaa sivuston asetuksia juuri sinulle sopiviksi.
        </p>

        <div className="box">
          <h2>
            <FontAwesomeIcon icon={faSun} />
            Teeman asetukset
          </h2>
          <p className="description">
            Vaihda sivuston teemaa vaalean ja tumman välillä, valinta tallentuu.
          </p>

          <div className="group">
            <p className="bold">
              Nykyinen teema: <span>{theme}</span>
            </p>
          </div>

          <button className="button" onClick={switchTheme}>
            Vaihda teemaa
          </button>
        </div>

        <div className="box">
          <h2>
            <FontAwesomeIcon icon={faClock} />
            Aika ja päivämäärä
          </h2>
          <p className="description">
            Tästä voit tarkistaa onko laitteesi aika ja päivämäärä oikein
            sivuston palvelimen kanssa, <br />
            väärässä ajassa oleva laite voi aiheuttaa ongelmia hintatietojen
            näyttämisessä.
          </p>
          {ServerTime !== undefined && (
            <div className="group colored">
              <p className="bold">
                Laitteen aika:{" "}
                <span className="number">
                  {new Date(DeviceTime ?? "").toLocaleDateString("fi-FI", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p className="bold">
                Palvelimen aika:{" "}
                <span className="number">
                  {new Date(ServerTime).toLocaleDateString("fi-FI", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </p>

              <br />

              <p className="bold">
                Aikojen ero:{" "}
                <span className="number">{timeDifference} sekuntia</span>
              </p>

              <div className="group">
                {timeDifference !== undefined &&
                  (timeDifference < 5 ? (
                    <p className="success">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Laitteesi aika on synkronoitu palvelimen kanssa, pieni ero
                      ei haittaa.
                    </p>
                  ) : (
                    <p className="error">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                      Laitteesi aika eroaa palvelimesta huomattavasti, tarkista
                      laitteesi aika-asetukset.
                    </p>
                  ))}
              </div>
            </div>
          )}

          {ServerTime === undefined && (
            <button className="button" onClick={testTime}>
              Testaa aikaa
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Settings;
