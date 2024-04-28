import { useParams, useSearchParams } from "react-router-dom";
import { PriceData } from "../types";
import CurrentPrice from "../elements/PriceBoxes/CurrentPrice";
import GeneralInfo from "../elements/PriceBoxes/GeneralInfo";
import NextPrice from "../elements/PriceBoxes/NextPrice";
import "../css/pages/Scenes.scss";
import { useEffect, useState } from "react";
import TomorrowInfo from "../elements/PriceBoxes/TomorrowsInfo";

interface SceneProps {
  data: PriceData | undefined;
}

const Scenes = ({ data }: SceneProps) => {
  const [options, setOptions] = useState<string | undefined>();
  const ID = useParams().id;
  const [params] = useSearchParams();
  const background = params.get("background");
  const textAlign = params.get("text-align");

  useEffect(() => {
    const wrap = document.querySelector(".wrap");
    const container = document.querySelector(".container");
    const row = document.querySelector(".row");

    if (wrap !== null) wrap.classList.remove("wrap");
    if (container !== null) container.classList.remove("container");
    if (row !== null) row.classList.remove("row");

    const allowedOptions = ["transparent", "center", "left", "right"];

    if (background !== null && allowedOptions.indexOf(background) !== -1) {
      setOptions((prev) => {
        if (prev === undefined) return background;
        return prev + " " + background;
      });
    }

    if (textAlign !== null && allowedOptions.indexOf(textAlign) !== -1) {
      setOptions((prev) => {
        if (prev === undefined) return textAlign;
        return prev + " " + textAlign;
      });
    }
  }, [background, textAlign]);

  if (ID === undefined || data == undefined) return null;
  const IDs = ID.split(",");
  const allowedIDs = [
    "current",
    "next",
    "average",
    "lowest",
    "highest",
    "tomorrow",
  ];

  function hasID(id: string) {
    if (allowedIDs.indexOf(id) === -1) return false;
    return IDs.indexOf(id) !== -1;
  }

  return (
    <>
      {data !== undefined && (
        <div className={"scene" + (options !== undefined ? " " + options : "")}>
          {hasID("current") && <CurrentPrice data={data} />}
          {hasID("next") && <NextPrice data={data} />}
          {hasID("average") && <GeneralInfo data={data} type="average" />}
          {hasID("lowest") && <GeneralInfo data={data} type="lowest" />}
          {hasID("highest") && <GeneralInfo data={data} type="highest" />}
          {hasID("tomorrow") && <TomorrowInfo data={data} />}
        </div>
      )}
    </>
  );
};

export default Scenes;
