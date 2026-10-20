"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Music2, MessageSquare, Heart, UserPlus } from "lucide-react";

interface ListenTogetherCardProps {
  onComingSoonClick: () => void;
}

export function ListenTogetherCard({ onComingSoonClick }: ListenTogetherCardProps) {
  return (
    <div
      onClick={onComingSoonClick}
      className="flex-1 rounded-[22px] lg:rounded-[26px] bg-[#16112C] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none relative group"
    >
      {/* Top Visual Music Studio Artwork Area */}
      <div className="relative w-full flex-1 min-h-[170px] sm:min-h-[190px] overflow-hidden rounded-t-[22px] lg:rounded-t-[26px] bg-[#16112C]">
        <Image
          src="/assets/hangout/listen-together.webp"
          alt="Listen Together music loft studio and city view"
          fill
          priority
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />

        {/* Coming Soon Pill Badge */}
        <div className="absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-[#2A183E]/85 backdrop-blur-md border border-[#9E82FF]/40 text-white/95 text-[11px] font-semibold tracking-wide shadow-md flex items-center justify-center">
          Coming Soon
        </div>

        {/* Ambient Bottom Fade to Card Interior */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#16112C] via-[#16112C]/65 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Information & Action Area */}
      <div className="p-4 sm:p-5 pt-2 flex flex-col gap-3 relative z-10 flex-shrink-0">
        {/* Row 1: Pink Headphones Icon + Title & Description + Disabled Action Button */}
        <div className="flex items-center gap-3.5">
          {/* Bubblegum Pink Headphones Squircle */}
          <div className="w-11 h-11 rounded-2xl bg-[#FF729E] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(255,114,158,0.35)] group-hover:scale-105 transition-transform duration-200 text-[#120E24]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#120E24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
          </div>

          {/* Heading and Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
              Listen Together
            </h2>
            <p className="text-xs text-white/70 leading-relaxed truncate sm:whitespace-normal mt-0.5">
              Shared playlists and synced music sessions.
            </p>
          </div>

          {/* Disabled Dark Action Button */}
          <div
            className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white/30 flex items-center justify-center cursor-not-allowed flex-shrink-0"
            title="Listen Together is coming soon"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Row 2: Compact Feature Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5 opacity-80">
          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 flex items-center gap-1.5 shadow-2xs">
            <Music2 className="w-3.5 h-3.5 text-[#FF729E]" />
            <span>Shared Queue</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 flex items-center gap-1.5 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#65E7F2]" />
            <span>Live Chat</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 flex items-center gap-1.5 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#FF729E]" />
            <span>Reactions</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/70 flex items-center gap-1.5 shadow-2xs">
            <UserPlus className="w-3.5 h-3.5 text-[#DFFF68]" />
            <span>Invite Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
}
