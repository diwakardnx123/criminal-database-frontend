import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Globe from 'react-globe.gl';
import UploadPage from './UploadPage';
import ResultsPage from './ResultPage';

// ==========================================
// 3D GLOBE BACKGROUND (react-globe.gl)
// ==========================================
function AnimatedBackground() {
  const globeRef = useRef();
  const [arcsData, setArcsData] = useState([]);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    // Handle window resize for the 3D canvas
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    // Generate random threat data arcs bridging continents
    const generateArcs = () => {
      return [...Array(25)].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: ['#06b6d4', '#3b82f6', '#818cf8'][Math.floor(Math.random() * 3)] // Cyan, Blue, Indigo
      }));
    };

    setArcsData(generateArcs());

    // Auto-rotate the globe slowly
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.8;
      globeRef.current.controls().enableZoom = false; // Prevent accidental zooming
    }

    // Refresh arcs every 5 seconds to simulate live data
    const interval = setInterval(() => setArcsData(generateArcs()), 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020813] pointer-events-none">
      {/* Deep space radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] z-10"></div>

      {/* The 3D Globe */}
      <div className="absolute top-0 right-[-20%] opacity-40 mix-blend-screen">
        <Globe
          ref={globeRef}
          width={windowSize.width * 0.7} // Scale globe to fit the right side of the screen
          height={windowSize.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" // Dark mode map
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcsTransitionDuration={0}
          atmosphereColor="#06b6d4"
          atmosphereAltitude={0.15}
        />
      </div>
    </div>
  );
}

// ==========================================
// SIDEBAR
// ==========================================
function Sidebar() {
  return (
    <div className="w-16 h-screen border-r border-cyan-900/50 bg-[#020813]/60 backdrop-blur-xl flex flex-col items-center py-6 gap-8 z-20 absolute left-0 top-0">
      <div className="w-8 h-8 text-cyan-400 mb-4 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-5l-2.5 2.5-1.42-1.42L12 7.17l4.92 4.92-1.42 1.42L13 11.5v5h-2z"/></svg>
      </div>
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
// MAIN APP LAYOUT & ROUTER
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
              <Route path="/" element={<UploadPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}