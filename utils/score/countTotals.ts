export default function countTotals({ score }: { score: any }) {
  const stats = score.map((split: any) => {
    const splitStats = [0, 0, 0, 0, 0];
    split.forEach((end: string[]) => {
      end.forEach((arrow: string) => {
        if (arrow === "x" || arrow === "X") {
          splitStats[2]++;
          splitStats[4] += 10;
        } else if (arrow === "10") {
          splitStats[0]++;
          splitStats[4] += 10;
        } else if (arrow === "9") {
          splitStats[1]++;
          splitStats[4] += 9;
        } else if (arrow === "m" || arrow === "M" || arrow === "0") {
          splitStats[3]++;
          splitStats[4] += 0;
        } else {
          splitStats[4] += Number(arrow);
        }
      });
    });
    return splitStats;
  });
  const total = stats.reduce((a: any, b: any) => a + b[4], 0);

  return { stats, total };
}
