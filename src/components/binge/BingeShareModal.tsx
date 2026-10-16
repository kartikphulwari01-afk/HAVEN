"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Copy, Check, MessageSquare, Compass, Send, Share2 } from "lucide-react";
import { BingeVideo } from "@/types/binge";

interface BingeShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: BingeVideo;
}

export function BingeShareModal({
  isOpen,
  onClose,
  video,
}: BingeShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [sharedDestination, setSharedDestination] = useState<string | null>(null);

  if (!isOpen) return null;

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/binge?v=${video.id}`
    : `https://haven.app/binge?v=${video.id}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuickShare = (dest: string) => {
    setSharedDestination(dest);
    setTimeout(() => {
      setSharedDestination(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-[#1A1435] border border-white/15 rounded-3xl p-5 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#DFFF68]" />
            <h3 className="text-sm font-bold text-white">Share Reel</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Preview Card */}
        <div className="flex items-center gap-3 my-4 p-2.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={video.posterUrl}
              alt={video.caption}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {video.creator.handle}
            </p>
            <p className="text-[11px] text-white/60 line-clamp-2 mt-0.5">
              {video.caption}
            </p>
          </div>
        </div>

        {/* Feedback message if shared */}
        {sharedDestination && (
          <div className="mb-3 py-2 px-3 rounded-xl bg-[#DFFF68]/10 border border-[#DFFF68]/30 text-[#DFFF68] text-xs font-semibold text-center flex items-center justify-center gap-2">
            <Check className="w-3.5 h-3.5" />
            <span>Shared to {sharedDestination}!</span>
          </div>
        )}

        {/* Quick HAVEN Channels */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <button
            onClick={() => handleQuickShare("HAVEN Chats")}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 hover:bg-[#7655FF]/20 border border-white/10 hover:border-[#7655FF]/50 transition-all text-center group"
          >
            <div className="w-9 h-9 rounded-full bg-[#7655FF] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-white/80 group-hover:text-white">
              Send to Chat
            </span>
          </button>

          <button
            onClick={() => handleQuickShare("ROAM Feed")}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 hover:bg-[#FF3B7A]/20 border border-white/10 hover:border-[#FF3B7A]/50 transition-all text-center group"
          >
            <div className="w-9 h-9 rounded-full bg-[#FF3B7A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-white/80 group-hover:text-white">
              Post on ROAM
            </span>
          </button>

          <button
            onClick={handleCopy}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/5 hover:bg-[#DFFF68]/20 border border-white/10 hover:border-[#DFFF68]/50 transition-all text-center group"
          >
            <div className="w-9 h-9 rounded-full bg-[#DFFF68] flex items-center justify-center text-[#120E24] shadow-md group-hover:scale-105 transition-transform">
              {copied ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <Copy className="w-4 h-4 stroke-[2.5]" />
              )}
            </div>
            <span className="text-[11px] font-semibold text-white/80 group-hover:text-white">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>

        {/* Link input copy bar */}
        <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-white/5 border border-white/10">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-[11px] text-white/60 truncate focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#DFFF68]" />
                <span className="text-[#DFFF68]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
