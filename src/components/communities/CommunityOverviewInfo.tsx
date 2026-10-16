"use client";

import React from "react";
import {
  MoreHorizontal,
  UserPlus,
  Share2,
  Bell,
  ShieldAlert,
  Users,
  Radio,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { CommunityData } from "@/types/communities";

interface CommunityOverviewInfoProps {
  data: CommunityData;
  onInviteClick: () => void;
  onShareClick: () => void;
  onNotificationsClick: () => void;
  onReportClick: () => void;
  onTagClick: (tag: string) => void;
}

export function CommunityOverviewInfo({
  data,
  onInviteClick,
  onShareClick,
  onNotificationsClick,
  onReportClick,
  onTagClick,
}: CommunityOverviewInfoProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 select-none flex-shrink-0">
      {/* 1. About this community */}
      <div className="bg-white rounded-[20px] p-4 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[13.5px] font-bold text-[#21183B] tracking-tight">
              About this community
            </h3>
            <button
              title="More info"
              className="text-[#8C84A3] hover:text-[#7655FF] transition-colors p-0.5"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-[#6C6382] leading-relaxed mb-3.5">
            {data.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {data.tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onTagClick(tag.label)}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-transform hover:scale-105 active:scale-95 ${tag.colorClass}`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Quick actions */}
      <div className="bg-white rounded-[20px] p-4 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[13.5px] font-bold text-[#21183B] tracking-tight">
            Quick actions
          </h3>
          <button
            title="More actions"
            className="text-[#8C84A3] hover:text-[#7655FF] transition-colors p-0.5"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-4 gap-2 my-auto py-1">
          {/* Invite */}
          <button
            onClick={onInviteClick}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F7F5FF] border border-[#E9E4FA] flex items-center justify-center text-[#7655FF] group-hover:bg-[#EDE9FE] group-hover:scale-105 transition-all shadow-xs">
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-[#21183B] group-hover:text-[#7655FF] mt-2 transition-colors">
              Invite
            </span>
          </button>

          {/* Share */}
          <button
            onClick={onShareClick}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F7F5FF] border border-[#E9E4FA] flex items-center justify-center text-[#7655FF] group-hover:bg-[#EDE9FE] group-hover:scale-105 transition-all shadow-xs">
              <Share2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-[#21183B] group-hover:text-[#7655FF] mt-2 transition-colors">
              Share
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={onNotificationsClick}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F7F5FF] border border-[#E9E4FA] flex items-center justify-center text-[#7655FF] group-hover:bg-[#EDE9FE] group-hover:scale-105 transition-all shadow-xs">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-[#21183B] group-hover:text-[#7655FF] mt-2 transition-colors">
              Notifications
            </span>
          </button>

          {/* Report */}
          <button
            onClick={onReportClick}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] border border-[#FFE4E6] flex items-center justify-center text-[#F43F5E] group-hover:bg-[#FFE4E6] group-hover:scale-105 transition-all shadow-xs">
              <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-semibold text-[#21183B] group-hover:text-[#F43F5E] mt-2 transition-colors">
              Report
            </span>
          </button>
        </div>
      </div>

      {/* 3. Community activity */}
      <div className="bg-white rounded-[20px] p-4 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13.5px] font-bold text-[#21183B] tracking-tight">
            Community activity
          </h3>
          <button
            title="Activity details"
            className="text-[#8C84A3] hover:text-[#7655FF] transition-colors p-0.5"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Metrics in 2x2 or Vertical Stack */}
        <div className="space-y-2 py-0.5">
          {/* Members */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center flex-shrink-0 shadow-xs">
              <Users className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xs font-extrabold text-[#21183B]">
                {data.metrics.members}
              </span>
              <span className="text-[10.5px] font-medium text-[#8C84A3]">
                Members
              </span>
            </div>
          </div>

          {/* Online now */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 shadow-xs">
              <Radio className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xs font-extrabold text-[#21183B]">
                {data.metrics.onlineNow}
              </span>
              <span className="text-[10.5px] font-medium text-[#8C84A3]">
                Online now
              </span>
            </div>
          </div>

          {/* Active groups */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center flex-shrink-0 shadow-xs">
              <MessageSquare className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xs font-extrabold text-[#21183B]">
                {data.metrics.activeGroups}
              </span>
              <span className="text-[10.5px] font-medium text-[#8C84A3]">
                Active groups
              </span>
            </div>
          </div>

          {/* Upcoming events */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FFE4E6] text-[#F43F5E] flex items-center justify-center flex-shrink-0 shadow-xs">
              <Calendar className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xs font-extrabold text-[#21183B]">
                {data.metrics.upcomingEvents}
              </span>
              <span className="text-[10.5px] font-medium text-[#8C84A3]">
                Upcoming events
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
