import { format, parse, add, differenceInDays } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

export const formatDate = (date) => format(date, DATE_FORMAT);

export const parseDate = (dateStr) => parse(dateStr, DATE_FORMAT, new Date());

export const addDays = (date, days) => add(date, { days });

export const getDifferenceInDays = (dateStart, dateEnd) => differenceInDays(dateEnd, dateStart);
