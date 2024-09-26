export const formatToSwedishDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('sv-SE', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, kl. ${hours}.${minutes}`;
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
