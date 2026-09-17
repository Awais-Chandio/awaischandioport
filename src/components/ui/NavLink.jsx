import Link from "next/link";
import { cn } from "@/lib/utils";

const NavLink = ({ href, title, onClick, active }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-active={active}
      className={cn(
        "nav-underline rounded-full px-4 py-2 text-sm font-medium transition",
        active ? "text-fg" : "text-fg-muted hover:text-fg"
      )}
    >
      {title}
    </Link>
  );
};

export default NavLink;
