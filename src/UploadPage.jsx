import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  // Track files for each specific ingestion module
  const [files, setFiles] = useState({ fir: null, txn: null, cdr: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (moduleKey, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [moduleKey]: file }));
      setErrorMessage(''); // Clear errors when a new file is added
    }
  };

  // Check if at least one file has been selected
  const hasFiles = Object.values(files).some((file) => file !== null);

  // Send files to FastAPI Backend
  const handleExecute = async () => {
    if (!hasFiles) return;

    setIsProcessing(true);
    setErrorMessage('');

    const formData = new FormData();

    // Append files under the 'files' field expected by FastAPI
    if (files.fir) formData.append('files', files.fir);
    if (files.txn) formData.append('files', files.txn);
    if (files.cdr) formData.append('files', files.cdr);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned error code: ${response.status} (${response.statusText})`);
      }

      const backendData = await response.json();
      console.log('✅ Extraction Response Received:', backendData);

      // Navigate to Results page with the backend payload
      navigate('/results', { state: { backendData } });
    } catch (error) {
      console.error('API Error:', error);
      setErrorMessage(
        'Failed to connect to the analysis engine. Ensure Uvicorn is running on http://127.0.0.1:8000.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const ingestionModules = [
    {
      id: 'fir',
      title: 'FIR Ingestion',
      desc: 'Police reports & text narratives (.pdf, .txt)',
      accept: '.pdf,.txt',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
    },
    {
      id: 'txn',
      title: 'Transaction Records',
      desc: 'Bank logs & crypto trails (.csv, .xlsx)',
      accept: '.csv,.xlsx',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      ),
    },
    {
      id: 'cdr',
      title: 'Call Detail Records',
      desc: 'Telecom tower & call metadata (.csv)',
      accept: '.csv',
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
  ];

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
              <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                99.8%
              </span>
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

        {/* Right Side: Data Ingestion Bays */}
        <div className="col-span-2 bg-[#051329]/50 border border-cyan-800/40 p-6 rounded-lg backdrop-blur-md flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-medium">Multi-Source Ingestion Bays</h2>
            <span className="text-[10px] px-2 py-1 bg-cyan-950 text-cyan-400 rounded border border-cyan-800 tracking-widest uppercase">
              {hasFiles ? 'Payload Ready' : 'Awaiting Payload'}
            </span>
          </div>

          {/* Render the 3 upload bays */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {ingestionModules.map((mod) => (
              <label
                key={mod.id}
                htmlFor={`file-upload-${mod.id}`}
                className={`relative flex items-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${
                  files[mod.id]
                    ? 'border-green-500 bg-green-950/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'border-cyan-800/60 hover:border-cyan-400 hover:bg-cyan-950/20'
                }`}
              >
                <input
                  type="file"
                  id={`file-upload-${mod.id}`}
                  className="hidden"
                  accept={mod.accept}
                  onChange={(e) => handleFileChange(mod.id, e)}
                  disabled={isProcessing}
                />

                {/* Icon Container */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg mr-4 transition-colors ${
                    files[mod.id]
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-cyan-900/40 text-cyan-500 group-hover:text-cyan-300'
                  }`}
                >
                  {files[mod.id] ? (
                    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {mod.icon}
                    </svg>
                  )}
                </div>

                {/* Text Container */}
                <div className="flex-1">
                  <h3 className={`font-bold tracking-wide text-sm ${files[mod.id] ? 'text-green-400' : 'text-cyan-400'}`}>
                    {mod.title}
                  </h3>
                  <p
                    className={`text-xs mt-1 truncate max-w-[200px] sm:max-w-[300px] ${
                      files[mod.id] ? 'text-green-500/70' : 'text-cyan-700'
                    }`}
                  >
                    {files[mod.id] ? files[mod.id].name : mod.desc}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="ml-auto">
                  {files[mod.id] ? (
                    <span className="text-[9px] px-2 py-1 bg-green-950 text-green-400 rounded border border-green-800 tracking-widest uppercase">
                      Secured
                    </span>
                  ) : (
                    <span className="text-[9px] px-2 py-1 bg-[#051329] text-cyan-700 rounded border border-cyan-900/50 tracking-widest uppercase group-hover:border-cyan-600 group-hover:text-cyan-400 transition-colors">
                      Upload
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-red-400 text-xs flex items-center gap-2">
              <span className="font-bold">⚠️ Error:</span> {errorMessage}
            </div>
          )}

          {/* Execute Button */}
          <button
            disabled={!hasFiles || isProcessing}
            onClick={handleExecute}
            className={`mt-6 w-full py-4 rounded-lg font-bold tracking-widest uppercase transition-all duration-300 ${
              !hasFiles
                ? 'bg-[#0a192f] text-cyan-900 border border-cyan-900/50 cursor-not-allowed'
                : isProcessing
                ? 'bg-cyan-600 text-white animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                : 'bg-cyan-500 hover:bg-cyan-400 text-[#020813] shadow-[0_0_15px_rgba(6,182,212,0.3)]'
            }`}
          >
            {isProcessing ? 'Correlating Data & Extracting Entities...' : 'Initialize Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
}