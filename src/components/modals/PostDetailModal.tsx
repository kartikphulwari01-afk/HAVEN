"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Check,
} from "lucide-react";
import { RoamPost } from "@/types/roam";
import { ROAM_CURRENT_USER } from "@/data/roamMockData";

interface PostDetailModalProps {
  post: RoamPost | null;
  onClose: () => void;
}

export function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const [comments, setComments] = useState<
    Array<{ id: string; user: string; text: string; time: string; avatar: string }>
  >([
    {
      id: "c1",
      user: "riya",
      text: "The colors in this shot are absolutely breathtaking! 😍",
      time: "1h ago",
      avatar: "/images/riya.jpg",
    },
    {
      id: "c2",
      user: "alex",
      text: "Vibes are immaculate ✨ Would love to visit soon.",
      time: "45m ago",
      avatar: "/images/alex.jpg",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  if (!post) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        user: ROAM_CURRENT_USER.name,
        text: newComment.trim(),
        time: "Just now",
        avatar: ROAM_CURRENT_USER.avatar,
      },
    ]);
    setNewComment("");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Post Details"
    >
      <div className="relative w-full max-w-3xl h-[560px] bg-white rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-haven-border/60">
        {/* Left Side: Media Preview */}
        <div className="relative md:w-1/2 h-64 md:h-full bg-black">
          <Image
            src={post.mediaUrl}
            alt={post.caption}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Comments and Details */}
        <div className="flex-1 flex flex-col justify-between p-4 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-haven-border/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-haven-border/60">
                <Image
                  src={post.authorAvatar}
                  alt={post.authorName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-haven-text">
                    {post.authorName}
                  </span>
                  {post.isVerified && (
                    <span className="w-3 h-3 rounded-full bg-haven-primary flex items-center justify-center">
                      <Check className="w-2 h-2 text-white stroke-[3]" />
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-haven-secondary font-medium">
                  {post.timeAgo}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-haven-secondary hover:text-haven-text p-1 rounded-full focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Caption & Comments List */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {/* Main Post Caption */}
            <div className="pb-2 border-b border-haven-border/30">
              <p className="text-xs text-haven-text leading-relaxed whitespace-pre-line mb-1">
                {post.caption}
              </p>
              <div className="flex flex-wrap gap-1">
                {post.hashtags.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] font-semibold text-haven-primary"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2.5">
              <span className="text-[10.5px] font-bold text-haven-secondary uppercase tracking-wider block">
                Comments
              </span>
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={c.avatar}
                      alt={c.user}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-haven-text mr-1.5">
                      {c.user}
                    </span>
                    <span className="text-haven-text font-normal">{c.text}</span>
                    <span className="block text-[9.5px] text-haven-secondary mt-0.5">
                      {c.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Input */}
          <form
            onSubmit={handleAddComment}
            className="pt-3 border-t border-haven-border/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment to this post..."
              className="flex-1 bg-haven-bg rounded-full px-3.5 py-2 text-xs text-haven-text placeholder:text-[#9E97B5] focus:outline-none focus:ring-1 focus:ring-haven-primary"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-3 py-2 rounded-full bg-haven-primary text-white text-xs font-semibold hover:bg-haven-primary-hover disabled:opacity-50 transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
