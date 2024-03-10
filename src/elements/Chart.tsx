import { useEffect, useRef, useState } from "react";
import { colorizePrice } from "../components/Colorizer";
import { ChartData } from "../types";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import Timings from "../components/Timings";

interface ChartProps {
  data: ChartData;
  hasTomorrows: boolean;
}

const Chart = ({ data, hasTomorrows }: ChartProps) => {
  const [ref_line_spot, setRefLineSpot] = useState<number>(
    new Date().getHours() - 1
  );
  const refSpotTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    function changeRefLineSpot() {
      if (!hasTomorrows && data.dataset.length > 24) {
        setRefLineSpot(23 + new Date().getHours());
      } else {
        setRefLineSpot(new Date().getHours() - 1);
      }

      refSpotTimeout.current = setTimeout(() => {
        changeRefLineSpot();
      }, Timings.getTimeLeftToNextHour());
    }

    changeRefLineSpot();
    return () =>
      clearTimeout(refSpotTimeout.current as ReturnType<typeof setTimeout>);
  }, [data.dataset.length, hasTomorrows]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data.dataset}>
        <CartesianGrid strokeDasharray="5" vertical={false} />
        <XAxis dataKey="hour" fontSize={20} />
        <YAxis
          type="number"
          domain={[0, parseInt(data.options.highest.toString()) + 11]}
          tickCount={15}
          width={45}
          fontSize={20}
          allowDecimals={false}
          tickFormatter={(value) => value.toFixed(0)}
          label={{
            value: "snt / kWh",
            angle: -90,
            fontSize: 25,
            position: "left",
            offset: 0,
          }}
        />
        <ReferenceLine
          x={ref_line_spot}
          stroke="#ff9073"
          strokeWidth={3}
          label={{
            value: "Nykyinen tunti",
            position: { x: -6.5, y: 5 },
            fill: "#ff9073",
            fontSize: 18,
            angle: -90,
            fontWeight: "500",
          }}
        />
        <Tooltip
          isAnimationActive={false}
          cursor={{
            fill: "rgba(255,255,255,0.2)",
          }}
          contentStyle={{
            backgroundColor: "rgba(255,255,255,1)",
            color: "white",
            fontSize: 25,
            border: "none",
          }}
          labelFormatter={() => ""}
          content={({ payload, label }) => {
            return (
              <div className="chart-tooltip">
                <p className="title">
                  {payload !== undefined &&
                    payload[0] !== undefined &&
                    new Date(payload[0].payload.date).toLocaleDateString(
                      "fi-FI",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }
                    )}
                </p>
                <span className="number">
                  <b>Klo:</b> {label < 9 ? "0" + Number(label) : label}:00 -{" "}
                  {Number(label) + 1 < 9
                    ? "0" + Number(Number(label) + 1)
                    : Number(label) + 1}
                  :00
                </span>
                <span className="number">
                  <b>Hinta:</b>{" "}
                  {payload !== undefined &&
                    payload[0] !== undefined &&
                    payload[0].payload.price.toFixed(3)}{" "}
                  snt/kWh
                </span>
              </div>
            );
          }}
        />
        <Bar dataKey="price" shape={<Rectangle />} isAnimationActive={false}>
          {data.dataset.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorizePrice(entry.price)}
              style={{
                filter:
                  entry.price < 0
                    ? "hue-rotate(" +
                      entry.price * -2.75 +
                      "deg) brightness(1.25)"
                    : "",
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
