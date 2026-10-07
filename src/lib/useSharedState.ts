"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

/**
 * Estado sincronizado com o banco compartilhado (via /api/data/<key>), com
 * o localStorage como cache de resiliência — nunca como fonte de verdade.
 * Assim os dados aparecem iguais pra todo mundo que abre o app, e o
 * navegador local continua funcionando mesmo se a API cair por um instante.
 */
export function useSharedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(cached) as T);
      }
    } catch {
      // ignora falha de leitura do cache local
    }

    fetch(`/api/data/${encodeURIComponent(key)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || data.value === null || data.value === undefined) return;
        setState(data.value as T);
        try {
          localStorage.setItem(key, JSON.stringify(data.value));
        } catch {
          // ignora falha ao salvar cache local
        }
      })
      .catch(() => {
        // offline ou banco indisponível — segue com o cache local/valor inicial
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignora falha ao salvar cache local
    }

    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(() => {
      fetch(`/api/data/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).catch(() => {
        // falha de rede — o cache local já tem o valor mais recente, tenta de novo na próxima mudança
      });
    }, 500);

    return () => {
      if (writeTimer.current) clearTimeout(writeTimer.current);
    };
  }, [key, state, loaded]);

  return [state, setState, loaded];
}
