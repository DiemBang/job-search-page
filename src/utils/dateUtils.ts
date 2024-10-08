export const formatToTimeFromIsoDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `kl. ${hours}.${minutes}`;
};

export const getDaysLeft = (isoDate: string) => {
  const currentDate = new Date();
  const deadlineDate = new Date(isoDate);
  const timeDifference = deadlineDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

export const getDayAndMonthFromIsoString = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('sv-SE', { month: 'short' });
  return `${day} ${month}`;
};

export const getTodayDateTime = (): string => {
  const now = new Date();
  return now.toISOString().split('.')[0];
};

export const getDateFromPastDays = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('.')[0];
};
