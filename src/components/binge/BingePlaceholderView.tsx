"use client";

import React from "react";
import { Film, Sparkles, Play, Flame } from "lucide-react";
import { HavenBingeIcon } from "@/components/navigation/HavenNavIcons";

export function BingePlaceholderView() {
  return (
    <div className="flex-1 min-w-0 bg-transparent flex flex-col h-full overflow-y-auto no-scrollbar gap-4 select-none pr-1">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7655FF] shadow-xs">
            <HavenBingeIcon size={24} isActive={true} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#21183B] tracking-tight leading-tight">
              BINGE
            </h1>
            <p className="text-xs font-medium text-[#6C6382]">
              Immersive creator stories, clips, and short-form video reels.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-[#DFFF68] text-[#21183B] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Coming Soon
          </span>
        </div>
      </header>

      {/* Main Preview Hero Card */}
      <div className="flex-1 min-h-[420px] bg-white rounded-[26px] p-8 border border-[#ECE7FC] shadow-[0_4px_24px_rgba(118,85,255,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute w-96 h-96 bg-gradient-to-tr from-[#7655FF]/10 to-[#65E7F2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md flex flex-col items-center">
          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-[#7655FF] to-[#9A7DFF] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(118,85,255,0.35)] mb-5">
            <HavenBingeIcon size={42} isActive={true} />
          </div>

          <h2 className="text-2xl font-extrabold text-[#21183B] mb-2 tracking-tight">
            BINGE Creator Mode
          </h2>
          <p className="text-xs text-[#6C6382] leading-relaxed mb-6">
            Swipe through high-octane gaming highlights, community edits, soundbites, and creator reels curated for your squads.
          </p>

          <div className="grid grid-cols-3 gap-3 w-full mb-6">
            <div className="bg-[#F7F5FF] rounded-2xl p-3 border border-[#ECE7FC]">
              <Flame className="w-5 h-5 text-[#FF729E] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#21183B] block">Trending Clips</span>
              <span className="text-[10px] text-[#8C84A3]">Squad highlights</span>
            </div>
            <div className="bg-[#F7F5FF] rounded-2xl p-3 border border-[#ECE7FC]">
              <Film className="w-5 h-5 text-[#7655FF] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#21183B] block">Creator Reels</span>
              <span className="text-[10px] text-[#8C84A3]">Vertical format</span>
            </div>
            <div className="bg-[#F7F5FF] rounded-2xl p-3 border border-[#ECE7FC]">
              <Play className="w-5 h-5 text-[#65E7F2] mx-auto mb-1" />
              <span className="text-[11px] font-bold text-[#21183B] block">Live Stages</span>
              <span className="text-[10px] text-[#8C84A3]">Stream previews</span>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-[#8C84A3] bg-[#F7F5FF] px-4 py-1.5 rounded-full border border-[#ECE7FC]">
            Full BINGE video engine scheduled for next phase
          </span>
        </div>
      </div>
    </div>
  );
}
