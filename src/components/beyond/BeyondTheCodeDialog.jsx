"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import BeyondStage from "@/components/beyond/BeyondStage";
import { fade, fadeRise } from "@/lib/motion";

/**
 * The "Beyond the Code" panel. The same accessible modal as the project detail
 * dialog and the command palette: Radix Dialog for the focus trap, Escape,
 * outside-click and scroll lock, with the shared fade/fade-and-rise variants.
 *
 * Nothing inside is mounted while it is closed. AnimatePresence removes the
 * content once the exit finishes, and that is what tears down the WebGL scene,
 * so no renderer is left running in the background.
 */
const BeyondTheCodeDialog = ({ open, onOpenChange, onCloseAutoFocus }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <AnimatePresence>
      {open ? (
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild forceMount>
            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              exit="exit"
              // Keeps Lenis from scrolling the page behind the dialog.
              data-lenis-prevent
              className="fixed inset-0 z-[95] overflow-y-auto overscroll-contain bg-canvas/80 backdrop-blur-2xl"
            >
              <div className="flex min-h-full items-center justify-center px-4 py-[max(1rem,env(safe-area-inset-top))] sm:py-8">
                <Dialog.Content asChild forceMount onCloseAutoFocus={onCloseAutoFocus}>
                  <motion.div
                    variants={fadeRise}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative w-full max-w-2xl rounded-[30px] border border-line/10 bg-canvas-soft p-5 shadow-lift sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                          Off duty
                        </p>
                        <Dialog.Title className="mt-2 font-display text-2xl font-medium tracking-tight text-fg sm:text-3xl">
                          Beyond the Code
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm leading-7 text-fg-muted">
                          A few things I enjoy away from the keyboard.
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/10 bg-fg/[0.05] text-fg transition hover:bg-fg/[0.1]"
                          aria-label="Close Beyond the Code"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    <div className="mt-6">
                      <BeyondStage />
                    </div>
                  </motion.div>
                </Dialog.Content>
              </div>
            </motion.div>
          </Dialog.Overlay>
        </Dialog.Portal>
      ) : null}
    </AnimatePresence>
  </Dialog.Root>
);

export default BeyondTheCodeDialog;
