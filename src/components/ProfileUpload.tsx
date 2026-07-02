import React from 'react';

// Change this line to import your newly added image
import abhiramAvatar from '../assets/images/profile.png';

interface ProfileProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  currentImage?: string | null;
  onImageChange?: (image: string | null) => void;
  interactive?: boolean;
}

export const ProfilePictureContainer: React.FC<ProfileProps> = ({
  size = 'md',
}) => {
  // Set sizing classes
  const dimensions = {
    sm: 'w-16 h-16 border-2',
    md: 'w-28 h-28 border-2',
    lg: 'w-44 h-44 border-[3px]',
    xl: 'w-56 h-56 border-[4px]',
  }[size];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Outer rotating HUD circle rings */}
      <div className="absolute inset-0 flex items-center justify-center -m-4 pointer-events-none">
        <div className={`absolute border border-emerald-500/15 rounded-full animate-[spin_40s_linear_infinite] ${
          size === 'xl' ? 'w-64 h-64' : size === 'lg' ? 'w-52 h-52' : 'w-36 h-36'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </div>
        <div className={`absolute border border-dashed border-cyan-500/20 rounded-full animate-[spin_25s_linear_infinite_reverse] ${
          size === 'xl' ? 'w-[272px] h-[272px]' : size === 'lg' ? 'w-[220px] h-[220px]' : 'w-[152px] h-[152px]'
        }`} />
      </div>

      {/* Main Avatar Container */}
      <div 
        id="profile-hud-avatar-box"
        className={`relative rounded-full overflow-hidden flex items-center justify-center ${dimensions} transition-all duration-500 bg-[#0d121b] border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.75)] group`}
      >
        <img 
          src={abhiramAvatar} 
          alt="Karri Abhiram" 
          className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* Cybernetic HUD Frame corners overlay */}
        <div className="absolute inset-0 pointer-events-none border border-emerald-500/10 rounded-full">
          {/* Top-left corner tick */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
          {/* Top-right corner tick */}
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
          {/* Bottom-left corner tick */}
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
          {/* Bottom-right corner tick */}
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-emerald-400" />
        </div>
      </div>
    </div>
  );
};
