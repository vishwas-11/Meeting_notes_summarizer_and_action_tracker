import React from 'react';
import Threads from './Threads';

const BackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* 1. The Solid "Floor" Color */}
      <div className="fixed inset-0 z-[-2] bg-[#FAF9F6]" />

      {/* 2. The Threads Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full">
        <Threads 
          color={[0.42, 0.44, 0.36]} // Sage
          amplitude={1.5} 
          distance={0.3} 
          enableMouseInteraction={true}
        />
      </div>

      {/* 3. The Content Layer */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;