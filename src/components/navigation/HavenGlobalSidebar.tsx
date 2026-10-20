"use client";

import React from "react";
import Image from "next/image";
import {
  HavenChatIcon,
  HavenRoamIcon,
  HavenCommunitiesIcon,
  HavenBingeIcon,
  HavenCreateIcon,
  HavenHangoutIcon,
  HavenSettingsIcon,
  HavenBellIcon,
  HavenCameraIcon,
} from "./HavenNavIcons";

export type HavenNavSection = "chats" | "roam" | "communities" | "binge" | "create" | "hangout";

interface HavenGlobalSidebarProps {
  activeSection: HavenNavSection;
  onNavigate: (section: HavenNavSection) => void;
  onCameraClick?: () => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function HavenGlobalSidebar({
  activeSection = "chats",
  onNavigate,
  onCameraClick,
  onNotificationClick,
  onSettingsClick,
  onProfileClick,
}: HavenGlobalSidebarProps) {
  const navItems: Array<{
    id: HavenNavSection;
    label: string;
    icon: React.ComponentType<{ size?: number; isActive?: boolean; className?: string }>;
  }> = [
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
      id: "binge",
      label: "Binge",
      icon: HavenBingeIcon,
    },
    {
      id: "create",
      label: "Create",
      icon: HavenCreateIcon,
    },
    {
      id: "hangout",
      label: "Hangout",
      icon: HavenHangoutIcon,
    },
  ];

  return (
    <aside
      className="w-[210px] lg:w-[220px] flex-shrink-0 bg-white rounded-[28px] flex flex-col justify-between h-full shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/40 select-none overflow-hidden relative z-20"
      aria-label="HAVEN Global Navigation"
    >
      {/* 1. Top Section: HAVEN Logo & Primary Navigation */}
      <div className="p-4 pb-2 z-10 relative bg-white/95 backdrop-blur-xs">
        {/* Brand Emblem & Wordmark */}
        <div
          onClick={() => onNavigate("chats")}
          className="flex items-center gap-2.5 mb-4 px-1 cursor-pointer group focus:outline-none"
          title="HAVEN Home"
        >
          <div className="w-8 h-8 rounded-xl bg-haven-primary-subtle flex items-center justify-center text-haven-text group-hover:rotate-12 transition-transform duration-300 shadow-xs border border-haven-border/50">
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

        {/* Primary Route-Aware Navigation Items */}
        <nav className="flex flex-col gap-1" aria-label="Main Destinations">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-1.5 rounded-2xl motion-safe:transition-all duration-150 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary ${
                  isActive
                    ? "bg-gradient-to-r from-[#7B59FF] to-[#6741FF] text-white shadow-[0_6px_20px_-3px_rgba(118,85,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)]"
                    : "text-haven-secondary hover:text-haven-text hover:bg-haven-primary-subtle motion-safe:hover:translate-x-1"
                }`}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
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
            className="object-cover object-bottom"
          />
          {/* Soft top gradient to fade into sidebar background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#F7F5FF]" />
        </div>

        {/* 3. Bottom User Profile & Utility Bar */}
        <div className="p-3.5 z-20 bg-white/95 backdrop-blur-md border-t border-haven-border/40 flex items-center justify-between">
          <div
            onClick={onProfileClick}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
            title="View Profile"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-haven-border/70 flex-shrink-0 group-hover:ring-2 group-hover:ring-haven-primary transition-all">
              <Image
                src="/images/roam/kartik.jpg"
                alt="Kartik"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[13px] font-bold text-haven-text block truncate leading-tight group-hover:text-haven-primary transition-colors">
                Kartik
              </span>
              <span className="text-[10.5px] text-haven-secondary block truncate leading-none mt-0.5">
                @kartikphulwari
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Camera Utility Action */}
            {onCameraClick && (
              <button
                onClick={onCameraClick}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
                title="Camera"
                aria-label="Camera"
              >
                <HavenCameraIcon size={16} />
              </button>
            )}

            {/* Notification Utility Action */}
            {onNotificationClick && (
              <button
                onClick={onNotificationClick}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
                title="Notifications"
                aria-label="Notifications"
              >
                <HavenBellIcon size={16} hasNotification={true} />
              </button>
            )}

            {/* Settings Utility Action */}
            <button
              onClick={onSettingsClick}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
              title="Settings"
              aria-label="Settings"
            >
              <HavenSettingsIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
