import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import clsx from "clsx";

const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => (
    <RouterNavLink
      ref={ref}
      to={to}
      className={({ isActive, isPending }) =>
        clsx(className, isActive && activeClassName, isPending && pendingClassName)
      }
      {...props}
    />
  )
);

NavLink.displayName = "NavLink";
export default NavLink;
