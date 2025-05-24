import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/home" element={<Landing />} />
          <Route
            path="/register"
            element={
              !isLoggedIn ? (
                <Register />
              ) : (
                isLoggedIn && <Navigate to="/dashboard" replace />
              )
            }
            replace
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
