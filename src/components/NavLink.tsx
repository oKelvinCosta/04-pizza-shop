import { Link, type LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps;

export default function NavLink(props: NavLinkProps) {
  // Know the current path
  const { pathname } = useLocation();

  // props.to == link active
  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
    />
  );
}
