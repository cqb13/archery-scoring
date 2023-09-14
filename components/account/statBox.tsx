export default function StatBox({ name, value }: { name: string; value: number }) {
  return (
    <div className='border-gray-300 rounded-md flex flex-col justify-center gap-2 shadow-card w-48 h-48'>
      <h1 className='text-center text-lg'>{name}</h1>
      <h1 className='text-center text-lg'>{value}</h1>
    </div>
  );
}
