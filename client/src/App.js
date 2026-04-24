import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Chat from "./Chat";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function getInitialScreen() {
  if (localStorage.getItem("admin")) return "adminDashboard";
  if (localStorage.getItem("user")) return "chat";
  return "login";
}

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);

  const nav = (s) => setScreen(s);

  if (screen === "register")       return <Register onSwitch={nav} />;
  if (screen === "login")          return <Login onSwitch={nav} />;
  if (screen === "chat")           return <Chat onLogout={() => nav("login")} />;
  if (screen === "adminLogin")     return <AdminLogin onSwitch={nav} />;
  if (screen === "adminDashboard") return <AdminDashboard onLogout={() => nav("adminLogin")} />;

  return <Login onSwitch={nav} />;
}
