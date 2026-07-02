import React from 'react';
import { motion } from 'motion/react';

export const TomAndJerryChase: React.FC = () => {
  return (
    <div className="absolute top-0 inset-x-0 h-16 pointer-events-none overflow-hidden select-none z-10">
      {/* 
        This is a highly-detailed, playful classic Easter Egg. 
        Tom (grey-blue cat with white paws & yellow eyes) is chasing Jerry (brown mouse holding golden Swiss cheese)
        drifting slowly across the top boundary of the project section.
        We utilize a transition style with a subtle opacity that rises on hovering nearby to make it clean yet discoverable!
      */}
      <motion.div
        className="absolute flex items-center gap-10 opacity-60 hover:opacity-100 transition-opacity duration-300"
        style={{ y: 6, height: 48 }}
        animate={{
          x: ['-25%', '125%'],
        }}
        transition={{
          duration: 16,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {/* DUST CLOUD 1 (Behind Tom's back feet, trailing on the left) */}
        <motion.div
          className="absolute left-[15px] top-[28px] w-4 h-4 rounded-full bg-cyan-500/15 blur-[1px]"
          animate={{
            scale: [0.5, 1.8, 0],
            opacity: [0.4, 0.7, 0],
            x: [0, -35],
            y: [0, -3],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />

        {/* DUST CLOUD 2 (Behind Jerry's back feet, trailing in the middle-right) */}
        <motion.div
          className="absolute left-[112px] top-[26px] w-3 h-3 rounded-full bg-amber-500/15 blur-[1px]"
          animate={{
            scale: [0.6, 1.6, 0.2],
            opacity: [0.3, 0.6, 0],
            x: [0, -25],
            y: [0, -5],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* TOM (The Sleek Grey-Blue Cat in full cartoon sprint, chasing Jerry) */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{
              y: [0, -7, 0],
              rotate: [-3, 3, -3],
              skewX: [-6, 6, -6],
              scaleX: [1, 1.14, 1],
            }}
            transition={{
              duration: 0.32,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="relative flex items-center justify-center filter drop-shadow-[0_3px_5px_rgba(6,182,212,0.3)]"
          >
            {/* Tom SVG with classic grey-blue and facial hallmarks */}
            <svg
              width="64"
              height="44"
              viewBox="0 0 64 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated Tail with white tip */}
              <path 
                d="M 12 26 Q 3 28 5 17 Q 7 6 1 8" 
                stroke="#5c7c8c" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                fill="none" 
              />
              <path 
                d="M 1 8 C -0.2 8.5 -0.5 7 1 8" 
                stroke="#f8fafc" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                fill="none" 
              />
              
              {/* Back Legs Running */}
              <path d="M 15 27 L 10 38" stroke="#5c7c8c" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="9" cy="38" rx="3.5" ry="1.5" fill="#f8fafc" />
              
              <path d="M 19 27 L 23 36" stroke="#435e6b" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="24" cy="36" rx="3.5" ry="1.5" fill="#cbd5e1" />

              {/* Main Body (elongated grey-blue cat) */}
              <path d="M 14 25 Q 26 17 37 23 L 31 30 Q 21 28 14 25 Z" fill="#5c7c8c" />
              <path d="M 21 22 Q 26 19 31 24" stroke="#f8fafc" strokeWidth="1.5" opacity="0.25" />

              {/* Front Legs reaching */}
              <path d="M 31 25 L 35 35" stroke="#435e6b" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="36" cy="35" rx="3" ry="1.5" fill="#cbd5e1" />

              <path d="M 34 23 Q 46 21 48 19" stroke="#5c7c8c" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="49" cy="18.5" rx="3" ry="1.5" fill="#f8fafc" />

              {/* Left Triangular Cat Ear */}
              <path d="M 32 14 C 29 14 27 11 30 6 C 32 2 35 6 35 6" fill="#5c7c8c" /> 
              <path d="M 31 11 C 30 11 29 9 31 6" fill="#fda4af" />

              {/* Right Triangular Cat Ear */}
              <path d="M 38 14 C 39 14 42 12 41 7 C 40 2 37 6 37 6" fill="#5c7c8c" /> 
              <path d="M 38 11 C 39 11 41 9 40 7" fill="#fda4af" />

              {/* Head & Cheeks */}
              <circle cx="35" cy="16" r="7.5" fill="#5c7c8c" />
              {/* White muzzle puffs */}
              <ellipse cx="32" cy="18.5" rx="3.5" ry="2.2" fill="#f8fafc" /> 
              <ellipse cx="38" cy="18.5" rx="3.5" ry="2.2" fill="#f8fafc" /> 
              
              {/* TOM'S CLASSIC YELLOW & GREEN CARTOON EYES */}
              <ellipse cx="33" cy="12.5" rx="2.2" ry="4" fill="#eab308" />
              <ellipse cx="33" cy="12.5" rx="1" ry="2.2" fill="#22c55e" />
              <circle cx="33" cy="12" r="0.6" fill="#0f172a" />

              <ellipse cx="37" cy="12.5" rx="2.2" ry="4" fill="#eab308" />
              <ellipse cx="37" cy="12.5" rx="1" ry="2.2" fill="#22c55e" />
              <circle cx="37" cy="12" r="0.6" fill="#0f172a" />

              {/* Pink Nose */}
              <polygon points="34.5,16.5 35.5,16.5 35,17.7" fill="#f43f5e" />

              {/* Whiskers */}
              <line x1="41" y1="18" x2="48" y2="16" stroke="#f8fafc" strokeWidth="0.8" />
              <line x1="41" y1="19.5" x2="49" y2="19" stroke="#f8fafc" strokeWidth="0.8" />
              <line x1="41" y1="21" x2="48" y2="22.5" stroke="#f8fafc" strokeWidth="0.8" />

              <line x1="29" y1="18" x2="22" y2="16" stroke="#f8fafc" strokeWidth="0.8" />
              <line x1="29" y1="19.5" x2="21" y2="19" stroke="#f8fafc" strokeWidth="0.8" />
            </svg>

            {/* Retro title tags */}
            <span className="absolute -top-3.5 left-4 text-[6.5px] font-mono text-cyan-400/80 uppercase tracking-widest bg-cyan-950/20 px-1 rounded border border-cyan-500/10 scale-90">
              Tom_Active
            </span>
          </motion.div>
        </div>

        {/* JERRY (The Nimble Mouse in lead holding yellow Swiss cheese) */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [-10, 10, -10],
              scaleX: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.18,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="relative flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(180,83,9,0.3)]"
          >
            {/* Jerry SVG with faithful cartoon details */}
            <svg
              width="44"
              height="36"
              viewBox="0 0 44 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Curly Mouse Tail */}
              <path 
                d="M 6 23 Q -1 25 2 16 Q 5 11 1 5" 
                stroke="#78350f" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                fill="none" 
              />

              {/* Running Legs Back */}
              <path d="M 9 23 L 5 31" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="4.5" cy="31" rx="2.5" ry="1.2" fill="#fed7aa" />

              <path d="M 13 23 L 15 30" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="15.5" cy="30" rx="2.5" ry="1.2" fill="#fdba74" />

              {/* Body (Brown mouse torso) */}
              <path d="M 8 21 Q 15 14 23 21 L 18 28 Q 12 28 8 21 Z" fill="#b45309" />
              {/* Cream belly */}
              <ellipse cx="14.5" cy="22.5" rx="4.5" ry="3.5" fill="#ffedd5" /> 

              {/* Running Legs Front */}
              <path d="M 20 23 L 23 30" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="23.5" cy="30" rx="2.2" ry="1" fill="#fdba74" />

              {/* Reaching arm holding cheese */}
              <path d="M 21 21 Q 26 19 28 20" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />

              {/* GOLDEN SWISS CHEESE WEDGE */}
              <polygon points="27,16 34,13 32,23" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" />
              <circle cx="29.5" cy="17" r="0.8" fill="#b45309" opacity="0.6" />
              <circle cx="31" cy="20" r="0.6" fill="#b45309" opacity="0.6" />
              <circle cx="32" cy="15.5" r="0.5" fill="#b45309" opacity="0.6" />

              {/* Head */}
              <circle cx="21" cy="13" r="6" fill="#b45309" />

              {/* Classic Round Ears (Peach inside, brown rim) */}
              <circle cx="16.5" cy="8" r="5" fill="#b45309" />
              <circle cx="16.5" cy="8" r="3.2" fill="#fda4af" />

              <circle cx="24" cy="8.5" r="4.5" fill="#b45309" />
              <circle cx="24" cy="8.5" r="2.8" fill="#fda4af" />

              {/* Muzzle puff */}
              <ellipse cx="23.5" cy="14" rx="2.5" ry="2" fill="#fed7aa" />
              
              {/* Little Black Nose */}
              <circle cx="26" cy="13.5" r="1.5" fill="#1e293b" />

              {/* Cartoon Eye (white oval with black pupil) */}
              <ellipse cx="21.5" cy="11.5" rx="1.5" ry="2.2" fill="#ffffff" />
              <circle cx="21.8" cy="11.5" r="0.8" fill="#0f172a" />

              {/* Whiskers */}
              <line x1="25" y1="15.5" x2="29" y2="15" stroke="#1e293b" strokeWidth="0.5" />
              <line x1="25" y1="16.5" x2="28.5" y2="18.5" stroke="#1e293b" strokeWidth="0.5" />
            </svg>

            {/* Retro title tags */}
            <span className="absolute -top-3.5 left-2 text-[6.5px] font-mono text-amber-500/70 uppercase tracking-widest bg-amber-950/20 px-1 rounded border border-amber-500/10 scale-90">
              Jerry
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Cyber-organic motion trail base bar */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </div>
  );
};
