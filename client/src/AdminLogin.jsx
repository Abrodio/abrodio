import { useState } from "react";
import api from "./api";
import "./styles.css";

export default function AdminLogin({ onSwitch }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/admin/login", form);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      onSwitch("adminDashboard");
    } catch (e) {
      setError(e.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="bg">
      <div className="card">
        <div className="logo">🛡️</div>
        <h1>Admin Portal</h1>
        <p className="subtitle">Login to manage Abrodio</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input placeholder="Enter admin username" value={form.username} onChange={(e) => set("username", e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary admin-btn" disabled={loading}>
            {loading ? "Logging in..." : "Go to Dashboard →"}
          </button>
        </form>
        <hr className="divider" />
        <button className="btn-link" onClick={() => onSwitch("login")}>← Back to User Login</button>
      </div>
    </div>
  );
}
