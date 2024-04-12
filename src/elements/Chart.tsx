import { useState } from "react";
import { ChartData } from "../types";
import DayChart from "./DayChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface ChartProps {
  data: ChartData;
  hasTomorrows: boolean;
}

const Chart = ({ data, hasTomorrows }: ChartProps) => {
  const [date_selector, setDateSelector] = useState<string>("Kaikki tiedot");
  const [dataset, setDataset] = useState(data.dataset);

  function changeDate(type: number) {
    const types: { [key: string]: string } = {
      0: "Eilen",
      1: "Tänään",
      2: "Huomenna",
      3: "Kaikki tiedot",
    };

    const current_type = Object.keys(types).find(
      (key) => types[key] === date_selector
    );

    let new_type = Number(current_type) + type;
    if (new_type < 0) new_type = 0;
    else if (new_type > 3) new_type = 3;

    if (new_type === 2 && !hasTomorrows) {
      if (type === 1) new_type = 3;
      else new_type = 1;
    }

    if (new_type === 0) {
      const yesterday_date = new Date();
      yesterday_date.setDate(new Date().getDate() - 1);

      const yesterday = data.dataset.filter(
        (item) => new Date(item.date).getDate() === yesterday_date.getDate()
      );
      setDataset(yesterday as ChartData["dataset"]);
    }

    if (new_type === 2) {
      const tomorrow_date = new Date();
      tomorrow_date.setDate(new Date().getDate() + 1);

      const tomorrow = data.dataset.filter(
        (item) => new Date(item.date).getDate() === tomorrow_date.getDate()
      );

      setDataset(tomorrow as ChartData["dataset"]);
    }

    if (new_type === 1) {
      const today = data.dataset.filter(
        (item) => new Date(item.date).getDate() === new Date().getDate()
      );
      setDataset(today as ChartData["dataset"]);
    }

    if (new_type === 3) {
      setDataset(data.dataset);
    }

    setDateSelector(types[new_type]);
  }

  return (
    <>
      {
        <div className="box-row">
          <button
            onClick={() => changeDate(-1)}
            disabled={
              (date_selector === "Tänään" && hasTomorrows) ||
              date_selector == "Eilen"
            }
          >
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          <p>{date_selector}</p>
          <button
            onClick={() => changeDate(1)}
            disabled={date_selector === "Kaikki tiedot"}
          >
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
      }

      <DayChart
        dataset={dataset}
        shouldDrawRef={
          date_selector === "Tänään" || date_selector === "Kaikki tiedot"
        }
      />
    </>
  );
};

export default Chart;
