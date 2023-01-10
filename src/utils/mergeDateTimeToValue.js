const mergeDateTimeToValue = (sortedDateTime, dateMap) => {
  let tempMap = new Map();

  // merges dates and times to their values
  for (let i = 0; i < sortedDateTime.length; i++) {
    for (let [key, value] of dateMap) {
      if (key.includes(sortedDateTime[i])) {
        tempMap.set(key, value);
      }
    }
  }

  return tempMap;
};

export default mergeDateTimeToValue;
