import { colorizePrice } from "../src/components/Colorizer";

describe("Colorizer", () => {
  it("should return a color for price 5 snt", () => {
    const color = colorizePrice(5);
    expect(color).toBe("#4a9b69");
  });

  it("should return a color for price 0.5 snt", () => {
    const color = colorizePrice(0.5);
    expect(color).toBe("#3b8657");
  });

  it("should return a color for price 0 snt", () => {
    const color = colorizePrice(0);
    expect(color).toBe("#3b8657");
  });

  it("should return a color for price -0.5 snt", () => {
    const color = colorizePrice(-0.5);
    expect(color).toBe("#3b8657");
  });

  it("should return a color for price -5 snt", () => {
    const color = colorizePrice(-5);
    expect(color).toBe("#4a9b69");
  });
});
