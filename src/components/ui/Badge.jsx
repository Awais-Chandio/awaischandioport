import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-semibold",
  {
    variants: {
      variant: {
        default: "border-line/10 bg-fg/[0.05] text-fg-muted",
        accent: "border-accent/25 bg-accent/10 text-accent",
        outline: "border-line/20 bg-transparent text-fg-muted",
      },
      size: {
        sm: "px-3 py-1 text-[11px] uppercase tracking-[0.2em]",
        md: "px-4 py-2 text-xs uppercase tracking-[0.22em]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Badge = ({ variant, size, className, children, ...props }) => (
  <span className={cn(badgeStyles({ variant, size }), className)} {...props}>
    {children}
  </span>
);

export default Badge;
