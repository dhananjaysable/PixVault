import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loader, User, Mail, Lock, Camera, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const { authApi } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${authApi}/register`,
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-purple-800 md:text-3xl">
            Create Your Account
          </h1>
        </div>

        <div className="p-8 bg-white border border-pink-100 shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute w-5 h-5 text-purple-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full py-3 pl-12 pr-4 text-purple-900 placeholder-purple-400 transition-all duration-300 border border-pink-200 bg-pink-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:bg-pink-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-purple-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full py-3 pl-12 pr-4 text-purple-900 placeholder-purple-400 transition-all duration-300 border border-pink-200 bg-pink-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:bg-pink-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-purple-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="w-full py-3 pl-12 pr-4 text-purple-900 placeholder-purple-400 transition-all duration-300 border border-pink-200 bg-pink-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent hover:bg-pink-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-white transition-all duration-300 transform shadow-lg cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:from-pink-600 hover:to-purple-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover:shadow-pink-500/25"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-purple-600 bg-white">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-purple-600 transition-all duration-300 transform border-2 border-pink-200 rounded-xl hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:scale-105 group"
            >
              <span>Sign In Instead</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
