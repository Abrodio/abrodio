import { useState } from "react";
import api from "./api";
import "./styles.css";

export default function Login({ onSwitch }) {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/user/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onSwitch("chat");
    } catch (e) {
      setError(e.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="bg">
      <div className="card">
        <div className="logo">💬</div>
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your city chat</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Mobile Number</label>
            <input placeholder="Enter mobile number" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
        <hr className="divider" />
        <button className="btn-link" onClick={() => onSwitch("register")}>Don't have an account? Register</button>
        <button className="btn-link" onClick={() => onSwitch("adminLogin")}>🛡 Admin? Login here</button>
      </div>
    </div>
  );
}
