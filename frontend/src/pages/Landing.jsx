// import React from 'react';
// import { Link } from 'react-router-dom';

// const Landing = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-[#F2EFE9] text-[#4A4A4A] flex flex-col items-center justify-center text-center px-6">
      
//       {/* Badge */}
//       <div className="inline-block px-4 py-1.5 mb-8 text-sm font-medium tracking-wide text-[#8C7E6A] bg-[#EFEBE3] rounded-full">
//         Simple. Calm. Intelligent.
//       </div>

//       {/* Hero Text */}
//       <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight text-[#2D2D2D] mb-8 leading-tight">
//         Meeting notes, <br />
//         <span className="italic text-[#6B705C]">reimagined.</span>
//       </h1>

//       <p className="max-w-xl text-xl text-[#706C61] font-light leading-relaxed mb-12">
//         Focus on the conversation. We'll handle the summaries, 
//         action items, and organization in a space designed for clarity.
//       </p>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-5">
//         <Link 
//           to="/summarize" 
//           className="px-10 py-4 bg-[#6B705C] text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-[#5B604C] transition-all duration-300 transform hover:-translate-y-1"
//         >
//           Get Started for Free
//         </Link>
//         <button className="px-10 py-4 bg-white/50 backdrop-blur-sm text-[#6B705C] border border-[#E0DCCF] rounded-xl hover:bg-white transition-all">
//           How it works
//         </button>
//       </div>

//       {/* Subtle Bottom Accent */}
//       <div className="mt-24 opacity-40">
//         <p className="text-xs uppercase tracking-[0.2em] text-[#8C7E6A]">Built for modern teams</p>
//       </div>
//     </div>
//   );
// };

// export default Landing;





import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-[#F2EFE9] text-[#4A4A4A] flex flex-col items-center justify-center text-center px-6">
      
      {/* Soft Badge */}
      <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-[0.15em] text-[#8C7E6A] bg-[#EFEBE3] rounded-full">
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
        to="/summarize" 
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