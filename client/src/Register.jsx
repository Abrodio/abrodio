import { useState, useEffect } from "react";
import api from "./api";
import "./styles.css";

export default function Register({ onSwitch }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ name: "", mobile: "", password: "", country_id: "", city_id: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/location/countries").then((r) => setCountries(r.data));
  }, []);

  useEffect(() => {
    if (form.country_id) {
      api.get(`/location/cities/${form.country_id}`).then((r) => setCities(r.data));
    } else {
      setCities([]);
    }
  }, [form.country_id]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/user/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onSwitch("chat");
    } catch (e) {
      setError(e.response?.data?.error || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="bg">
      <div className="card">
        <div className="logo">🏙️</div>
        <h1>Create Account</h1>
        <p className="subtitle">Join your Abrodio room</p>
        {error && <div className="error-box">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full Name</label>
            <input placeholder="Enter your name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="field">
            <label>Mobile Number</label>
            <input placeholder="Enter mobile number" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Create password" value={form.password} onChange={(e) => set("password", e.target.value)} required />
          </div>
          <div className="field">
            <label>Country</label>
            <select value={form.country_id} onChange={(e) => set("country_id", e.target.value)} required>
              <option value="">Select country</option>
              {countries.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label>City</label>
            <select value={form.city_id} onChange={(e) => set("city_id", e.target.value)} required disabled={!form.country_id}>
              <option value="">Select city</option>
              {cities.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Register →"}
          </button>
        </form>
        <hr className="divider" />
        <button className="btn-link" onClick={() => onSwitch("login")}>Already have an account? Login</button>
        <button className="btn-link" onClick={() => onSwitch("adminLogin")}>🛡 Admin? Login here</button>
      </div>
    </div>
  );
}
