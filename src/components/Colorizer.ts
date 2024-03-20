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

export const colorMap = {
  "-60": "4a9b69",
  "-55": "4a9b69",
  "-50": "4a9b69",
  "-45": "4a9b69",
  "-40": "4a9b69",
  "-35": "4a9b69",
  "-30": "4a9b69",
  "-25": "4a9b69",
  "-20": "4a9b69",
  "-15": "4a9b69",
  "-10": "4a9b69",
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
