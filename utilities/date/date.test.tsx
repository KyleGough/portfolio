import { Date } from "@utilities/types";

import {
  getDateRange,
  getFormattedDate,
  getProjectStartDateTime,
} from "./date";

const testDates: Date[] = [
  {
    month: 1,
    year: 2022,
  },
  {
    month: 6,
    year: 1990,
  },
  {
    month: 12,
    year: 1540,
  },
  {
    month: 8,
    year: 2020,
  },
];

describe("date utilities", () => {
  it("getFormattedDate returns expected output", () => {
    expect(getFormattedDate(testDates[0])).toBe("Jan 2022");
    expect(getFormattedDate(testDates[1])).toBe("Jun 1990");
    expect(getFormattedDate(testDates[2])).toBe("Dec 1540");
    expect(getFormattedDate(testDates[3])).toBe("Aug 2020");
  });

  it("getDateRange returns expected output", () => {
    expect(getDateRange({ start: { month: 4, year: 1975 } })).toBe("Apr 1975");
    expect(
      getDateRange({
        start: { month: 11, year: 2000 },
        end: { month: 2, year: 2003 },
      }),
    ).toBe("Nov 2000 - Feb 2003");
  });

  it("getProjectStartDateTime returns ISO first-of-month", () => {
    expect(getProjectStartDateTime({ start: { month: 4, year: 1975 } })).toBe(
      "1975-04-01",
    );
    expect(
      getProjectStartDateTime({
        start: { month: 11, year: 2000 },
        end: { month: 2, year: 2003 },
      }),
    ).toBe("2000-11-01");
  });
});
