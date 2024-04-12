import { PriceJSON } from "./../types";
import { formatDateForData } from "./Utils";
const Timings = {
  day_mumber: <number>new Date().getDate(),

  /**
   * Get the current price from the data
   * @param data - Data to get the current price from
   * @param fallback - Fallback data
   * @returns The current price
   */
  getCurrentPrice(data: PriceJSON, fallback: PriceJSON) {
    const date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const formatted_search_value = formatDateForData(date);
    const price = data.prices.find((item) => {
      return item.date === formatted_search_value;
    });

    if (price == undefined) {
      const fallback_price = fallback.prices.find((item) => {
        return item.date === formatted_search_value;
      });

      if (fallback_price == undefined) return null;
      return fallback_price.price;
    }

    return price.price;
  },

  /**
   * Get the next price from the data
   * @param data - Data to get the next price from
   * @param fallback - Fallback data
   * @returns The next price
   */
  getNextPrice(data: PriceJSON, fallback: PriceJSON) {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const formatted_search_value = formatDateForData(date);
    const price = data.prices.find((item) => {
      return item.date === formatted_search_value;
    });

    if (price == undefined) {
      const fallback_price = fallback.prices.find((item) => {
        return item.date === formatted_search_value;
      });

      if (fallback_price == undefined) return null;
      return fallback_price.price;
    }

    return price.price;
  },

  /**
   * Get the time left to the next date change
   * @returns The time left to the next date change
   */
  getTimeLeftToDateChange() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeLeft = (24 - hours) * 60 * 60 - minutes * 60 - seconds;

    return timeLeft * 1000;
  },

  /**
   * Get the seconds left to the next hour
   * @returns The seconds left to the next hour
   */
  getTimeLeftToNextHour() {
    const date = new Date();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const timeLeft = (60 - minutes) * 60 - seconds;

    return timeLeft * 1000;
  },

  getTimeLeftToTarget(target: string, isTomrrowsData: boolean = false) {
    const date = new Date();
    if (isTomrrowsData) date.setDate(date.getDate() + 1);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const targetHours = parseInt(target.split(":")[0]);
    const targetMinutes = parseInt(target.split(":")[1]);

    let timeLeft = 0;

    if (hours < targetHours) {
      timeLeft = (targetHours - hours) * 60 * 60;
      timeLeft += (targetMinutes - minutes) * 60;
      timeLeft -= seconds;
    } else if (hours === targetHours) {
      timeLeft = (targetMinutes - minutes) * 60;
      timeLeft -= seconds;
    } else {
      timeLeft = (24 - hours + targetHours) * 60 * 60;
      timeLeft += (targetMinutes - minutes) * 60;
      timeLeft -= seconds;
    }

    return timeLeft * 1000;
  },

  /**
   * Get the time left to the next hour in minutes and seconds
   * @returns The time left to the next hour in minutes and seconds
   */
  countdownToNextHour() {
    const date = new Date();
    const minutes = 59 - date.getMinutes();
    const seconds = 59 - date.getSeconds();
    const timeUntilNext = `${minutes}min ${seconds}s`;

    if (minutes == 0) return `${seconds}s`;
    if (seconds == 0) return `${minutes}min`;

    return timeUntilNext;
  },

  /**
   * Get the time left to the next day in hours, minutes and seconds
   * @returns The time left to the next day in hours, minutes and seconds
   */
  countdownToNextDay() {
    const date = new Date();
    date.setDate(date.getDate());
    date.setHours(14, 0, 0, 0);

    if (date < new Date()) date.setDate(date.getDate() + 1);

    const diff = date.getTime() - new Date().getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    let timeUntilNext = `${hours}h ${minutes}min ${seconds}s`;
    if (hours == 0) timeUntilNext = `${minutes}min ${seconds}s`;
    if (minutes == 0 && hours !== 0) timeUntilNext = `${hours}h ${seconds}s`;
    else if (minutes == 0) timeUntilNext = `${seconds}s`;
    else if (seconds == 0) timeUntilNext = `${hours}h ${minutes}m`;

    return timeUntilNext;
  },

  /**
   * Check if the time has passed
   * @param time - Time to check
   * @returns If the time has passed
   */
  hastimePassed(time: string) {
    const _time = time.split(".");
    const new_time =
      _time[2].split(" ")[0] +
      "." +
      _time[1] +
      "." +
      _time[0] +
      " " +
      _time[2].split(" ")[1];

    const date = new Date();
    const other = new Date(new_time);

    if (date > other) return true;
    return false;
  },

  /**
   * Get the time left to the next day's price update
   * @param forceTomorrow - Force the next day's price update
   * @returns The time left to the next day's price update
   */
  getNextDayPriceTime(forceTomorrow: boolean = false) {
    if (forceTomorrow) return Timings.getTimeLeftToTarget("13:45", true);

    const date = new Date();
    const dayFormatted =
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    const updateTImes = ["13:45", "14:00", "14:15", "14:30", "14:45", "15:00"];

    // loop thru update times and retunr the right one
    for (let i = 0; i < updateTImes.length; i++) {
      if (Timings.hastimePassed(`${dayFormatted} ` + updateTImes[i])) {
        // if is last update time, return the next day
        if (i === updateTImes.length - 1) {
          return Timings.getTimeLeftToTarget("13:45", true);
        }
        // if the time has passed, continue to the next time
        continue;
      }
      return Timings.getTimeLeftToTarget(updateTImes[i]);
    }
    return Timings.getTimeLeftToTarget("13:45", true);
  },
};
export default Timings;
