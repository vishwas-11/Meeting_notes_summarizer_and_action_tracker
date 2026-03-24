// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signupUser } from "../api/api";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signupUser({ email, password });
//       navigate("/login");
//     } catch {
//       setError("Unable to sign up. This email may already be used.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
//       <form
//         onSubmit={handleSignup}
//         className="w-full max-w-md bg-white/70 border border-[#EAE7DF] rounded-2xl p-8 shadow-sm"
//       >
//         <h2 className="text-2xl font-serif text-[#2D2D2D] mb-6">Sign Up</h2>
//         <input
//           className="w-full mb-4 px-4 py-3 rounded-xl border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20"
//           placeholder="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           className="w-full mb-4 px-4 py-3 rounded-xl border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
//         <button
//           type="submit"
//           className="w-full py-3 bg-[#6B705C] text-white rounded-xl hover:bg-[#5B604C] transition-colors"
//         >
//           Sign Up
//         </button>
//         <p className="text-sm text-[#706C61] mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-[#6B705C] font-medium">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }







import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signupUser({ email, password });
      navigate("/login");
    } catch {
      setError("Unable to sign up. This email may already be used.");
    }
  };

  return (
    /* Removed bg-[#FAF9F6] to reveal the global threads background */
    <div className="min-h-screen flex items-center justify-center px-6">
      
      {/* Glassmorphism Container */}
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white/40 backdrop-blur-md border border-white rounded-3xl p-10 shadow-xl shadow-[#6B705C]/5"
      >
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif text-[#2D2D2D] mb-2">Create Account</h2>
            <p className="text-[#706C61] font-light italic">Join Briefly and find your focus.</p>
        </div>

        <div className="space-y-4">
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#EAE7DF] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C] transition-all placeholder:text-[#A3A199]"
              placeholder="Create a password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>

        {error && <p className="text-sm text-red-500 mt-4 italic">{error}</p>}
        
        <button
          type="submit"
          className="w-full mt-8 py-4 bg-[#6B705C] text-white font-medium rounded-xl hover:bg-[#5B604C] hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95"
        >
          Sign Up
        </button>

        <p className="text-sm text-[#706C61] mt-8 text-center font-light">
          Already have an account?{" "}
          <Link to="/login" className="text-[#6B705C] font-semibold hover:underline transition-all">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}