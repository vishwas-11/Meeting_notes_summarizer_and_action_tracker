// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const location = useLocation();

//   // Helper to highlight active links with a soft underline
//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-[#EAE7DF]/50">
//       <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
//         {/* Logo / Brand */}
//         <Link to="/" className="text-xl font-serif font-semibold text-[#2D2D2D] tracking-tight">
//           Meeting<span className="text-[#6B705C]">.notes</span>
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex gap-8 items-center">
//           <Link 
//             to="/summarize" 
//             className={`text-sm font-medium transition-colors ${
//               isActive('/summarize') ? 'text-[#6B705C]' : 'text-[#706C61] hover:text-[#2D2D2D]'
//             }`}
//           >
//             Create
//           </Link>
//           <Link 
//             to="/actions" 
//             className={`text-sm font-medium transition-colors ${
//               isActive('/actions') ? 'text-[#6B705C]' : 'text-[#706C61] hover:text-[#2D2D2D]'
//             }`}
//           >
//             Actions
//           </Link>
//           <Link 
//             to="/history" 
//             className={`text-sm font-medium transition-colors ${
//               isActive('/history') ? 'text-[#6B705C]' : 'text-[#706C61] hover:text-[#2D2D2D]'
//             }`}
//           >
//             History
//           </Link>
          
//           {/* Subtle Action Button */}
//           <Link 
//             to="/summarize" 
//             className="ml-4 px-4 py-2 bg-[#6B705C] text-white text-sm rounded-lg hover:bg-[#5B604C] transition-all shadow-sm"
//           >
//             New Meeting
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }




import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-[#EAE7DF]/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand - Neutral Identity */}
        <Link to="/" className="text-xl font-serif font-semibold text-[#2D2D2D] tracking-tight">
          Briefly<span className="text-[#6B705C]">.ai</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          <Link 
            to="/actions" 
            className={`text-sm font-medium transition-colors ${
              isActive('/actions') ? 'text-[#6B705C]' : 'text-[#706C61] hover:text-[#2D2D2D]'
            }`}
          >
            Actions
          </Link>
          <Link 
            to="/history" 
            className={`text-sm font-medium transition-colors ${
              isActive('/history') ? 'text-[#6B705C]' : 'text-[#706C61] hover:text-[#2D2D2D]'
            }`}
          >
            History
          </Link>
          
          <Link 
            to="/summarize" 
            className="ml-4 px-5 py-2 bg-[#6B705C] text-white text-sm font-medium rounded-lg hover:bg-[#5B604C] transition-all shadow-sm shadow-[#6B705C]/20"
          >
            New Meeting
          </Link>
        </div>
      </div>
    </nav>
  );
}