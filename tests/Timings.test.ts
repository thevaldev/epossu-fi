import Timings from "../src/components/Timings";
import { PriceData } from "../src/types";

/**
 * Format date for data
 * @param addDays - Days to add
 * @param addHour - Hours to add
 * @returns Formatted date
 */
function formatDateForData(addDays: number = 0, addHour: number = 0) {
  let date = new Date();

  if (addHour !== 0) date = new Date(date.getTime() + addHour * 60 * 60 * 1000);
  if (addDays !== 0)
    date = new Date(date.getTime() + addDays * 24 * 60 * 60 * 1000);

  return (
    date
      .toLocaleString("fi-FI", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
      })
      .replace(" klo", "") + ":00"
  );
}

// mock price data
const priceData: PriceData = {
  today: {
    data_ok: true,
    prices: [
      { price: -0.038, date: formatDateForData() },
      { price: -0.037, date: formatDateForData(0, 1) },
    ],
    options: {
      average: 1.66,
      highest: { price: 4.214, date: "20.05.2024 09:00" },
      lowest: { price: -0.038, date: "20.05.2024 00:00" },
    },
  },
  tomorrow: {
    data_ok: true,
    prices: [
      { price: 0.038, date: formatDateForData(1, 0) },
      { price: 0.037, date: formatDateForData(1, 1) },
    ],
    options: {
      average: 0,
      highest: { price: 0, date: "" },
      lowest: { price: 0, date: "" },
    },
  },
  chart: {
    dataset: [
      { price: -0.816, date: "2024.05.19 01:00:00", timestamp: 1716069600 },
      { price: -0.817, date: "2024.05.19 02:00:00", timestamp: 1716073200 },
    ],
  },
};

describe("Timings", () => {
  // getCurrentPrice
  it("should return the current price", () => {
    const result = Timings.getCurrentPrice(priceData.today, priceData.tomorrow);
    expect(result).toBe(-0.038);
  });

  // getNextPrice
  it("should return the next price", () => {
    const result = Timings.getNextPrice(priceData.today, priceData.tomorrow);
    expect(result).toBe(-0.037);
  });

  // getTimeLeftToTarget
  it("should return the time left to target", () => {
    const result = Timings.getTimeLeftToTarget(
      new Date().toLocaleString("fi-FI", {
        hour: "2-digit",
      }) + ":00"
    );
    expect(result).toBeLessThanOrEqual(3600000);
  });

  // hastimePassed
  it("should return if the time has passed", () => {
    const result = Timings.hastimePassed(formatDateForData(0, 1));
    expect(result).toBe(false);
  });
});
