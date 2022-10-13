import { getDateRange, getLongDate } from './date';

describe('date utilities', () => {
  it('getLongDate returns expected output', async () => {
    expect(getLongDate('2022-01')).toBe('January 2022');
    expect(getLongDate('1990-06')).toBe('June 1990');
    expect(getLongDate('1540-12')).toBe('December 1540');
    expect(getLongDate('2020-08')).toBe('August 2020');
  });

  it('getDateRange returns expected output', async () => {
    expect(getDateRange({ start: '1975-04' })).toBe('April 1975');
    expect(getDateRange({ start: '2000-11', end: '2003-02' })).toBe(
      'November 2000 - February 2003'
    );
  });
});
