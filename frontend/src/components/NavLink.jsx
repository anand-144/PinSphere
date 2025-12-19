import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 rounded-full font-semibold transition-colors ${
          isActive
            ? "text-red-600"
            : "text-neutral-700 hover:bg-neutral-100"
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
};

export default NavLink;
