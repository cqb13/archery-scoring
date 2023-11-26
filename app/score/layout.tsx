"use client";

import { ScoreContextProvider } from "@/lib/context/scoreContext";

export default function ScoreLayout({ children }: { children: any }) {
  return (
    <main className='flex items-center justify-center pt-4 text-black'>
      <ScoreContextProvider>{children}</ScoreContextProvider>
    </main>
  );
}
