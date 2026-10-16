"use client";

import React, { useState, useRef, useEffect } from "react";
import { Smile, Image as ImageIcon, Sparkles, X } from "lucide-react";

interface EmojiPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
  onSelectSticker?: (sticker: string) => void;
}

export function EmojiPickerModal({
  isOpen,
  onClose,
  onSelectEmoji,
  onSelectSticker,
}: EmojiPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"emoji" | "gif" | "stickers">("emoji");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const emojis = [
    "😍", "💜", "✨", "👀", "🥳", "👍", "😂", "🔥", "🚀", "🎉",
    "🥰", "💯", "😎", "🙌", "💖", "⚡", "🌟", "🌸", "🍕", "🏖️"
  ];

  const stickers = [
    { label: "Sparkles", symbol: "✨", bg: "bg-purple-100" },
    { label: "Purple Heart", symbol: "💜", bg: "bg-violet-100" },
    { label: "Fire Vibe", symbol: "🔥", bg: "bg-rose-100" },
    { label: "Star Vibe", symbol: "⭐", bg: "bg-amber-100" },
    { label: "High Five", symbol: "🙌", bg: "bg-blue-100" },
    { label: "Vibing", symbol: "🕺", bg: "bg-emerald-100" },
  ];

  const gifs = [
    { title: "Excited Dance", preview: "🎉 Party Time!" },
    { title: "Sunset Waves", preview: "🌅 Chill Vibes" },
    { title: "High Energy", preview: "⚡ Lets Gooo" },
    { title: "Heart Pop", preview: "💜 Sending Love" },
  ];

  return (
    <div
      ref={modalRef}
      className="absolute bottom-20 right-6 z-40 bg-white rounded-3xl p-3 shadow-2xl border border-haven-border/60 w-72 animate-in fade-in slide-in-from-bottom-2 duration-150 select-none"
    >
      {/* Header Tabs */}
      <div className="flex items-center justify-between border-b border-haven-border/40 pb-2 mb-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("emoji")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeTab === "emoji"
                ? "bg-haven-primary text-white"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            Emoji
          </button>
          <button
            onClick={() => setActiveTab("stickers")}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeTab === "stickers"
                ? "bg-haven-primary text-white"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Stickers
          </button>
          <button
            onClick={() => setActiveTab("gif")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeTab === "gif"
                ? "bg-haven-primary text-white"
                : "text-haven-secondary hover:bg-haven-primary-subtle"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            GIF
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-haven-secondary hover:text-haven-primary p-1 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "emoji" && (
        <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSelectEmoji(emoji)}
              className="text-2xl hover:scale-125 transition-transform p-1.5 rounded-xl hover:bg-haven-primary-subtle text-center flex items-center justify-center"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {activeTab === "stickers" && (
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1">
          {stickers.map((stk) => (
            <button
              key={stk.label}
              onClick={() => {
                if (onSelectSticker) onSelectSticker(stk.symbol);
                onClose();
              }}
              className={`flex flex-col items-center justify-center p-2.5 rounded-2xl ${stk.bg} hover:scale-105 transition-all shadow-xs`}
            >
              <span className="text-3xl mb-1">{stk.symbol}</span>
              <span className="text-[10px] font-semibold text-haven-text">
                {stk.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {activeTab === "gif" && (
        <div className="space-y-1.5 max-h-48 overflow-y-auto p-1">
          {gifs.map((gif) => (
            <button
              key={gif.title}
              onClick={() => {
                onSelectEmoji(`[GIF: ${gif.preview}]`);
                onClose();
              }}
              className="w-full text-left p-2 rounded-xl bg-haven-primary-subtle hover:bg-haven-primary/20 text-xs font-semibold text-haven-primary flex items-center justify-between transition-colors"
            >
              <span>{gif.title}</span>
              <span className="text-[11px] text-haven-text">{gif.preview}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
