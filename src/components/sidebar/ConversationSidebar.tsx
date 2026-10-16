"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Bell,
  ChevronRight,
  SlidersHorizontal,
  Star,
  Plus,
  Volume2,
} from "lucide-react";
import { Conversation, ConversationFilter, StoryItem } from "@/types";
import { CURRENT_USER } from "@/data/mockData";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  stories: StoryItem[];
  onStoryClick: (story: StoryItem) => void;
  onOpenNotifications?: () => void;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  stories,
  onStoryClick,
  onOpenNotifications,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ConversationFilter>("all");

  // Filter conversations according to search and selected tab
  const filteredConversations = conversations.filter((c) => {
    const matchesFilter =
      activeFilter === "all" ? true : c.category.includes(activeFilter);
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-[330px] xl:w-[350px] flex-shrink-0 bg-white rounded-[26px] p-4 flex flex-col h-full shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/40 select-none overflow-hidden">
      {/* Top Greeting & Notification Header */}
      <div className="flex items-start justify-between mb-3 px-1">
        <div>
          <h1 className="text-[22px] font-bold text-haven-text leading-tight tracking-tight">
            Good Vibes,
          </h1>
          <div className="flex items-center gap-1.5 text-[22px] font-bold text-haven-text">
            <span>{CURRENT_USER.name}</span>
            <span className="text-xl" role="img" aria-label="Waving hand">
              👋
            </span>
          </div>
        </div>

        {/* Bell Button with Notification Indicator */}
        <button
          onClick={onOpenNotifications}
          className="w-10 h-10 rounded-full bg-haven-primary-subtle flex items-center justify-center text-haven-primary hover:bg-[#EAE4FC] transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-haven-primary"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5 stroke-[2]" />
          {/* Notification pink dot */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-haven-pink rounded-full ring-2 ring-white" />
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-4">
        <div className="w-full bg-haven-primary-subtle rounded-full px-3.5 py-2.5 flex items-center gap-2.5 focus-within:ring-2 focus-within:ring-haven-primary/30 transition-all">
          <Search className="w-4 h-4 text-haven-secondary flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people, groups, messages..."
            className="w-full bg-transparent text-[13px] text-haven-text placeholder:text-[#9E97B5] focus:outline-none font-normal"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-haven-secondary bg-white/90 border border-haven-border/80 rounded shadow-xs">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Stories Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-[14px] font-bold text-haven-text">Stories</span>
          <button
            onClick={() => onStoryClick(stories[0])}
            className="text-[12px] font-semibold text-haven-primary hover:text-haven-primary-hover flex items-center gap-0.5 transition-colors"
          >
            See all
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Stories Carousel */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => onStoryClick(story)}
              className="group flex flex-col items-center gap-1.5 flex-shrink-0 focus:outline-none"
              title={story.userName}
            >
              <div className="relative">
                {/* Gradient ring for story */}
                <div
                  className={`w-[50px] h-[50px] rounded-full p-[2px] transition-transform group-hover:scale-105 ${
                    story.isOwnStory
                      ? "bg-transparent p-0"
                      : `bg-gradient-to-tr ${story.ringGradient}`
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden p-[1.5px] bg-white">
                    <Image
                      src={story.userAvatar}
                      alt={story.userName}
                      width={46}
                      height={46}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Plus badge for Your Story */}
                {story.isOwnStory && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-haven-primary text-white rounded-full flex items-center justify-center border border-white text-xs shadow-sm">
                    <Plus className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-haven-text max-w-[54px] truncate text-center">
                {story.userName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-3 px-1 border-b border-haven-border/30 pb-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* All Filter */}
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "all"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            All
          </button>

          {/* Unread Filter */}
          <button
            onClick={() => setActiveFilter("unread")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeFilter === "unread"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            <span>Unread</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeFilter === "unread"
                  ? "bg-white text-haven-primary"
                  : "bg-haven-pink text-white"
              }`}
            >
              3
            </span>
          </button>

          {/* Groups Filter */}
          <button
            onClick={() => setActiveFilter("groups")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeFilter === "groups"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            Groups
          </button>

          {/* Close Friends Filter */}
          <button
            onClick={() => setActiveFilter("close_friends")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === "close_friends"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            Close Friends
          </button>
        </div>

        {/* Filter / Sliders Icon Button */}
        <button
          className="text-haven-secondary hover:text-haven-primary p-1.5 rounded-full hover:bg-haven-primary-subtle transition-colors focus:outline-none"
          title="Conversation Filter Options"
          aria-label="Filter Options"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-0.5" role="list">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-10 text-haven-secondary text-xs">
            No conversations found.
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                role="listitem"
                onClick={() => onSelectConversation(conv.id)}
                className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-[#EDE8FD] shadow-xs"
                    : "hover:bg-haven-primary-subtle/80"
                }`}
              >
                {/* Avatar with Online status */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-haven-border/50">
                    <Image
                      src={conv.avatar}
                      alt={conv.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-haven-online border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Conversation Details */}
                <div className="flex-1 min-w-0">
                  {/* Top row: Name + Star + Timestamp */}
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-[13.5px] font-bold text-haven-text truncate">
                        {conv.name}
                      </span>
                      {conv.isStarred && (
                        <Star className="w-3.5 h-3.5 text-haven-primary fill-haven-primary flex-shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-haven-secondary flex-shrink-0 font-medium">
                      {conv.timestamp}
                    </span>
                  </div>

                  {/* Bottom row: Message preview + Unread pill */}
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] truncate min-w-0 pr-1">
                      {conv.isTyping ? (
                        <span className="text-[#10B981] font-semibold animate-pulse">
                          typing...
                        </span>
                      ) : conv.lastMessageType === "voice" ? (
                        <span className="text-haven-primary font-medium flex items-center gap-1">
                          <span className="text-[10px]">✦</span> Voice note · 0:24
                        </span>
                      ) : (
                        <span className="text-haven-secondary truncate block">
                          {conv.lastMessage}
                        </span>
                      )}
                    </div>

                    {/* Unread count badge */}
                    {conv.unreadCount && (
                      <span className="w-4 h-4 rounded-full bg-haven-pink text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 shadow-xs">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
