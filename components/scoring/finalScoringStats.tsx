import countTotals from "@/utils/score/countTotals";
import { useEffect, useState } from "react";

export default function FinalScoringStats(score: any) {
  const [scoreStats, setScoreStats] = useState({} as any);
  const [combinedStats, setCombinedStats] = useState([0, 0, 0, 0, 0] as any);

  useEffect(() => {
    const { stats, total } = countTotals(score);
    setScoreStats(stats);
    combineStats(stats);
  }, [score]);

  const combineStats = (stats: any) => {
    let combinedStats: any = [0, 0, 0, 0, 0];
    for (let i = 0; i < stats.length; i++) {
      for (let j = 0; j < stats[i].length; j++) {
        combinedStats[j] += stats[i][j];
      }
    }
    setCombinedStats(combinedStats);
  };

  return (
    <section className='shadow-card p-5 border border-gray-300 rounded-md'>
      <table className='w-full'>
        <thead>
          <th className='text-center'>Split</th>
          <th className='text-center'>{"10's"}</th>
          <th className='text-center'>{"9's"}</th>
          <th className='text-center'>{"X's"}</th>
          <th className='text-center'>{"M's"}</th>
          <th className='text-center'>Score</th>
        </thead>
        <tbody>
          {scoreStats.length > 1
            ? scoreStats.map((split: any, splitIndex: number) => (
                <tr key={splitIndex}>
                  <td className='text-center'>{splitIndex + 1}</td>
                  {split.map((stat: string, statIndex: number) => (
                    <td key={statIndex} className='text-center'>
                      {stat}
                    </td>
                  ))}
                </tr>
              ))
            : null}
          <tr className=''>
            <td className='text-center'>Total</td>
            {combinedStats.map((stat: string, statIndex: number) => (
              <td key={statIndex} className='text-center'>
                {stat}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
