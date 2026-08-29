import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResultsPage() {
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

          <div className="h-48 bg-[#051329]/60 border border-cyan-800/40 rounded-xl backdrop-blur-md p-5 flex flex-col">
             <h2 className="text-white font-medium text-sm mb-4">Entity Detection Timeline</h2>
             <div className="flex-1 w-full flex items-end justify-between gap-1">
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