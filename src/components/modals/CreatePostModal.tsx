"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Video, Sparkles, MapPin, Tag } from "lucide-react";
import { RoamPost } from "@/types/roam";
import { ROAM_CURRENT_USER } from "@/data/roamMockData";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: RoamPost) => void;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmitPost,
}: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Photography");
  const [previewImage, setPreviewImage] = useState("/images/roam/post_sunset_city.jpg");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const newPost: RoamPost = {
      id: `post-${Date.now()}`,
      authorName: ROAM_CURRENT_USER.name,
      authorAvatar: ROAM_CURRENT_USER.avatar,
      isVerified: true,
      timeAgo: "Just now",
      mediaType: "image",
      mediaUrl: previewImage,
      caption: caption.trim(),
      hashtags: [`#${selectedCategory.toLowerCase()}`, "#haven", "#playmode"],
      likesCount: "0",
      commentsCount: "0",
      isLiked: false,
      isSaved: false,
    };

    onSubmitPost(newPost);
    setCaption("");
    onClose();
  };

  const sampleImages = [
    { label: "Sunset City", url: "/images/roam/post_sunset_city.jpg" },
    { label: "Switzerland", url: "/images/roam/post_switzerland.jpg" },
    { label: "One Piece", url: "/images/roam/post_onepiece.jpg" },
    { label: "Wild Tiger", url: "/images/roam/post_tiger.jpg" },
    { label: "Cozy Room", url: "/images/roam/post_cozy.jpg" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Create Post"
    >
      <div className="relative w-full max-w-lg bg-white rounded-[28px] overflow-hidden shadow-2xl border border-haven-border/60 p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-haven-border/40 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-haven-primary-light flex items-center justify-center text-haven-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-haven-text">Create Post</h3>
              <span className="text-[11px] text-haven-secondary">
                Local demonstration · ROAM social feed
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-haven-primary-subtle text-haven-secondary hover:text-haven-text flex items-center justify-center transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Preview */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-haven-border/60">
              <Image
                src={ROAM_CURRENT_USER.avatar}
                alt={ROAM_CURRENT_USER.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-haven-text block">
                {ROAM_CURRENT_USER.name}
              </span>
              <span className="text-[10px] text-haven-secondary font-medium">
                Posting to Public Roam Feed
              </span>
            </div>
          </div>

          {/* Caption textarea */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's inspiring you today in HAVEN? Add a caption and share the vibes..."
            className="w-full h-24 p-3 bg-haven-bg rounded-2xl border border-haven-border/60 text-xs text-haven-text placeholder:text-[#9E97B5] focus:outline-none focus:ring-2 focus:ring-haven-primary/30 resize-none font-normal"
            required
          />

          {/* Sample media selector */}
          <div>
            <label className="text-[11px] font-bold text-haven-text block mb-1.5">
              Choose Photo for Post
            </label>
            <div className="grid grid-cols-5 gap-2">
              {sampleImages.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setPreviewImage(img.url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    previewImage === img.url
                      ? "border-haven-primary ring-2 ring-haven-primary/30 scale-102"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category Pill Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-haven-text">Topic:</span>
            {["Anime", "Travel", "Photography", "Gaming"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-haven-primary text-white"
                    : "bg-haven-primary-subtle text-haven-secondary hover:text-haven-primary"
                }`}
              >
                #{cat}
              </button>
            ))}
          </div>

          {/* Actions & Submit */}
          <div className="pt-3 border-t border-haven-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-haven-secondary">
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle text-haven-primary transition-colors"
                title="Add Photo"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors"
                title="Add Video"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors"
                title="Add Location"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-haven-secondary hover:bg-haven-primary-subtle transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!caption.trim()}
                className="px-5 py-2 rounded-xl bg-haven-primary hover:bg-haven-primary-hover disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
