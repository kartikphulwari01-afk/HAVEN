"use client";

import React, { useEffect } from "react";
import { X, Tv, Sparkles, Check, Bell } from "lucide-react";

interface WatchTogetherPlaceholderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WatchTogetherPlaceholderModal({
  isOpen,
  onClose,
}: WatchTogetherPlaceholderModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-[#181232] border border-[#7655FF]/40 rounded-3xl p-6 shadow-2xl z-10 animate-in zoom-in-95 fade-in duration-200 select-none">
        {/* Header Icon + Close Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DFFF68]/15 border border-[#DFFF68]/30 flex items-center justify-center text-[#DFFF68]">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Watch Together Rooms
              </h3>
              <span className="text-[10px] font-semibold text-[#DFFF68] uppercase tracking-wider block">
                Next Feature in Development
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Description */}
        <div className="my-5 space-y-3">
          <p className="text-xs text-white/80 leading-relaxed">
            Synchronized video playback rooms, live friend reactions, and interactive party chat are coming in the next phase of HAVEN Hangout!
          </p>

          {/* Planned Capabilities */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#DFFF68] flex-shrink-0" />
              <span className="text-[11px] font-medium text-white/90">Zero-lag Sync</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#65E7F2] flex-shrink-0" />
              <span className="text-[11px] font-medium text-white/90">In-Room Chat</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#FF729E] flex-shrink-0" />
              <span className="text-[11px] font-medium text-white/90">Floating Hearts</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#A78BFA] flex-shrink-0" />
              <span className="text-[11px] font-medium text-white/90">Private Invites</span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#7655FF] hover:bg-[#8869FF] text-white text-xs font-bold transition-all shadow-md shadow-[#7655FF]/40 cursor-pointer"
          >
            Got it, stay tuned!
          </button>
        </div>
      </div>
    </div>
  );
}
