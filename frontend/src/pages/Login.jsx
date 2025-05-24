import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Login = () => {
  const { setUser, setIsLoggedIn, loading, setLoading, authApi } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${authApi}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {loading ? <Loader className="animate-spin" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
