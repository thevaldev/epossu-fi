import { PriceData } from "../types";
import PriceBox from "../elements/PriceBoxes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDay,
  faChartArea,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "../elements/Chart";
import { colorMap } from "./Colorizer";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type SceneBuilderProps = {
  sceneID: string;
  data: PriceData;
};

const SceneBuilder = ({ sceneID, data }: SceneBuilderProps) => {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const availableElements = useMemo(() => {
    return {
      build_scene: "build_scene",
      "hinta-nykyinen": "Nykyinen hinta",
      "hinta-seuraava": "Seuraava hinta",
      "ajastin-huominen": "Seuraava päivä (ajastin)",
      "ajastin-tunti": "Seuraava tunti (ajastin)",
      "hinnat-tanaan": "Tämän päivän tiedot",
      "hinnat-huomenna": "Huomisen tiedot",
      kuvaaja: "Tuntikohtainen kuvaaja",
      varit: "Värien selitykset",
    };
  }, []);
  const [sceneURL, setSceneURL] = useState<string>(sceneID);
  const ids = sceneID.split("&");

  useEffect(() => {
    function buildURL() {
      const uniqueElements = Array.from(new Set(visibleElements));
      const scene = uniqueElements.filter((el) => el !== "build_scene");
      if (Object.keys(scene).length == 0) return;

      const sceneString = scene.join("&");
      setSceneURL(sceneString);
    }

    sceneID.split("&").forEach((el) => {
      if (
        !visibleElements.includes(el) &&
        Array.from(Object.keys(availableElements)).includes(el)
      ) {
        setVisibleElements([...visibleElements, el]);
      }
    });

    buildURL();
  }, [visibleElements, sceneID, availableElements]);

  function shouldRender(element: string) {
    if (element === "build_scene" && !ids.includes("build_scene")) return false;
    return visibleElements.includes(element);
  }

  return (
    <>
      {shouldRender("build_scene") && (
        <div className="builder">
          <form>
            <div className="label-wrap">
              {Array.from(Object.entries(availableElements)).map(
                ([key, value]) =>
                  key === "build_scene" ? null : (
                    <label key={key}>
                      <input
                        type="checkbox"
                        name={key}
                        checked={visibleElements.includes(key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setVisibleElements([...visibleElements, key]);
                          } else {
                            setVisibleElements(
                              visibleElements.filter((el) => el !== key)
                            );
                          }
                        }}
                      />
                      {value}
                    </label>
                  )
              )}
            </div>
            <div className="row">
              <Link to={"/nakyma/" + sceneURL}>
                <button>Luo näkymä</button>
              </Link>
            </div>
          </form>

          <h3>Esikatselu</h3>
        </div>
      )}

      {Object.keys(visibleElements).length == 0 && (
        <div className="alert warning with-button">
          <p>
            <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            Virheellinen näkymä, yhtään elementtiä ei ole valittu.{" "}
          </p>
          <Link to={"/"}>
            <button>Palaa etusivulle</button>
          </Link>
        </div>
      )}

      <section className="col-row header">
        {data.data !== undefined && (
          <>
            <div className="col header fill">
              {shouldRender("hinta-nykyinen") && (
                <PriceBox type="current_price" data={data} />
              )}
              {shouldRender("hinta-seuraava") && (
                <PriceBox type="next_price" data={data} />
              )}
              {shouldRender("ajastin-huominen") && (
                <PriceBox type="timer_tomorrow" />
              )}
              {shouldRender("ajastin-tunti") && <PriceBox type="timer_next" />}
            </div>
          </>
        )}
      </section>

      <section className="col-row fill">
        {shouldRender("hinnat-tanaan") && (
          <div className="col">
            <h3>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              Tämän päivän tiedot
            </h3>
            {data.data !== undefined && (
              <PriceBox type="today_info" data={data} />
            )}
          </div>
        )}
        {shouldRender("hinnat-huomenna") && (
          <div className="col">
            <h3>
              <FontAwesomeIcon icon={faCalendarDay} />
              Huomisen tiedot
            </h3>
            {data.data !== undefined && (
              <PriceBox type="tomorrow_info" data={data} />
            )}
          </div>
        )}
      </section>

      {shouldRender("kuvaaja") && (
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
      )}

      {shouldRender("varit") && (
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
      )}
    </>
  );
};

export default SceneBuilder;
