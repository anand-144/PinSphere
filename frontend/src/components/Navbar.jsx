import { Link, useNavigate } from "react-router-dom";
import { Search, Plus, Bell, User, Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">PinSphere</span>
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="btn-ghost">Home</Link>
            <Link to="/explore" className="btn-ghost">Explore</Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-full text-sm 
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/upload" 
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 
                           flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </Link>
                <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 
                                 flex items-center justify-center transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full" />
                </button>
                <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 
                                 flex items-center justify-center transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="btn-ghost text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm font-semibold">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-up">
            <div className="flex flex-col gap-2">
              <Link to="/" className="btn-ghost text-left">Home</Link>
              <Link to="/explore" className="btn-ghost text-left">Explore</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/upload" className="btn-ghost text-left">Upload</Link>
                  <button onClick={handleLogout} className="btn-ghost text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost text-left">Log in</Link>
                  <Link to="/register" className="btn-primary text-center mt-2">Sign up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;