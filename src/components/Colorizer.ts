/**
 * Colorizes the price based on the value
 * @param price - The price to colorize
 * @returns The color
 */
export function colorizePrice(price: number | null) {
  if (price === null || price === undefined) return "var(--primary)";

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

export const colorMap = {
  "-60": "#68207f",
  "-55": "#7f2079",
  "-50": "#8c2a5e",
  "-45": "#b22a5e",
  "-40": "#d43d51",
  "-35": "#e06548",
  "-30": "#e48948",
  "-25": "#e4ac53",
  "-20": "#d7c777",
  "-15": "#acbe65",
  "-10": "#7aae65",
  "-5": "#4a9b69",
  "0": "#3b8657",
  "5": "#4a9b69",
  "10": "#7aae65",
  "15": "#acbe65",
  "20": "#d7c777",
  "25": "#e4ac53",
  "30": "#e48948",
  "35": "#e06548",
  "40": "#d43d51",
  "45": "#b22a5e",
  "50": "#8c2a5e",
  "55": "#7f2079",
  "60": "#68207f",
};
