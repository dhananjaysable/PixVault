import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Camera, Menu } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, authApi, setIsLoggedIn, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="relative z-50 px-6 py-4 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link
          to="/"
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="flex items-center justify-center w-10 h-10 transition-transform duration-300 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl group-hover:scale-110">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-transparent transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text hover:from-pink-600 hover:to-purple-600">
            PixVault
          </span>
        </Link>
        <div className="items-center hidden space-x-8 md:flex">
          <Link
            to="/"
            className="relative font-medium text-purple-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <a
            href="#about"
            className="relative font-medium text-purple-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#features"
            className="relative font-medium text-purple-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="#contact"
            className="relative font-medium text-purple-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
        <div className="items-center hidden space-x-2 md:flex">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-2 font-semibold text-purple-700 transition-all duration-300 transform border border-purple-200 rounded-full cursor-pointer hover:text-pink-500 hover:border-pink-300 hover:bg-white/50 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-pink-500/25"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="px-6 py-2 font-semibold text-purple-700 transition-all duration-300 transform border border-purple-200 rounded-full cursor-pointer w-30 hover:text-pink-500 hover:border-pink-300 hover:bg-white/50 hover:scale-105"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button
                onClick={handleLogout}
                className="px-6 py-2 font-semibold text-white transition-all duration-300 transform border-0 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-pink-500/25"
              >
                Logout
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center md:hidden">
          <button
            className="text-purple-700 transition-colors hover:text-pink-500 focus:outline-none"
            onClick={handleMenuToggle}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute left-0 right-0 z-50 shadow-lg md:hidden bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="flex flex-col items-center py-4 space-y-3">
            <Link
              to="/"
              className="font-medium text-purple-700 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#about"
              className="font-medium text-purple-700 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="font-medium text-purple-700 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#contact"
              className="font-medium text-purple-700 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col items-center w-full pt-2 space-y-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="w-40 px-6 py-2 font-semibold text-center text-purple-700 transition-all duration-300 transform border border-purple-200 rounded-full hover:text-pink-500 hover:border-pink-300 hover:bg-white/50 hover:scale-105"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-40 px-6 py-2 font-semibold text-center text-white transition-all duration-300 transform rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-pink-500/25"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="w-40 px-6 py-2 font-semibold text-center text-purple-700 transition-all duration-300 transform border border-purple-200 rounded-full hover:text-pink-500 hover:border-pink-300 hover:bg-white/50 hover:scale-105"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-40 px-6 py-2 font-semibold text-center text-white transition-all duration-300 transform border-0 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 hover:shadow-pink-500/25"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
