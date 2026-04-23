
const API_URL = (() => {
  // Use VITE_API_URL if provided
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, "");
  }

  // If we are on localhost, default to local backend
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:8000";
  }

  // Fallback for production (Railway)
  return "https://smartresume-clean-production.up.railway.app";
})();

export default API_URL;
