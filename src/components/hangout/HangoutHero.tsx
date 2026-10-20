"use client";

import React from "react";
import Image from "next/image";

export function HangoutHero() {
  return (
    <div className="w-full h-[220px] sm:h-[250px] md:h-[270px] lg:h-[285px] rounded-[22px] lg:rounded-[26px] overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 select-none flex-shrink-0 group">
      {/* Background Cinematic Lounge Artwork - contains approved radiant icon, typography, and friends watching anime */}
      <Image
        src="/images/hangout/hangout_hero.jpg"
        alt="Friends watching anime in cozy entertainment room - HANGOUT: Your people. Your moments."
        fill
        priority
        className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
      />

      {/* Subtle top/bottom rim shadow to blend smoothly with container borders */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Accessible semantic heading for screen readers */}
      <h1 className="sr-only">HANGOUT — Your people. Your moments.</h1>
    </div>
  );
}
