import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/history");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/70 border border-[#EAE7DF] rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-serif text-[#2D2D2D] mb-6">Login</h2>
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-[#6B705C] text-white rounded-xl hover:bg-[#5B604C] transition-colors"
        >
          Login
        </button>
        <p className="text-sm text-[#706C61] mt-4">
          New here?{" "}
          <Link to="/signup" className="text-[#6B705C] font-medium">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}