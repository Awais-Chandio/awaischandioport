"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import { useBeyondTheCode } from "@/components/beyond/BeyondTheCodeProvider";

/**
 * The footer's way into the panel. A small button beside the sitemap rather
 * than a page link: it opens a dialog, so it says so to assistive tech.
 */
const BeyondTrigger = ({ className = "" }) => {
  const { openBeyondTheCode } = useBeyondTheCode();

  return (
    <button
      type="button"
      onClick={openBeyondTheCode}
      aria-haspopup="dialog"
      className={`inline-flex min-h-[44px] items-center gap-2 text-sm text-fg-dim transition-colors duration-300 hover:text-accent ${className}`}
    >
      <SparklesIcon aria-hidden="true" className="h-4 w-4" />
      Beyond the Code
    </button>
  );
};

export default BeyondTrigger;
