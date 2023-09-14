export default function mergeDateTimeToValue(
  sortedDateTime: any,
  dateMap: any
) {
  let tempMap = new Map();

  for (let i = 0; i < sortedDateTime.length; i++) {
    for (let [key, value] of dateMap) {
      if (key.includes(sortedDateTime[i])) {
        tempMap.set(key, value);
      }
    }
  }

  return tempMap;
}
