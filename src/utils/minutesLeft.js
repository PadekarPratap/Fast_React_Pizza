export const calcMinutesLeft = (date) => {
  const pastTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  const timeDifference = currentTime - pastTime;

  return Math.round((timeDifference / 60) * 1000);
};
