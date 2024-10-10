type Days =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

const daysOfWeek: Days[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const getDay = (): Days => {
  const currentDate = new Date();
  return daysOfWeek[currentDate.getDay()];
};

export const isDay = (day: string) => {
  return getDay() === day.toLowerCase();
};
