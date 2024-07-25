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

  /**
   * Check if it is time for tomorrow's data
   * @returns If it is time for tomorrow's data
   */
  isTimeForTomorrowsData() {
    const priceTimes = ["14:00", "14:15", "14:30", "14:45", "15:00"];
    const date = new Date();

    // if all times have past but still no new data, fetch it
    if (date.getHours() >= 15) return true;

    // if the time is in the priceTimes array, fetch new data
    if (
      priceTimes.includes(
        `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`
      )
    ) {
      return true;
    }

    return false;
  },
};
export default Timings;
