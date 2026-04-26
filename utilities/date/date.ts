import { Date, ProjectDate } from '@utilities/types';
import dayjs from 'dayjs';

export const getFormattedDate = (date: Date) => {
  return dayjs()
    .month(date.month - 1)
    .year(date.year)
    .format('MMM YYYY');
};

export const getShortDate = (date: Date) => {
  return dayjs()
    .month(date.month - 1)
    .year(date.year)
    .format('YYYY-MM');
};

export const getDateRange = (dt: ProjectDate) => {
  const start = getFormattedDate(dt.start);
  return dt.end ? start + ' - ' + getFormattedDate(dt.end) : start;
};

/** First day of project start month, for `<time dateTime>` (ISO). */
export const getProjectStartDateTime = (dt: ProjectDate): string => {
  const m = String(dt.start.month).padStart(2, '0');
  return `${dt.start.year}-${m}-01`;
};
