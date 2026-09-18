import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Magnetic from "./Magnetic";

export const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
        secondary:
          "border border-line/15 bg-fg/[0.04] text-fg backdrop-blur-xl hover:-translate-y-0.5 hover:border-accent/40 hover:bg-fg/[0.07]",
        ghost:
          "text-fg-muted hover:text-fg",
      },
      size: {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3.5 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Button = ({
  as,
  href,
  variant,
  size,
  magnetic = false,
  className,
  children,
  ...props
}) => {
  const classes = cn(buttonStyles({ variant, size }), className);
  const isExternal = typeof href === "string" && href.startsWith("http");

  let content;
  if (href && !as) {
    content = isExternal ? (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...props}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  } else {
    const Component = as || "button";
    // `href` is destructured above, so an explicit `as` (e.g. as="a" for a
    // download link, which next/link would otherwise intercept) has to have it
    // forwarded back on deliberately.
    content = (
      <Component className={classes} {...(href ? { href } : {})} {...props}>
        {children}
      </Component>
    );
  }

  if (!magnetic) return content;

  return <Magnetic className={className}>{content}</Magnetic>;
};

export default Button;
