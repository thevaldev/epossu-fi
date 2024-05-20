import { convertNumber, formatDateForData } from "../src/components/Utils";

describe("Utils", () => {
  describe("convertNumber", () => {
    it("should convert null to '-.--'", () => {
      expect(convertNumber(null)).toBe("-.--");
    });

    it("should convert integer to string with 3 decimal places", () => {
      expect(convertNumber(1)).toBe("1.000");
    });

    it("should convert float to string with 3 decimal places", () => {
      expect(convertNumber(1.1)).toBe("1.100");
    });

    it("should convert float to string with 3 decimal places", () => {
      expect(convertNumber(1.123)).toBe("1.123");
    });
  });

  describe("formatDateForData", () => {
    it("should format date to string", () => {
      const date = new Date("2024-05-20T09:00:00");
      expect(formatDateForData(date)).toBe("20.05.2024 09:00");
    });
  });
});
