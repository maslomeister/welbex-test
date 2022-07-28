export const convertStringToDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString("ru-RU", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
