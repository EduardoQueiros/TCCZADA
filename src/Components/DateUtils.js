export const formatDateTime = (date) => {
  const twoDigits = (num) => String(num).padStart(2, "0");

  const day = twoDigits(date.getDate());
  const month = twoDigits(date.getMonth() + 1); // Janeiro é 0
  const year = date.getFullYear();
  const hours = twoDigits(date.getHours());
  const minutes = twoDigits(date.getMinutes());

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
