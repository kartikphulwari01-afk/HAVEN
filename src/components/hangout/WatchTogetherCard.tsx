"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Tv, MessageSquare, Heart, UserPlus } from "lucide-react";

interface WatchTogetherCardProps {
  onOpenRoomNotice: () => void;
}

export function WatchTogetherCard({ onOpenRoomNotice }: WatchTogetherCardProps) {
  return (
    <div
      onClick={onOpenRoomNotice}
      className="flex-1 rounded-[22px] lg:rounded-[26px] bg-[#16112C] border border-[#7655FF]/40 shadow-[0_4px_30px_rgba(118,85,255,0.16)] hover:shadow-[0_8px_35px_rgba(118,85,255,0.28)] hover:border-[#7655FF]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group select-none relative"
    >
      {/* Top Visual Poster Carousel Area */}
      <div className="relative w-full flex-1 min-h-[170px] sm:min-h-[190px] overflow-hidden rounded-t-[22px] lg:rounded-t-[26px] bg-[#16112C]">
        <Image
          src="/images/hangout/watch_together_posters.jpg"
          alt="Watch Together movie and anime posters"
          fill
          priority
          className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />

        {/* Ambient Bottom Fade to Card Interior */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#16112C] via-[#16112C]/60 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Information & Action Area */}
      <div className="p-4 sm:p-5 pt-2 flex flex-col gap-3 relative z-10 flex-shrink-0">
        {/* Row 1: Clapperboard Icon + Title & Description + Arrow Action Button */}
        <div className="flex items-center gap-3.5">
          {/* Lime Clapperboard Squircle with subtle speech tail */}
          <div className="w-11 h-11 rounded-2xl bg-[#DFFF68] flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(223,255,104,0.35)] group-hover:scale-105 transition-transform duration-200">
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="11"
                width="20"
                height="13"
                rx="3"
                fill="#120E24"
                stroke="#120E24"
                strokeWidth="1.5"
              />
              <path d="M 12 14.5 L 18 17.5 L 12 20.5 Z" fill="#DFFF68" />
              <path
                d="M 4 10 L 24 10 L 23.5 5.5 C 23.5 4.7 22.8 4 22 4 L 5.5 4 C 4.7 4 4 4.7 4 5.5 Z"
                fill="#120E24"
              />
              <path
                d="M 8.5 4 L 6.5 10 M 13.5 4 L 11.5 10 M 18.5 4 L 16.5 10"
                stroke="#DFFF68"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Heading and Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
              Watch Together
            </h2>
            <p className="text-xs text-white/70 leading-relaxed truncate sm:whitespace-normal mt-0.5">
              Movies, web series and videos with your friends.
            </p>
          </div>

          {/* Purple Round Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenRoomNotice();
            }}
            aria-label="Open Watch Together"
            className="w-10 h-10 rounded-full bg-[#7655FF] hover:bg-[#8869FF] active:scale-95 text-white flex items-center justify-center shadow-[0_0_16px_rgba(118,85,255,0.45)] group-hover:scale-105 transition-all flex-shrink-0 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        {/* Row 2: Compact Feature Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80 flex items-center gap-1.5 shadow-2xs">
            <Tv className="w-3.5 h-3.5 text-[#9E82FF]" />
            <span>Synced Playback</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80 flex items-center gap-1.5 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#65E7F2]" />
            <span>Live Chat</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80 flex items-center gap-1.5 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-[#FF729E] fill-[#FF729E]/30" />
            <span>Reactions</span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-white/80 flex items-center gap-1.5 shadow-2xs">
            <UserPlus className="w-3.5 h-3.5 text-[#DFFF68]" />
            <span>Invite Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
}
