"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, Bell } from "lucide-react";
import { RoamIcon } from "../icons/RoamIcon";

interface RoamHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export function RoamHeader({
  searchQuery,
  onSearchChange,
  onNotificationClick,
  onProfileClick,
}: RoamHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 mb-4 select-none">
      {/* 1. Left: Roam Emblem, Title & Subtitle */}
      <div className="flex items-center gap-3">
        {/* Violet ROAM Globe & Airplane Emblem */}
        <div className="w-11 h-11 rounded-2xl bg-haven-primary-light flex items-center justify-center flex-shrink-0 text-haven-primary">
          <RoamIcon size={26} variant="primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-haven-text tracking-tight leading-tight">
            Roam
          </h1>
          <p className="text-xs font-medium text-haven-secondary leading-snug">
            Discover people, moments and ideas from around HAVEN.
          </p>
        </div>
      </div>

      {/* 2. Center/Right: Search Bar */}
      <div className="flex-1 max-w-xl mx-2">
        <div className="w-full bg-white rounded-full px-4 py-2 flex items-center gap-2.5 border border-haven-border/60 shadow-xs focus-within:ring-2 focus-within:ring-haven-primary/20 transition-all">
          <Search className="w-4 h-4 text-haven-secondary flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search people, creators, posts, hashtags..."
            className="w-full bg-transparent text-xs text-haven-text placeholder:text-[#9E97B5] focus:outline-none font-normal"
          />
          <button
            className="text-haven-secondary hover:text-haven-primary p-0.5 rounded-full transition-colors focus:outline-none"
            title="Search Filters"
            aria-label="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* 3. Far Right: Notification Bell & User Avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Notification Bell */}
        <button
          onClick={onNotificationClick}
          className="w-10 h-10 rounded-full bg-white border border-haven-border/60 flex items-center justify-center text-haven-text hover:text-haven-primary hover:border-haven-primary/40 transition-colors relative shadow-xs focus:outline-none"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 stroke-[2]" />
          {/* Pink notification dot with count */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-haven-pink rounded-full ring-2 ring-white" />
        </button>

        {/* User Avatar */}
        <div
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs cursor-pointer hover:ring-2 hover:ring-haven-primary transition-all flex-shrink-0"
          title="Kartik"
        >
          <Image
            src="/images/roam/kartik.jpg"
            alt="Kartik"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
