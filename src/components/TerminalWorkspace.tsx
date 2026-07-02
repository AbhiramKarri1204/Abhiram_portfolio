import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ChevronRight, Play, RefreshCw, Layers } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CREDENTIALS, SKILL_GROUPS } from '../data/portfolioData';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export const TerminalWorkspace: React.FC<{
  onNodeSelect?: (sectionId: string) => void;
}> = ({ onNodeSelect }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'LOGGING INTO SECURE WORKSPACE HUB V2.4.0...', type: 'system' },
    { text: 'ESTABLISHING HANDSHAKE PROTOCOL WITH KIET-CSE-AI...', type: 'system' },
    { text: 'CONNECTED: abhiram@workspace ~ bash active', type: 'success' },
    { text: 'Type "help" or click node script files below to compile profile matrices.', type: 'output' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLine = (text: string, type: TerminalLine['type']) => {
    setHistory((prev) => [...prev, { text, type }]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleCommandRun = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLine(`abhiram@workspace ~ bash: ${cmd}`, 'input');

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    setIsTyping(true);

    try {
      if (trimmed === 'help') {
        await sleep(200);
        addLine('=== SYSTEM COMMAND MATRIX ===', 'system');
        await sleep(100);
        addLine('ls                 - List available virtual node files', 'output');
        await sleep(100);
        addLine('cat bio.sh         - Print bio & academic profiles', 'output');
        await sleep(100);
        addLine('cat projects.git   - Retrieve dynamic Git project repositories', 'output');
        await sleep(100);
        addLine('cat credentials.crt - Verify cryptographic certification blocks', 'output');
        await sleep(100);
        addLine('cat skills.conf    - Display core technical skill modules', 'output');
        await sleep(100);
        addLine('clear              - Clear terminal terminal logs', 'output');
        await sleep(100);
        addLine('sudo calibrate    - Calibrate system UI parameters', 'success');
      } else if (trimmed === 'ls') {
        await sleep(250);
        addLine('bio.sh           projects.git       credentials.crt       skills.conf', 'success');
      } else if (trimmed === 'cat bio.sh') {
        await sleep(150);
        addLine('>>> INITIATING handshake protocol to secure sector...', 'system');
        await sleep(300);
        addLine('>>> Reading local node "bio.sh"...', 'system');
        await sleep(200);
        addLine('>>> Decrypting profile biosensor keys...', 'system');
        await sleep(350);
        addLine('--- COMPILING BIOGRAPHICAL FILE (bio.sh) ---', 'success');
        await sleep(150);
        addLine(`NAME:       ${PERSONAL_INFO.fullName}`, 'output');
        await sleep(100);
        addLine(`ROLE:       ${PERSONAL_INFO.title}`, 'output');
        await sleep(100);
        addLine(`LOCATION:   ${PERSONAL_INFO.location}`, 'output');
        await sleep(100);
        addLine(`COLLEGE:    Kakinada Institute of Engineering and Technology (KIET)`, 'output');
        await sleep(150);
        addLine(`BIO TRUNCATED: "${PERSONAL_INFO.bio.slice(0, 115)}..."`, 'success');
        await sleep(100);
        addLine('Establish focus link. Synchronizing anchor view elements...', 'success');
        if (onNodeSelect) onNodeSelect('about');
      } else if (trimmed === 'cat projects.git') {
        await sleep(150);
        addLine('>>> Initializing git fetch on secure master branch...', 'system');
        await sleep(350);
        addLine('>>> Connecting to remote node: https://github.com/KarriAbhiram...', 'system');
        await sleep(300);
        addLine('>>> Unpacking objects: 100% (23/23) - delta compression handshake complete.', 'system');
        await sleep(200);
        addLine('--- RETRIEVING REPOSITORIES (projects.git) ---', 'success');
        for (const p of PROJECTS) {
          await sleep(150);
          addLine(`> PROJECT: ${p.title} [Status: ${p.status.toUpperCase()}]`, 'success');
          addLine(`  DESC:   ${p.description}`, 'output');
          addLine(`  STACK:  ${p.tags.join(' | ')}`, 'output');
        }
        if (onNodeSelect) onNodeSelect('portfolio');
      } else if (trimmed === 'cat credentials.crt') {
        await sleep(150);
        addLine('>>> Querying secure ledger blockchain...', 'system');
        await sleep(300);
        addLine('>>> Verifying signature blocks with Visakhapatnam credentials hub...', 'system');
        await sleep(250);
        addLine('--- DECRYPTING CERTIFICATION LEDGER (credentials.crt) ---', 'success');
        for (const c of CREDENTIALS.slice(0, 3)) {
          await sleep(150);
          addLine(`[ID: ${c.id}] ${c.title}`, 'output');
          addLine(`  ISSUER: ${c.issuer} | SHA-256: ${c.sha256.substring(0, 16)}...`, 'success');
        }
        await sleep(100);
        addLine(`+ Total: ${CREDENTIALS.length} verified cryptographic items loaded.`, 'success');
        if (onNodeSelect) onNodeSelect('credentials');
      } else if (trimmed === 'cat skills.conf') {
        await sleep(150);
        addLine('>>> Opening local skills.conf registry...', 'system');
        await sleep(250);
        addLine('--- COMPILING SKILL METRICS MATRIX (skills.conf) ---', 'success');
        for (const g of SKILL_GROUPS) {
          await sleep(150);
          addLine(`[CATEGORY] ${g.name}`, 'success');
          for (const s of g.skills.slice(0, 3)) {
            await sleep(80);
            addLine(`  - ${s.name.padEnd(25)} : ${'■'.repeat(Math.round(s.value / 10))} ${s.value}%`, 'output');
          }
          addLine(`  - ... [truncated details]`, 'output');
        }
        if (onNodeSelect) onNodeSelect('omnitrix');
      } else if (trimmed === 'sudo calibrate') {
        await sleep(150);
        addLine('>>> COMPILING RECALIBRATION SIGNAL...', 'system');
        await sleep(350);
        addLine('MATRIX COMPLETED: Synchronizing dashboard frequencies with Visakhapatnam nodes...', 'success');
        if (onNodeSelect) onNodeSelect('omnitrix');
      } else {
        await sleep(200);
        addLine(`bash: command not found: "${cmd}". Type "help" or select a workspace node below.`, 'error');
      }
    } catch (err) {
      addLine('bash: pipeline execution failed unexpectedly.', 'error');
    } finally {
      setIsTyping(false);
    }
  };

  const handleNodeClick = (nodeFile: string) => {
    handleCommandRun(`cat ${nodeFile}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommandRun(inputValue);
    setInputValue('');
  };

  return (
    <div 
      id="workspace-bash-terminal"
      className="w-full rounded-lg border border-[#10b981]/25 bg-[#0d121b]/95 shadow-[0_15px_40px_rgba(3,7,18,0.8)] backdrop-blur-md overflow-hidden font-mono text-xs text-gray-300"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#05070a] border-b border-[#10b981]/15">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[10px] text-emerald-400/80 font-bold tracking-widest uppercase">
            abhiram@workspace ~ bash
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span>v2.4.0</span>
        </div>
      </div>

      {/* Terminal Screen Terminal Logs */}
      <div 
        id="terminal-logs-window"
        className="p-4 h-72 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-emerald-500/20"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === 'input' && (
              <span className="text-cyan-400 font-semibold">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-gray-300">{line.text}</span>
            )}
            {line.type === 'success' && (
              <span className="text-emerald-400 font-medium">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-red-400 font-semibold">{line.text}</span>
            )}
            {line.type === 'system' && (
              <span className="text-purple-400 text-[10px] uppercase font-bold tracking-wider">{line.text}</span>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-emerald-400/70">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span className="animate-pulse">Retrieving secure data packets...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Form Input Area */}
      <form 
        onSubmit={handleFormSubmit}
        className="flex items-center border-t border-[#10b981]/15 bg-[#05070a] px-3 py-2.5"
      >
        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type command here (e.g. ls, help, cat bio.sh)..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-emerald-300 placeholder-gray-700 ml-1.5 focus:ring-0"
        />
        <button
          type="submit"
          className="p-1 text-emerald-500 hover:text-emerald-400 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Run script"
        >
          <Play className="w-4 h-4 fill-emerald-500/20" />
        </button>
      </form>

      {/* Workspace Quick File Nodes Selection Buttons */}
      <div className="p-3 bg-[#0d121b]/65 border-t border-[#10b981]/15 flex flex-wrap gap-2 items-center justify-center">
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mr-1">Workspace Nodes:</span>
        <button
          type="button"
          onClick={() => handleNodeClick('bio.sh')}
          className="px-2.5 py-1.5 rounded border border-emerald-500/25 bg-emerald-950/10 hover:bg-emerald-500 hover:text-black font-semibold tracking-wider text-[10px] text-emerald-400 transition-all duration-300 min-h-[44px] flex items-center cursor-pointer"
        >
          bio.sh
        </button>
        <button
          type="button"
          onClick={() => handleNodeClick('projects.git')}
          className="px-2.5 py-1.5 rounded border border-cyan-500/25 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black font-semibold tracking-wider text-[10px] text-cyan-400 transition-all duration-300 min-h-[44px] flex items-center cursor-pointer"
        >
          projects.git
        </button>
        <button
          type="button"
          onClick={() => handleNodeClick('credentials.crt')}
          className="px-2.5 py-1.5 rounded border border-emerald-500/25 bg-emerald-950/10 hover:bg-emerald-500 hover:text-black font-semibold tracking-wider text-[10px] text-emerald-400 transition-all duration-300 min-h-[44px] flex items-center cursor-pointer"
        >
          credentials.crt
        </button>
        <button
          type="button"
          onClick={() => handleNodeClick('skills.conf')}
          className="px-2.5 py-1.5 rounded border border-cyan-500/25 bg-cyan-950/10 hover:bg-cyan-500 hover:text-black font-semibold tracking-wider text-[10px] text-cyan-400 transition-all duration-300 min-h-[44px] flex items-center cursor-pointer"
        >
          skills.conf
        </button>
      </div>
    </div>
  );
};
