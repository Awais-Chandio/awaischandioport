"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CommandPalette from "@/components/command-palette/CommandPalette";

const CommandPaletteContext = createContext(null);

export const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used inside <CommandPaletteProvider>.");
  }
  return context;
};

/**
 * Owns the palette's open state and the one global Cmd/Ctrl+K listener, and
 * renders the palette itself. Anything that wants to open it — the nav badge,
 * the mobile search button, the footer hint — calls `openPalette` from context,
 * so there is exactly one instance and one keyboard listener on the page.
 */
const CommandPaletteProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  // Null until mounted: the platform is only known in the browser, and rendering
  // a guess on the server would hydrate as a mismatch for Mac visitors.
  const [modifierLabel, setModifierLabel] = useState(null);

  useEffect(() => {
    const platform = navigator.userAgentData?.platform || navigator.platform || "";
    setModifierLabel(/mac|iphone|ipad|ipod/i.test(platform) ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key?.toLowerCase() !== "k" || event.repeat || event.isComposing) return;
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;

      // Ctrl+K focuses the address/search bar in several browsers, so the
      // default has to be cancelled or the palette opens behind that.
      event.preventDefault();
      setOpen((current) => !current);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const openPalette = useCallback(() => setOpen(true), []);

  const value = useMemo(
    () => ({ open, setOpen, openPalette, modifierLabel }),
    [open, openPalette, modifierLabel]
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPalette open={open} onOpenChange={setOpen} />
    </CommandPaletteContext.Provider>
  );
};

export default CommandPaletteProvider;
