import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Safe JSON parser — never throws on empty/non-JSON body
async function safeJson(res) {
  const text = await res.text();
  if (!text || !text.trim()) return {};
  try { return JSON.parse(text); } catch { return { detail: text }; }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("sr_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? safeJson(r) : null)
        .then(u => { setUser(u || null); setLoading(false); })
        .catch(() => { setToken(null); localStorage.removeItem("sr_token"); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data.detail || "Login failed. Please check your credentials.");
    setToken(data.token);
    localStorage.setItem("sr_token", data.token);
    setUser({ name: data.name, email: data.email });
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data.detail || "Registration failed. Please try again.");
    setToken(data.token);
    localStorage.setItem("sr_token", data.token);
    setUser({ name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sr_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
