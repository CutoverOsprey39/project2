'use client';

import { useState, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Disc = {
  id: string;
  name: string;
  type: string;
};

type DiscActionsDropdownProps = {
  currentDiscs?: Disc[];
};

export default function DiscActionsDropdown({
  currentDiscs = [],
}: DiscActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDisc, setSelectedDisc] = useState<Disc | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [trackerDistance, setTrackerDistance] = useState<number | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showDiscList, setShowDiscList] = useState(false);

  // Stopwatch + results
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [showThrowResults, setShowThrowResults] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => {
    setIsOpen(false);
    setShowDiscList(false);
  };

  const toggleDiscList = () => setShowDiscList(!showDiscList);

  const handleSelectDisc = (disc: Disc) => {
    setSelectedDisc(disc);
    setSyncStatus('idle');
    setTrackerDistance(null);
    setShowDiscList(false);
  };

  const handleSync = () => {
    // TEMPORARY: Always success + fake distance
    // TODO: Replace with real device connection + distance reading
    setSyncStatus('success');
    setTrackerDistance(285);
    closeDropdown();
  };

  const handleRemoveDisc = () => {
    setShowRemoveConfirm(true);
  };

  const confirmRemove = () => {
    setSelectedDisc(null);
    setSyncStatus('idle');
    setTrackerDistance(null);
    setShowRemoveConfirm(false);
    closeDropdown();
  };

  const cancelRemove = () => {
    setShowRemoveConfirm(false);
  };

  const openAddPopup = () => {
    setShowAddPopup(true);
    setTrackingNumber('');
  };

  const handleAddDisc = () => {
    if (!trackingNumber.trim()) {
      alert("Please enter a tracking number");
      return;
    }

    // TEMPORARY: Simulate adding disc
    // TODO: Replace with real API call + refresh disc list
    alert(`Adding disc with tracking number: ${trackingNumber}`);

    setShowAddPopup(false);
    closeDropdown();
  };

  const cancelAdd = () => {
    setShowAddPopup(false);
  };

  // Stopwatch controls
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const start = Date.now() - elapsedTime * 1000;
      timerRef.current = setInterval(() => {
        setElapsedTime((Date.now() - start) / 1000);
      }, 100);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Show results only if we have valid distance & time
      if (trackerDistance && trackerDistance > 0 && elapsedTime > 0.5) {
        setShowThrowResults(true);
      }
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsedTime(0);
    setShowThrowResults(false);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const buttonText = selectedDisc
    ? `${selectedDisc.name} - ${selectedDisc.type}`
    : 'Disc Actions';

  // ────────────────────────────────────────────────
  // Handler for saving the throw (placeholder)
  // Replace alert with real save logic later (API, localStorage, context, etc.)
  const handleSaveThrow = () => {
    if (!trackerDistance || !elapsedTime) return;

    const throwData = {
      disc: selectedDisc ? `${selectedDisc.name} (${selectedDisc.type})` : 'Unknown disc',
      distance: trackerDistance,
      time: elapsedTime.toFixed(2),
      velocity: (trackerDistance / elapsedTime).toFixed(1),
      timestamp: new Date().toISOString(),
    };

    alert(
      `Throw saved!\n\n` +
      `Disc: ${throwData.disc}\n` +
      `Distance: ${throwData.distance} ft\n` +
      `Time: ${throwData.time} s\n` +
      `Avg Velocity: ${throwData.velocity} ft/s\n` +
      `Time: ${new Date(throwData.timestamp).toLocaleString()}`
    );

    // TODO: Replace alert with real save:
    // - send to API: await fetch('/api/throws', { method: 'POST', body: JSON.stringify(throwData) })
    // - update local state / context
    // - maybe reset stopwatch / results after save?
  };

  return (
    <div className="relative w-full max-w-md mx-auto space-y-8">
      {/* Main button */}
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 bg-[#54c4c3] text-black font-medium px-6 py-4 rounded-xl hover:bg-[#3daaa9] transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#54c4c3]/50 text-base md:text-lg min-h-13 touch-manipulation"
        onClick={toggleDropdown}
      >
        <span className="truncate">{buttonText}</span>
        <svg
          className={`w-6 h-6 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Disc Selector & Menu – always above tracker */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={closeDropdown} aria-hidden="true" />

          <div
            className="absolute left-0 right-0 mt-2 rounded-xl shadow-2xl bg-[#223066]/95 backdrop-blur-lg border border-[#764d9f]/50 ring-1 ring-black/20 focus:outline-none z-50 max-h-[70vh] overflow-y-auto"
            role="menu"
          >
            <div className="py-3 px-2">
              {/* Disc Selector (custom dropdown trigger) */}
              <div className="px-4 py-4 border-b border-[#764d9f]/30">
                <p className="text-sm text-white/70 uppercase tracking-wide mb-2 font-medium">
                  Select Active Disc
                </p>

                <button
                  type="button"
                  className="w-full flex justify-between items-center bg-[#190f2A] text-white border border-[#456fb6]/60 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#54c4c3] focus:ring-2 focus:ring-[#54c4c3]/40 touch-manipulation"
                  onClick={toggleDiscList}
                >
                  <span className="truncate">
                    {selectedDisc ? `${selectedDisc.name} - ${selectedDisc.type}` : 'Choose a disc...'}
                  </span>
                  <svg
                    className={`w-5 h-5 transition-transform ${showDiscList ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Disc List – drops down below the selector button */}
                {showDiscList && (
                  <div className="mt-1 w-full bg-[#190f2A] border border-[#456fb6]/60 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {currentDiscs.length > 0 ? (
                      currentDiscs.map((disc) => (
                        <button
                          key={disc.id}
                          className="w-full text-left px-4 py-3 text-base text-white hover:bg-[#54c4c3]/20 focus:outline-none focus:bg-[#54c4c3]/20 touch-manipulation"
                          onClick={() => handleSelectDisc(disc)}
                        >
                          {disc.name} - {disc.type}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-white/60">No discs in bag</div>
                    )}
                  </div>
                )}
              </div>

              {/* Sync Tracker */}
              <button
                className={`w-full text-left px-6 py-4 text-base flex items-center gap-4 rounded-lg transition touch-manipulation ${
                  selectedDisc
                    ? 'text-white hover:bg-[#54c4c3]/10 hover:text-[#54c4c3]'
                    : 'text-white/40 cursor-not-allowed'
                }`}
                disabled={!selectedDisc}
                onClick={handleSync}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>

                {syncStatus === 'idle' && 'Sync Current Tracker'}
                {syncStatus === 'success' && (
                  <span className="flex items-center gap-3">
                    Sync Successful
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                {syncStatus === 'error' && (
                  <span className="flex items-center gap-3">
                    Sync Failed
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>

              {/* Add New Tracker */}
              <button
                className="flex items-center gap-4 w-full text-left px-6 py-4 text-base text-white/90 hover:bg-[#54c4c3]/10 hover:text-[#54c4c3] transition rounded-lg touch-manipulation"
                onClick={openAddPopup}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Tracker Disc
              </button>

              {/* Remove Disc */}
              {selectedDisc && (
                <button
                  className="w-full text-left px-6 py-4 text-base text-red-300 hover:bg-red-900/20 hover:text-red-200 transition flex items-center gap-4 rounded-lg"
                  onClick={handleRemoveDisc}
                >
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove {selectedDisc.name}
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Tracker display – always below the dropdown (menu or button) */}
      {syncStatus === 'success' && trackerDistance !== null && (
        <div className="mt-10 mb-12 flex flex-col items-center">
          <div className="relative w-[75%] aspect-square max-w-45 rounded-full bg-[#764d9f] flex items-center justify-center shadow-2xl ring-2 ring-[#764d9f]/30">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              {trackerDistance}
            </span>
          </div>
          <p className="mt-3 text-white/90 text-base md:text-lg font-medium">
            ft
          </p>
        </div>
      )}

      {/* Stopwatch & Throw Results */}
      {syncStatus === 'success' && trackerDistance !== null && (
        <div className="mt-8 w-full max-w-md mx-auto space-y-6 px-4">
          {/* Stopwatch */}
          <div className="bg-[#190f2A]/80 backdrop-blur border border-[#456fb6]/40 rounded-xl p-5 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-4xl md:text-5xl font-mono font-bold text-[#54c4c3] tracking-tight">
                {elapsedTime.toFixed(2)} <span className="text-xl text-white/70">s</span>
              </div>
              <p className="text-sm text-white/60 mt-1">Time of Flight</p>
            </div>

            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <button
                  onClick={startStopwatch}
                  className="flex-1 bg-[#54c4c3] text-black font-medium py-3 px-6 rounded-lg hover:bg-[#3daaa9] transition touch-manipulation"
                  disabled={elapsedTime > 0 && !showThrowResults}
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={stopStopwatch}
                  className="flex-1 bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition touch-manipulation"
                >
                  Stop
                </button>
              )}

              <button
                onClick={resetStopwatch}
                className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition touch-manipulation"
                disabled={elapsedTime === 0}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Throw Results */}
          {showThrowResults && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white text-center">
                Throw Results
              </h3>

              {/* Flight Path Chart – distance (y) vs left/right (x) */}
              <div className="bg-[#190f2A]/80 backdrop-blur border border-[#456fb6]/40 rounded-xl p-4 shadow-lg h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={(() => {
                      const points = [];
                      const totalDistance = trackerDistance;
                      const maxHeight = 40; // fake max height in feet for visualization
                      const steps = 40;     // more points for smoother curve

                      // 32 interpolated points based on your provided waypoints
                      const deviationPoints = [
                        { progress: 0.000, deviation: 0.00 },
                        { progress: 0.032, deviation: 1.28 },
                        { progress: 0.065, deviation: 2.56 },
                        { progress: 0.097, deviation: 3.84 },
                        { progress: 0.129, deviation: 5.12 },
                        { progress: 0.161, deviation: 6.40 },
                        { progress: 0.194, deviation: 7.68 },
                        { progress: 0.226, deviation: 8.96 },
                        { progress: 0.258, deviation: 10.00 },
                        { progress: 0.290, deviation: 11.60 },
                        { progress: 0.323, deviation: 13.60 },
                        { progress: 0.355, deviation: 15.60 },
                        { progress: 0.387, deviation: 17.60 },
                        { progress: 0.419, deviation: 19.20 },
                        { progress: 0.452, deviation: 20.00 },
                        { progress: 0.484, deviation: 21.60 },
                        { progress: 0.516, deviation: 24.00 },
                        { progress: 0.548, deviation: 26.40 },
                        { progress: 0.581, deviation: 28.40 },
                        { progress: 0.613, deviation: 29.60 },
                        { progress: 0.645, deviation: 30.00 },
                        { progress: 0.677, deviation: 29.60 },
                        { progress: 0.710, deviation: 28.80 },
                        { progress: 0.742, deviation: 27.60 },
                        { progress: 0.774, deviation: 26.40 },
                        { progress: 0.806, deviation: 25.60 },
                        { progress: 0.839, deviation: 25.20 },
                        { progress: 0.871, deviation: 22.80 },
                        { progress: 0.903, deviation: 20.40 },
                        { progress: 0.935, deviation: 18.00 },
                        { progress: 0.968, deviation: 16.20 },
                        { progress: 1.000, deviation: 15.00 },
                      ];

                      // Helper: linear interpolation between the 32 points
                      const getDeviation = (progress: number) => {
                        for (let j = 0; j < deviationPoints.length - 1; j++) {
                          const curr = deviationPoints[j];
                          const next = deviationPoints[j + 1];
                          if (progress >= curr.progress && progress <= next.progress) {
                            const t = (progress - curr.progress) / (next.progress - curr.progress);
                            return curr.deviation + t * (next.deviation - curr.deviation);
                          }
                        }
                        // Fallback to last point
                        return deviationPoints[deviationPoints.length - 1].deviation;
                      };

                      for (let i = 0; i <= steps; i++) {
                        const progress = i / steps;
                        const distanceTraveled = progress * totalDistance;

                        // Simple parabolic height simulation
                        const height = maxHeight * 4 * progress * (1 - progress);

                        // Deviation from interpolated points
                        const deviation = getDeviation(progress);

                        points.push({
                          distance: distanceTraveled,
                          deviation,
                          height,
                        });
                      }
                      return points;
                    })()}
                    margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#456fb6/30" />
                    <XAxis
                      dataKey="deviation"
                      type="number"
                      domain={['dataMin - 20', 'dataMax + 20']}
                      stroke="#aaa"
                      tick={{ fill: '#ccc', fontSize: 12 }}
                      ticks={[-100, -50, 0, 50, 100]}
                      tickFormatter={(val) => (val === 0 ? 'center' : val > 0 ? `${val}` : `${val}`)}
                      label={{
                        value: '<- left          center          right ->',
                        position: 'insideBottom',
                        offset: -10,
                        fill: '#ccc',
                        style: { fontSize: 13 },
                      }}
                    />
                    <YAxis
                      dataKey="distance"
                      stroke="#aaa"
                      tick={{ fill: '#ccc', fontSize: 12 }}
                      label={{
                        value: 'Distance (ft)',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#ccc',
                        offset: -5,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#223066',
                        border: '1px solid #54c4c3',
                        color: 'white',
                      }}
                      formatter={(value: any, name?: string) => {
                        if (typeof value !== 'number' || Number.isNaN(value)) {
                          return '';
                        }

                        if (name === 'distance') {
                          return `${Math.round(value)} ft`;
                        }

                        return value.toFixed(1);
                      }}
                      labelFormatter={(label: any) => {
                        const num = Number(label);
                        if (Number.isNaN(num)) {
                          return '';
                        }

                        return num === 0
                          ? 'Center'
                          : num > 0
                          ? `${num.toFixed(0)} ft right`
                          : `${Math.abs(num).toFixed(0)} ft left`;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="distance"
                      stroke="#54c4c3"
                      strokeWidth={4}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#223066]/60 rounded-lg p-4 border border-[#764d9f]/30">
                  <div className="text-2xl font-bold text-[#54c4c3]">
                    {elapsedTime.toFixed(2)}
                  </div>
                  <div className="text-xs text-white/70 mt-1">Time (s)</div>
                </div>

                <div className="bg-[#223066]/60 rounded-lg p-4 border border-[#764d9f]/30">
                  <div className="text-2xl font-bold text-[#54c4c3]">
                    {trackerDistance}
                  </div>
                  <div className="text-xs text-white/70 mt-1">Distance (ft)</div>
                </div>

                <div className="bg-[#223066]/60 rounded-lg p-4 border border-[#764d9f]/30">
                  <div className="text-2xl font-bold text-[#54c4c3]">
                    {(trackerDistance / elapsedTime).toFixed(1)}
                  </div>
                  <div className="text-xs text-white/70 mt-1">Avg Velocity (ft/s)</div>
                </div>
              </div>

              {/*  Save throw button – appears after results are shown */}
              <div className="flex justify-center">
                <button
                  onClick={handleSaveThrow}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-xl transition shadow-md focus:outline-none focus:ring-2 focus:ring-green-500/50 touch-manipulation"
                >
                  Add Throw to Records
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Remove Confirmation Popup */}
      {showRemoveConfirm && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60" onClick={cancelRemove} />
          <div className="fixed inset-0 flex items-center justify-center z-70 px-4">
            <div className="bg-[#223066] rounded-xl p-6 w-full max-w-sm border border-[#764d9f]/50 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-3">Remove Disc?</h3>
              <p className="text-white/80 mb-6">
                Are you sure you want to remove <strong>{selectedDisc?.name}</strong> from your tracked discs?
              </p>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition"
                  onClick={cancelRemove}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                  onClick={confirmRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Disc Popup */}
      {showAddPopup && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60" onClick={cancelAdd} />
          <div className="fixed inset-0 flex items-center justify-center z-70 px-4">
            <div className="bg-[#223066] rounded-xl p-6 w-full max-w-sm border border-[#764d9f]/50 shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Tracker Disc</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracker number..."
                    className="w-full px-4 py-3 bg-[#190f2A] border border-[#456fb6]/60 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#54c4c3] focus:ring-2 focus:ring-[#54c4c3]/40"
                  />
                </div>

                <p className="text-sm text-white/60">
                  Enter the unique tracking number from your disc tracker device.
                </p>

                <div className="flex gap-4 mt-6">
                  <button
                    className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition"
                    onClick={cancelAdd}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-[#54c4c3] text-black py-3 rounded-lg hover:bg-[#3daaa9] transition font-medium"
                    onClick={handleAddDisc}
                  >
                    Add Disc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}