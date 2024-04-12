import { PriceData } from "../types";
import CurrentPrice from "./PriceBoxes/CurrentPrice";
import NextPrice from "./PriceBoxes/NextPrice";
import TimerNextHour from "./PriceBoxes/TimerNextHour";
import TimerNextDay from "./PriceBoxes/TimerNextDay";
import TodaysInfo from "./PriceBoxes/TodaysInfo";
import TomorrowInfo from "./PriceBoxes/TomorrowsInfo";

type PriceBoxProps = {
  type: string;
  data?: PriceData;
};

const priceBox = ({ type, data }: PriceBoxProps) => {
  const Box = boxTypes[type];
  return <Box type={type} data={data} />;
};

const boxTypes: { [key: string]: (props: PriceBoxProps) => JSX.Element } = {
  current_price: (props) => (
    <CurrentPrice data={props.data || ({} as PriceData)} />
  ),
  next_price: (props) => <NextPrice data={props.data || ({} as PriceData)} />,
  today_info: (props) => <TodaysInfo data={props.data || ({} as PriceData)} />,
  tomorrow_info: (props) => (
    <TomorrowInfo data={props.data || ({} as PriceData)} />
  ),
  timer_next: () => <TimerNextHour />,
  timer_tomorrow: () => <TimerNextDay />,
};

export default priceBox;
