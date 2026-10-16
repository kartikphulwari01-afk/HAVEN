"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Square,
  X,
  Star,
  Phone,
  Video,
  Search,
  BellOff,
  Bell,
  ChevronRight,
  Link2,
  Clock,
  Palette,
  FileText,
} from "lucide-react";
import { ProfileDetails } from "@/types";

interface ProfilePanelProps {
  profile: ProfileDetails;
  onClose?: () => void;
  onAudioCallClick?: () => void;
  onVideoCallClick?: () => void;
}

export function ProfilePanel({
  profile,
  onClose,
  onAudioCallClick,
  onVideoCallClick,
}: ProfilePanelProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <aside
      className="w-[310px] xl:w-[330px] flex-shrink-0 bg-white rounded-[26px] p-4 flex flex-col h-full shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/40 select-none overflow-y-auto no-scrollbar"
      aria-label="Contact Details"
    >
      {/* 1. Desktop Window Controls */}
      <div className="flex items-center justify-end gap-3 mb-2 px-1 text-haven-secondary">
        <button
          className="hover:text-haven-primary p-1 rounded transition-colors focus:outline-none"
          title="Minimize"
          aria-label="Minimize"
        >
          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
        <button
          className="hover:text-haven-primary p-1 rounded transition-colors focus:outline-none"
          title="Maximize"
          aria-label="Maximize"
        >
          <Square className="w-3 h-3 stroke-[2.5]" />
        </button>
        <button
          onClick={onClose}
          className="hover:text-haven-pink p-1 rounded transition-colors focus:outline-none"
          title="Close panel"
          aria-label="Close panel"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 2. Profile Card Banner & Avatar */}
      <div className="relative rounded-2xl overflow-hidden bg-haven-primary-subtle border border-haven-border/50 mb-3 shadow-xs">
        {/* Cover Photo */}
        <div className="h-28 w-full relative">
          <Image
            src={profile.coverImage}
            alt="Profile cover banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content Overlap: Avatar + Info */}
        <div className="p-3 pt-0 relative flex items-start gap-3">
          {/* Avatar */}
          <div className="-mt-8 relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-md">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-haven-online border-2 border-white rounded-full" />
          </div>

          {/* Name & Star badge */}
          <div className="pt-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="text-base font-bold text-haven-text truncate">
                {profile.name}
              </h3>
              {profile.isStarred && (
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
              )}
            </div>
            <span className="text-[11px] font-medium text-haven-secondary block">
              {profile.statusText}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="px-3 pb-3 -mt-1">
          <p className="text-[12px] font-medium text-haven-secondary leading-snug">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* 3. Quick Action Buttons (Audio, Video, Search, Mute) */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {/* Audio */}
        <button
          onClick={onAudioCallClick}
          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-haven-primary-subtle hover:bg-[#EAE4FC] text-haven-primary transition-all duration-150 group"
          title="Audio Call (Demonstration)"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Phone className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[11px] font-semibold text-haven-text mt-0.5">
            Audio
          </span>
        </button>

        {/* Video */}
        <button
          onClick={onVideoCallClick}
          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-haven-primary-subtle hover:bg-[#EAE4FC] text-haven-primary transition-all duration-150 group"
          title="Video Call (Demonstration)"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Video className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[11px] font-semibold text-haven-text mt-0.5">
            Video
          </span>
        </button>

        {/* Search */}
        <button
          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-haven-primary-subtle hover:bg-[#EAE4FC] text-haven-primary transition-all duration-150 group"
          title="Search messages"
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Search className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-[11px] font-semibold text-haven-text mt-0.5">
            Search
          </span>
        </button>

        {/* Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-150 group ${
            isMuted
              ? "bg-haven-pink/15 text-haven-pink"
              : "bg-haven-primary-subtle hover:bg-[#EAE4FC] text-haven-primary"
          }`}
          title={isMuted ? "Unmute Notifications" : "Mute Notifications"}
        >
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
            {isMuted ? (
              <Bell className="w-4 h-4 stroke-[2]" />
            ) : (
              <BellOff className="w-4 h-4 stroke-[2]" />
            )}
          </div>
          <span className="text-[11px] font-semibold text-haven-text mt-0.5">
            {isMuted ? "Unmute" : "Mute"}
          </span>
        </button>
      </div>

      {/* 4. About Section */}
      <div className="mb-4 px-1">
        <h4 className="text-[13px] font-bold text-haven-text mb-1">About</h4>
        <p className="text-[12.5px] text-haven-secondary font-normal leading-relaxed">
          {profile.about}
        </p>
      </div>

      {/* 5. Shared Media Gallery */}
      <div className="mb-4 px-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <h4 className="text-[13px] font-bold text-haven-text">Media</h4>
            <span className="text-[11px] font-medium text-haven-secondary">
              {profile.mediaCount}
            </span>
          </div>
          <button className="text-[11.5px] font-semibold text-haven-primary hover:text-haven-primary-hover flex items-center gap-0.5 transition-colors">
            See all
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-3 gap-2">
          {profile.mediaItems.map((media) => (
            <div
              key={media.id}
              className="relative aspect-square rounded-xl overflow-hidden shadow-xs group cursor-pointer border border-haven-border/40"
            >
              <Image
                src={media.url}
                alt={media.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* +229 count overlay on the 6th thumbnail */}
              {media.countOverlay && (
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex items-center justify-center text-white font-bold text-xs">
                  +{media.countOverlay}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 6. Settings & Navigation List */}
      <div className="space-y-1 border-t border-haven-border/40 pt-2 px-1">
        {/* Shared Links */}
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors group">
          <div className="flex items-center gap-2.5">
            <Link2 className="w-4 h-4 text-haven-secondary group-hover:text-haven-primary" />
            <span className="text-[12.5px] font-semibold text-haven-text">
              Shared Links
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11.5px] font-medium text-haven-secondary">
              {profile.sharedLinksCount}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-haven-secondary" />
          </div>
        </button>

        {/* Starred Messages */}
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors group">
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-haven-secondary group-hover:text-haven-primary" />
            <span className="text-[12.5px] font-semibold text-haven-text">
              Starred Messages
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11.5px] font-medium text-haven-secondary">
              {profile.starredCount}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-haven-secondary" />
          </div>
        </button>

        {/* Disappearing Messages */}
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors group">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-haven-secondary group-hover:text-haven-primary" />
            <span className="text-[12.5px] font-semibold text-haven-text">
              Disappearing Messages
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11.5px] font-medium text-haven-secondary">
              {profile.disappearingStatus}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-haven-secondary" />
          </div>
        </button>

        {/* Chat Theme */}
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors group">
          <div className="flex items-center gap-2.5">
            <Palette className="w-4 h-4 text-haven-secondary group-hover:text-haven-primary" />
            <span className="text-[12.5px] font-semibold text-haven-text">
              Chat Theme
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-haven-primary" />
            <span className="text-[11.5px] font-medium text-haven-secondary">
              {profile.chatTheme}
            </span>
          </div>
        </button>

        {/* Files */}
        <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors group">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-haven-secondary group-hover:text-haven-primary" />
            <span className="text-[12.5px] font-semibold text-haven-text">
              Files
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11.5px] font-medium text-haven-secondary">
              {profile.filesCount}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-haven-secondary" />
          </div>
        </button>
      </div>
    </aside>
  );
}
