import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLink = ({ href, title, onClick, active }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-active={active}
      className={cn(
        "nav-underline inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition lg:min-h-0 lg:px-2.5 lg:py-2 xl:px-4",
        active ? "text-fg" : "text-fg-muted hover:text-fg"
      )}
    >
      {title}
    </Link>
  );
};

export default NavLink;
