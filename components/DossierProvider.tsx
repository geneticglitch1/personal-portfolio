"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Dossier from "./Dossier";

const DossierContext = createContext<{ open: (i: number) => void }>({
  open: () => {},
});

/** Lets any card or ledger row open the detail overlay by project index. */
export function useDossier() {
  return useContext(DossierContext);
}

export default function DossierProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <DossierContext.Provider value={value}>
      {children}
      <Dossier index={index} onClose={close} onIndex={setIndex} />
    </DossierContext.Provider>
  );
}
