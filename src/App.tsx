import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ExternalLink, Github, Linkedin, Award, BookOpen, 
  Briefcase, Camera, Code2, GraduationCap, Sparkles, Terminal, 
  ChevronRight, Brain, Globe, PhoneCall, CheckCircle, Database,
  Calendar, Activity, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import newly designed components
import { BackgroundEffect } from './components/BackgroundEffect';
import { ProfilePictureContainer } from './components/ProfileUpload';
import { TerminalWorkspace } from './components/TerminalWorkspace';
import { OmnitrixSkills } from './components/OmnitrixSkills';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { ContactHub } from './components/ContactHub';

// Import Static Data
import { 
  PERSONAL_INFO, SKILL_GROUPS, PROJECTS, 
  EXPERIENCE_TIMELINE, ACADEMIC_MILESTONES, CREDENTIALS 
} from './data/portfolioData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Abhiram Portfolio";
  }, []);

  const handleNodeNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen text-gray-300 selection:bg-emerald-500 selection:text-black">
      {/* Premium background grid & particles sweep */}
      <BackgroundEffect />

      {/* FIXED TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0d121b]/80 border-b border-[#10b981]/20 backdrop-blur-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo element with blinking neon node */}
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-sm font-bold tracking-widest text-white uppercase flex items-center gap-1">
              ABHIRAM <span className="text-emerald-400 font-medium">// AI_PORTAL</span>
            </span>
          </div>

          {/* Desktop navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest uppercase">
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('about')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              About
            </button>
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('omnitrix')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              Skills
            </button>
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('portfolio')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              Projects
            </button>
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('chronology')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              Career
            </button>
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('credentials')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              Credentials
            </button>
            <button 
              type="button" 
              onClick={() => handleNodeNavigation('contact')} 
              className="hover:text-emerald-400 hover:shadow-[0_2px_0_rgba(16,185,129,0.3)] transition-all py-1 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Contact CTA desktop trigger */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNodeNavigation('contact')}
              className="px-4 py-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] cursor-pointer min-h-[44px]"
            >
              Transmit Signal
            </button>
          </div>

          {/* Mobile hamburger icon trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-emerald-400 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-[#0d121b] border-b border-[#10b981]/25 p-5 md:hidden font-mono text-xs tracking-widest uppercase flex flex-col gap-4 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('about'); }}
              className="text-left py-2 hover:text-emerald-400 border-b border-gray-900 min-h-[44px]"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('omnitrix'); }}
              className="text-left py-2 hover:text-emerald-400 border-b border-gray-900 min-h-[44px]"
            >
              Skills
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('portfolio'); }}
              className="text-left py-2 hover:text-emerald-400 border-b border-gray-900 min-h-[44px]"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('chronology'); }}
              className="text-left py-2 hover:text-emerald-400 border-b border-gray-900 min-h-[44px]"
            >
              Career
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('credentials'); }}
              className="text-left py-2 hover:text-emerald-400 border-b border-gray-900 min-h-[44px]"
            >
              Credentials
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); handleNodeNavigation('contact'); }}
              className="text-left py-2 hover:text-emerald-400 min-h-[44px]"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 space-y-24 sm:space-y-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center py-6 sm:py-12 relative">
          
          {/* Main Hero grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Titles & Metrics */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Floating profile avatar node adjacent to name */}
              <div className="flex items-center gap-5">
                <ProfilePictureContainer size="md" />
                <div>
                  <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase block animate-pulse">
                    AI AGENT ONLINE // VISAKHAPATNAM
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-none mt-1">
                    {PERSONAL_INFO.fullName}
                  </h1>
                  <h2 className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 font-mono tracking-widest uppercase mt-2">
                    {PERSONAL_INFO.title}
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 font-mono leading-relaxed max-w-xl">
                Completing CSE (Artificial Intelligence) B.Tech. Engineering robust machine learning models, optimizing predictive neural networks, and automating python code workflows.
              </p>

              {/* Metrics blocks row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 border-y border-[#10b981]/20 py-5 font-mono">
                <div className="p-2 sm:p-3 rounded bg-[#0d121b]/60 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all text-center">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-400 block tracking-tight">11</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">Professional Certs</span>
                </div>
                <div className="p-2 sm:p-3 rounded bg-[#0d121b]/60 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all text-center">
                  <span className="text-xl sm:text-2xl font-bold text-cyan-400 block tracking-tight">3+</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">ML Core Portals</span>
                </div>
                <div className="p-2 sm:p-3 rounded bg-[#0d121b]/60 border border-[#10b981]/10 hover:border-[#10b981]/30 transition-all text-center">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-400 block tracking-tight">3+ Yrs</span>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest block mt-0.5">Active Eng.</span>
                </div>
              </div>

              {/* CTA triggers */}
              <div className="flex flex-wrap gap-4 font-mono text-xs tracking-widest uppercase">
                <button
                  type="button"
                  onClick={() => handleNodeNavigation('portfolio')}
                  className="px-6 py-3 rounded-md bg-emerald-500 text-black font-bold hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all cursor-pointer min-h-[44px]"
                >
                  Explore Projects
                </button>
                <button
                  type="button"
                  onClick={() => handleNodeNavigation('contact')}
                  className="px-6 py-3 rounded-md border border-cyan-500/30 hover:border-cyan-500 bg-cyan-950/20 text-cyan-400 hover:text-black hover:bg-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all cursor-pointer min-h-[44px]"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Right Column: Realistic interactive terminal container */}
            <div className="lg:col-span-6">
              <TerminalWorkspace onNodeSelect={handleNodeNavigation} />
            </div>
          </div>
        </section>

        {/* PROFESSIONAL IDENTITY (ABOUT) */}
        <section id="about" className="space-y-8 scroll-mt-20">
          
          {/* Header block */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Professional Identity Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight uppercase">
              Who is Karri Abhiram?
            </h2>
            <p className="text-xs text-emerald-400 font-mono">
              Bridging Logic and Experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Image with large HUD frame overlay */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 glass shadow-lg relative overflow-hidden group">
              
              {/* Cybernetic HUD Frame outline corners */}
              <div className="absolute inset-2 border border-emerald-500/5 pointer-events-none" />
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

              <ProfilePictureContainer size="lg" />

              <div className="text-center mt-5 font-mono">
                <span className="text-xs font-bold text-white block uppercase tracking-widest">{PERSONAL_INFO.preferredName}</span>
                <span className="text-[10px] text-gray-500 block uppercase tracking-wider mt-1">{PERSONAL_INFO.title}</span>
                <span className="text-[9px] text-emerald-500/80 font-bold block bg-emerald-950/40 border border-emerald-500/25 rounded px-2.5 py-0.5 mt-2">Visakhapatnam Hub</span>
              </div>
            </div>

            {/* Right Column: Descriptions & Highlights blocks */}
            <div className="lg:col-span-8 space-y-6 font-mono text-xs sm:text-sm">
              <div className="p-5 glass leading-relaxed text-gray-300">
                {PERSONAL_INFO.bio}
              </div>

              {/* Three detailed highlights modules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 11 professional certs highlight */}
                <div className="p-4 rounded border border-[#10b981]/25 bg-[#0d121b]/60 hover:border-[#10b981]/45 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span className="text-[9px] text-emerald-500 font-bold">11 SECURE CARDS</span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Professional Certifications</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    11 secure validation certificates spanning advanced machine learning logic, automated pipelines, database systems, and leadership summits.
                  </p>
                </div>

                {/* Foundational UX block */}
                <div className="p-4 rounded border border-[#06b6d4]/25 bg-[#0d121b]/60 hover:border-[#06b6d4]/45 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-[9px] text-cyan-400 font-bold">FOUNDATIONAL</span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Foundational UX Certification</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Demonstrates strict competency in wireframe modeling, visual contrast constraints, information routing architectures, and interactive logic.
                  </p>
                </div>

                {/* Creative Lens (Photography) highlight */}
                <div className="p-4 rounded border border-[#10b981]/25 bg-[#0d121b]/60 hover:border-[#10b981]/45 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <Camera className="w-5 h-5 text-emerald-400" />
                    <span className="text-[9px] text-emerald-500 font-bold">CREATIVE LENS</span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Photography & Aesthetics</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    Analyzing geometries in landscapes, capturing structural frames, and processing complex tones to optimize aesthetic outcomes.
                  </p>
                </div>

              </div>

              {/* Spoken Languages layout */}
              <div className="p-5 glass bg-[#0d121b]/40">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  Communications Protocol & Languages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PERSONAL_INFO.languages.map((l) => (
                    <div key={l.name} className="p-3 rounded bg-[#0d121b]/80 border border-[#10b981]/15">
                      <span className="text-white block font-bold">{l.name}</span>
                      <span className="text-[10px] text-emerald-400 block mt-0.5 font-mono">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SKILLS CORE */}
        <section id="omnitrix" className="scroll-mt-20">
          <OmnitrixSkills />
        </section>

        {/* PORTFOLIO SHOWCASE */}
        <section id="portfolio" className="space-y-8 scroll-mt-20">
          <ProjectsSection />

          {/* Upcoming Expansion Lab placeholder box */}
          <div className="p-6 sm:p-8 rounded-xl border border-dashed border-[#06b6d4]/30 bg-[#0d121b]/50 text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Next Is Coming Soon - Upcoming Expansion Laboratory
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-sans">
              Career mentor AI
            </h3>
            <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed font-mono">
              Currently compiling predictive pipelines linked to multimodal model orchestration networks. Monitor remote expansion updates on secure source networks:
            </p>
            <div className="flex justify-center gap-4 text-xs font-mono tracking-widest uppercase pt-2">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2 border border-gray-800 hover:border-emerald-500 hover:text-emerald-400 rounded-md transition-colors flex items-center gap-1.5 min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                GitHub Link
              </a>
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2 border border-gray-800 hover:border-cyan-500 hover:text-cyan-400 rounded-md transition-colors flex items-center gap-1.5 min-h-[44px]"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn Connect
              </a>
            </div>
          </div>

        </section>

        {/* CHRONOLOGY & CAREER (EXPERIENCE & EDUCATION) */}
        <section id="chronology" className="space-y-8 scroll-mt-20">
          
          {/* Header block */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono tracking-widest uppercase mb-2">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              Engineering Chronology Logs
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight uppercase">
              Experience & Academic Milestones
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Experience (Developer & Researcher) */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Briefcase className="w-4.5 h-4.5 text-emerald-400" />
                Professional Chronology
              </h3>

              {EXPERIENCE_TIMELINE.map((exp) => (
                <div 
                  key={exp.role}
                  className="p-5 glass hover:border-[#10b981]/40 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans uppercase">
                        {exp.role}
                      </h4>
                      <span className="text-xs text-emerald-400 font-mono block">
                        {exp.company}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[10px] text-gray-500 font-mono font-bold uppercase">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 font-mono text-[11px] text-gray-400 list-disc list-inside leading-relaxed pl-1">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="hover:text-gray-300 transition-colors">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-2 pt-3 border-t border-gray-900">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-bold">Impact Tags & Core Modules</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-500/10 text-emerald-400 font-mono text-[9px] uppercase font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Academic Milestones */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <GraduationCap className="w-4.5 h-4.5 text-cyan-400" />
                Academic Ledgers
              </h3>

              <div className="relative border-l border-cyan-500/20 pl-6 ml-3 space-y-6">
                {ACADEMIC_MILESTONES.map((edu, idx) => (
                  <div key={edu.institution} className="relative group space-y-2">
                    
                    {/* Circle Node Indicator */}
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-black shadow-[0_0_8px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white font-sans uppercase">
                        {edu.institution}
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[9px] text-gray-500 font-mono font-bold uppercase">
                        {edu.duration}
                      </span>
                    </div>

                    <p className="text-xs text-cyan-400 font-mono font-medium leading-relaxed">
                      {edu.degree}
                    </p>

                    {edu.grade && (
                      <span className="inline-block px-1.5 py-0.5 rounded bg-cyan-950/35 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono font-bold">
                        {edu.grade}
                      </span>
                    )}

                    {edu.description && (
                      <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ACADEMIC LEDGER VERIFICATIONS */}
        <section id="credentials" className="scroll-mt-20">
          <CredentialsSection />
        </section>

        {/* COMMUNICATION HUB */}
        <section id="contact" className="scroll-mt-20">
          <ContactHub />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#10b981]/20 bg-[#0d121b] py-10 font-mono text-[10px] select-none text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-gray-400 uppercase tracking-widest font-bold">SYSTEM ACTIVE // VISAKHAPATNAM NODE</span>
          </div>
          
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed uppercase">
            Karri Abhiram Portfolio v2.4.0 — All cryptographies aligned. Built using React 19, Vite, and absolute Tailwind matrices.
          </p>

          <p className="text-gray-500 pt-2 uppercase">
            © 2026 Karri Pavan Durga Satya Abhiram. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
