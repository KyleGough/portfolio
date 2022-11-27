import { Date } from 'utilities/types';

import { getDateRange, getFormattedDate } from './date';

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

describe('date utilities', () => {
  it('getFormattedDate returns expected output', async () => {
    expect(getFormattedDate(testDates[0])).toBe('January 2022');
    expect(getFormattedDate(testDates[1])).toBe('June 1990');
    expect(getFormattedDate(testDates[2])).toBe('December 1540');
    expect(getFormattedDate(testDates[3])).toBe('August 2020');
  });

  it('getDateRange returns expected output', async () => {
    expect(getDateRange({ start: { month: 4, year: 1975 } })).toBe(
      'April 1975'
    );
    expect(
      getDateRange({
        start: { month: 11, year: 2000 },
        end: { month: 2, year: 2003 },
      })
    ).toBe('November 2000 - February 2003');
  });
});
