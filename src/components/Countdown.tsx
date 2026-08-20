"use client";

import { useEffect, useState } from "react";

export function Countdown({ startDate }: { startDate: string | null }) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!startDate) return;
    const target = new Date(startDate).getTime();
    const now = Date.now();
    // Calculado só no cliente para evitar mismatch de hidratação (server/client têm "now" diferentes).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDaysLeft(Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
  }, [startDate]);

  if (!startDate) {
    return (
      <p className="text-sm text-black/60 dark:text-white/60">
        Datas ainda não definidas — vamos decidir juntos.
      </p>
    );
  }

  return (
    <p className="text-2xl font-semibold">
      {daysLeft !== null && daysLeft >= 0
        ? `Faltam ${daysLeft} dias`
        : "Boa viagem!"}
    </p>
  );
}
