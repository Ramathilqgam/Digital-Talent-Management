import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onNavigateToRegister={() => navigate("/register")} />;
}

function RegisterWrapper() {
  const navigate = useNavigate();
  return <Register onNavigateToLogin={() => navigate("/")} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/register" element={<RegisterWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}