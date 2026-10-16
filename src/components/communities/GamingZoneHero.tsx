"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Compass, MoreHorizontal, BellOff, Settings, LogOut, Copy } from "lucide-react";
import { CommunityData } from "@/types/communities";

interface GamingZoneHeroProps {
  data: CommunityData;
  onOpenCommunity: () => void;
}

export function GamingZoneHero({ data, onOpenCommunity }: GamingZoneHeroProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("https://haven.gg/c/gaming-zone");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="relative w-full rounded-[22px] overflow-hidden shadow-[0_8px_30px_rgba(33,24,59,0.08)] min-h-[145px] lg:min-h-[155px] flex items-center justify-between p-4 lg:p-5 text-white select-none flex-shrink-0">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bannerImage}
          alt={data.name}
          fill
          priority
          className="object-cover"
        />
        {/* Soft gradient to enhance contrast on the left side text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17122b]/80 via-[#241744]/40 to-transparent pointer-events-none" />
      </div>

      {/* Left Content (Avatar + Info + Stats + Cluster) */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Glowing Controller Avatar */}
        <div className="w-[82px] h-[82px] lg:w-[92px] lg:h-[92px] rounded-[18px] border-2 border-white/90 overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.45)] flex-shrink-0 bg-black/40">
          <Image
            src={data.avatarImage}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col justify-center">
          {/* Title + Verified Badge */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {data.name}
            </h2>
            {data.isVerified && (
              <span
                title="Verified Community"
                className="w-4 h-4 rounded-full bg-[#7655FF] flex items-center justify-center text-white ring-1 ring-white/70 shadow-sm"
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Subtitle / Tagline */}
          <p className="text-xs lg:text-[13px] text-white/90 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] mt-0.5">
            {data.tagline}
          </p>

          {/* Member Count & Online Status */}
          <div className="flex items-center gap-2 text-xs font-semibold text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] mt-1">
            <span>{data.membersCountText}</span>
            <span className="text-white/60">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
              <span>{data.onlineNowText}</span>
            </span>
          </div>

          {/* Member Avatars Cluster */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {data.avatarCluster.map((avatar, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border-2 border-white/90 overflow-hidden -ml-1.5 first:ml-0 relative shadow-sm"
                >
                  <Image
                    src={avatar}
                    alt={`Member ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-white bg-white/25 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/40 ml-1.5 shadow-xs">
              {data.extraMembersCountText}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls (Open Community + Three-dot Menu) */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2.5">
        {/* Open Community Button */}
        <button
          onClick={onOpenCommunity}
          className="bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_4px_16px_rgba(118,85,255,0.4)] backdrop-blur-sm border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Compass className="w-4 h-4 stroke-[2.2]" />
          <span>Open Community</span>
        </button>

        {/* Three dots contextual menu button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            title="More options"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#21183B] flex items-center justify-center shadow-md border border-white/70 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] border border-[#ECE7FC] py-1.5 z-50 text-[#21183B]">
              <button
                onClick={() => {
                  handleCopyLink();
                  setShowMenu(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-[#F7F5FF] flex items-center gap-2.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-[#7655FF]" />
                <span>{copiedLink ? "Link Copied! ✓" : "Copy Community Link"}</span>
              </button>

              <button
                onClick={() => {
                  alert("[Demonstration Action] Notifications muted for Gaming Zone");
                  setShowMenu(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-[#F7F5FF] flex items-center gap-2.5 transition-colors"
              >
                <BellOff className="w-3.5 h-3.5 text-[#6C6382]" />
                <span>Mute Notifications</span>
              </button>

              <button
                onClick={() => {
                  alert("[Demonstration Action] Community preferences opened");
                  setShowMenu(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold hover:bg-[#F7F5FF] flex items-center gap-2.5 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-[#6C6382]" />
                <span>Community Settings</span>
              </button>

              <div className="my-1 border-t border-[#ECE7FC]" />

              <button
                onClick={() => {
                  alert("[Demonstration Action] Leave Gaming Zone confirmation modal");
                  setShowMenu(false);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold text-rose-500 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Leave Community</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
