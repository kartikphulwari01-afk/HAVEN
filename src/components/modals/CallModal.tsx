"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Conversation } from "@/types";

interface CallModalProps {
  isOpen: boolean;
  type: "audio" | "video";
  conversation: Conversation;
  onClose: () => void;
}

export function CallModal({
  isOpen,
  type,
  conversation,
  onClose,
}: CallModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      setCallDuration(0);
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remSecs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Call Demonstration"
    >
      <div className="relative w-full max-w-sm h-[520px] bg-gradient-to-b from-[#2D214F] to-[#160E2E] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-between p-6 border border-white/10 text-white text-center">
        {/* Top Disclaimer Badge */}
        <div className="bg-haven-primary/40 border border-haven-primary/50 text-[11px] font-semibold px-3 py-1 rounded-full text-haven-lime">
          Local Prototype Demo · No Real Call
        </div>

        {/* Center Calling Info */}
        <div className="flex flex-col items-center my-auto">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-haven-primary shadow-xl ring-8 ring-haven-primary/20 animate-pulse">
              <Image
                src={conversation.avatar}
                alt={conversation.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-1">{conversation.name}</h3>
          <span className="text-sm text-haven-lime font-mono tracking-wider font-semibold">
            {formatTime(callDuration)}
          </span>
          <span className="text-xs text-white/60 mt-1">
            HAVEN PLAYMODE {type === "video" ? "Video Call" : "Voice Call"}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
              isMuted ? "bg-haven-pink text-white" : "bg-white/20 text-white"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call button */}
          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Video Toggle button */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
              isVideoOff ? "bg-haven-pink text-white" : "bg-white/20 text-white"
            }`}
            title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoOff ? (
              <VideoOff className="w-5 h-5" />
            ) : (
              <Video className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
