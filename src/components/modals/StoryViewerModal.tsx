"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { StoryItem } from "@/types";

interface StoryViewerModalProps {
  story: StoryItem | null;
  onClose: () => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
}

export function StoryViewerModal({
  story,
  onClose,
  onNextStory,
  onPrevStory,
}: StoryViewerModalProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [story]);

  if (!story) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Story Viewer"
    >
      <div className="relative w-full max-w-sm h-[620px] bg-haven-text rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 border border-white/10">
        {/* Story Progress Bar */}
        <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
          <div
            className="bg-white h-full transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Story Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={story.userAvatar}
                alt={story.userName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-white font-semibold text-sm block leading-none">
                {story.userName}
              </span>
              <span className="text-white/70 text-xs font-normal">2h ago · PLAYMODE</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors focus:outline-none"
            aria-label="Close story"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Visual Media / Demonstration Content */}
        <div className="absolute inset-0 z-0">
          <Image
            src={story.isOwnStory ? "/images/sunset.jpg" : "/images/beach.jpg"}
            alt="Story content"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Navigation Overlays */}
        {onPrevStory && (
          <button
            onClick={onPrevStory}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 backdrop-blur-xs transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {onNextStory && (
          <button
            onClick={onNextStory}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 backdrop-blur-xs transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Story Footer with Interactive Demonstration Reaction */}
        <div className="z-10 flex items-center gap-2 mt-auto">
          <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <input
              type="text"
              placeholder={`Reply to ${story.userName}...`}
              className="w-full bg-transparent text-white placeholder:text-white/60 text-xs focus:outline-none"
            />
          </div>
          <button
            className="w-9 h-9 rounded-full bg-haven-pink text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            title="Send Love"
          >
            <Heart className="w-4 h-4 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
