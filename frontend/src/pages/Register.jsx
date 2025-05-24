import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const Register = () => {
  const { loading, setLoading, authApi } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        setLoading(false);
        navigate("/login");
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
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">
          {loading ? <Loader className="animate-spin" /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
