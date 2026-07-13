import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, Table, Terminal, Calendar, BookOpen, ExternalLink, 
  ChevronRight, Github, Activity, X, ChevronLeft, Brain, Sparkles, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { Project } from '../types';

// Stereoscopic Project Card matching the Credentials Card style and interaction physics
const StereoscopicProjectCard: React.FC<{ 
  project: Project; 
  onSelect: () => void;
}> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // rotation range: up to 20 degrees
    setCoords({
      x: mouseX * 20,
      y: -mouseY * 20
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        perspective: 1000,
      }}
      className="relative w-full max-w-sm h-[390px] rounded-xl cursor-pointer transition-shadow duration-300"
    >
      <motion.div
        animate={{
          rotateY: coords.x,
          rotateX: coords.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-xl border border-red-600/20 bg-white p-6 shadow-[0_10px_30px_rgba(220,38,38,0.06)] flex flex-col justify-between overflow-hidden relative group hover:border-red-600/50"
      >
        {/* Holographic glowing lines backdrop on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.05),transparent_50%)] pointer-events-none" />
        
        {/* Animated matrix horizontal grids on hover */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

        {/* Custom Project Watermark badge */}
        <div className="absolute right-3 top-3 text-red-600/5 pointer-events-none select-none">
          <Terminal className="w-32 h-32 stroke-[0.5]" />
        </div>

        {/* Header Block */}
        <div style={{ transform: 'translateZ(40px)' }} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded border border-red-500/20 bg-red-50 text-[8px] font-bold text-red-600 font-mono tracking-widest uppercase">
              {project.status || 'Active'}
            </span>
            <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-red-500" />
              {project.duration}
            </span>
          </div>
          
          <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase leading-snug font-sans group-hover:text-red-600 transition-colors">
            {project.title}
          </h3>
          
          {project.association && (
            <p className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-red-500" />
              <span>{project.association}</span>
            </p>
          )}
        </div>

        {/* Description & Technical Summary block */}
        <div style={{ transform: 'translateZ(25px)' }} className="space-y-2.5 bg-gray-50 p-3 rounded-lg border border-red-600/10">
          <p className="text-[10px] text-gray-600 font-mono leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="inline-flex items-center gap-1 text-[9px] text-red-600 font-mono tracking-widest uppercase font-bold group-hover:text-red-700 transition-colors">
            <span>Decompile Blueprint</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Footer block: Tags */}
        <div style={{ transform: 'translateZ(30px)' }} className="space-y-3 border-t border-red-600/10 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono text-[8px] uppercase font-bold border border-gray-200">
                {t}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-mono text-[8px] uppercase font-bold border border-red-200/50">
                +{project.tags.length - 3} MORE
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deck' | 'grid'>('deck');
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeckHovered, setIsDeckHovered] = useState(false);

  const handleNextDeck = () => {
    setActiveDeckIdx((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrevDeck = () => {
    setActiveDeckIdx((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  // Autoplay timer to advance deck slides every 2 seconds
  useEffect(() => {
    if (activeTab !== 'deck' || selectedProject || isDeckHovered) return;

    const interval = setInterval(() => {
      handleNextDeck();
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab, selectedProject, isDeckHovered, activeDeckIdx]);

  return (
    <div id="projects-showcase-portal" className="w-full space-y-8 relative pt-12">
      {/* Tab bar header matching credentials layout exactly */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-mono tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Dynamic Projects Repository
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight uppercase">
            High-Impact Practical Deliverables
          </h2>
        </div>

        {/* Toggle between 3D Deck Cascade & Grid Ledger */}
        <div className="flex p-1 bg-[#0d121b] rounded-lg border border-[#10b981]/15">
          <button
            type="button"
            onClick={() => setActiveTab('deck')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md flex items-center gap-2 transition-all cursor-pointer min-h-[44px] min-w-[140px] justify-center ${
              activeTab === 'deck'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            3D DECK CASCADE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md flex items-center gap-2 transition-all cursor-pointer min-h-[44px] min-w-[140px] justify-center ${
              activeTab === 'grid'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            GRID LEDGER
          </button>
        </div>
      </div>

      {/* Tab Contents with less than 2s transition animation */}
      <AnimatePresence mode="wait">
        {activeTab === 'deck' ? (
          <motion.div
            key="deck-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center space-y-8 py-4"
          >
            {/* Stereoscopic card deck slider */}
            <div 
              onMouseEnter={() => setIsDeckHovered(true)}
              onMouseLeave={() => setIsDeckHovered(false)}
              className="w-full flex items-center justify-center gap-4 sm:gap-8 max-w-4xl"
            >
              {/* Previous trigger */}
              <button
                type="button"
                onClick={handlePrevDeck}
                className="p-2.5 rounded-full border border-red-600/20 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:shadow-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Previous Project"
              >
                ◀
              </button>

              {/* Active tilt card with responsive entry */}
              <div className="flex-1 flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDeckIdx}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                    transition={{ duration: 0.35 }}
                    className="w-full flex justify-center"
                  >
                    <StereoscopicProjectCard 
                      project={PROJECTS[activeDeckIdx]} 
                      onSelect={() => setSelectedProject(PROJECTS[activeDeckIdx])}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next trigger */}
              <button
                type="button"
                onClick={handleNextDeck}
                className="p-2.5 rounded-full border border-red-600/20 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:shadow-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Next Project"
              >
                ▶
              </button>
            </div>

            {/* Pagination indicators & Autoplay Status */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center gap-1.5">
                {PROJECTS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveDeckIdx(idx);
                      setIsDeckHovered(false); // Reset hover to restart cycle gracefully
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === activeDeckIdx 
                        ? 'bg-red-600 w-6 shadow-[0_0_8px_rgba(220,38,38,0.4)]' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* High-Tech Autoplay Loading Line */}
              <div className="w-32 h-[2px] bg-gray-100 border border-red-600/10 rounded-full overflow-hidden relative">
                <motion.div
                  key={`${activeDeckIdx}-${isDeckHovered}`}
                  initial={{ width: '0%' }}
                  animate={isDeckHovered ? { width: '0%' } : { width: '100%' }}
                  transition={isDeckHovered ? { duration: 0 } : { duration: 2, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-red-500 to-red-600"
                />
              </div>
            </div>

            {/* Helper message */}
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest text-center">
              * Move cursor over the project deck to test the responsive 3D tilt physics engines. Click card to decompile blueprint.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {PROJECTS.map((p) => (
              <motion.div 
                key={p.title}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProject(p)}
                className="bg-white border border-red-600/10 rounded-xl p-5 flex flex-col justify-between hover:border-red-600/35 transition-all group relative overflow-hidden cursor-pointer hover:shadow-[0_10px_30px_rgba(220,38,38,0.06)]"
              >
                {/* Horizontal glowing lasers Sweep on hover */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded border border-red-500/20 bg-red-50 text-[8px] font-bold text-red-600 font-mono tracking-widest uppercase">
                        {p.status}
                      </span>
                      {p.duration && (
                        <span className="text-[9px] text-gray-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-red-500" />
                          {p.duration}
                        </span>
                      )}
                    </div>
                    <Terminal className="w-4.5 h-4.5 text-red-500" />
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider group-hover:text-red-600 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 font-mono leading-relaxed line-clamp-3">
                    {p.description}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[9px] text-red-600 font-mono tracking-widest uppercase mt-2 group-hover:text-red-700 transition-colors">
                    <span>Decompile Blueprint</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100 mt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono text-[8px] uppercase font-bold border border-gray-200">
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 font-mono text-[8px] uppercase font-bold border border-red-200/50">
                        +{p.tags.length - 4} MORE
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Project Blueprint Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-4xl bg-[#090d16] border border-emerald-500/30 rounded-lg p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative text-left my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Closing cross */}
              <button 
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-emerald-400 rounded-md hover:bg-gray-900 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title & Date */}
              <div className="space-y-2 border-b border-gray-900 pb-4 pr-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {selectedProject.duration && (
                    <div className="inline-flex items-center gap-1.5 text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedProject.duration}</span>
                    </div>
                  )}
                  {selectedProject.duration && selectedProject.association && <span className="text-gray-700">|</span>}
                  {selectedProject.association && (
                    <div className="inline-flex items-center gap-1.5 text-emerald-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{selectedProject.association}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
                  {selectedProject.title}
                </h3>
              </div>

              {/* Descriptions block */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Column: Context Overview */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-md space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">SYSTEM OVERVIEW</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-mono">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.longDescription && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">DECOMPILED BLUEPRINT</span>
                      <p className="text-xs text-gray-400 leading-relaxed italic">
                        {selectedProject.longDescription}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">TECH STACK INTEGRATION</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((t: string) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-gray-950 text-emerald-400 font-mono text-[9px] uppercase font-bold border border-emerald-500/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.githubUrl && (
                    <div className="pt-4">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/20 bg-emerald-950/20 hover:bg-emerald-500 hover:text-black rounded text-xs text-emerald-400 font-mono font-bold tracking-widest uppercase transition-all min-h-[44px]"
                      >
                        <Github className="w-4 h-4" />
                        RETRIEVE CODEBASE
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column: Accomplishments & Core Matrix */}
                <div className="md:col-span-7 space-y-5">
                  
                  {/* Key Features for APEXFIT */}
                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">KEY MODULAR CORE FEATURES</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.keyFeatures.map((f: any) => (
                          <div key={f.title} className="p-3 bg-gray-950/50 border border-gray-900 rounded-md hover:border-emerald-500/20 transition-all space-y-1.5">
                            <span className="text-[11px] font-bold text-white flex items-center gap-1 uppercase tracking-wider font-sans">
                              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                              {f.title}
                            </span>
                            <p className="text-[10px] text-gray-500 font-mono leading-relaxed">
                              {f.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bullet points */}
                  {selectedProject.bullets && selectedProject.bullets.length > 0 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">SYSTEM METRICS & IMPLEMENTATIONS</span>
                      <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedProject.bullets.map((b: string, idx: number) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <div className="mt-1 flex-shrink-0 w-3 h-3 rounded-full border border-emerald-500/40 bg-emerald-950/50 flex items-center justify-center">
                              <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            </div>
                            <p className="text-xs text-gray-300 font-mono leading-relaxed">
                              {b}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
