"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import BeyondTheCodeDialog from "@/components/beyond/BeyondTheCodeDialog";

const BeyondTheCodeContext = createContext(null);

export const useBeyondTheCode = () => {
  const context = useContext(BeyondTheCodeContext);
  if (!context) {
    throw new Error("useBeyondTheCode must be used inside <BeyondTheCodeProvider>.");
  }
  return context;
};

/**
 * Owns the "Beyond the Code" dialog's open state and renders it, so the footer
 * link and the command palette open one shared instance — the same shape as
 * CommandPaletteProvider. It has to sit outside that provider, because the
 * palette calls `openBeyondTheCode` from here.
 */
const BeyondTheCodeProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef(null);

  // Neither opener is a Radix `Dialog.Trigger`, so Radix cannot hand focus back
  // on close. The element that had focus is remembered instead; a layout effect
  // runs before Radix's own effect moves focus into the dialog.
  useLayoutEffect(() => {
    if (open) returnFocusRef.current = document.activeElement;
  }, [open]);

  const restoreFocus = (event) => {
    event.preventDefault();
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target?.isConnected && target !== document.body) target.focus();
  };

  const openBeyondTheCode = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openBeyondTheCode }), [openBeyondTheCode]);

  return (
    <BeyondTheCodeContext.Provider value={value}>
      {children}
      <BeyondTheCodeDialog open={open} onOpenChange={setOpen} onCloseAutoFocus={restoreFocus} />
    </BeyondTheCodeContext.Provider>
  );
};

export default BeyondTheCodeProvider;
