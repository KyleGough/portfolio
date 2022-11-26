import dayjs from 'dayjs';

import { IDate, IProjectDate } from '../data';

export const getFormattedDate = (date: IDate) => {
  return dayjs()
    .month(date.month - 1)
    .year(date.year)
    .format('MMMM YYYY');
};

export const getShortDate = (date: IDate) => {
  return dayjs()
    .month(date.month - 1)
    .year(date.year)
    .format('YYYY-MM');
};

export const getDateRange = (dt: IProjectDate) => {
  const start = getFormattedDate(dt.start);
  return dt.end ? start + ' - ' + getFormattedDate(dt.end) : start;
};
