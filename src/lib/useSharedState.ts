"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function isEmptyValue(value: unknown): boolean {
  return Array.isArray(value) && value.length === 0;
}

/**
 * Estado sincronizado com o banco compartilhado (via /api/data/<key>), com
 * o localStorage como cache de resiliência.
 *
 * Regra de conflito: um valor "vazio" (lista sem itens) vindo do banco NUNCA
 * sobrescreve um dado real já presente neste navegador — só reescreve o
 * local quando o banco realmente tem algo. Isso evita que um dispositivo
 * que abre o app antes da migração de outro apague dados reais por engano
 * (foi exatamente isso que corrompeu os dados de Orçamento antes dessa
 * correção). Quando o banco está vazio mas este navegador tem dado real,
 * republica esse dado — recuperando a situação.
 */
export function useSharedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setStateRaw] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dirtyRef = useRef(false);

  const setState: Dispatch<SetStateAction<T>> = (value) => {
    dirtyRef.current = true;
    setStateRaw(value);
  };

  useEffect(() => {
    let cancelled = false;
    let localValue: T | undefined;

    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        localValue = JSON.parse(cached) as T;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStateRaw(localValue);
      }
    } catch {
      // ignora falha de leitura do cache local
    }

    fetch(`/api/data/${encodeURIComponent(key)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        const hasRemote = !!data && data.value !== null && data.value !== undefined;
        const remoteValue = hasRemote ? (data.value as T) : undefined;

        if (hasRemote && !isEmptyValue(remoteValue)) {
          // o banco compartilhado já tem dado real — essa é a fonte da verdade
          setStateRaw(remoteValue as T);
          try {
            localStorage.setItem(key, JSON.stringify(remoteValue));
          } catch {
            // ignora falha ao salvar cache local
          }
        } else if (localValue !== undefined && !isEmptyValue(localValue)) {
          // banco vazio/ainda não migrado, mas este navegador tem dado real
          // — recupera republicando em vez de aceitar o vazio como verdade
          dirtyRef.current = true;
        }
        // os dois vazios: segue no valor inicial, sem escrever nada ainda
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
    if (!loaded || !dirtyRef.current) return;

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
