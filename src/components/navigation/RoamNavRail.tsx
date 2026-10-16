"use client";

import React from "react";
import Image from "next/image";
import {
  HavenChatIcon,
  HavenRoamIcon,
  HavenCommunitiesIcon,
  HavenCreateIcon,
  HavenSettingsIcon,
} from "./HavenNavIcons";

interface RoamNavRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSettingsClick?: () => void;
  onCreateClick?: () => void;
}

export function RoamNavRail({
  activeTab = "roam",
  onTabChange,
  onSettingsClick,
  onCreateClick,
}: RoamNavRailProps) {
  const navItems = [
    {
      id: "chats",
      label: "Chats",
      icon: HavenChatIcon,
      onClick: () => onTabChange("chats"),
    },
    {
      id: "roam",
      label: "Roam",
      icon: HavenRoamIcon,
      onClick: () => onTabChange("roam"),
    },
    {
      id: "communities",
      label: "Communities",
      icon: HavenCommunitiesIcon,
      onClick: () => onTabChange("communities"),
    },
    {
      id: "create",
      label: "Create",
      icon: HavenCreateIcon,
      onClick: onCreateClick,
    },
  ];

  return (
    <aside
      className="w-[210px] lg:w-[220px] flex-shrink-0 bg-white rounded-[28px] flex flex-col justify-between h-full shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/40 select-none overflow-hidden relative"
      aria-label="ROAM Primary Navigation"
    >
      {/* 1. Top Section: Logo & Nav items */}
      <div className="p-4 pb-2 z-10 relative bg-white/95 backdrop-blur-xs">
        {/* Brand Emblem & Wordmark */}
        <div
          onClick={() => onTabChange("chats")}
          className="flex items-center gap-2.5 mb-6 px-1 cursor-pointer group"
          title="HAVEN Home"
        >
          <div className="w-8 h-8 rounded-xl bg-haven-primary-subtle flex items-center justify-center text-haven-text group-hover:rotate-12 transition-transform duration-300 shadow-xs">
            <svg
              viewBox="0 0 36 36"
              className="w-6 h-6 fill-current text-haven-primary"
            >
              <path d="M18 2L20.5 12L28 6.5L24 15.5L34 18L24 20.5L28 29.5L20.5 24L18 34L15.5 24L8 29.5L12 20.5L2 18L12 15.5L8 6.5L15.5 12Z" />
            </svg>
          </div>
          <span className="font-extrabold text-[15px] tracking-wide text-haven-text">
            HAVEN
          </span>
        </div>

        {/* Navigation Item Stack */}
        <nav className="flex flex-col gap-2" aria-label="Main Destinations">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl motion-safe:transition-all duration-150 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary ${
                  isActive
                    ? "bg-gradient-to-r from-[#7B59FF] to-[#6741FF] text-white shadow-[0_6px_20px_-3px_rgba(118,85,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                    : "text-haven-secondary hover:text-haven-text hover:bg-haven-primary-subtle motion-safe:hover:translate-x-1"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} isActive={isActive} />
                <span>{item.label}</span>

                {/* Acid-lime active accent indicator on right */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-haven-lime ml-auto mr-0.5 shadow-[0_0_6px_#DFFF68]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Middle & Lower Section: Scenic Illustration with Traveler & Flight Path */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-between select-none">
        {/* Artistic dashed flight path with paper airplane and inspirational words */}
        <div className="relative z-10 px-4 pt-3 pointer-events-none">
          {/* Paper airplane flying */}
          <div className="flex justify-end pr-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-haven-primary/70 transform rotate-12 drop-shadow-xs"
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                fill="#EDE8FD"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Dashed trail */}
          <svg
            className="w-full h-24 -mt-2 opacity-50"
            viewBox="0 0 160 90"
            fill="none"
          >
            <path
              d="M140 10 Q 90 20 60 50 T 20 85"
              stroke="#7655FF"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
            />
          </svg>

          {/* Playful hand-written words */}
          <div className="flex flex-col gap-1 -mt-16 pl-6 text-[13px] font-bold tracking-wide text-haven-text/75 italic">
            <span className="translate-x-1 rotate-[-2deg]">Explore</span>
            <span className="translate-x-4 rotate-[1deg]">Connect</span>
            <span className="translate-x-6 rotate-[-1deg]">Create</span>
            <span className="translate-x-9 rotate-[2deg] text-haven-primary font-extrabold">
              Belong
            </span>
          </div>
        </div>

        {/* Scenic mountain illustration at bottom with cliff traveler */}
        <div className="absolute inset-x-0 bottom-16 h-56 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/roam/nav_scenic.jpg"
            alt="Scenic mountain landscape"
            fill
            className="object-cover object-bottom opacity-85"
          />
          {/* Soft gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white" />

          {/* Vector Anime Traveler Silhouette on Cliff */}
          <div className="absolute bottom-2 left-2 z-10">
            <svg
              width="100"
              height="110"
              viewBox="0 0 100 110"
              fill="none"
              className="drop-shadow-md"
            >
              {/* Cliff ledge */}
              <path
                d="M -10 110 L 40 85 L 65 92 L 80 110 Z"
                fill="#1D1435"
              />
              {/* Traveler with backpack */}
              <circle cx="48" cy="38" r="7" fill="#21183B" />
              <path
                d="M 43 36 Q 48 30 54 35 Q 50 28 44 32 Z"
                fill="#2E1C59"
              />
              <path
                d="M 43 45 L 53 45 L 56 65 L 40 65 Z"
                fill="#2B1E4A"
              />
              <rect
                x="33"
                y="46"
                width="9"
                height="15"
                rx="3"
                fill="#3A2863"
              />
              <path
                d="M 42 65 L 42 80 L 52 82 L 56 70"
                stroke="#1D1435"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 3. Bottom User Profile Row */}
        <div className="p-3.5 z-20 bg-white/95 backdrop-blur-md border-t border-haven-border/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-haven-border/70 flex-shrink-0">
              <Image
                src="/images/roam/kartik.jpg"
                alt="Kartik"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-bold text-haven-text block truncate leading-tight">
                Kartik
              </span>
              <span className="text-[10.5px] text-haven-secondary block truncate leading-none mt-0.5">
                @kartikphulwari
              </span>
            </div>
          </div>

          <button
            onClick={onSettingsClick}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors flex-shrink-0 focus:outline-none"
            title="User Settings"
            aria-label="Settings"
          >
            <HavenSettingsIcon size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
