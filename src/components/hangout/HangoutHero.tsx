"use client";

import React from "react";
import Image from "next/image";

export function HangoutHero() {
  return (
    <div className="w-full h-[220px] sm:h-[250px] md:h-[270px] lg:h-[285px] rounded-[22px] lg:rounded-[26px] overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 select-none flex-shrink-0 group">
      {/* Background High-Quality Standalone Artwork */}
      <Image
        src="/assets/hangout/hangout-hero.webp"
        alt="Friends watching anime in cozy entertainment room - HANGOUT: Your people. Your moments."
        fill
        priority
        className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
      />

      {/* Subtle non-destructive CSS gradient overlay for text readability without obscuring artwork */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C081E]/80 via-[#0C081E]/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

      {/* Genuine UI Header Elements: Radiant Group Icon, Title, and Tagline */}
      <div className="absolute top-5 sm:top-6 left-6 sm:left-8 z-10 flex items-center gap-3.5 pointer-events-none">
        {/* Glowing Radiant Group Icon */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {/* Ambient Purple/Cyan Halo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#7655FF] to-[#65E7F2] rounded-full blur-lg opacity-40" />

          {/* Radiant Beams SVG */}
          <svg
            className="w-12 h-12 text-[#9E82FF] opacity-80 absolute animate-[spin_30s_linear_infinite]"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M20 2 L20 8 M20 32 L20 38 M2 20 L8 20 M32 20 L38 20 M7.3 7.3 L11.5 11.5 M28.5 28.5 L32.7 32.7 M7.3 32.7 L11.5 28.5 M28.5 11.5 L32.7 7.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Solid Silhouette Avatar Group */}
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg relative z-10 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16.5" cy="8" r="3" fill="rgba(255,255,255,0.45)" />
              <path
                d="M13 18 C13 15.2 15 13.5 18 13.5 C20.5 13.5 22.5 15 22.5 17.5 C22.5 18.2 22 18.5 21.2 18.5 L13.5 18.5 Z"
                fill="rgba(255,255,255,0.45)"
              />
              <circle cx="9" cy="9" r="3.8" fill="#FFFFFF" />
              <path
                d="M3.5 20 C3.5 16.2 6.2 14.5 9.8 14.5 C13.4 14.5 16 16.2 16 20 C16 20.8 15.3 21 14.5 21 L4.8 21 C4.1 21 3.5 20.8 3.5 20 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            HANGOUT
          </h1>
          <p className="text-xs sm:text-sm text-white/85 font-medium tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] mt-0.5">
            Your people. Your moments.
          </p>
        </div>
      </div>

      {/* Decorative Brand Accent (Top Right) */}
      <div className="absolute top-6 right-8 z-10 hidden xl:flex flex-col items-end pointer-events-none opacity-85">
        <span className="font-serif italic text-white/80 text-lg tracking-wide drop-shadow-md">
          Better Content Together
        </span>
        <svg
          className="w-5 h-5 text-white/60 mt-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 19h20M4 15l4-8 4 5 4-5 4 8H4z" />
        </svg>
      </div>
    </div>
  );
}
