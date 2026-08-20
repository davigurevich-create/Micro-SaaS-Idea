"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * Estado sincronizado com localStorage. `loaded` fica true depois da leitura
 * inicial no cliente — use pra evitar sobrescrever dados salvos com o valor
 * semente antes da leitura terminar.
 */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(JSON.parse(saved) as T);
      }
    } catch {
      // ignora falha de leitura
    } finally {
      setLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignora falha ao salvar
    }
  }, [key, state, loaded]);

  return [state, setState, loaded];
}
