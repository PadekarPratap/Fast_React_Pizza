export const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    minute: "2-digit",
    hour: "2-digit",
  }).format(new Date(dateStr));
};
