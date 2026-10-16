"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Play,
  Volume2,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { RoamPost } from "@/types/roam";

interface RoamPostCardProps {
  post: RoamPost;
  onPostClick?: (post: RoamPost) => void;
  onShareClick?: (post: RoamPost) => void;
}

export function RoamPostCard({
  post,
  onPostClick,
  onShareClick,
}: RoamPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    // Local demo counter toggle
    if (!isLiked) {
      setLikesCount((prev) => {
        if (prev.endsWith("K")) {
          const num = parseFloat(prev.replace("K", ""));
          return `${(num + 0.1).toFixed(1)}K`;
        }
        return `${parseInt(prev) + 1}`;
      });
    } else {
      setLikesCount(post.likesCount);
    }
  };

  return (
    <article className="bg-white rounded-[24px] p-3.5 shadow-[0_4px_20px_rgba(118,85,255,0.05)] border border-haven-border/50 flex flex-col justify-between select-none hover:shadow-md transition-shadow duration-200">
      {/* 1. Header: Author Avatar, Name, Verified, Time */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-haven-border/60 flex-shrink-0">
            <Image
              src={post.authorAvatar}
              alt={post.authorName}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-haven-text truncate leading-tight">
                {post.authorName}
              </span>
              {post.isVerified && (
                <span className="w-3.5 h-3.5 rounded-full bg-haven-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                </span>
              )}
            </div>
            <span className="text-[11px] text-haven-secondary font-medium leading-none block mt-0.5">
              {post.timeAgo}
            </span>
          </div>
        </div>

        <button
          className="text-haven-secondary hover:text-haven-primary p-1 rounded-full transition-colors focus:outline-none"
          title="More options"
          aria-label="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Media Container */}
      <div
        className="relative rounded-2xl overflow-hidden mb-2.5 bg-gray-100 aspect-[4/3] group cursor-pointer"
        onClick={() => onPostClick?.(post)}
      >
        <Image
          src={post.mediaUrl}
          alt={post.caption}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-102"
        />

        {/* Carousel Pill (e.g. 1/4, 1/3, 1/5) */}
        {post.carouselCount && (
          <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-full z-10">
            {post.carouselCount}
          </span>
        )}

        {/* Carousel Chevrons on hover */}
        {post.carouselCount && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Video Overlay Badges */}
        {post.mediaType === "video" && (
          <>
            {/* Play Badge + Duration */}
            <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10">
              <Play className="w-3 h-3 fill-white stroke-none" />
              <span>{post.videoDuration || "0:30"}</span>
            </div>

            {/* Volume Icon */}
            <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1 rounded-full z-10">
              <Volume2 className="w-3.5 h-3.5" />
            </div>

            {/* Dismiss X icon top right */}
            <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1 rounded-full z-10 opacity-80 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </div>
          </>
        )}

        {/* Bottom Carousel Dots for multi-image posts */}
        {post.carouselCount && (
          <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
          </div>
        )}
      </div>

      {/* 3. Caption & Hashtags */}
      <div className="mb-3 px-0.5">
        <p className="text-[12.5px] text-haven-text font-normal leading-snug whitespace-pre-line mb-1 line-clamp-2">
          {post.caption}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {post.hashtags.map((tag) => (
            <span
              key={tag}
              className="text-[11.5px] font-semibold text-haven-primary hover:underline cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Engagement Action Bar */}
      <div className="flex items-center justify-between pt-1 border-t border-haven-border/30 text-haven-secondary">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors focus:outline-none ${
              isLiked
                ? "text-haven-pink"
                : "hover:text-haven-pink"
            }`}
            title="Like Post"
          >
            <Heart
              className={`w-4 h-4 stroke-[2] ${
                isLiked ? "fill-haven-pink text-haven-pink" : ""
              }`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => onPostClick?.(post)}
            className="flex items-center gap-1.5 text-xs font-semibold hover:text-haven-primary transition-colors focus:outline-none"
            title="View Comments"
          >
            <MessageCircle className="w-4 h-4 stroke-[2]" />
            <span>{post.commentsCount}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => onShareClick?.(post)}
            className="hover:text-haven-primary transition-colors focus:outline-none p-0.5"
            title="Share Post"
          >
            <Send className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Save / Bookmark Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`hover:text-haven-primary transition-colors focus:outline-none p-0.5 ${
            isSaved ? "text-haven-primary" : ""
          }`}
          title="Save Post"
        >
          <Bookmark
            className={`w-4 h-4 stroke-[2] ${
              isSaved ? "fill-haven-primary text-haven-primary" : ""
            }`}
          />
        </button>
      </div>
    </article>
  );
}
