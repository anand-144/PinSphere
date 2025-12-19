import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | PinSphere</title>
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4">
        <div className="text-center animate-fade-up">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Sorry, we couldn't find the page you're looking for.
            Maybe it was moved or doesn't exist.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
