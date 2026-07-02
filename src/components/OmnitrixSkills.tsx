import React, { useState } from 'react';
import { Brain, Code, Cpu, Lightbulb, ChevronLeft, ChevronRight, Zap, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { SkillCategory } from '../types';

export const OmnitrixSkills: React.FC = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [isRecalibrating, setIsRecalibrating] = useState<boolean>(false);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);

  const activeGroup = SKILL_GROUPS[activeCategoryIdx];

  const handleNext = () => {
    setRotationDegrees((prev) => prev + 90);
    setActiveCategoryIdx((prev) => (prev + 1) % SKILL_GROUPS.length);
  };

  const handlePrev = () => {
    setRotationDegrees((prev) => prev - 90);
    setActiveCategoryIdx((prev) => (prev - 1 + SKILL_GROUPS.length) % SKILL_GROUPS.length);
  };

  const handleCategoryClick = (idx: number) => {
    // Determine rotation step to look interactive
    const diff = idx - activeCategoryIdx;
    setRotationDegrees((prev) => prev + diff * 90);
    setActiveCategoryIdx(idx);
  };

  // Slam Dial Trigger! Recalibrates matrix
  const handleSlamDial = () => {
    setIsRecalibrating(true);
    // Simulate high-tech system recalibration
    setTimeout(() => {
      setIsRecalibrating(false);
      // Randomly cycle to a new category on slam
      const randomIdx = Math.floor(Math.random() * SKILL_GROUPS.length);
      setActiveCategoryIdx(randomIdx);
      setRotationDegrees((prev) => prev + 360);
    }, 1200);
  };

  // Get matching icon for the active skill group
  const renderCategoryIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Brain':
        return <Brain className={className} />;
      case 'Code':
        return <Code className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Lightbulb':
        return <Lightbulb className={className} />;
      default:
        return <Brain className={className} />;
    }
  };

  return (
    <div id="omnitrix-central-component" className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 glass shadow-2xl backdrop-blur-md">
      {/* Title block */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 mb-3 text-[10px] tracking-widest font-mono text-emerald-400 uppercase">
          <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
          Skills Core
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white uppercase">
          Core Ecosystem
        </h2>
        <p className="text-xs text-gray-400 font-mono mt-1">
          Asynchronously revolving database metrics — Click center core to recalibrate matrix signals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Interactive Watch Face / Bezel Dial */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Dial Deck frame */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center select-none">
            
            {/* Background rotating dashed rings */}
            <motion.div
              animate={{ rotate: rotationDegrees }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="absolute inset-0 border border-dashed border-emerald-500/20 rounded-full flex items-center justify-center"
            >
              <div className="absolute inset-4 border border-dashed border-cyan-500/20 rounded-full" />
              <div className="absolute inset-10 border border-emerald-500/10 rounded-full" />
            </motion.div>

            {/* Glowing outer bezel ring */}
            <div className="absolute inset-6 border-2 border-emerald-500/30 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.15)] flex items-center justify-center">
              
              {/* Dash ticks surrounding dial */}
              <div className="absolute inset-0 rounded-full animate-[spin_60s_linear_infinite] border-4 border-double border-emerald-500/5" />
              
              {/* Outer bezel selector nodes (4 main quadrants) */}
              {SKILL_GROUPS.map((group, idx) => {
                const isActive = idx === activeCategoryIdx;
                // Calculate geometric layout offsets on watch ring
                const angle = (idx * 90) * (Math.PI / 180);
                const radius = 100; // px
                const x = Math.sin(angle) * radius;
                const y = -Math.cos(angle) * radius;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleCategoryClick(idx)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className={`absolute w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shadow-md ${
                      isActive
                        ? 'border-emerald-400 bg-emerald-950 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.45)] scale-110 z-10'
                        : 'border-[#10b981]/15 bg-[#0d121b] text-gray-500 hover:border-cyan-500 hover:text-cyan-400 hover:scale-105'
                    }`}
                    title={group.name}
                  >
                    {renderCategoryIcon(group.iconName, "w-5 h-5")}
                  </button>
                );
              })}
            </div>

            {/* CENTER CORE hourglass and Symbol Hub */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.90 }}
              onClick={handleSlamDial}
              className={`absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full cursor-pointer flex flex-col items-center justify-center transition-all duration-300 z-20 ${
                isRecalibrating
                  ? 'bg-cyan-500 border-white animate-pulse shadow-[0_0_40px_rgba(6,182,212,0.9)]'
                  : 'bg-gradient-to-br from-emerald-950/40 via-[#0d121b] to-[#05070a] border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              }`}
            >
              {/* Rotating glowing core element */}
              <div className={`absolute inset-1 rounded-full border border-dashed border-emerald-400/40 animate-[spin_10s_linear_infinite] ${isRecalibrating ? 'border-cyan-200' : ''}`} />

              <AnimatePresence mode="wait">
                {isRecalibrating ? (
                  <motion.div
                    key="recalibrating"
                    initial={{ opacity: 0, rotate: -180, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 180, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                    className="flex flex-col items-center justify-center text-cyan-200"
                  >
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span className="text-[8px] font-mono font-bold tracking-widest uppercase mt-1 animate-pulse">RELOAD</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategoryIdx}
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1.1, rotate: 360 }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                    className="flex flex-col items-center justify-center text-emerald-400"
                  >
                    {/* High-fidelity Authentic Original 2005 Omnitrix Watch Face Symbol */}
                    <svg className="w-20 h-20 animate-[pulse_3s_infinite] drop-shadow-[0_0_15px_rgba(16,185,129,0.65)] hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <clipPath id="omnitrix-clip">
                          <circle cx="50" cy="50" r="32" />
                        </clipPath>
                        <filter id="omnitrix-glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="metal-bezel" x1="0" y1="0" x2="100" y2="100">
                          <stop offset="0%" stopColor="#9ca3af" />
                          <stop offset="30%" stopColor="#4b5563" />
                          <stop offset="70%" stopColor="#1f2937" />
                          <stop offset="100%" stopColor="#111827" />
                        </linearGradient>
                      </defs>
                      
                      {/* Outer classic metallic ring with four original control nodes / bolts */}
                      <circle cx="50" cy="50" r="44" fill="url(#metal-bezel)" stroke="#090d16" strokeWidth="2.5" />
                      
                      {/* Four Iconic Original Bezel Prongs/Nodes (Classic 2005 Series) */}
                      {/* Top Node */}
                      <path d="M44 2 L56 2 L54 10 L46 10 Z" fill="#374151" stroke="#10b981" strokeWidth="1" />
                      <rect x="47" y="4" width="6" height="2" fill="#10b981" />
                      
                      {/* Bottom Node */}
                      <path d="M44 98 L56 98 L54 90 L46 90 Z" fill="#374151" stroke="#10b981" strokeWidth="1" />
                      <rect x="47" y="94" width="6" height="2" fill="#10b981" />
                      
                      {/* Left Node */}
                      <path d="M2 44 L2 56 L10 54 L10 46 Z" fill="#374151" stroke="#10b981" strokeWidth="1" />
                      <rect x="4" y="47" width="2" height="6" fill="#10b981" />
                      
                      {/* Right Node */}
                      <path d="M98 44 L98 56 L90 54 L90 46 Z" fill="#374151" stroke="#10b981" strokeWidth="1" />
                      <rect x="94" y="47" width="2" height="6" fill="#10b981" />

                      {/* Inner thick black dial border */}
                      <circle cx="50" cy="50" r="35" fill="#05070a" stroke="#111827" strokeWidth="3" />
                      
                      {/* Authentic original green hourglass screen layout */}
                      <g clipPath="url(#omnitrix-clip)">
                        {/* Deep black void behind the hourglass */}
                        <rect width="100" height="100" fill="#000000" />
                        
                        {/* Glowing neon-green classic triangles */}
                        <polygon points="12,12 88,12 50,50" fill="#10b981" filter="url(#omnitrix-glow)" />
                        <polygon points="12,88 88,88 50,50" fill="#10b981" filter="url(#omnitrix-glow)" />
                        
                        {/* Bold black divider lines separating the wedges */}
                        <line x1="50" y1="50" x2="12" y2="12" stroke="#000000" strokeWidth="4.5" />
                        <line x1="50" y1="50" x2="88" y2="12" stroke="#000000" strokeWidth="4.5" />
                        <line x1="50" y1="50" x2="12" y2="88" stroke="#000000" strokeWidth="4.5" />
                        <line x1="50" y1="50" x2="88" y2="88" stroke="#000000" strokeWidth="4.5" />

                        {/* Subtle classic tech-panel grid dots on left and right side spaces */}
                        <circle cx="22" cy="50" r="1.5" fill="#374151" />
                        <circle cx="78" cy="50" r="1.5" fill="#374151" />
                      </g>
                      
                      {/* Inner rim neon indicator ring */}
                      <circle cx="50" cy="50" r="32" stroke="#10b981" strokeWidth="2.5" fill="none" className="opacity-80" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Side navigation arrows for dial */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-full border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Previous Category"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-full border border-emerald-500/20 bg-emerald-950/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Next Category"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right column: Dynamic active skills dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryIdx + (isRecalibrating ? '-recal' : '')}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              className="p-5 sm:p-6 rounded-lg border border-[#06b6d4]/25 bg-[#0d121b]/80 shadow-lg relative overflow-hidden"
            >
              {/* Subtle top-right HUD block */}
              <div className="absolute top-0 right-0 p-2 bg-cyan-950/20 border-b border-l border-cyan-500/10 font-mono text-[9px] text-cyan-500">
                CORE_STAT_SYNC_LIVE
              </div>

              {/* Header inside display card */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                  {renderCategoryIcon(activeGroup.iconName, "w-6 h-6")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {activeGroup.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    {activeGroup.description}
                  </p>
                </div>
              </div>

              {/* Core Skill Bars */}
              <div className="space-y-4">
                {activeGroup.skills.map((skill, sIdx) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-emerald-400 font-bold">{skill.value}% EFFICIENCY</span>
                    </div>
                    {/* The glowing progress line container */}
                    <div className="h-2 w-full bg-[#050b07] rounded-full overflow-hidden border border-emerald-500/25 relative shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ type: 'spring', stiffness: 65, damping: 12, delay: sIdx * 0.08 }}
                        className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 rounded-full relative shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                      >
                        {/* Continuous sliding sheen reflection */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: 'linear',
                          }}
                        />
                        {/* Scanning glowing node on progress bar head with rich emerald glow */}
                        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_10px_#10b981,0_0_20px_#10b981] rounded-full animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recalibration Warning */}
              {isRecalibrating && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm z-30">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-cyan-400 animate-spin flex items-center justify-center mb-3">
                    <RefreshCw className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-xs animate-pulse">
                    RECALIBRATING MATRIX HARMONICS
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-1 max-w-xs">
                    Shifting core quantum arrays. Reloading specific efficiency coefficients asynchronously.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Quick HUD instructions or extra summary block */}
          <div className="p-4 rounded-lg border border-[#10b981]/15 bg-[#0d121b]/35 font-mono text-[10px] leading-relaxed text-gray-400 flex items-start gap-2.5">
            <span className="text-emerald-500 font-bold">INFO:</span>
            <p>
              The <strong>Skills Core</strong> operates on automated statistical matrices matching Abhiram's latest developmental milestones. The hourglass center is calibrated to sync live feedback metrics to Kakinada Hub routers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
