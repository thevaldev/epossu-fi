import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
  Bar,
  Rectangle,
  Cell,
  ReferenceArea,
} from "recharts";
import { colorizePrice } from "../components/Colorizer";
import { useEffect, useRef, useState } from "react";
import Timings from "../components/Timings";

interface ChartProps {
  dataset: [
    {
      timestamp: number;
      date: string;
      price: number;
    }
  ];
  shouldDrawRef: boolean;
}

const DayChart = ({ dataset, shouldDrawRef }: ChartProps) => {
  const [ref_line_spot, setRefLineSpot] = useState<Date>(new Date());
  const refSpotTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

  function calculateMax() {
    let max = 0;
    dataset.forEach((item) => {
      if (item.price > max) max = item.price;
    });
    return Math.ceil(max);
  }

  function calculateMin() {
    let min = 0;
    dataset.forEach((item) => {
      if (item.price < min) min = item.price;
    });

    if (min < 0) {
      min -= 0.15;
    }

    return Math.floor(min);
  }

  useEffect(() => {
    function changeRefLineSpot() {
      const time = new Date();
      time.setMinutes(0);
      time.setSeconds(0);
      time.setMilliseconds(0);

      setRefLineSpot(time);

      refSpotTimeout.current = setTimeout(() => {
        changeRefLineSpot();
      }, Timings.getTimeLeftToNextHour());
    }

    changeRefLineSpot();
    return () =>
      clearTimeout(refSpotTimeout.current as ReturnType<typeof setTimeout>);
  }, [dataset]);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="responsive-chart"
    >
      <BarChart data={dataset}>
        <CartesianGrid strokeDasharray="5" vertical={false} stroke="#636060" />
        <XAxis
          fontSize={16}
          dataKey={"timestamp"}
          tickFormatter={(value) =>
            new Date(value * 1000).toLocaleTimeString("fi-FI", {
              hour: "2-digit",
            })
          }
        />
        <YAxis
          fontSize={16}
          domain={[calculateMin(), calculateMax() + 5 - (calculateMax() % 5)]}
          tickFormatter={(value) => value.toFixed()}
          tickCount={15}
          allowDecimals={false}
          width={30}
        />
        <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />

        {calculateMin() < 0 && (
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
        )}

        {shouldDrawRef && (
          <>
            <ReferenceLine
              x={ref_line_spot.getTime() / 1000}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={2}
              label={{
                value: "Nykyinen tunti",
                position: "insideTopRight",
                fill: "rgba(255,255,255,0.3)",
                fontSize: 18,
                offset: 20,
                angle: -90,
              }}
            />
            <ReferenceArea
              x1={dataset[0].timestamp}
              x2={ref_line_spot.getTime() / 1000}
              fill="rgba(255,255,255,0.1)"
              stroke="none"
            />
          </>
        )}
        <Tooltip
          isAnimationActive={false}
          cursor={{
            fill: "rgba(255,255,255,0.05)",
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
                  <b>Klo: </b>
                  {new Date(label * 1000).toLocaleTimeString("fi-FI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date((label + 3600) * 1000).toLocaleTimeString("fi-FI", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="number">
                  <b>Hinta:</b>{" "}
                  {payload !== undefined &&
                    payload[0] !== undefined &&
                    payload[0].payload.price.toFixed(3)}{" "}
                  c/kWh
                </span>
              </div>
            );
          }}
        />
        <Bar dataKey="price" shape={<Rectangle />} isAnimationActive={false}>
          {dataset.map((entry, index) => (
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

export default DayChart;
