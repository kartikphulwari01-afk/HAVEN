"use client";

import React from "react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

interface BingeBottomControlsProps {
  currentIndex: number;
  totalVideos: number;
  onSelectIndex: (index: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function BingeBottomControls({
  currentIndex,
  totalVideos,
  onSelectIndex,
  isMuted,
  onToggleMute,
}: BingeBottomControlsProps) {
  // Show 3 dashes matching the reference mockup
  const displayDotsCount = Math.min(3, totalVideos);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-6 py-2 flex items-center justify-between select-none z-20 flex-shrink-0">
      {/* Left empty spacer to balance bottom row */}
      <div className="w-9 hidden sm:block" />

      {/* Center: Dash Indicator & Swipe/Arrow Key Hint */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        {/* Segmented Position Dashes */}
        <div className="flex items-center gap-2">
          {Array.from({ length: displayDotsCount }).map((_, index) => {
            const isActive = index === (currentIndex % displayDotsCount);
            return (
              <button
                key={index}
                onClick={() => onSelectIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-[#7655FF] shadow-[0_0_8px_rgba(118,85,255,0.8)]"
                    : "w-7 bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>

        {/* Swipe Hint matching reference UI */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-white/40">
          <ChevronLeft className="w-3.5 h-3.5 text-white/30" />
          <svg
            className="w-3.5 h-3.5 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          <span>Swipe left or right to change video</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
        </div>
      </div>

      {/* Right: Sound / Mute Toggle Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border ${
            isMuted
              ? "bg-white/5 text-white/60 border-white/10 hover:text-white hover:bg-white/15"
              : "bg-[#7655FF]/30 text-white border-[#7655FF]/60 shadow-[0_0_12px_rgba(118,85,255,0.4)]"
          }`}
          title={isMuted ? "Audio muted" : "Audio playing"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
