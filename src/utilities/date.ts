import { IProjectDate } from '../data';

export const getLongDate = (shortDate: string) => {
  const dt = shortDate.split('-');
  return months[Number(dt[1]) - 1] + ' ' + dt[0];
};

export const getDateRange = (dt: IProjectDate) => {
  const start = getLongDate(dt.start);
  return dt.end ? start + ' - ' + getLongDate(dt.end) : start;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
