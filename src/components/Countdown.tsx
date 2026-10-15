"use client";

import { useEffect, useState } from "react";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
}

function diffFrom(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const totalMinutes = Math.floor(diff / (1000 * 60));
  return {
    days: Math.floor(totalMinutes / (60 * 24)),
    hours: Math.floor((totalMinutes % (60 * 24)) / 60),
    minutes: totalMinutes % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl sm:text-7xl font-bold tabular-nums leading-none">
        {value}
      </span>
      <span className="text-xs sm:text-sm uppercase tracking-wide text-black/60 dark:text-white/60 mt-2">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ startDate }: { startDate: string | null }) {
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    if (!startDate) return;
    const target = new Date(startDate).getTime();

    // Calculado só no cliente para evitar mismatch de hidratação (server/client têm "now" diferentes).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRemaining(diffFrom(target));

    const interval = setInterval(() => {
      setRemaining(diffFrom(target));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [startDate]);

  if (!startDate) {
    return (
      <p className="text-sm text-center text-black/60 dark:text-white/60">
        Datas ainda não definidas — vamos decidir juntos.
      </p>
    );
  }

  if (remaining === undefined) {
    return <div className="h-24 sm:h-32" />;
  }

  if (remaining === null) {
    return (
      <p className="text-3xl sm:text-4xl font-bold text-center">Boa viagem! 🎒</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-start gap-6 sm:gap-10">
        <Unit value={remaining.days} label={remaining.days === 1 ? "dia" : "dias"} />
        <Unit value={remaining.hours} label={remaining.hours === 1 ? "hora" : "horas"} />
        <Unit
          value={remaining.minutes}
          label={remaining.minutes === 1 ? "minuto" : "minutos"}
        />
      </div>
    </div>
  );
}
