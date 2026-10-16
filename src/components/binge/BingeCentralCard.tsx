"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Music2,
  ChevronRight,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Plus,
  Play,
  Pause,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import { BingeVideo } from "@/types/binge";

interface BingeCentralCardProps {
  video: BingeVideo;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenComments: () => void;
  onOpenShare: () => void;
  onAudioTrackClick: () => void;
  onCreatorProfileClick: () => void;
}

export function BingeCentralCard({
  video,
  isPlaying,
  onTogglePlay,
  isMuted,
  onToggleMute,
  onOpenComments,
  onOpenShare,
  onAudioTrackClick,
  onCreatorProfileClick,
}: BingeCentralCardProps) {
  // Engagement state
  const [isLiked, setIsLiked] = useState(!!video.isLiked);
  const [likesCount, setLikesCount] = useState(video.likesCount);
  const [isSaved, setIsSaved] = useState(!!video.isSaved);
  const [savesCount, setSavesCount] = useState(video.savesCount);
  const [isFollowing, setIsFollowing] = useState(!!video.creator.isFollowing);

  // Playback progress simulation (if static poster, simulates 30s reel)
  const [progress, setProgress] = useState(35);
  const [showPlayFlash, setShowPlayFlash] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Format large numbers (128000 -> 128K)
  const formatCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "K";
    return count.toString();
  };

  // Simulate video playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.8;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking directly on card background, toggle play/pause
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input")) return;
    onTogglePlay();
    setShowPlayFlash(true);
    setTimeout(() => setShowPlayFlash(false), 500);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleSave = () => {
    if (isSaved) {
      setSavesCount((prev) => prev - 1);
      setIsSaved(false);
    } else {
      setSavesCount((prev) => prev + 1);
      setIsSaved(true);
    }
  };

  const handleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-[320px] sm:w-[345px] md:w-[365px] h-[520px] sm:h-[555px] md:h-[585px] max-h-[calc(100vh-165px)] rounded-[28px] overflow-hidden relative shadow-[0_0_40px_rgba(118,85,255,0.4)] border border-purple-400/30 select-none group cursor-pointer flex-shrink-0 transition-transform duration-300"
    >
      {/* Background Video Media / Poster */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={video.posterUrl}
          alt={video.caption}
          fill
          priority
          className="object-cover"
        />

        {/* Ambient Top & Bottom Contrast Gradients */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Play/Pause Brief Flash Indicator */}
      {showPlayFlash && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-out fade-out zoom-out-90 duration-300">
          <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
            {isPlaying ? (
              <Play className="w-8 h-8 fill-white ml-1" />
            ) : (
              <Pause className="w-8 h-8 fill-white" />
            )}
          </div>
        </div>
      )}

      {/* Top Controls Row (Audio Badge + Three-dot Menu) */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        {/* Audio Track Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAudioTrackClick();
          }}
          className="bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Music2 className="w-3.5 h-3.5" />
          <span className="font-medium tracking-tight truncate max-w-[130px]">
            {video.audioTrack}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-white/70" />
        </button>

        {/* Three dots contextual menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            title="More options"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-[#1F1938]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-2xl z-50 text-white text-xs font-semibold">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("[Demonstration Action] Marked as Not Interested");
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                Not Interested
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Link copied to clipboard! ✓");
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                Copy Video Link
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("[Demonstration Action] Report video submitted");
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/20 text-rose-400 transition-colors"
              >
                Report Clip
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Vertical Engagement Rail */}
      <div className="absolute right-3.5 bottom-12 z-20 flex flex-col items-center gap-3.5 pointer-events-auto">
        {/* 1. Like */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            title="Like video"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-75 cursor-pointer ${
              isLiked ? "scale-110" : "hover:scale-110"
            }`}
          >
            <Heart
              className={`w-7 h-7 drop-shadow-md transition-colors ${
                isLiked
                  ? "fill-[#FF385C] text-[#FF385C]"
                  : "text-white fill-black/25"
              }`}
            />
          </button>
          <span className="text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {formatCount(likesCount)}
          </span>
        </div>

        {/* 2. Comment */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenComments();
            }}
            title="Comments"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          >
            <MessageCircle className="w-7 h-7 text-white fill-black/25 drop-shadow-md" />
          </button>
          <span className="text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {formatCount(video.commentsCount)}
          </span>
        </div>

        {/* 3. Save / Bookmark */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            title="Save video"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-75 cursor-pointer ${
              isSaved ? "scale-110" : "hover:scale-110"
            }`}
          >
            <Bookmark
              className={`w-7 h-7 drop-shadow-md transition-colors ${
                isSaved
                  ? "fill-[#DFFF68] text-[#DFFF68]"
                  : "text-white fill-black/25"
              }`}
            />
          </button>
          <span className="text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {formatCount(savesCount)}
          </span>
        </div>

        {/* 4. Share */}
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenShare();
            }}
            title="Share"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          >
            <Send className="w-6 h-6 text-white drop-shadow-md" />
          </button>
          <span className="text-[11px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            Share
          </span>
        </div>

        {/* 5. Creator Vinyl Disc / Remix Avatar */}
        <div className="relative mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreatorProfileClick();
            }}
            className="w-9 h-9 rounded-full border-2 border-white/80 overflow-hidden relative shadow-md hover:scale-105 transition-transform"
          >
            <Image
              src={video.creator.avatar}
              alt={video.creator.name}
              fill
              className="object-cover"
            />
          </button>
          <div className="w-4 h-4 rounded-full bg-[#7655FF] text-white flex items-center justify-center absolute -bottom-1 left-1/2 -translate-x-1/2 shadow-xs ring-1 ring-white">
            <Plus className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Bottom Information (Creator Profile + Caption + Hashtags + Progress Bar) */}
      <div className="absolute inset-x-4 bottom-3 z-20 pointer-events-auto pr-14">
        {/* Creator Handle + Follow Button */}
        <div className="flex items-center gap-2 mb-1">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onCreatorProfileClick();
            }}
            className="w-7 h-7 rounded-full overflow-hidden border border-white/70 relative cursor-pointer"
          >
            <Image
              src={video.creator.avatar}
              alt={video.creator.name}
              fill
              className="object-cover"
            />
          </div>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onCreatorProfileClick();
            }}
            className="text-xs font-bold text-white tracking-wide hover:underline cursor-pointer drop-shadow-md"
          >
            {video.creator.handle}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFollow();
            }}
            className={`text-[11px] font-bold px-3.5 py-0.5 rounded-full transition-all cursor-pointer ${
              isFollowing
                ? "bg-white/20 text-white/90 border border-white/30"
                : "bg-[#2B1963] hover:bg-[#3A2285] text-white border border-[#5233B2] shadow-xs"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        {/* Caption Text */}
        <p className="text-xs text-white/95 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] line-clamp-2">
          {video.caption}
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1.5 mt-0.5 text-[11px] font-semibold text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {video.hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="hover:text-[#DFFF68] cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Playback Scrub Progress Bar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setProgress(Math.max(0, Math.min(100, clickPos * 100)));
          }}
          className="w-full h-1 bg-white/25 rounded-full relative cursor-pointer group/bar mt-2.5 overflow-visible"
        >
          {/* Active Purple Progress */}
          <div
            className="h-full bg-[#7655FF] rounded-full relative transition-all duration-150"
            style={{ width: `${progress}%` }}
          >
            {/* White Scrub Head Circle */}
            <span className="w-2.5 h-2.5 bg-white rounded-full absolute -top-[3px] right-0 shadow-md ring-1 ring-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
