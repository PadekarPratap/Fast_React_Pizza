import moment from 'moment/moment';

export const calcMinutesLeft = (date) => {
  const now = moment();
  const futureDate = moment(date);

  const minutesLeft = futureDate.diff(now, 'minutes');

  return minutesLeft;
};
