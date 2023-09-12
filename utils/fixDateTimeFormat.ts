export default function fixDateTimeFormat(date: string, time: string) {
  const dateArray = date.split("-");
  const timeArray = time.split(":");

  if (dateArray[1].length < 2) {
    dateArray[1] = "0" + dateArray[1];
  }

  if (dateArray[2].length < 2) {
    dateArray[2] = "0" + dateArray[2];
  }

  if (timeArray[1].length < 2) {
    timeArray[1] = "0" + timeArray[1];
  }

  date = dateArray.join("-");
  time = timeArray.join(":");

  return { date, time };
};
