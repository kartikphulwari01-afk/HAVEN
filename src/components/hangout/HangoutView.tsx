"use client";

import React, { useState } from "react";
import { HangoutHero } from "./HangoutHero";
import { WatchTogetherCard } from "./WatchTogetherCard";
import { ListenTogetherCard } from "./ListenTogetherCard";
import { MoreWaysToHangout } from "./MoreWaysToHangout";
import { WatchTogetherPlaceholderModal } from "./WatchTogetherPlaceholderModal";

export function HangoutView() {
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="flex-1 h-full bg-[#100C22] rounded-[24px] lg:rounded-[32px] flex flex-col justify-between p-3.5 sm:p-4 lg:p-5 gap-3 sm:gap-3.5 lg:gap-4 overflow-y-auto lg:overflow-hidden relative select-none shadow-2xl border border-white/5">
      {/* Ambient Lighting Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-[#7655FF]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-[#FF729E]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#65E7F2]/6 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1E163B] text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 shadow-xl shadow-black/50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#FF729E] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Hangout Cinematic Hero Banner */}
      <HangoutHero />

      {/* 2. Feature Cards Grid: Watch Together & Listen Together */}
      <div className="w-full flex-1 flex flex-col md:flex-row gap-3 sm:gap-3.5 lg:gap-4 min-h-0">
        {/* Watch Together Card (Primary) */}
        <WatchTogetherCard onOpenRoomNotice={() => setIsWatchModalOpen(true)} />

        {/* Listen Together Card (Secondary, Coming Soon) */}
        <ListenTogetherCard
          onComingSoonClick={() =>
            showToast("🎧 Listen Together is coming soon in an upcoming phase!")
          }
        />
      </div>

      {/* 3. Bottom Information Panel */}
      <MoreWaysToHangout />

      {/* 4. Watch Together In-Development Placeholder Modal */}
      <WatchTogetherPlaceholderModal
        isOpen={isWatchModalOpen}
        onClose={() => setIsWatchModalOpen(false)}
      />
    </div>
  );
}
