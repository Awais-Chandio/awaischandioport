"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";

// The shortcut badge is meaningless on a phone, so it only renders where a
// hover-capable pointer (and so, in practice, a keyboard) exists. It also fades
// in once the platform is known, so "Ctrl" never flashes before "⌘" on a Mac.
const Shortcut = ({ label }) => (
  <kbd
    className={`hidden items-center rounded-full border border-line/15 bg-fg/[0.05] px-2 py-0.5 font-sans text-[11px] font-semibold tracking-wide text-fg-dim transition-opacity duration-300 [@media(hover:hover)]:inline-flex ${
      label ? "opacity-100" : "opacity-0"
    }`}
  >
    {label ?? "Ctrl"}
    <span aria-hidden="true">&nbsp;K</span>
  </kbd>
);

/**
 * Desktop nav control: a search pill carrying the ⌘K / Ctrl K badge. Sits with
 * the theme toggle and matches its 44px height and border treatment.
 */
export const NavPaletteButton = () => {
  const { openPalette, modifierLabel } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command palette"
      aria-keyshortcuts="Meta+K Control+K"
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line/10 bg-fg/[0.04] px-3.5 text-fg-muted transition hover:border-accent/40 hover:text-accent"
    >
      <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4" />
      <Shortcut label={modifierLabel} />
    </button>
  );
};

/**
 * Mobile nav control: an icon-only round button the same size as the theme
 * toggle and the menu button beside it. This is the palette's way in on a phone.
 */
export const MobilePaletteButton = () => {
  const { openPalette } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open command palette"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/10 bg-fg/[0.04] text-fg transition hover:border-accent/40 hover:text-accent"
    >
      <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
};

/**
 * Footer discovery line. Keyboard visitors get the shortcut spelled out; touch
 * visitors get the same button without the badge, so it stays a real control
 * rather than a hint pointing at keys they do not have.
 */
export const FooterPaletteHint = () => {
  const { openPalette, modifierLabel } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-keyshortcuts="Meta+K Control+K"
      className="inline-flex min-h-[44px] items-center gap-3 rounded-full border border-line/10 bg-fg/[0.04] px-4 py-2 text-sm font-medium text-fg-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg"
    >
      <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4 text-accent" />
      Quick search
      <Shortcut label={modifierLabel} />
    </button>
  );
};
