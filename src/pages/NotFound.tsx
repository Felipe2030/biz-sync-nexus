
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6 w-16 h-16 rounded-full bg-mobserv-blue mx-auto flex items-center justify-center">
          <span className="text-2xl font-bold text-white">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-mobserv-gray">Page not found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-mobserv-blue text-white rounded-md hover:bg-mobserv-blue-light transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
