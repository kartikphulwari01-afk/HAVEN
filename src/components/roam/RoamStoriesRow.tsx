"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Plus, ChevronRight } from "lucide-react";
import { RoamStory } from "@/types/roam";

interface RoamStoriesRowProps {
  stories: RoamStory[];
  onStoryClick: (story: RoamStory) => void;
}

export function RoamStoriesRow({
  stories,
  onStoryClick,
}: RoamStoriesRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-5 flex items-center select-none">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1 px-0.5 w-full pr-12"
      >
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => onStoryClick(story)}
            className="group flex flex-col items-center gap-1.5 flex-shrink-0 focus:outline-none"
            title={story.userName}
          >
            <div className="relative">
              {/* Outer Ring */}
              <div
                className={`w-[56px] h-[56px] rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 ${
                  story.badge === "yellow-square"
                    ? "bg-[#FFE000] p-[3px] rounded-[18px]" // NatGeo Iconic styling
                    : story.badge === "red-circle"
                    ? "bg-[#E62429] p-[2.5px]" // Marvel Iconic styling
                    : story.isOwnStory
                    ? "bg-transparent p-0"
                    : `bg-gradient-to-tr ${story.ringGradient}`
                }`}
              >
                <div
                  className={`w-full h-full overflow-hidden p-[1.5px] bg-white ${
                    story.badge === "yellow-square"
                      ? "rounded-[14px]"
                      : "rounded-full"
                  }`}
                >
                  <Image
                    src={story.userAvatar}
                    alt={story.userName}
                    width={52}
                    height={52}
                    className={`w-full h-full object-cover ${
                      story.badge === "yellow-square"
                        ? "rounded-[12px]"
                        : "rounded-full"
                    }`}
                  />
                </div>
              </div>

              {/* Plus Badge on Your Story */}
              {story.badge === "plus" && (
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-haven-primary text-white rounded-full flex items-center justify-center border-2 border-white text-xs shadow-xs">
                  <Plus className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}
            </div>

            {/* Label */}
            <span className="text-[11px] font-medium text-haven-text max-w-[62px] truncate text-center">
              {story.userName}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll Right Floating Button */}
      <button
        onClick={handleScrollRight}
        className="absolute right-0 top-3 w-8 h-8 rounded-full bg-white shadow-md border border-haven-border/60 flex items-center justify-center text-haven-text hover:text-haven-primary hover:scale-105 transition-all z-10 focus:outline-none"
        title="Scroll Stories"
        aria-label="Next stories"
      >
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
