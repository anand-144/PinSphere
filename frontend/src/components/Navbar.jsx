import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link to="/" className="text-2xl font-bold">
        PinSphere
      </Link>

      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/upload" className="btn-sm">
              Upload
            </Link>
            <button onClick={logout} className="btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
