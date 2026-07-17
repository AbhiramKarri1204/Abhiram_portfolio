import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Linkedin, Github, Globe, MapPin, FileText, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = resumeRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Create a temporary print frame or styling
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
          }
          /* Hide links URLs in printing or style nicely */
          a {
            text-decoration: none !important;
            color: black !important;
          }
          /* Fix margins */
          @page {
            size: portrait;
            margin: 0.4in;
          }
          .no-print {
            display: none !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      // We can also just trigger standard window.print() and let CSS handle it
      // Let's add a specific printing-active class to body and trigger print
      const printContainer = document.createElement('div');
      printContainer.id = 'print-area';
      printContainer.innerHTML = printContent;
      document.body.appendChild(printContainer);

      window.print();

      // Clean up
      document.body.removeChild(printContainer);
      document.head.removeChild(style);
    }
  };

  const handleDownload = () => {
    // Generate a beautiful formatted text file or open print window for Save to PDF (which is standard and keeps high-fidelity vector text)
    handlePrint();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          {/* Backdrop click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-4xl h-[90vh] bg-[#0b0f19] rounded-xl shadow-2xl flex flex-col overflow-hidden z-10 border border-slate-800"
          >
            {/* Control Bar (Modern Desktop Look) */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0d121b] border-b border-slate-800 no-print">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-cyan-950/40 border border-cyan-500/20 rounded-lg text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-white text-sm">Curriculum Vitae</h3>
                  <p className="text-[10px] text-gray-400 font-mono tracking-tight">KARRI_ABHIRAM_RESUME_2026.PDF</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b]/50 border border-slate-700 hover:border-cyan-400 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-400 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer min-h-[38px]"
                  title="Print / Save to PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="p-2 bg-[#1e293b]/50 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/30 text-slate-400 hover:text-red-400 rounded-lg transition-all cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Scrollable Canvas */}
            <div className="flex-1 overflow-y-auto bg-[#05070a]/90 p-4 sm:p-8 flex justify-center no-print">
              
              {/* Actual Printable Page Simulation */}
              <div 
                ref={resumeRef}
                className="w-full max-w-[210mm] bg-[#0d121b] shadow-2xl p-6 sm:p-10 text-slate-100 border border-slate-800 rounded-md print-canvas select-text"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                {/* Header Block */}
                <div className="text-center pb-5 border-b border-slate-800">
                  <h1 className="text-lg sm:text-xl font-black tracking-tight leading-none mb-2 mt-1">
                    <span className="text-white px-3.5 py-1.5 rounded-lg inline-block uppercase font-black text-xl tracking-tight">
                      Karri Pavan Durga Satya Abhiram
                    </span>
                  </h1>
                  <p className="text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-wider uppercase mb-3">
                    Aspiring Generative AI & Enterprise AI Engineer | Python Developer
                  </p>
                  
                  {/* Contact Grid */}
                  <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-[10.5px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Kakinada, Andhra Pradesh, India
                    </span>
                    <span className="text-slate-700">•</span>
                    <a href="mailto:karriabhiram91@gmail.com" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      karriabhiram91@gmail.com
                    </a>
                    <span className="text-slate-700">•</span>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                      LinkedIn
                    </a>
                    <span className="text-slate-700">•</span>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <Github className="w-3.5 h-3.5 text-cyan-400" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-relaxed text-justify">
                    Computer Science Engineering (Artificial Intelligence) student focused on Enterprise AI and Generative AI application development. Built Python-based AI, machine learning, and full-stack solutions using Google Gemini API, Mistral AI, Flask, REST APIs, and Scikit-learn. Skilled in prompt engineering, structured AI workflows, API integration, model evaluation, and Git/GitHub, with an interest in developing secure, scalable, and user-focused AI solutions for enterprise environments.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2.5">
                    Technical Skills
                  </h2>
                  <div className="space-y-1.5 text-[10.5px] sm:text-[11px]">
                    <div>
                      <strong className="text-white font-semibold">Programming:</strong> <span className="text-slate-300">Python, C, C++</span>
                    </div>
                    <div>
                      <strong className="text-white font-semibold">Enterprise AI & Generative AI:</strong>{' '}
                      <span className="text-slate-300">
                        Generative AI, Large Language Models (LLMs), Prompt Engineering, Google Gemini API, Mistral AI, AI Agents, LLM API Integration, Structured AI Workflows, Machine Learning, Scikit-learn, Pandas, NumPy, Model Evaluation
                      </span>
                    </div>
                    <div>
                      <strong className="text-white font-semibold">Backend & Web:</strong>{' '}
                      <span className="text-slate-300">Flask, REST APIs, API Integration, HTML5, CSS3, JavaScript, Bootstrap, Django (Basics)</span>
                    </div>
                    <div>
                      <strong className="text-white font-semibold">Data, Tools & Concepts:</strong>{' '}
                      <span className="text-slate-300">Git, GitHub, Jupyter Notebook, VS Code, Matplotlib, OOP, DBMS, Data Structures, Software Engineering</span>
                    </div>
                    <div>
                      <strong className="text-white font-semibold">Learning Focus:</strong>{' '}
                      <span className="text-slate-300">Enterprise AI architecture, responsible AI, LLM evaluation, workflow automation, cloud AI deployment</span>
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2.5">
                    Projects
                  </h2>
                  
                  <div className="space-y-4">
                    {/* APEX-FIT */}
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[11.5px] font-bold text-white uppercase">
                          APEX-FIT - AI Fitness Plan Generator
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">Jun 2026</span>
                      </div>
                      <div className="text-[10px] text-cyan-400 font-semibold mb-1">
                        Python, Flask, Gemini API, Strava API
                      </div>
                      <ul className="list-disc pl-4 text-[10.5px] text-slate-300 space-y-1">
                        <li>Developed a Generative AI application that creates personalized workout and nutrition plans from user biometrics, fitness goals, and dietary preferences.</li>
                        <li>Designed structured prompts and backend API workflows for context-aware plan generation; integrated progress tracking and Strava live-run data into the user experience.</li>
                      </ul>
                    </div>

                    {/* Photography Content Assistant */}
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[11.5px] font-bold text-white uppercase">
                          Photography Content Assistant
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">Jun 2026</span>
                      </div>
                      <div className="text-[10px] text-cyan-400 font-semibold mb-1">
                        Mistral AI, Prompt Engineering, AI Agent
                      </div>
                      <ul className="list-disc pl-4 text-[10.5px] text-slate-300 space-y-1">
                        <li>Built an AI content assistant that generates captions, reel concepts, cinematic shot plans, editing suggestions, and content calendars for photography creators.</li>
                        <li>Applied role-based prompts, constraints, and structured output patterns to improve response relevance, consistency, and usability.</li>
                      </ul>
                    </div>

                    {/* Mobile Price Prediction */}
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[11.5px] font-bold text-white uppercase">
                          Mobile Price Prediction
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">Feb-Apr 2024</span>
                      </div>
                      <div className="text-[10px] text-cyan-400 font-semibold mb-1">
                        Python, Scikit-learn, Pandas, Matplotlib
                      </div>
                      <ul className="list-disc pl-4 text-[10.5px] text-slate-300 space-y-1">
                        <li>Built a supervised classification pipeline to predict smartphone price ranges from hardware specifications and compared Logistic Regression, Random Forest, KNN, SVM, and Decision Tree models.</li>
                        <li>Evaluated model performance using accuracy, confusion matrix, and classification report, and visualized comparative results with Matplotlib.</li>
                      </ul>
                    </div>

                    {/* Recipe Finder */}
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[11.5px] font-bold text-white uppercase">
                          Recipe Finder
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">Feb-Apr 2025</span>
                      </div>
                      <div className="text-[10px] text-cyan-400 font-semibold mb-1">
                        Python, Flask, REST APIs, HTML/CSS/JS
                      </div>
                      <ul className="list-disc pl-4 text-[10.5px] text-slate-300 space-y-1">
                        <li>Developed an ingredient-based recipe recommendation web application with meal categorization and cooking instructions, demonstrating full-stack development and external API integration.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2.5">
                    Education
                  </h2>
                  <div className="space-y-3.5">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <strong className="text-[11px] text-white">B.Tech in Computer Science Engineering (Artificial Intelligence)</strong>
                        <span className="text-[10px] text-slate-400 font-mono">2023-2027</span>
                      </div>
                      <div className="text-[10.5px] text-slate-400 flex justify-between items-center">
                        <span className="bg-[#1e293b]/60 border border-slate-700 text-cyan-400 px-2.5 py-0.5 rounded-md inline-block font-bold mt-1 font-sans">
                          Kakinada Institute of Engineering and Technology
                        </span>
                        <span className="font-semibold text-white">CGPA: 7.48/10</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <strong className="text-[11px] text-white">Board of Intermediate (MPC)</strong>
                        <span className="text-[10px] text-slate-400 font-mono">2021-2023</span>
                      </div>
                      <div className="text-[10.5px] text-slate-400 flex justify-between items-center">
                        <span className="bg-[#1e293b]/60 border border-slate-700 text-cyan-400 px-2.5 py-0.5 rounded-md inline-block font-bold mt-1 font-sans">
                          Narayana Junior College, Visakhapatnam
                        </span>
                        <span className="font-semibold text-white">89.3%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <strong className="text-[11px] text-white">Board of Secondary Education (10th)</strong>
                        <span className="text-[10px] text-slate-400 font-mono">2020-2021</span>
                      </div>
                      <div className="text-[10.5px] text-slate-400 flex justify-between items-center">
                        <span className="bg-[#1e293b]/60 border border-slate-700 text-cyan-400 px-2.5 py-0.5 rounded-md inline-block font-bold mt-1 font-sans">
                          Narayana E-Techno School, Visakhapatnam
                        </span>
                        <span className="font-semibold text-white">100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Certifications & Training */}
                <div className="mt-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1 mb-2">
                    Selected Certifications & Training (10+ Completed)
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[10.5px] text-slate-300 pl-4 list-disc">
                    <li>GenAI Powered Data Analytics Job Simulation - Deloitte Australia (Forage)</li>
                    <li>AI-ML Virtual Internship - AICTE</li>
                    <li>Python Full Stack Development Program - AICTE</li>
                    <li>Data Analytics Job Simulation - Deloitte Australia (Forage)</li>
                    <li>X-Factor 21-Day AI Adoption Program - X-FACTOR</li>
                  </ul>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
