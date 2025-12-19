import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-xl hidden sm:block">PinSphere</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            placeholder="Search ideas..."
            className="
              w-full pl-12 pr-4 py-2 rounded-full bg-neutral-100
              focus:outline-none focus:ring-2 focus:ring-red-500/30
            "
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/upload" className="p-2 rounded-full hover:bg-neutral-100">
                <Plus />
              </Link>
              <button className="p-2 rounded-full hover:bg-neutral-100">
                <Bell />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-100">
                <User />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-full hover:bg-neutral-100 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-full hover:bg-neutral-100">
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-full hover:bg-neutral-100"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
