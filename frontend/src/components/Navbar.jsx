import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
const Navbar = () => {
  const { isLoggedIn, authApi, setIsLoggedIn, setUser } = useAuth();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${authApi}/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between w-full p-4 border-b border-gray-200">
      <Link to="/home" className="cursor-pointer">
        <h1 className="text-3xl font-bold">
          Pix<span className="text-green-700">Vault</span>
        </h1>
      </Link>
      <div>
        <ul className="flex items-center justify-center gap-5">
          <Link to={"/home"} className="text-xl font-semibold">
            Home
          </Link>
          <a href={"#about"} className="text-xl font-semibold">
            About
          </a>
          <a href={"#services"} className="text-xl font-semibold">
            Services
          </a>
          <a href="#contact" className="text-xl font-semibold">
            Contact
          </a>
        </ul>
      </div>
      <div className="flex items-center justify-center gap-3">
        {!isLoggedIn ? (
          <>
            {" "}
            <Link
              to="/login"
              className="px-6 py-3 font-semibold text-green-600 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 font-semibold text-white bg-green-700 rounded-full cursor-pointer hover:bg-green-800"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="p-5 rounded-full cursor-pointer"
            >
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button
              variant="destructive"
              className="p-5 rounded-full cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
