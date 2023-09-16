export const getForecastDate = (apiDate) => {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  const date = new Date(apiDate + "T00:00:00").toLocaleDateString(
    "es",
    options
  );
  return date;
};
