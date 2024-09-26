export const formatToSwedishDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString('sv-SE', { month: 'long' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, kl. ${hours}.${minutes}`;
};
