"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  Phone,
  Video,
  Search,
  MoreHorizontal,
  Plus,
  Smile,
  Paperclip,
  Mic,
  Send,
  Play,
  Pause,
  CheckCheck,
  StickyNote,
} from "lucide-react";
import { Conversation, Message } from "@/types";
import { PlaymodeDoodleCanvas } from "./PlaymodeDoodleCanvas";
import { AttachmentMenuModal } from "../modals/AttachmentMenuModal";
import { EmojiPickerModal } from "../modals/EmojiPickerModal";

interface ChatWorkspaceProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (text: string, type?: "text" | "sticker") => void;
  onAudioCallClick?: () => void;
  onVideoCallClick?: () => void;
  onToggleProfile?: () => void;
}

export function ChatWorkspace({
  conversation,
  messages,
  onSendMessage,
  onAudioCallClick,
  onVideoCallClick,
  onToggleProfile,
}: ChatWorkspaceProps) {
  const [inputText, setInputText] = useState("");
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(35); // simulated played percent
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice note play/pause simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingVoice) {
      interval = setInterval(() => {
        setVoiceProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingVoice(false);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingVoice]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), "text");
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Waveform heights for voice note
  const waveformHeights = [
    8, 14, 20, 10, 16, 26, 18, 12, 22, 28, 16, 20, 24, 14, 10, 18, 26, 22, 16,
    12, 20, 24, 18, 14, 10, 16, 22, 12, 8,
  ];

  return (
    <div className="flex-1 min-w-0 bg-white rounded-[26px] overflow-hidden flex flex-col h-full shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/40 relative">
      {/* 1. Header */}
      <header className="h-[68px] px-6 border-b border-haven-border/40 flex items-center justify-between bg-white/95 backdrop-blur-sm z-20 flex-shrink-0">
        {/* Left: Back / Partner Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleProfile}
            className="text-haven-secondary hover:text-haven-primary p-1 -ml-2 rounded-full hover:bg-haven-primary-subtle transition-colors focus:outline-none"
            aria-label="Back / Toggle Profile"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Avatar with Online Badge */}
          <div
            className="relative cursor-pointer"
            onClick={onToggleProfile}
            title="View Profile"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-haven-border/60">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-haven-online border-2 border-white rounded-full" />
            )}
          </div>

          {/* Name & Online Status */}
          <div className="cursor-pointer" onClick={onToggleProfile}>
            <h2 className="text-[15px] font-bold text-haven-text leading-tight flex items-center gap-1">
              {conversation.name}
            </h2>
            <span className="text-[11.5px] font-medium text-haven-secondary block">
              {conversation.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Right: Quick Call & Search Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Call */}
          <button
            onClick={onAudioCallClick}
            className="w-9 h-9 rounded-full flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
            title="Audio Call (Demonstration)"
            aria-label="Audio Call"
          >
            <Phone className="w-[18px] h-[18px] stroke-[2]" />
          </button>

          {/* Video Call */}
          <button
            onClick={onVideoCallClick}
            className="w-9 h-9 rounded-full flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
            title="Video Call (Demonstration)"
            aria-label="Video Call"
          >
            <Video className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Search */}
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
            title="Search in chat"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px] stroke-[2]" />
          </button>

          {/* More Options */}
          <button
            onClick={onToggleProfile}
            className="w-9 h-9 rounded-full flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors focus:outline-none"
            title="More Options / Profile"
            aria-label="More Options"
          >
            <MoreHorizontal className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </header>

      {/* 2. Chat Feed Area with PLAYMODE Doodle Canvas */}
      <div className="flex-1 relative overflow-y-auto px-6 py-4 space-y-3.5 z-10 flex flex-col">
        {/* Soft PLAYMODE Doodles & Crayon Canvas */}
        <PlaymodeDoodleCanvas />

        {/* Messages Stream */}
        <div className="relative z-10 space-y-3 pb-2 flex-1">
          {messages.map((msg) => {
            const isMe = msg.senderId === "me";

            // Sent by User (Arjun)
            if (isMe) {
              return (
                <div
                  key={msg.id}
                  className="flex flex-col items-end animate-in fade-in slide-in-from-bottom-1 duration-150"
                >
                  {/* Sticker Message Type */}
                  {msg.type === "sticker" ? (
                    <div className="bg-haven-primary text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-xs flex items-center gap-2 max-w-[70%]">
                      <span className="text-xl">{msg.stickerLabel || "✨"}</span>
                      <div className="flex items-center gap-1 text-[10px] text-white/80 ml-1">
                        <span>{msg.timestamp}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  ) : (
                    /* Regular Text Bubble */
                    <div className="bg-haven-primary text-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-xs max-w-[70%] flex items-end gap-2.5">
                      <p className="text-[13.5px] leading-relaxed break-words font-normal">
                        {msg.content}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-white/80 flex-shrink-0 mb-0.5">
                        <span>{msg.timestamp}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Received from Partner (Riya)
            return (
              <div
                key={msg.id}
                className="flex flex-col items-start animate-in fade-in slide-in-from-bottom-1 duration-150"
              >
                {/* 1. Shared Image Bubble */}
                {msg.type === "image" && msg.mediaUrl ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-sm border border-haven-border/40 max-w-[340px] group cursor-pointer">
                    <Image
                      src={msg.mediaUrl}
                      alt="Shared Sunset"
                      width={340}
                      height={200}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Timestamp pill overlay */}
                    <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                      {msg.timestamp}
                    </span>
                  </div>
                ) : msg.type === "voice" ? (
                  /* 2. Voice Note Bubble */
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-xs border border-haven-border/60 max-w-[320px] flex items-center gap-3">
                    {/* Partner Mini Avatar */}
                    {msg.senderAvatar && (
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-haven-border/50">
                        <Image
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          width={28}
                          height={28}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Play/Pause Button */}
                    <button
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      className="w-8 h-8 rounded-full bg-haven-primary text-white flex items-center justify-center hover:bg-haven-primary-hover transition-transform hover:scale-105 flex-shrink-0 shadow-xs focus:outline-none"
                      aria-label={isPlayingVoice ? "Pause voice note" : "Play voice note"}
                    >
                      {isPlayingVoice ? (
                        <Pause className="w-3.5 h-3.5 fill-white stroke-none" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white stroke-none ml-0.5" />
                      )}
                    </button>

                    {/* Waveform Bars */}
                    <div className="flex items-center gap-[2.5px] flex-1 h-7">
                      {waveformHeights.map((h, idx) => {
                        const barProgress = (idx / waveformHeights.length) * 100;
                        const isPlayed = barProgress <= voiceProgress;
                        return (
                          <span
                            key={idx}
                            style={{ height: `${h}px` }}
                            className={`w-[2.5px] rounded-full transition-colors duration-200 ${
                              isPlayed ? "bg-haven-primary" : "bg-[#DDD4FE]"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Duration and Timestamp */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-[11px] font-semibold text-haven-text">
                        {msg.voiceDuration || "0:24"}
                      </span>
                      <span className="text-[9.5px] text-haven-secondary">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* 3. Standard Text Bubble with optional floating reaction badge */
                  <div className="relative group">
                    <div className="bg-white text-haven-text rounded-2xl rounded-tl-sm px-4 py-2 shadow-xs border border-haven-border/40 max-w-[85%] flex items-end gap-2.5">
                      <p className="text-[13.5px] leading-relaxed break-words font-normal">
                        {msg.content}
                      </p>
                      <span className="text-[10px] text-haven-secondary flex-shrink-0 mb-0.5 font-medium">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Floating Reaction (e.g. Red Heart on "yesss! i'll make a plan") */}
                    {msg.reaction && (
                      <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-md border border-haven-border/50 text-sm flex items-center justify-center animate-bounce-once">
                        {msg.reaction}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Bottom Composer */}
      <footer className="p-4 bg-white/95 backdrop-blur-sm border-t border-haven-border/30 relative z-30">
        {/* Attachment menu popover */}
        <AttachmentMenuModal
          isOpen={isAttachmentOpen}
          onClose={() => setIsAttachmentOpen(false)}
          onSelectAction={(action) => {
            onSendMessage(`[Demonstration: Shared ${action}]`, "text");
          }}
        />

        {/* Emoji & Sticker drawer */}
        <EmojiPickerModal
          isOpen={isEmojiPickerOpen}
          onClose={() => setIsEmojiPickerOpen(false)}
          onSelectEmoji={(emoji) => {
            setInputText((prev) => prev + emoji);
          }}
          onSelectSticker={(sticker) => {
            onSendMessage(sticker, "sticker");
          }}
        />

        <div className="flex items-center gap-3">
          {/* Plus / Attachment Button */}
          <button
            onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
            className="w-10 h-10 rounded-full bg-haven-primary text-white flex items-center justify-center hover:bg-haven-primary-hover transition-transform hover:scale-105 shadow-xs flex-shrink-0 focus:outline-none"
            title="Add attachment"
            aria-label="Add attachment"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Message Input Pill */}
          <div className="bg-haven-bg rounded-full flex-1 px-4 py-2.5 flex items-center gap-2.5 border border-haven-border/50 focus-within:border-haven-primary/50 focus-within:bg-white transition-all shadow-xs">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-transparent text-[13.5px] text-haven-text placeholder:text-[#9E97B5] focus:outline-none font-normal"
            />

            {/* Input Actions */}
            <div className="flex items-center gap-2 text-haven-secondary flex-shrink-0">
              {/* Emoji Picker */}
              <button
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="hover:text-haven-primary p-0.5 rounded-full transition-colors focus:outline-none"
                title="Insert emoji"
                aria-label="Insert emoji"
              >
                <Smile className="w-4 h-4 stroke-[2]" />
              </button>

              {/* GIF Button */}
              <button
                onClick={() => setIsEmojiPickerOpen(true)}
                className="hover:text-haven-primary text-[10px] font-bold border border-haven-secondary/40 rounded px-1 py-0.2 hover:border-haven-primary transition-colors focus:outline-none"
                title="Pick GIF"
                aria-label="Pick GIF"
              >
                GIF
              </button>

              {/* Stickers Button */}
              <button
                onClick={() => setIsEmojiPickerOpen(true)}
                className="hover:text-haven-primary p-0.5 rounded-full transition-colors focus:outline-none"
                title="Stickers"
                aria-label="Stickers"
              >
                <StickyNote className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Paperclip */}
              <button
                onClick={() => setIsAttachmentOpen(!isAttachmentOpen)}
                className="hover:text-haven-primary p-0.5 rounded-full transition-colors focus:outline-none"
                title="Attach file"
                aria-label="Attach file"
              >
                <Paperclip className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Microphone or Send Action */}
          {inputText.trim() ? (
            <button
              onClick={handleSend}
              className="w-11 h-11 rounded-full bg-haven-primary text-white flex items-center justify-center hover:bg-haven-primary-hover transition-transform hover:scale-105 shadow-md flex-shrink-0 focus:outline-none"
              title="Send message (Local demonstration)"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 stroke-[2.5] ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                onSendMessage("Voice note (0:15)", "text");
              }}
              className="w-11 h-11 rounded-full bg-haven-primary text-white flex items-center justify-center hover:bg-haven-primary-hover transition-transform hover:scale-105 shadow-md flex-shrink-0 focus:outline-none"
              title="Record voice note (Local demonstration)"
              aria-label="Record voice note"
            >
              <Mic className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
