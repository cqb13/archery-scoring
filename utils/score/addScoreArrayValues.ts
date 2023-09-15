export default async function addScoreArrayValues(array: any) {
  let splitScoreArray = [];
  for (let i = 0; i < array.length; i++) {
    let subArraySum = 0;
    for (let j = 0; j < array[i].length; j++) {
      for (let k = 0; k < array[i][j].length; k++) {
        if (array[i][j][k] === "x" || array[i][j][k] === "X") {
          subArraySum += 10;
        } else if (
          array[i][j][k] === "m" ||
          array[i][j][k] === "M" ||
          array[i][j][k] === " " ||
          array[i][j][k] === ""
        ) {
          subArraySum += 0;
        } else {
          subArraySum += Number(array[i][j][k]);
        }
      }
    }
    splitScoreArray.push(subArraySum);
  }
  return splitScoreArray;
}
