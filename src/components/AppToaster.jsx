"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const AppToaster = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      toastOptions={{
        style: {
          background: "rgb(var(--surface-2))",
          color: "rgb(var(--fg))",
          border: "1px solid rgb(var(--line) / 0.12)",
        },
      }}
    />
  );
};

export default AppToaster;
