"use client";

import React from "react";
import Image from "next/image";

export function MoreWaysToHangout() {
  return (
    <div className="w-full h-[64px] sm:h-[68px] lg:h-[72px] rounded-[18px] lg:rounded-[22px] bg-[#16112C]/85 border border-white/10 px-4 sm:px-6 flex items-center justify-between gap-3 shadow-lg select-none relative overflow-hidden flex-shrink-0">
      {/* Left: Star Sparkle Icon + Title + Description */}
      <div className="flex items-center gap-3.5 min-w-0">
        {/* HAVEN Magic Floating Sparkle Star */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="absolute w-6 h-6 bg-[#7655FF]/40 rounded-full blur-md" />
          <svg
            className="w-5 h-5 text-[#A78BFA] fill-current relative drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]"
            viewBox="0 0 24 24"
          >
            <path d="M12 1L14.4 9.6L23 12L14.4 14.4L12 23L9.6 14.4L1 12L9.6 9.6L12 1Z" />
          </svg>
        </div>

        <div className="truncate">
          <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
            More ways to hang out
          </h3>
          <p className="text-[11.5px] text-white/60 truncate mt-0.5">
            Watch, listen and create memories together — all in one place.
          </p>
        </div>
      </div>

      {/* Right: Overlapping Friend Avatars + Quote + Crown Doodle */}
      <div className="flex items-center gap-4 flex-shrink-0 justify-end">
        {/* Exact 4 Overlapping Circular Friends Avatar Strip */}
        <div className="relative w-[124px] h-[34px] flex-shrink-0">
          <Image
            src="/images/hangout/hangout_friends_strip.png"
            alt="Friends participating together"
            fill
            className="object-contain"
          />
        </div>

        {/* Supporting Quote in 2 lines */}
        <div className="text-[11px] text-white/70 font-medium leading-tight hidden xl:flex flex-col text-left">
          <span>Good content hits different</span>
          <span>when you experience it together.</span>
        </div>

        {/* Approved Crown Doodle with Underline Swoosh */}
        <svg
          className="w-6 h-6 text-white/45 flex-shrink-0 hidden md:block"
          viewBox="0 0 28 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 16L6.5 8L10.5 12L14 7L17.5 12L21.5 8L23 16H5Z" />
          <path d="M3 21C11 18 19 16.5 25 15" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
