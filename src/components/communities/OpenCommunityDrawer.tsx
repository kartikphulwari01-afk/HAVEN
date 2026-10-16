"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Hash,
  Volume2,
  Send,
  Users,
  Sparkles,
  Gamepad2,
  Trophy,
  Smile,
} from "lucide-react";
import { CommunityData } from "@/types/communities";

interface OpenCommunityDrawerProps {
  data: CommunityData;
  isOpen: boolean;
  onClose: () => void;
}

interface DemoChannelMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  badge?: string;
}

export function OpenCommunityDrawer({
  data,
  isOpen,
  onClose,
}: OpenCommunityDrawerProps) {
  const [activeChannel, setActiveChannel] = useState("squad-chat");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<DemoChannelMessage[]>([
    {
      id: "cm-1",
      senderName: "Karan",
      senderAvatar: "/images/roam/karan.jpg",
      content: "Who is down for the 5v5 Valorant customs tonight? Need 2 more players for squad A!",
      timestamp: "7:45 PM",
      badge: "Squad Leader",
    },
    {
      id: "cm-2",
      senderName: "Shreya",
      senderAvatar: "/images/roam/shreya.jpg",
      content: "Count me in! Playing Controller/Omen. Setting up Discord audio right now 🎮",
      timestamp: "7:48 PM",
    },
    {
      id: "cm-3",
      senderName: "Aditya",
      senderAvatar: "/images/roam/aditya.jpg",
      content: "Don't forget the Weekend Tournament registration closes tomorrow at midnight!",
      timestamp: "8:02 PM",
      badge: "Moderator",
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: DemoChannelMessage = {
      id: `cm-${Date.now()}`,
      senderName: "Kartik",
      senderAvatar: "/images/roam/kartik.jpg",
      content: messageInput.trim(),
      timestamp: "Just now",
      badge: "VIP",
    };

    setMessages((prev) => [...prev, newMsg]);
    setMessageInput("");
  };

  const channels = [
    { id: "announcements", name: "announcements", icon: Sparkles },
    { id: "squad-chat", name: "squad-chat", icon: Hash },
    { id: "clips-highlights", name: "clips-highlights", icon: Gamepad2 },
    { id: "tournament-bracket", name: "tournaments", icon: Trophy },
  ];

  const voiceLounges = [
    { id: "voice-1", name: "Squad Alpha (4/5)", active: true },
    { id: "voice-2", name: "Chill & Stream (2/8)", active: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-[26px] shadow-[0_20px_50px_rgba(33,24,59,0.3)] border border-[#ECE7FC] flex overflow-hidden">
        {/* Left Sub-Sidebar (Channels & Voice) */}
        <div className="w-64 bg-[#F8F6FF] border-r border-[#ECE7FC] flex flex-col justify-between p-3.5 flex-shrink-0">
          <div>
            {/* Community Header Card */}
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-white border border-[#ECE7FC] shadow-xs mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-white shadow-xs">
                <Image
                  src={data.avatarImage}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-extrabold text-[#21183B] truncate">
                  {data.name}
                </h3>
                <span className="text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  {data.onlineNowText}
                </span>
              </div>
            </div>

            {/* Channels Group */}
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#8C84A3] uppercase tracking-wider px-2 mb-1.5 block">
                Text Channels
              </span>
              <div className="space-y-1">
                {channels.map((ch) => {
                  const Icon = ch.icon;
                  const isActive = activeChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#7655FF] text-white shadow-xs"
                          : "text-[#6C6382] hover:text-[#21183B] hover:bg-white/80"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>{ch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Channels Group */}
            <div>
              <span className="text-[10px] font-bold text-[#8C84A3] uppercase tracking-wider px-2 mb-1.5 block">
                Voice Lounges
              </span>
              <div className="space-y-1">
                {voiceLounges.map((vl) => (
                  <button
                    key={vl.id}
                    onClick={() =>
                      alert(`[Demonstration Action] Connected to ${vl.name}`)
                    }
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#6C6382] hover:text-[#21183B] hover:bg-white/80 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-[#7655FF]" />
                      <span>{vl.name}</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-[#10B981]">
                      Live
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Status bar at bottom */}
          <div className="flex items-center gap-2.5 p-2 bg-white rounded-2xl border border-[#ECE7FC] shadow-xs">
            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#E6E1F9]">
              <Image
                src="/images/roam/kartik.jpg"
                alt="Kartik"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#21183B] block truncate leading-none">
                Kartik
              </span>
              <span className="text-[10px] text-[#8C84A3]">Online</span>
            </div>
          </div>
        </div>

        {/* Right Main Channel Workspace */}
        <div className="flex-1 flex flex-col justify-between bg-white">
          {/* Channel Header */}
          <div className="h-14 px-5 border-b border-[#ECE7FC] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#7655FF] stroke-[2.5]" />
              <span className="text-sm font-bold text-[#21183B]">
                {activeChannel}
              </span>
              <span className="text-xs text-[#8C84A3] ml-2 hidden sm:inline">
                General discussion & squad matchmaking
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#6C6382] font-semibold bg-[#F7F5FF] px-3 py-1 rounded-full border border-[#ECE7FC]">
                <Users className="w-3.5 h-3.5 text-[#7655FF]" />
                <span>57 online</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 border border-[#ECE7FC]">
                  <Image
                    src={m.senderAvatar}
                    alt={m.senderName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#21183B]">
                      {m.senderName}
                    </span>
                    {m.badge && (
                      <span className="text-[9.5px] font-bold bg-[#EDE9FE] text-[#7655FF] px-2 py-0.2 rounded-full">
                        {m.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-[#8C84A3]">
                      {m.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#40375E] leading-relaxed">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-[#ECE7FC] bg-[#FAFAFE] flex items-center gap-2.5"
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${activeChannel}...`}
              className="flex-1 bg-white border border-[#ECE7FC] rounded-2xl px-4 py-2.5 text-xs text-[#21183B] placeholder:text-[#9E97B5] focus:outline-none focus:border-[#7655FF]"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-2xl bg-[#7655FF] hover:bg-[#6845ee] text-white flex items-center justify-center shadow-xs transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
