const mergeDateTimeToValue = (sortedDateTime, dateMap) => {
  let tempMap = new Map();

  // merges dates and times to their values
  for (let i = 0; i < sortedDateTime.length; i++) {
    for (let [key, value] of dateMap) {
      if (key.includes(sortedDateTime[i])) {
        tempMap.set(sortedDateTime[i], value);
        break;
      }
    }
  }

  // merge the new map with their names
  for (let [key, value] of tempMap) {
    for (let [key2] of dateMap) {
      if (key2.includes(key)) {
        tempMap.set(key2, value);
        break;
      }
    }
  }

  // remove the old keys
  for (let [key] of tempMap) {
    if (!key.includes("|")) {
      tempMap.delete(key);
    }
  }

  // reverse the map
  tempMap = new Map([...tempMap.entries()].reverse());

  return tempMap;
};

export default mergeDateTimeToValue;
