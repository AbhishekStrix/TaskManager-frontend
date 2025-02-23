import { Link } from "react-router-dom";

const Navbar = ({ currUser, handleLogout }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md 
                   fixed top-0 left-0 w-full z-50">
      <div className="flex items-center gap-6">
        <Link
          to="/home"
          className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
        >
          Dashboard
        </Link>

        <Link
          to="/tasks"
          className="text-white text-lg font-semibold hover:text-gray-300 transition duration-300"
        >
          Tasks
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {currUser ? (
          <>
            <span className="text-white text-lg font-semibold">
              {currUser.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
