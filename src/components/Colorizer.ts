/**
 * Colorizes the price based on the value
 * @param price - The price to colorize
 * @returns The color
 */
export function colorizePrice(price: number | null) {
  if (price === null || price === undefined) return "white";

  for (const key in colorMap) {
    if (key === price.toString()) return colorMap[key as keyof typeof colorMap];

    if (price < parseInt(key) && price > parseInt(key) - 5)
      return colorMap[key as keyof typeof colorMap];

    if (price > parseInt(key) && price < parseInt(key) + 5)
      return colorMap[key as keyof typeof colorMap];

    if (price > 60) return colorMap["60"];
    if (price < -60) return colorMap["-60"];
  }
}

/**
 * Map of colors for the price
 */
export const colorMap = {
  "-60": "#007b7d",
  "-55": "#007b7d",
  "-50": "#007b7d",
  "-45": "#007b7d",
  "-40": "#007b7d",
  "-35": "#007b7d",
  "-30": "#007b7d",
  "-25": "#007b7d",
  "-20": "#007b7d",
  "-15": "#007b7d",
  "-10": "#007b7d",
  "-5": "#007b7d",
  "0": "#007b7d",
  "5": "#00876c",
  "10": "#4a9b69",
  "15": "#7aae65",
  "20": "#acbe65",
  "25": "#e0cd6d",
  "30": "#e4ac53",
  "35": "#e48948",
  "40": "#e06548",
  "45": "#d43d51",
  "50": "#b22a5e",
  "55": "#8c2a5e",
  "60": "#7f2079",
};
