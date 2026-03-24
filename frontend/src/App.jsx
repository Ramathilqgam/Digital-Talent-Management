import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";   // ✅ NEW

function LoginWrapper() {
  const navigate = useNavigate();
  return (
    <Login onNavigateToRegister={() => navigate("/register")} />
  );
}

function RegisterWrapper() {
  const navigate = useNavigate();
  return (
    <Register onNavigateToLogin={() => navigate("/")} />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
        
        {/* ✅ ADD THIS */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;