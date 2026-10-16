"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { BingeVideo } from "@/types/binge";

interface BingeSidePreviewProps {
  video: BingeVideo;
  direction: "left" | "right";
  onClick: () => void;
}

export function BingeSidePreview({
  video,
  direction,
  onClick,
}: BingeSidePreviewProps) {
  const isLeft = direction === "left";

  return (
    <div
      className={`relative flex items-center justify-center select-none cursor-pointer group transition-all duration-500 ease-out ${
        isLeft ? "origin-right" : "origin-left"
      }`}
      style={{
        perspective: "1200px",
      }}
      onClick={onClick}
    >
      {/* 3D Tilted Card Container */}
      <div
        className={`relative w-[240px] lg:w-[280px] xl:w-[310px] h-[490px] lg:h-[540px] rounded-[26px] overflow-hidden transition-all duration-500 ease-out border border-purple-500/25 group-hover:border-purple-400/50 group-hover:scale-[0.88] ${
          isLeft
            ? "rotate-y-[14deg] -translate-x-1 group-hover:rotate-y-[8deg]"
            : "-rotate-y-[14deg] translate-x-1 group-hover:-rotate-y-[8deg]"
        } scale-[0.85] opacity-75 group-hover:opacity-95`}
        style={{
          transformStyle: "preserve-3d",
          transform: isLeft
            ? "perspective(1200px) rotateY(16deg) scale(0.85)"
            : "perspective(1200px) rotateY(-16deg) scale(0.85)",
          boxShadow: isLeft
            ? "25px 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(118,85,255,0.2)"
            : "-25px 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(118,85,255,0.2)",
        }}
      >
        {/* Poster / Thumbnail Image */}
        <div className="absolute inset-0">
          <Image
            src={video.posterUrl}
            alt={video.caption}
            fill
            sizes="(max-width: 1200px) 280px, 320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
          />
        </div>

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-purple-950/15 mix-blend-overlay pointer-events-none" />

        {/* Subtle Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-13 h-13 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.25)]">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Floating Circular Navigation Arrow Button (Outer Edge) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={isLeft ? "Previous video" : "Next video"}
        className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#5433D6] hover:bg-[#6842ED] active:scale-95 text-white flex items-center justify-center shadow-[0_4px_22px_rgba(84,51,214,0.6)] border border-white/20 transition-all duration-200 cursor-pointer ${
          isLeft ? "left-2 lg:left-4" : "right-2 lg:right-4"
        }`}
      >
        {isLeft ? (
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        )}
      </button>
    </div>
  );
}
