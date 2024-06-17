'use client';
import { Faucet, Tracker } from '@/components';

export default function Home() {
  return (
    <div className="p-8 xl:max-w-3xl md:w-full mx-auto min-h-screen">
      <Faucet />
      <Tracker />
    </div>
  );
}
