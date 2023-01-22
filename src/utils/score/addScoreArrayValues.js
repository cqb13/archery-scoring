const addScoreArrayValues = (arr) => {
  let splitScoreArray = [];
  for (let i = 0; i < arr.length; i++) {
    let subArraySum = 0;
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = 0; k < arr[i][j].length; k++) {
        if (arr[i][j][k] === "x" || arr[i][j][k] === "X") {
          subArraySum += 10;
        } else if (
          arr[i][j][k] === "m" ||
          arr[i][j][k] === "M" ||
          arr[i][j][k] === " " ||
          arr[i][j][k] === ""
        ) {
          subArraySum += 0;
        } else {
          subArraySum += Number(arr[i][j][k]);
        }
      }
    }
    splitScoreArray.push(subArraySum);
  }
  return splitScoreArray;
};

export default addScoreArrayValues;
