import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import { FaGlobe } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

export default function NavActions() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-5">

      {isAuthenticated ? (
        <>
          <Link
            // to="/become-host"
            to="/listings/new"
            className="font-medium hover:text-rose-500 transition"
          >
            Become a Host
          </Link>

          <button className="text-xl hover:text-rose-500 transition">
            <FaGlobe />
          </button>

          <div className="flex items-center gap-3 border rounded-full px-4 py-2">

            <HiBars3 className="text-xl" />

            <FaRegUserCircle className="text-2xl" />

            <span className="font-medium">
              {user?.username}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-500 text-sm"
            >
              Logout
            </button>

          </div>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="font-medium hover:text-rose-500"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="font-medium hover:text-rose-500"
          >
            Sign Up
          </Link>
        </>
      )}

    </div>
  );
}