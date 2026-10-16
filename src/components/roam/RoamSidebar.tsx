"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ChevronRight,
  X,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  BarChart2,
  Check,
} from "lucide-react";
import { RoamRecommendedUser, RoamTrendingTopic } from "@/types/roam";

interface RoamSidebarProps {
  recommendedUsers: RoamRecommendedUser[];
  trendingTopics: RoamTrendingTopic[];
  onCreatePostClick: () => void;
  onTopicClick?: (topic: RoamTrendingTopic) => void;
}

export function RoamSidebar({
  recommendedUsers,
  trendingTopics,
  onCreatePostClick,
  onTopicClick,
}: RoamSidebarProps) {
  const [users, setUsers] = useState<RoamRecommendedUser[]>(recommendedUsers);

  const toggleFollow = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
      )
    );
  };

  const dismissUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <aside
      className="w-[280px] xl:w-[300px] flex-shrink-0 flex flex-col gap-3.5 h-full overflow-y-auto no-scrollbar select-none"
      aria-label="Discovery Sidebar"
    >
      {/* 1. People you may like Card */}
      <section className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(118,85,255,0.05)] border border-haven-border/50">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h2 className="text-[14px] font-bold text-haven-text">
            People you may like
          </h2>
          <button className="text-xs font-semibold text-haven-primary hover:underline">
            See all
          </button>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-haven-border/60 flex-shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.displayName}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[12.5px] font-bold text-haven-text truncate leading-tight">
                      {user.username}
                    </span>
                    {user.isVerified && (
                      <span className="w-3 h-3 rounded-full bg-haven-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-2 h-2 text-white stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10.5px] text-haven-secondary block truncate leading-none mt-0.5">
                    {user.displayName}
                  </span>
                  <span className="text-[9.5px] text-haven-secondary/80 block truncate leading-none mt-0.5">
                    {user.relationReason}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleFollow(user.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-150 focus:outline-none ${
                    user.isFollowing
                      ? "bg-haven-primary-subtle text-haven-primary hover:bg-haven-primary/20"
                      : "bg-haven-primary text-white hover:bg-haven-primary-hover shadow-xs"
                  }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>

                <button
                  onClick={() => dismissUser(user.id)}
                  className="text-haven-secondary hover:text-haven-pink p-0.5 rounded transition-colors focus:outline-none"
                  title="Dismiss"
                  aria-label="Dismiss recommendation"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Trending now Card */}
      <section className="bg-white rounded-[24px] p-4 shadow-[0_4px_20px_rgba(118,85,255,0.05)] border border-haven-border/50">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-haven-primary stroke-[2]" />
            <h2 className="text-[14px] font-bold text-haven-text">Trending now</h2>
          </div>
          <button className="text-xs font-semibold text-haven-primary hover:underline">
            See all
          </button>
        </div>

        <div className="space-y-2.5">
          {trendingTopics.map((item) => (
            <div
              key={item.id}
              onClick={() => onTopicClick?.(item)}
              className="flex items-center justify-between p-1 rounded-xl hover:bg-haven-primary-subtle/60 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-bold text-haven-primary w-3.5 text-center flex-shrink-0">
                  {item.rank}
                </span>

                <div className="w-9 h-9 rounded-xl overflow-hidden border border-haven-border/40 flex-shrink-0 relative">
                  <Image
                    src={item.thumbnail}
                    alt={item.tag}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-xs font-bold text-haven-text block truncate leading-tight group-hover:text-haven-primary">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-haven-secondary block truncate leading-none mt-0.5">
                    {item.postsCount}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-haven-secondary hover:text-haven-primary p-1 rounded-full focus:outline-none"
                aria-label="Options"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Share to your world / Create Post Card */}
      <section className="relative rounded-[24px] p-4 overflow-hidden border border-haven-border/50 bg-gradient-to-br from-[#EDE8FD] via-[#F4F0FF] to-[#E5DDFF] shadow-[0_4px_20px_rgba(118,85,255,0.06)] flex flex-col justify-between min-h-[145px]">
        {/* Background Scenic Anime Mountain Outline & Plane */}
        <div className="absolute right-0 bottom-0 w-36 h-28 pointer-events-none opacity-80">
          <svg viewBox="0 0 160 120" fill="none" className="w-full h-full">
            {/* Mountain silhouette */}
            <path
              d="M 60 120 L 110 40 L 160 120 Z"
              fill="#D4C8FA"
              opacity="0.6"
            />
            <path
              d="M 90 120 L 135 55 L 175 120 Z"
              fill="#C2B2F7"
              opacity="0.8"
            />
            {/* Flying Paper Plane */}
            <g transform="translate(115, 20) rotate(15) scale(0.8)">
              <path
                d="M 22 2 L 11 13 M 22 2 L 15 22 L 11 13 L 2 9 L 22 2 Z"
                fill="#7655FF"
                stroke="#6442F0"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-[14px] font-bold text-haven-text leading-tight mb-0.5">
            Share to your world
          </h2>
          <p className="text-[11px] font-medium text-haven-secondary mb-3">
            Create a post, share a moment.
          </p>

          <div className="flex items-center gap-1.5 mb-3 text-haven-primary">
            <button
              onClick={onCreatePostClick}
              className="w-7 h-7 rounded-lg bg-white/80 border border-haven-border/60 flex items-center justify-center hover:bg-white shadow-xs transition-colors"
              title="Add Image"
              aria-label="Add Image"
            >
              <ImageIcon className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <button
              onClick={onCreatePostClick}
              className="w-7 h-7 rounded-lg bg-white/80 border border-haven-border/60 flex items-center justify-center hover:bg-white shadow-xs transition-colors"
              title="Add Video"
              aria-label="Add Video"
            >
              <Video className="w-3.5 h-3.5 stroke-[2]" />
            </button>
            <button
              onClick={onCreatePostClick}
              className="w-7 h-7 rounded-lg bg-white/80 border border-haven-border/60 flex items-center justify-center hover:bg-white shadow-xs transition-colors"
              title="Add Poll"
              aria-label="Add Poll"
            >
              <BarChart2 className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <button
            onClick={onCreatePostClick}
            className="bg-haven-primary hover:bg-haven-primary-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all duration-150 hover:scale-102 focus:outline-none"
          >
            Create Post
          </button>
        </div>
      </section>
    </aside>
  );
}
