"use client";

import React from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, Bell, Plus, Users2 } from "lucide-react";
import { CommunityTab } from "@/types/communities";

interface CommunitiesHeaderProps {
  activeTab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateCommunityClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  onFilterClick: () => void;
}

export function CommunitiesHeader({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onCreateCommunityClick,
  onNotificationClick,
  onProfileClick,
  onFilterClick,
}: CommunitiesHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-3 select-none flex-shrink-0">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Icon + Title & Subtitle */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-[#7655FF] shadow-xs flex-shrink-0">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#21183B] tracking-tight leading-tight">
              Communities
            </h1>
            <p className="text-[11.5px] font-medium text-[#6C6382]">
              Find your people. Build your space.
            </p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="w-full bg-white rounded-full px-4 py-2 flex items-center gap-2.5 border border-[#E6E1F9] shadow-[0_2px_8px_rgba(118,85,255,0.03)] focus-within:border-[#7655FF]/40 focus-within:ring-2 focus-within:ring-[#7655FF]/10 transition-all">
            <Search className="w-4 h-4 text-[#8C84A3] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search communities, topics, people..."
              className="w-full bg-transparent text-xs text-[#21183B] placeholder:text-[#9E97B5] focus:outline-none"
            />
            <button
              onClick={onFilterClick}
              title="Filter communities"
              className="text-[#8C84A3] hover:text-[#7655FF] transition-colors flex-shrink-0 p-0.5 rounded-md"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Notification Bell + Avatar + Create Button */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            title="Notifications"
            className="w-9 h-9 rounded-full bg-white border border-[#E6E1F9] flex items-center justify-center text-[#6C6382] hover:text-[#7655FF] hover:bg-[#F7F5FF] transition-all relative shadow-xs"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF729E] ring-2 ring-white" />
          </button>

          {/* User Avatar */}
          <button
            onClick={onProfileClick}
            title="Kartik (@kartikphulwari)"
            className="w-9 h-9 rounded-full overflow-hidden border border-[#E6E1F9] ring-2 ring-purple-100 hover:scale-105 transition-transform relative flex-shrink-0"
          >
            <Image
              src="/images/roam/kartik.jpg"
              alt="Kartik"
              fill
              className="object-cover"
            />
          </button>

          {/* Create Community Button */}
          <button
            onClick={onCreateCommunityClick}
            className="bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_3px_12px_rgba(118,85,255,0.28)] hover:shadow-[0_4px_16px_rgba(118,85,255,0.36)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Community</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onTabChange("spaces")}
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "spaces"
              ? "bg-[#7655FF] text-white shadow-[0_2px_10px_rgba(118,85,255,0.3)]"
              : "text-[#6C6382] hover:text-[#21183B] hover:bg-white/60"
          }`}
        >
          Your Spaces
        </button>

        <button
          onClick={() => onTabChange("explore")}
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "explore"
              ? "bg-[#7655FF] text-white shadow-[0_2px_10px_rgba(118,85,255,0.3)]"
              : "text-[#6C6382] hover:text-[#21183B] hover:bg-white/60"
          }`}
        >
          Explore
        </button>

        <button
          onClick={() => onTabChange("invitations")}
          className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "invitations"
              ? "bg-[#7655FF] text-white shadow-[0_2px_10px_rgba(118,85,255,0.3)]"
              : "text-[#6C6382] hover:text-[#21183B] hover:bg-white/60"
          }`}
        >
          <span>Invitations</span>
          <span className="bg-[#FF729E] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full leading-tight shadow-xs">
            2
          </span>
        </button>
      </div>
    </div>
  );
}
