"use client";

import React from "react";
import Image from "next/image";
import { CURRENT_USER } from "@/data/mockData";
import {
  HavenChatIcon,
  HavenRoamIcon,
  HavenCommunitiesIcon,
  HavenCreateIcon,
  HavenCameraIcon,
  HavenBellIcon,
} from "./HavenNavIcons";

interface NavRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCameraClick?: () => void;
  onNotificationClick?: () => void;
}

export function NavRail({
  activeTab,
  onTabChange,
  onCameraClick,
  onNotificationClick,
}: NavRailProps) {
  const navItems = [
    {
      id: "chats",
      label: "Chats",
      icon: HavenChatIcon,
    },
    {
      id: "roam",
      label: "Roam",
      icon: HavenRoamIcon,
    },
    {
      id: "communities",
      label: "Communities",
      icon: HavenCommunitiesIcon,
    },
    {
      id: "create",
      label: "Create",
      icon: HavenCreateIcon,
    },
  ];

  return (
    <aside
      className="w-[72px] lg:w-[76px] flex-shrink-0 flex flex-col items-center justify-between py-3.5 select-none"
      aria-label="Main Navigation"
    >
      {/* 1. Top Branding */}
      <div className="flex flex-col items-center gap-1.5">
        {/* HAVEN Dimensional Geometric Starburst Emblem */}
        <button
          onClick={() => onTabChange("chats")}
          className="w-10 h-10 rounded-2xl bg-white shadow-[0_2px_10px_rgba(118,85,255,0.1)] border border-haven-border/60 flex items-center justify-center text-haven-primary cursor-pointer hover:rotate-12 transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary"
          title="HAVEN Home"
          aria-label="HAVEN Home"
        >
          <svg
            viewBox="0 0 36 36"
            className="w-7 h-7 drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="emblem-grad" x1="2" y1="2" x2="34" y2="34">
                <stop offset="0%" stopColor="#8A6BFF" />
                <stop offset="100%" stopColor="#6741FF" />
              </linearGradient>
            </defs>
            {/* 8-pointed playful origami / star flower with dimensional lighting */}
            <path
              d="M18 2L20.5 12L28 6.5L24 15.5L34 18L24 20.5L28 29.5L20.5 24L18 34L15.5 24L8 29.5L12 20.5L2 18L12 15.5L8 6.5L15.5 12Z"
              fill="url(#emblem-grad)"
            />
            {/* Inner jewel highlight */}
            <circle cx="18" cy="18" r="3.2" fill="#DFFF68" />
          </svg>
        </button>
        <span className="font-extrabold text-[11.5px] tracking-wider text-haven-text">
          HAVEN
        </span>
      </div>

      {/* 2. Main Navigation Stack */}
      <nav
        className="flex flex-col items-center gap-3.5 my-auto"
        aria-label="Primary Actions"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`group relative flex flex-col items-center justify-center gap-1 w-[60px] h-[64px] rounded-2xl motion-safe:transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-gradient-to-b from-[#8261FF] to-[#6741FF] text-white shadow-[0_8px_20px_-4px_rgba(118,85,255,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.4)] scale-102"
                  : "bg-white/50 hover:bg-white text-haven-text hover:text-haven-primary border border-haven-border/40 hover:border-haven-border shadow-xs hover:shadow-[0_4px_14px_rgba(118,85,255,0.12)] motion-safe:hover:-translate-y-0.5"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Subtle active indicator accent (Acid Lime pill notch on left) */}
              {isActive && (
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-haven-lime rounded-full shadow-[0_0_6px_#DFFF68]" />
              )}

              {/* Dimensional Icon */}
              <div className="relative motion-safe:group-hover:scale-108 transition-transform duration-200">
                <Icon size={25} isActive={isActive} />
              </div>

              {/* Text Label */}
              <span
                className={`text-[10.5px] tracking-tight leading-none ${
                  isActive
                    ? "font-bold text-white drop-shadow-xs"
                    : "font-semibold text-haven-secondary group-hover:text-haven-text"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* 3. Bottom Utility Controls */}
      <div className="flex flex-col items-center gap-3 mt-auto">
        {/* Quick Camera action */}
        <button
          onClick={onCameraClick}
          className="w-10 h-10 rounded-2xl bg-white/70 hover:bg-white border border-haven-border/50 hover:border-haven-primary/40 flex items-center justify-center text-haven-secondary hover:text-haven-primary shadow-xs hover:shadow-[0_4px_12px_rgba(118,85,255,0.1)] motion-safe:hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary"
          title="Camera Quick Action"
          aria-label="Camera"
        >
          <HavenCameraIcon size={20} />
        </button>

        {/* Quick Notifications action with Bubblegum Pink badge */}
        <button
          onClick={onNotificationClick}
          className="w-10 h-10 rounded-2xl bg-white/70 hover:bg-white border border-haven-border/50 hover:border-haven-primary/40 flex items-center justify-center text-haven-secondary hover:text-haven-primary shadow-xs hover:shadow-[0_4px_12px_rgba(118,85,255,0.1)] motion-safe:hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary"
          title="Notifications"
          aria-label="Notifications"
        >
          <HavenBellIcon size={20} hasNotification={true} />
        </button>

        {/* User Avatar with PLAYMODE ring */}
        <div
          className="relative cursor-pointer group mt-1"
          title={`${CURRENT_USER.name} (Signed in)`}
        >
          <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-[0_2px_10px_rgba(33,24,59,0.1)] ring-2 ring-transparent group-hover:ring-haven-primary motion-safe:group-hover:scale-105 transition-all">
            <Image
              src={CURRENT_USER.avatar}
              alt={CURRENT_USER.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          {/* Subtle online status indicator */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-haven-online border-2 border-white rounded-full shadow-xs" />
        </div>
      </div>
    </aside>
  );
}
