'use client';

import { useRouter } from 'next/navigation';

export default function NavigateButton({ to, label }) {
  const router = useRouter();

  return (
    <button onClick={() => router.push(to)}>
      {label}
    </button>
  );
}
