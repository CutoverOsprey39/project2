'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    setShowDiscList(false); // Close disc list
  };

  const handleSync = () => {
    // TEMPORARY: Always success + fake distance
    // TODO: Replace with real device connection + distance reading
    setSyncStatus('success');
    setTrackerDistance(285);
    closeDropdown(); // Close after sync
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

  const buttonText = selectedDisc
    ? `${selectedDisc.name} - ${selectedDisc.type}`
    : 'Disc Actions';

  return (
    <div className="relative w-full max-w-md mx-auto">
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

      {/* Tracker display – larger spacing top/bottom */}
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