import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardStyles = cva("rounded-[28px] border backdrop-blur-2xl transition-colors duration-300", {
  variants: {
    variant: {
      default: "border-line/10 bg-fg/[0.03] shadow-soft",
      strong: "border-line/10 bg-fg/[0.05] shadow-lift",
      flat: "border-line/10 bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Card = ({ variant, className, children, ...props }) => (
  <div className={cn(cardStyles({ variant }), className)} {...props}>
    {children}
  </div>
);

export default Card;
