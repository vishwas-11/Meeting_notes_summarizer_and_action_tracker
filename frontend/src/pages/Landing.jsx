// import React from 'react';
// import { Link } from 'react-router-dom';

// const Landing = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-[#F2EFE9] text-[#4A4A4A] flex flex-col items-center justify-center text-center px-6">
      
//       {/* Soft Badge */}
//       <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-[0.15em] text-[#8C7E6A] bg-[#EFEBE3] rounded-full">
//         Focus on the moment
//       </div>

//       {/* Hero Title */}
//       <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-[#2D2D2D] mb-8 leading-tight">
//         Meeting notes, <br />
//         <span className="italic text-[#6B705C]">reimagined.</span>
//       </h1>

//       <p className="max-w-md text-lg text-[#706C61] font-light leading-relaxed mb-12">
//         A quiet, intelligent space to transform your recorded conversations 
//         into clear summaries and actionable tasks.
//       </p>

//       {/* Single Primary Action */}
//       <Link 
//         to="/login" 
//         className="px-12 py-4 bg-[#6B705C] text-white text-lg font-medium rounded-xl shadow-xl shadow-[#6B705C]/20 hover:bg-[#5B604C] transition-all duration-300 transform hover:-translate-y-1"
//       >
//         Get Started
//       </Link>

//       <div className="mt-32 opacity-30">
//         <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C7E6A]">Secure • Minimal • Intelligent</p>
//       </div>
//     </div>
//   );
// };

// export default Landing;






import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* Soft Badge */}
      <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-[0.15em] text-[#8C7E6A] bg-[#EFEBE3]/80 backdrop-blur-sm rounded-full">
        Focus on the moment
      </div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-[#2D2D2D] mb-8 leading-tight">
        Meeting notes, <br />
        <span className="italic text-[#6B705C]">reimagined.</span>
      </h1>

      <p className="max-w-md text-lg text-[#706C61] font-light leading-relaxed mb-12">
        A quiet, intelligent space to transform your recorded conversations 
        into clear summaries and actionable tasks.
      </p>

      {/* Single Primary Action */}
      <Link 
        to="/login" 
        className="px-12 py-4 bg-[#6B705C] text-white text-lg font-medium rounded-xl shadow-xl shadow-[#6B705C]/20 hover:bg-[#5B604C] transition-all duration-300 transform hover:-translate-y-1"
      >
        Get Started
      </Link>

      <div className="mt-32 opacity-30">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C7E6A]">Secure • Minimal • Intelligent</p>
      </div>
    </div>
  );
};

export default Landing;