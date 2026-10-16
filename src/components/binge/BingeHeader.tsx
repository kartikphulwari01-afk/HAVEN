"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { BingeFeedTab } from "@/types/binge";

interface BingeHeaderProps {
  activeTab: BingeFeedTab;
  onTabChange: (tab: BingeFeedTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BingeHeader({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: BingeHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 pt-5 pb-2 select-none z-30 flex-shrink-0">
      {/* Left: Lime Clapperboard + BINGE Wordmark */}
      <div className="flex items-center gap-2.5">
        {/* Glowing Acid-Lime Clapperboard Icon */}
        <div className="w-8 h-8 rounded-xl bg-black/40 flex items-center justify-center text-[#DFFF68] shadow-[0_0_14px_rgba(223,255,104,0.35)]">
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clapperboard Body */}
            <rect
              x="4"
              y="11"
              width="20"
              height="13"
              rx="3"
              fill="rgba(223, 255, 104, 0.15)"
              stroke="#DFFF68"
              strokeWidth="2"
            />
            {/* Center Play Symbol */}
            <path
              d="M 12 14.5 L 18 17.5 L 12 20.5 Z"
              fill="#DFFF68"
            />
            {/* Top Bar with Hinged Tilt */}
            <path
              d="M 4 10 L 24 10 L 23.5 5.5 C 23.5 4.7 22.8 4 22 4 L 5.5 4 C 4.7 4 4 4.7 4 5.5 Z"
              fill="#DFFF68"
              stroke="#DFFF68"
              strokeWidth="1.8"
            />
            {/* Diagonal Stripes */}
            <path
              d="M 8.5 4 L 6.5 10 M 13.5 4 L 11.5 10 M 18.5 4 L 16.5 10"
              stroke="#120E24"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="text-xl font-black text-white tracking-widest drop-shadow-sm">
          BINGE
        </span>
      </div>

      {/* Center: For You & Following Tabs */}
      <div className="flex items-center gap-8">
        {/* For You Tab */}
        <button
          onClick={() => onTabChange("for_you")}
          className={`relative text-sm font-bold transition-all ${
            activeTab === "for_you"
              ? "text-white"
              : "text-white/40 hover:text-white/80"
          }`}
        >
          <span>For You</span>
          {activeTab === "for_you" && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#DFFF68] rounded-full shadow-[0_0_8px_#DFFF68]" />
          )}
        </button>

        {/* Following Tab */}
        <button
          onClick={() => onTabChange("following")}
          className={`relative text-sm font-bold transition-all ${
            activeTab === "following"
              ? "text-white"
              : "text-white/40 hover:text-white/80"
          }`}
        >
          <span>Following</span>
          {activeTab === "following" && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#DFFF68] rounded-full shadow-[0_0_8px_#DFFF68]" />
          )}
        </button>
      </div>

      {/* Right: Search Control */}
      <div className="flex items-center gap-2">
        {isSearchOpen ? (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 animate-in fade-in zoom-in-95 duration-150">
            <Search className="w-4 h-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos, creators, sounds..."
              autoFocus
              className="bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none w-44"
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                onSearchChange("");
              }}
              className="text-white/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            title="Search Binge"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
      </div>
    </header>
  );
}
