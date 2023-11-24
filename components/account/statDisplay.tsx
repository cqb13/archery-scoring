import StatBox from "@/components/account/statBox";

export default function StatDisplay({
  name,
  averageScore,
  highScore,
  lowScore,
  totalGames,
  totalSplits
}: {
  name: string;
  averageScore: number;
  highScore: number;
  lowScore: number;
  totalGames: number;
  totalSplits: number;
}) {
  return (
    <section className='border-gray-300 rounded-md shadow-card px-10 py-5'>
      <div>
        <h2 className=' text-lg px-4 py-2'>{name}</h2>
      </div>
      <div className='flex flex-wrap justify-center gap-2'>
        <StatBox name='Average Score' value={averageScore} />
        <StatBox name='High Score' value={highScore} />
        <StatBox name='Low Score' value={lowScore} />
        <StatBox name='Total Games' value={totalGames} />
        <StatBox name='Total Splits' value={totalSplits} />
      </div>
    </section>
  );
}
