import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// ==========================================
// BACKGROUND: HOLOGRAPHIC DOTTED GLOBE & NETWORK
// ==========================================
function AnimatedBackground() {
  const [nodes, setNodes] = useState([]);

  // Generate random floating nodes for the background network
  useEffect(() => {
    const newNodes = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setNodes(newNodes);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020813] pointer-events-none">
      {/* Deep space radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)]"></div>

      {/* Holographic Dotted Globe (Approximating the Image) */}
      <div className="absolute right-[-15%] top-[-5%] w-[900px] h-[900px] opacity-60 animate-[spin_120s_linear_infinite]">
        <svg viewBox="0 0 800 800" className="w-full h-full text-cyan-400" fill="none" stroke="currentColor">
          {/* Outer glowing atmosphere */}
          <circle cx="400" cy="400" r="360" fill="rgba(6,182,212,0.03)" stroke="none" />

          {/* Dense Dotted Sphere (Simulating particle earth) */}
          <circle cx="400" cy="400" r="350" strokeWidth="3" strokeDasharray="2 6" className="opacity-40" />
          <circle cx="400" cy="400" r="330" strokeWidth="3" strokeDasharray="1 8" className="opacity-30" />
          <circle cx="400" cy="400" r="310" strokeWidth="2" strokeDasharray="4 6" className="opacity-40" />
          <circle cx="400" cy="400" r="290" strokeWidth="4" strokeDasharray="1 10" className="opacity-20" />
          <circle cx="400" cy="400" r="250" strokeWidth="2" strokeDasharray="2 12" className="opacity-30" />

          {/* Latitude / Longitude 3D curves */}
          <ellipse cx="400" cy="400" rx="350" ry="120" strokeWidth="1" strokeDasharray="4 4" transform="rotate(25 400 400)" className="opacity-50" />
          <ellipse cx="400" cy="400" rx="350" ry="60" strokeWidth="1" strokeDasharray="2 6" transform="rotate(-25 400 400)" className="opacity-30" />
          <ellipse cx="400" cy="400" rx="120" ry="350" strokeWidth="1" strokeDasharray="4 4" transform="rotate(15 400 400)" className="opacity-50" />

          {/* Bright network lines wrapping the globe */}
          <path d="M 50 400 Q 400 100 750 400" strokeWidth="2" className="opacity-70 text-cyan-200 shadow-[0_0_15px_#22d3ee]" />
          <path d="M 150 150 Q 400 500 650 650" strokeWidth="1.5" className="opacity-60 text-cyan-300" />

          {/* Glowing intersection nodes on the globe */}
          <circle cx="215" cy="275" r="4" fill="#22d3ee" stroke="none" className="animate-pulse shadow-[0_0_10px_#22d3ee]" />
          <circle cx="585" cy="525" r="5" fill="#fff" stroke="none" className="animate-pulse shadow-[0_0_15px_#fff]" />
          <circle cx="630" cy="220" r="3" fill="#22d3ee" stroke="none" className="animate-pulse" />
          <circle cx="120" cy="500" r="4" fill="#22d3ee" stroke="none" className="animate-pulse" />
        </svg>
      </div>

      {/* Floating Background Network Points */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse"
          style={{
            top: node.top,
            left: node.left,
            animationDuration: node.animationDuration,
            animationDelay: node.animationDelay,
          }}
        >
          <div className="absolute top-1 left-1 w-24 h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent transform rotate-45 origin-top-left"></div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// SIDEBAR (Glassmorphism UI)
// ==========================================
function Sidebar() {
  return (
    <div className="w-16 h-screen border-r border-cyan-900/50 bg-[#020813]/60 backdrop-blur-xl flex flex-col items-center py-6 gap-8 z-20 absolute left-0 top-0">
      <div className="w-8 h-8 text-cyan-400 mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
        {/* Abstract Database/Crime Icon */}
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.5 2.5-1.42-1.42L12 7.17l4.92 4.92-1.42 1.42L13 11.5v5h-2z"/></svg>
      </div>
      {/* Nav Icons */}
      {[
        <path key="1" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>,
        <rect key="2" x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>,
        <path key="3" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>,
        <ellipse key="4" cx="12" cy="5" rx="9" ry="3"></ellipse>,
      ].map((path, idx) => (
        <button key={idx} className="text-cyan-700 hover:text-cyan-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {path}
            {idx === 3 && <><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>}
          </svg>
        </button>
      ))}
    </div>
  );
}

// ==========================================
// 1. UPLOAD PAGE VIEW
// ==========================================
function UploadView() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => navigate('/results'), 1500);
  };

  return (
    <div className="pointer-events-auto flex flex-col h-full w-full max-w-5xl mx-auto mt-8">

      {/* Tracker Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white tracking-wide">National Crime Tracker</h1>
        <p className="text-cyan-500/80 text-sm mt-1">Real-Time Intelligence Ingestion & Network Analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Side: Tracker Stats Panel */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-[#051329]/50 border border-cyan-800/40 p-5 rounded-lg backdrop-blur-md">
            <p className="text-slate-400 text-xs uppercase mb-1 tracking-wider">Data Integrity</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">99.8%</span>
              <span className="text-green-400 text-sm mb-1">↑ System Optimal</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">Corrupted nodes isolated</p>
          </div>

          <div className="bg-[#051329]/50 border border-cyan-800/40 p-5 rounded-lg backdrop-blur-md">
            <p className="text-slate-400 text-xs uppercase mb-1 tracking-wider">Records Processed</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white">1.4M+</span>
            </div>
            <p className="text-slate-500 text-xs mt-2">Active Investigations: 4,872</p>
          </div>
        </div>

        {/* Right Side: Data Ingestion (Dynamic Theme) */}
        <div className="col-span-2 bg-[#051329]/50 border border-cyan-800/40 p-6 rounded-lg backdrop-blur-md flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-medium">Intelligence Ingestion Module</h2>
            <span className="text-[10px] px-2 py-1 bg-cyan-950 text-cyan-400 rounded border border-cyan-800 tracking-widest uppercase">
              Awaiting Payload
            </span>
          </div>

          <div
            className={`flex-1 border-2 border-dashed rounded-xl p-10 text-center transition-all duration-500 cursor-pointer flex flex-col justify-center items-center group
              ${selectedFile 
                ? 'border-green-500 bg-green-950/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]' 
                : 'border-cyan-800/60 hover:border-cyan-400 hover:bg-cyan-950/20'}`}
            onClick={() => !isProcessing && fileInputRef.current.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

            {selectedFile ? (
              <>
                {/* Green Success State */}
                <svg className="w-16 h-16 text-green-400 mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-400 font-bold text-lg mb-1 tracking-widest">RECORD SECURED</p>
                <p className="text-green-500/70 text-sm">{selectedFile.name}</p>
              </>
            ) : (
              <>
                {/* Cyan Idle State */}
                <svg className="w-16 h-16 text-cyan-600 mb-4 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-cyan-400 font-medium mb-1">Click to Upload Crime Intelligence File</p>
                <p className="text-cyan-700 text-xs">Supports FIRs (.TXT), CDRs (.CSV), and Bank Logs</p>
              </>
            )}
          </div>

          <button
            disabled={!selectedFile || isProcessing}
            onClick={handleExecute}
            className={`mt-6 w-full py-4 rounded-lg font-bold tracking-widest uppercase transition-all duration-300
              ${!selectedFile 
                ? 'bg-[#0a192f] text-cyan-900 border border-cyan-900/50 cursor-not-allowed' 
                : isProcessing
                ? 'bg-cyan-600 text-white animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                : 'bg-cyan-500 hover:bg-cyan-400 text-[#020813] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              }`}
          >
            {isProcessing ? 'Extracting Network Entities...' : 'Initialize Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. RESULTS PAGE VIEW
// ==========================================
function ResultsView() {
  const navigate = useNavigate();

  const flaggedSuspects = [
    { id: 'S-8991', name: 'Victor Vance', risk: 'Critical', desc: 'Identified in 3 FIRs' },
    { id: 'S-4012', name: 'Marcus Cole', risk: 'High', desc: 'Money Laundering Hub' },
  ];

  return (
    <div className="pointer-events-auto flex flex-col h-full w-full max-w-6xl mx-auto mt-6 mb-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 self-start text-cyan-600 hover:text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
      >
        <span>←</span> Back to Ingestion
      </button>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">

        {/* COLORFUL NETWORK GRAPH PANEL */}
        <div className="lg:col-span-2 flex flex-col bg-[#051329]/60 border border-cyan-800/40 rounded-xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] min-h-[500px] relative overflow-hidden">
          <div className="border-b border-cyan-800/40 p-4 flex justify-between items-center bg-[#0a192f]/50">
            <h2 className="text-white font-medium tracking-wide">NetworkX Entity Mapping</h2>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-300">
              <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]"></span> Suspect
              <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] ml-2"></span> Account
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] ml-2"></span> Location
            </div>
          </div>

          <div className="p-4 flex-1 flex items-center justify-center relative">
            {/* Colorful Mock Network Graph */}
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-md drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {/* Lines/Edges */}
              <line x1="200" y1="200" x2="100" y2="100" stroke="#475569" strokeWidth="2" />
              <line x1="200" y1="200" x2="320" y2="150" stroke="#475569" strokeWidth="2" />
              <line x1="200" y1="200" x2="150" y2="300" stroke="#475569" strokeWidth="2" />
              <line x1="200" y1="200" x2="280" y2="320" stroke="#475569" strokeWidth="2" />
              <line x1="320" y1="150" x2="350" y2="80" stroke="#475569" strokeWidth="1" strokeDasharray="4" />
              <line x1="100" y1="100" x2="50" y2="150" stroke="#475569" strokeWidth="1" strokeDasharray="4" />

              {/* Central Node */}
              <circle cx="200" cy="200" r="18" fill="#ec4899" className="animate-pulse shadow-[0_0_15px_#ec4899]" />
              <text x="200" y="235" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">V. Vance</text>

              {/* Connected Nodes */}
              <circle cx="100" cy="100" r="12" fill="#facc15" />
              <text x="100" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">Acct #891</text>

              <circle cx="320" cy="150" r="14" fill="#22d3ee" />
              <text x="320" y="175" fill="#94a3b8" fontSize="10" textAnchor="middle">Mumbai (IP)</text>

              <circle cx="150" cy="300" r="10" fill="#ec4899" />
              <text x="150" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">M. Cole</text>

              <circle cx="280" cy="320" r="12" fill="#facc15" />
              <circle cx="350" cy="80" r="8" fill="#22d3ee" />
              <circle cx="50" cy="150" r="8" fill="#22d3ee" />
            </svg>

            {/* Graph Metrics Overlay */}
            <div className="absolute bottom-6 left-6 bg-[#020813]/80 border border-cyan-900/50 p-3 rounded text-xs text-slate-300">
              <p className="text-cyan-400 font-bold mb-1 uppercase tracking-wider">Graph Metrics</p>
              <p>Total Nodes: <span className="text-white">142</span></p>
              <p>Extracted Edges: <span className="text-white">389</span></p>
              <p>Density: <span className="text-white">0.042</span></p>
            </div>
          </div>
        </div>

        {/* THREAT ACTIVITY PANEL */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-[#051329]/60 border border-cyan-800/40 rounded-xl backdrop-blur-md p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></span>
              <h2 className="text-white font-medium tracking-wide">Flagged Suspects</h2>
            </div>

            <div className="space-y-3 flex-1 overflow-auto">
              {flaggedSuspects.map((suspect) => (
                <div key={suspect.id} className="p-3 border border-red-900/50 bg-red-950/30 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">{suspect.name}</span>
                    <span className="text-[9px] px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded uppercase tracking-wider">
                      {suspect.risk}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex justify-between">
                    <span>{suspect.id}</span>
                    <span>{suspect.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Activity Chart Placeholder */}
          <div className="h-48 bg-[#051329]/60 border border-cyan-800/40 rounded-xl backdrop-blur-md p-5 flex flex-col">
             <h2 className="text-white font-medium text-sm mb-4">Entity Detection Timeline</h2>
             <div className="flex-1 w-full flex items-end justify-between gap-1">
               {/* Generates random bars for a fake chronological chart */}
               {[...Array(20)].map((_, i) => (
                 <div key={i} className="w-2 bg-cyan-500/60 rounded-t-sm hover:bg-cyan-300 transition-colors cursor-pointer" style={{ height: `${Math.random() * 100}%` }}></div>
               ))}
             </div>
             <div className="flex justify-between mt-2 text-[9px] text-slate-500 uppercase tracking-widest">
                <span>Start of Document</span>
                <span>End</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN APP LAYOUT & ROUTER
// ==========================================
export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#020813] font-sans overflow-x-hidden selection:bg-cyan-900 selection:text-white">

        <AnimatedBackground />
        <Sidebar />

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-10 pl-24 pr-8 py-6 flex flex-col min-h-screen pointer-events-none">

          {/* Top Navbar */}
          <header className="flex justify-end items-center gap-6 text-[10px] font-medium text-slate-400 mb-2 pointer-events-auto uppercase tracking-widest">
             <div className="flex items-center gap-2 hover:text-white cursor-pointer">
               Access: <span className="text-cyan-400">Level-4 Intelligence</span> <span>▼</span>
             </div>
             <div className="flex items-center gap-2 hover:text-white cursor-pointer">
               Jurisdiction: <span className="text-cyan-400">All India</span> <span>▼</span>
             </div>
             <div className="flex items-center gap-2 hover:text-white cursor-pointer">
               Database: <span className="text-cyan-400">Live Sync</span> <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-1"></span>
             </div>
          </header>

          {/* ROUTED CONTENT */}
          <div className="flex-1 pointer-events-none flex flex-col">
            <Routes>
              <Route path="/" element={<UploadView />} />
              <Route path="/results" element={<ResultsView />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}