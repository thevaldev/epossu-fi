import { useCallback, useEffect, useState } from "react";
import { ChartData } from "../types";
import DayChart from "./DayChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ChartProps {
  data: ChartData;
  hasTomorrows: boolean;
}

const Chart = ({ data, hasTomorrows }: ChartProps) => {
  const [date_selector, setDateSelector] = useState<string>("Kaikki tiedot");
  const [dataset, setDataset] = useState(data.dataset);

  const changeDate = useCallback(
    (type: number, forceType?: string) => {
      const types: { [key: string]: string } = {
        0: "Eilen",
        1: "Kaikki tiedot",
        2: "Tänään",
        3: "Huomenna",
      };

      // Find the current type
      const current_type = Object.keys(types).find(
        (key) => types[key] === date_selector
      );

      // Set the new type based on the current type and the type change
      let new_type = Number(current_type) + type;

      if (new_type == -1) {
        if (hasTomorrows) new_type = 3;
        else new_type = 2;
      }

      // infinite scrolling <-
      if (new_type == 0 && hasTomorrows) new_type = 3;
      else if (new_type == 3 && !hasTomorrows) new_type = 0;

      // infinite scrolling ->
      if (new_type > 3 && hasTomorrows) new_type = 1;
      else if (new_type > 3 && !hasTomorrows) new_type = 0;

      // Set the selected type
      let chart_selection = types[new_type];

      // Setting the forced type (localstorage saved date), if it is defined and valid
      if (forceType !== undefined)
        chart_selection = !Object.values(types).includes(forceType)
          ? "Kaikki tiedot" // fallback to "Kaikki tiedot" if the forced type is invalid
          : forceType;

      // Filter the dataset based on the selected date
      const filtered = data.dataset.filter((item) => {
        const date = new Date(item.date);
        if (chart_selection === "Eilen") {
          return date.getDate() === new Date().getDate() - 1;
        } else if (chart_selection === "Tänään") {
          return date.getDate() === new Date().getDate();
        } else if (chart_selection === "Huomenna") {
          return date.getDate() === new Date().getDate() + 1;
        } else {
          return true;
        }
      }) as ChartData["dataset"];

      // Set the new dataset and date selector
      setDataset(filtered);
      setDateSelector(chart_selection);

      // saving the date, if the user has selected to save the date
      if (localStorage.getItem("saveGraphDate") === "true")
        localStorage.setItem("chartDateValue", chart_selection);
    },
    [date_selector, data.dataset, hasTomorrows]
  );

  // Update the dataset when the data changes
  useEffect(() => {
    // if the user has selected to save the date, load the saved date
    if (localStorage.getItem("saveGraphDate") === "true") {
      const value = localStorage.getItem("chartDateValue");
      if (value === date_selector) return;
      changeDate(0, value === null ? "Kaikki tiedot" : value);
      return;
    }
  }, [data, changeDate, date_selector]);

  return (
    <>
      {
        <div className="box-row">
          <button aria-label="previous" onClick={() => changeDate(-1)}>
            <FontAwesomeIcon icon={faCaretLeft as IconProp} />
          </button>
          <p>{date_selector}</p>
          <button aria-label="next" onClick={() => changeDate(1)}>
            <FontAwesomeIcon icon={faCaretRight as IconProp} />
          </button>
        </div>
      }

      <DayChart
        dataset={dataset}
        shouldDrawRef={
          date_selector === "Tänään" || date_selector === "Kaikki tiedot"
        }
        shouldResizeFonts={date_selector !== "Kaikki tiedot"}
      />
    </>
  );
};

export default Chart;
