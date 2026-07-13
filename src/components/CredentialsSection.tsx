import React, { useState, useRef, useEffect } from 'react';
import { Search, ShieldCheck, Database, Layers, Table, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CREDENTIALS } from '../data/portfolioData';
import { Credential } from '../types';

// Interactive Stereoscopic Tilt Card Component
const StereoscopicCard: React.FC<{ credential: Credential }> = ({ credential }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Set coordinates for rotation (max 15 degrees)
    setCoords({
      x: mouseX * 22,
      y: -mouseY * 22
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
      style={{
        perspective: 1000,
      }}
      className="relative w-full max-w-sm h-[280px] rounded-xl cursor-grab active:cursor-grabbing transition-shadow duration-300"
    >
      <motion.div
        animate={{
          rotateY: coords.x,
          rotateX: coords.y,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full rounded-xl border border-red-600/20 bg-white p-6 shadow-[0_10px_30px_rgba(220,38,38,0.06)] flex flex-col justify-between overflow-hidden relative group hover:border-red-600/50"
      >
        {/* Holographic glowing lines backdrop on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.05),transparent_50%)] pointer-events-none" />
        
        {/* Animated matrix horizontal grids on hover */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

        {/* Security watermark badge */}
        <div className="absolute right-3 top-3 text-red-600/5 pointer-events-none select-none">
          <ShieldCheck className="w-32 h-32 stroke-[0.5]" />
        </div>

        {/* Header Block */}
        <div style={{ transform: 'translateZ(40px)' }} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded border border-red-500/20 bg-red-50 text-[8px] font-bold text-red-600 font-mono tracking-widest uppercase">
              {credential.category}
            </span>
            <ShieldCheck className="w-5 h-5 text-red-600" />
          </div>
          
          <h3 className="text-sm font-bold text-gray-900 tracking-wide leading-snug font-sans group-hover:text-red-600 transition-colors">
            {credential.title}
          </h3>
          <p className="text-[10px] text-gray-500 font-mono">
            ISSUER: <span className="text-gray-700 font-semibold">{credential.issuer}</span>
          </p>
        </div>

        {/* Footer block */}
        <div style={{ transform: 'translateZ(30px)' }} className="flex justify-between items-center text-[10px] font-mono border-t border-red-600/10 pt-3">
          <div>
            <span className="text-gray-500 block uppercase">Auth Date</span>
            <span className="text-red-600 font-bold">{credential.date}</span>
          </div>

          <div className="text-right">
            <span className="text-gray-500 block uppercase">Trust Status</span>
            <span className="text-red-600 font-bold flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
              VERIFIED
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const CredentialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'deck' | 'ledger'>('deck');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [isDeckHovered, setIsDeckHovered] = useState(false);

  // Filter categories
  const categories = ['All', 'AI & Data Science', 'Business Core', 'Core Programming', 'Engineering & DevOps', 'Leadership'];

  // Filter credentials
  const filteredCredentials = CREDENTIALS.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNextDeck = () => {
    setActiveDeckIdx((prev) => (prev + 1) % CREDENTIALS.length);
  };

  const handlePrevDeck = () => {
    setActiveDeckIdx((prev) => (prev - 1 + CREDENTIALS.length) % CREDENTIALS.length);
  };

  // Autoplay timer to advance deck slides every 2 seconds
  useEffect(() => {
    if (activeTab !== 'deck' || isDeckHovered) return;

    const interval = setInterval(() => {
      handleNextDeck();
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab, isDeckHovered, activeDeckIdx]);

  return (
    <div id="academic-ledger-verification-portal" className="w-full space-y-8">
      {/* Visual Title Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase mb-3 bg-white text-red-600 px-3 py-1 rounded-md shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Ledger Verifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight uppercase">
            Credentials Showcase
          </h2>
        </div>

        {/* Toggle between Deck Cascade & Searchable Ledger */}
        <div className="flex p-1 bg-white rounded-lg border border-red-600/20 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('deck')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md flex items-center gap-2 transition-all cursor-pointer min-h-[44px] min-w-[140px] justify-center ${
              activeTab === 'deck'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            3D DECK CASCADE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-xs font-mono font-bold tracking-wider rounded-md flex items-center gap-2 transition-all cursor-pointer min-h-[44px] min-w-[140px] justify-center ${
              activeTab === 'ledger'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50/50'
            }`}
          >
            <Table className="w-4 h-4" />
            SEARCHABLE LEDGER
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'deck' ? (
          <motion.div
            key="deck-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
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
                onClick={() => {
                  handlePrevDeck();
                  setIsDeckHovered(false); // reset hover temporarily to reset timer smoothly
                }}
                className="p-2.5 rounded-full border border-red-600/20 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:shadow-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Previous Certificate"
              >
                ◀
              </button>

              {/* The active tilt card */}
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
                    <StereoscopicCard credential={CREDENTIALS[activeDeckIdx]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next trigger */}
              <button
                type="button"
                onClick={() => {
                  handleNextDeck();
                  setIsDeckHovered(false); // reset hover temporarily to reset timer smoothly
                }}
                className="p-2.5 rounded-full border border-red-600/20 bg-white text-red-600 hover:bg-red-600 hover:text-white hover:shadow-md transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Next Certificate"
              >
                ▶
              </button>
            </div>

            {/* Pagination indicators & Autoplay Status */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center gap-1.5">
                {CREDENTIALS.map((_, idx) => (
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
              * Move cursor over the certificate deck to test the responsive 3D tilt physics engines.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="ledger-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Search and Category Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ledger by title or issuer..."
                  className="w-full bg-white border border-red-600/20 rounded-lg py-2.5 pl-10 pr-4 text-xs font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors shadow-sm"
                />
              </div>

              {/* Category Quick Filter badges */}
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] font-mono tracking-wider border rounded-md transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                      activeCategory === cat
                        ? 'border-red-600 bg-red-600 text-white font-bold shadow-sm shadow-red-600/10'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-red-600/30 hover:text-red-600 shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Table layout ledger list */}
            <div className="overflow-x-auto rounded-lg border border-red-600/15 bg-white shadow-md">
              <table className="w-full border-collapse text-left text-xs font-mono">
                <thead>
                  <tr className="bg-gray-50 border-b border-red-600/10 text-gray-500">
                    <th className="p-4 uppercase tracking-wider text-[10px] font-bold">Credential Title</th>
                    <th className="p-4 uppercase tracking-wider text-[10px] font-bold">Issuer Organization</th>
                    <th className="p-4 uppercase tracking-wider text-[10px] font-bold">Date Verified</th>
                    <th className="p-4 uppercase tracking-wider text-[10px] font-bold">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCredentials.length > 0 ? (
                    filteredCredentials.map((c) => (
                      <tr 
                        key={c.id}
                        className="hover:bg-red-50/60 transition-colors text-gray-700 group"
                      >
                        <td className="p-4">
                          <span className="font-sans font-bold text-gray-900 block group-hover:text-red-600 transition-colors">
                            {c.title}
                          </span>
                          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">
                            {c.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{c.issuer}</td>
                        <td className="p-4 text-red-600 font-semibold">{c.date}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-50 border border-red-100 text-red-600 font-semibold text-[9px]">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                            SECURE LOCK
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-400 font-mono">
                        <Database className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        No secure academic ledgers matched search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
