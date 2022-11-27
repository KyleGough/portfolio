import dayjs from 'dayjs';
import { Date, ProjectDate } from 'utilities/types';

export const getFormattedDate = (date: Date) => {
  return dayjs()
    .month(date.month - 1)
    .year(date.year)
    .format('MMMM YYYY');
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
