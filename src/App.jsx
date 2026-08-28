import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// ==========================================
// 1. UPLOAD PAGE VIEW
// ==========================================
function UploadView() {
  const [activeTab, setActiveTab] = useState('fir');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleExecute = () => {
    navigate('/results');
  };

  return (
    <div className="pointer-events-auto flex flex-col h-full max-w-2xl mx-auto w-full mt-10">
      {/* TABS */}
      <div className="flex space-x-2 mb-6 justify-center">
        {['fir', 'transactions', 'calls'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedFile(null); }}
            className={`px-6 py-2 uppercase text-sm font-bold border transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-red-900 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                : 'bg-black border-red-950 text-red-800 hover:border-red-700 hover:text-red-500'
            }`}
          >
            {tab === 'fir' ? 'FIR Reports' : tab === 'transactions' ? 'Transaction Records' : 'Call Records'}
          </button>
        ))}
      </div>

      {/* INGESTION PANEL */}
      <div className="flex flex-col bg-black/80 border border-red-900 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] flex-1 mb-8">
        <div className="bg-red-950/40 border-b border-red-900 p-3">
          <h2 className="text-red-500 font-bold uppercase text-sm tracking-wider">
            1. Data Ingestion: {activeTab}
          </h2>
        </div>

        <div className="p-8 flex-1 flex flex-col justify-center">
          <div
            className="border-2 border-dashed border-red-900 rounded p-12 text-center hover:bg-red-950/20 hover:border-red-600 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
            />
            <svg className="w-16 h-16 text-red-900 mx-auto mb-4 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <p className="text-red-600 font-bold mb-1 text-lg">TARGET FILE REQUIRED</p>
            <p className="text-sm text-red-800">Click to upload raw intel</p>
          </div>

          {selectedFile && (
            <div className="mt-6 p-4 border border-red-800 bg-red-950/30 flex justify-between items-center">
              <span className="text-red-300 text-base truncate">{selectedFile.name}</span>
              <button onClick={() => setSelectedFile(null)} className="text-red-600 hover:text-white text-2xl font-bold ml-2">×</button>
            </div>
          )}

          <button
            disabled={!selectedFile}
            onClick={handleExecute}
            className="mt-8 w-full py-4 bg-red-800 hover:bg-red-600 disabled:bg-black disabled:border disabled:border-red-950 disabled:text-red-950 text-white font-bold uppercase tracking-widest transition-colors shadow-[0_0_10px_rgba(220,38,38,0.2)] text-lg"
          >
            Execute Analysis
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
    { id: 'S-01', name: 'Victor Vance', risk: 'Critical', crime: 'Money Laundering' },
    { id: 'S-02', name: 'Marcus Cole', risk: 'High', crime: 'Extortion' },
  ];

  return (
    <div className="pointer-events-auto flex flex-col h-full w-full mt-6 mb-8">
      <button
        onClick={() => navigate('/')}
        className="mb-4 self-start text-red-600 hover:text-red-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2"
      >
        <span>←</span> Abort / Return to Ingestion
      </button>

      {/* TWO-COLUMN LAYOUT FOR RESULTS */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">

        {/* FLAGGED PANEL */}
        <div className="flex flex-col bg-black/80 border border-red-900 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div className="bg-red-950/40 border-b border-red-900 p-3">
            <h2 className="text-red-500 font-bold uppercase text-sm tracking-wider">
              2. Flagged Entities
            </h2>
          </div>
          <div className="p-6 flex-1 overflow-auto space-y-4">
            {flaggedSuspects.map((suspect) => (
              <div key={suspect.id} className="p-4 border-l-4 border-red-600 bg-gradient-to-r from-red-950/50 to-transparent">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-red-100 text-lg">{suspect.name}</span>
                  <span className="text-xs px-2 py-1 bg-red-600 text-black font-bold uppercase animate-pulse">
                    {suspect.risk}
                  </span>
                </div>
                <div className="text-sm text-red-500 flex justify-between">
                  <span>ID: {suspect.id}</span>
                  <span>{suspect.crime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NETWORK GRAPH PANEL */}
        <div className="flex flex-col bg-black/80 border border-red-900 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] min-h-[400px]">
          <div className="bg-red-950/40 border-b border-red-900 p-3 flex justify-between items-center">
            <h2 className="text-red-500 font-bold uppercase text-sm tracking-wider">
              3. NetworkX Visualization
            </h2>
            <span className="text-[10px] text-red-700 border border-red-800 px-1">NODE MAP</span>
          </div>
          <div className="p-4 flex-1 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]"></div>

            <svg className="w-32 h-32 text-red-900 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <p className="text-red-600 font-bold uppercase text-center mb-2 relative z-10 text-xl">Graph Ready</p>
            <p className="text-sm text-red-800 text-center max-w-[80%] relative z-10">
              NetworkX payload successfully rendered from analysis pipeline.
            </p>
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
  const [mapPings, setMapPings] = useState([]);

  // Triggers a radar ping animation when the India map is clicked
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPing = { id: Date.now(), x, y };
    setMapPings((prev) => [...prev, newPing]);

    setTimeout(() => {
      setMapPings((prev) => prev.filter(p => p.id !== newPing.id));
    }, 1000);
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-black text-red-500 font-mono">

        {/* 1. BACKGROUND GLOBE (Fixed for scrolling) */}
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center opacity-30 pointer-events-none z-0">
          <svg className="w-[900px] h-[900px] animate-[spin_60s_linear_infinite] text-red-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.1">
            <circle cx="12" cy="12" r="10"></circle>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
            <ellipse cx="12" cy="12" rx="4" ry="10"></ellipse>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="12" y1="2" x2="12" y2="22"></line>
          </svg>
        </div>

        {/* 2. INTERACTIVE INDIA MAP BACKGROUND (Fixed for scrolling) */}
        <div className="fixed inset-0 flex items-center justify-center z-0 opacity-40">
          <div className="relative cursor-crosshair" onClick={handleMapClick} title="Click to ping location">
            <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] text-red-800 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:text-red-700 transition-colors duration-500" fill="currentColor">
              <path d="M193.3,95.1 c8.4-14,24.1-32,32.4-44.5c4.7-7.2,14.6-13.7,23.3-15.3c15.7-2.9,23.9,4.2,33.1,16c9.8,12.7,21.8,20.8,37.3,23.6 c8.3,1.5,17.2,7.2,21.5,14.4c6.3,10.6,2,24-4.8,33.6c-7,10.1-13.6,19.7-21,30.3c-4.4,6.3-5.2,14.5-4.4,22 c0.9,9.4,4.7,17.6,11.2,24.7c7,7.7,16.5,11,26.7,13.6c11.9,3,23.2,7.6,33.2,14.7c10.8,7.7,19.3,17.7,25.6,29.3 c7.4,13.6,7.5,28,4.7,42.7c-2.3,11.7-8.1,21.7-16,30.5c-9,10-18.7,19.3-27.9,29c-6.1,6.5-12,14.4-15.7,22.6 c-5.2,11.5-6.8,24-11.2,35.7c-4.9,13-11.7,24.8-21,35.3c-11.6,13.1-24.8,24.7-37.4,36.8c-12.7,12.3-24.8,25.2-37,38 c-4,4.2-8.3,9.7-13.5,11.7c-7,2.8-15.4,1-22.7-1.3c-13.7-4.4-25.5-11.7-36.5-20.7c-12-9.7-23.7-19.8-35.3-30 c-10-8.8-19.7-18.1-29.4-27.4c-9.3-8.8-18.1-18.3-26.4-28.1c-10.3-12.2-20.1-24.8-29.2-37.8c-7.9-11.4-15.8-22.9-22-35.1 c-5.8-11.5-7.4-24-9.3-36.6c-1.3-8.7-0.7-17.7,1-26.2c2.9-14.7,10.8-26.6,22-36.5c10.3-9,21.8-16.7,33-24.6 c11.5-8.2,23.5-15.7,34.8-24c10-7.4,19.1-16,27.7-24.9c9.4-9.7,16-21.2,21-33.8C185.3,121.7,189.5,108.3,193.3,95.1z"/>
            </svg>
            {mapPings.map(ping => (
              <div
                key={ping.id}
                className="absolute w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75"
                style={{ left: ping.x - 16, top: ping.y - 16 }}
              ></div>
            ))}
          </div>
        </div>

        {/* 3. MAIN CONTENT CONTAINER */}
        <div className="relative z-10 max-w-7xl mx-auto p-6 flex flex-col min-h-screen pointer-events-none pb-20">

          {/* HEADER */}
          <header className="mb-6 border-b border-red-900 pb-4 flex justify-between items-end pointer-events-auto bg-black/40 backdrop-blur-sm p-4 rounded-t-lg">
            <div>
              <h1 className="text-4xl font-black text-red-600 tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                National Criminal Database
              </h1>
              <p className="text-red-800 text-sm mt-1 tracking-widest uppercase">
                Intelligence Ingestion & Network Analysis
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-red-600 border border-red-900 px-3 py-1 rounded bg-black/80">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              SYSTEM ONLINE
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