import "../css/pages/Settings.scss";
import { setMeta } from "../components/Utils";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChartArea,
  faFlag,
  faSun,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Themes from "../components/Themes";

const Settings = () => {
  setMeta("Sivun asetukset", "Muokkaa ja hallinnoi sivuston asetuksia");

  const [theme, setTheme] = useState(
    Themes.getTheme() == "light" ? "Vaalea" : "Tumma"
  );

  const [timeDifference, setTimeDifference] = useState<undefined | number>(
    undefined
  );
  const [Settings_savechartdate, setSetting_savechartdate] =
    useState<boolean>(false);
  const [Settings__language] = useState<string>("Suomi");

  function switchTheme() {
    Themes.saveTheme(theme == "Tumma" ? "light" : "dark");
    setTheme(theme == "Tumma" ? "Vaalea" : "Tumma");

    Themes.initTheme();
  }

  function changeChartDate_setting() {
    setSetting_savechartdate(!Settings_savechartdate);

    localStorage.setItem(
      "saveGraphDate",
      Settings_savechartdate ? "false" : "true"
    );

    // clearing old data if setting is disabled
    if (Settings_savechartdate) localStorage.removeItem("chartDateValue");
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
      });
  }

  useEffect(() => {
    setSetting_savechartdate(localStorage.getItem("saveGraphDate") == "true");
  }, []);

  return (
    <>
      <section className="page settings">
        <h1 className="title">Sivun asetukset</h1>
        <p className="lead">
          Tältä sivulta voit muuttaa sivuston asetuksia juuri sinulle sopiviksi.
          Asetukset tallentuvat automaattisesti laitteen muistiin.
          <br />
          Voit poistaa tallennetut asetukset "Nollaa asetukset" kohdasta tai
          tyhjentämällä selaimen välimuistin.
        </p>

        <div className="box">
          <h2>
            <FontAwesomeIcon icon={faSun} />
            Sivuston teema
          </h2>
          <div className="setting-group">
            <span className="value">{theme}</span>
            <button className="button" onClick={switchTheme}>
              Vaihda teemaa
            </button>
          </div>

          <h2>
            <FontAwesomeIcon icon={faFlag} />
            Sivuston kieli
          </h2>
          <div className="setting-group">
            <span className="value">{Settings__language}</span>
          </div>

          <h2>
            <FontAwesomeIcon icon={faChartArea} />
            Kuvaajan asetukset
          </h2>
          <div className="setting-group has-inner">
            <p className="inner-title">Tallenna kuvaajan näkymän valinta</p>
            <div className="inner-group">
              <span className="value">
                {Settings_savechartdate ? "Kyllä" : "Ei"}
              </span>

              <button className="button" onClick={changeChartDate_setting}>
                Muuta valintaa
              </button>
            </div>
          </div>

          <h2>
            <FontAwesomeIcon icon={faCalendarAlt} />
            Aika ja päivämäärä asetukset
          </h2>
          <div className="setting-group has-inner">
            <p className="inner-title">Testaa palvelimen ja laitteen aikaero</p>
            <div className="inner-group">
              <span className="value">
                {timeDifference !== undefined
                  ? `Aikaero palvelimen kanssa on ${timeDifference} ${
                      timeDifference == 1 ? "sekuntti" : "sekuntia"
                    }`
                  : "Aloita testi painamalla nappia."}
              </span>

              <button
                className={`button ${timeDifference !== undefined && "green"}`}
                onClick={testTime}
                disabled={timeDifference !== undefined}
              >
                {timeDifference !== undefined ? "Testattu" : "Testaa aikaero"}
              </button>
            </div>
          </div>

          <h2 className="red">
            <FontAwesomeIcon icon={faTrashCan} />
            Nollaa asetukset
          </h2>
          <div className="setting-group">
            <span className="value">
              Nollaa kaikki sivuston asetukset ja palaa oletusasetuksiin.
            </span>
            <button
              className="button red"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Nollaa asetukset
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
