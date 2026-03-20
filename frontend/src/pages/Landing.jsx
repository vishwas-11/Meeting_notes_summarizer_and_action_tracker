import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-[#F2EFE9] text-[#4A4A4A] font-sans">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-12 flex flex-col items-center text-center">
        
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-[#8C7E6A] bg-[#EFEBE3] rounded-full">
          Intelligent Meeting Clarity
        </div>

        <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-[#2D2D2D] mb-6">
          Turn your conversations into <br />
          <span className="italic text-[#6B705C]">meaningful action.</span>
        </h1>

        <p className="max-w-2xl text-lg text-[#706C61] leading-relaxed mb-10">
          A calm space to summarize meetings, track action items, and maintain 
          the history of your team's progress without the noise.
        </p>

        <div className="flex gap-4">
          <Link 
            to="/summarize" 
            className="px-8 py-3 bg-[#6B705C] text-white rounded-xl shadow-lg hover:bg-[#5B604C] transition-all duration-300 ease-out"
          >
            Get Started
          </Link>
          <button className="px-8 py-3 bg-white text-[#6B705C] border border-[#E0DCCF] rounded-xl hover:bg-[#FDFCFB] transition-all">
            View Demo
          </button>
        </div>

        {/* Soft UI Element Preview */}
        <div className="mt-20 w-full max-w-4xl bg-white/50 backdrop-blur-md border border-white rounded-2xl shadow-2xl p-4 transform hover:scale-[1.01] transition-transform duration-500">
          <div className="rounded-xl overflow-hidden bg-[#FDFBF7] border border-[#EAE7DF] aspect-video flex items-center justify-center text-[#A3A199]">
             {/* Placeholder for a screenshot or animation */}
             [ Dashboard Preview Area ]
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;