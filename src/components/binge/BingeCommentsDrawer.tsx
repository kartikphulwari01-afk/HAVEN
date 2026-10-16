"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Heart, Send, Smile } from "lucide-react";
import { BingeComment, BingeVideo } from "@/types/binge";

interface BingeCommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  video: BingeVideo;
}

export function BingeCommentsDrawer({
  isOpen,
  onClose,
  video,
}: BingeCommentsDrawerProps) {
  const [comments, setComments] = useState<BingeComment[]>(video.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [likedCommentIds, setLikedCommentIds] = useState<Record<string, boolean>>({});
  const [commentLikesCount, setCommentLikesCount] = useState<Record<string, number>>(
    () => {
      const initial: Record<string, number> = {};
      (video.comments || []).forEach((c) => {
        initial[c.id] = c.likesCount;
      });
      return initial;
    }
  );

  if (!isOpen) return null;

  const handleToggleLikeComment = (commentId: string) => {
    const isLiked = !!likedCommentIds[commentId];
    setLikedCommentIds((prev) => ({ ...prev, [commentId]: !isLiked }));
    setCommentLikesCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + (isLiked ? -1 : 1),
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: BingeComment = {
      id: `c_${Date.now()}`,
      userName: "Kartik Phulwari",
      userHandle: "@kartikphulwari",
      userAvatar: "/avatars/avatar_1.jpg",
      content: newCommentText.trim(),
      likesCount: 0,
      timestamp: "Just now",
    };

    setComments([newComment, ...comments]);
    setCommentLikesCount((prev) => ({ ...prev, [newComment.id]: 0 }));
    setNewCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Content Panel */}
      <div className="relative w-full max-w-md h-full bg-[#181332] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Comments</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              {comments.length}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close comments"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comments Scrollable List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-white/40">
              <p className="text-sm">No comments yet.</p>
              <p className="text-xs mt-1">Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => {
              const isLiked = !!likedCommentIds[comment.id];
              const likes = commentLikesCount[comment.id] ?? comment.likesCount;

              return (
                <div key={comment.id} className="flex items-start gap-3 group">
                  {/* User Avatar */}
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/15">
                    <Image
                      src={comment.userAvatar}
                      alt={comment.userName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Comment Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-white hover:underline cursor-pointer">
                        {comment.userHandle}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-white/85 mt-0.5 leading-relaxed break-words">
                      {comment.content}
                    </p>
                  </div>

                  {/* Comment Like Heart */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                    <button
                      onClick={() => handleToggleLikeComment(comment.id)}
                      className={`p-1 rounded-full transition-transform active:scale-125 ${
                        isLiked
                          ? "text-[#FF3B7A]"
                          : "text-white/30 hover:text-white/60"
                      }`}
                      aria-label="Like comment"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? "fill-[#FF3B7A]" : ""}`}
                      />
                    </button>
                    {likes > 0 && (
                      <span className="text-[10px] text-white/40 font-medium">
                        {likes}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleAddComment}
          className="p-4 border-t border-white/10 bg-[#120E24]/80 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#7655FF] focus:ring-1 focus:ring-[#7655FF] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!newCommentText.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              newCommentText.trim()
                ? "bg-[#7655FF] text-white shadow-[0_0_12px_rgba(118,85,255,0.5)] active:scale-95"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
