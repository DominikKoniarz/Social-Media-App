import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-zinc-100">
      <div className="flex flex-col items-center justify-center text-zinc-200">
        <p className="text-6xl custom-outline">Page Not Found!</p>
        <p className="pb-4 text-2xl opacity-50 text-zinc-300">404 error</p>
        <Link
          to="/"
          className="text-xs italic custom-outline hover:text-zinc-600"
        >
          Go to main site
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
