"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusSquare,
  Sparkles,
  Image as ImageIcon,
  Video,
  BarChart2,
  Users,
  Smile,
  Send,
  Camera,
} from "lucide-react";
import { ROAM_CURRENT_USER } from "@/data/roamMockData";

interface CreateViewProps {
  onPostPublished?: () => void;
}

export function CreateView({ onPostPublished }: CreateViewProps) {
  const [activeTab, setActiveTab] = useState<"post" | "story" | "poll">("post");
  const [caption, setCaption] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("Photography");
  const [selectedPhoto, setSelectedPhoto] = useState("/images/roam/post_sunset_city.jpg");
  const [publishedToast, setPublishedToast] = useState(false);

  const samplePhotos = [
    { label: "Sunset City", url: "/images/roam/post_sunset_city.jpg" },
    { label: "Switzerland", url: "/images/roam/post_switzerland.jpg" },
    { label: "Anime Luffy", url: "/images/roam/post_onepiece.jpg" },
    { label: "Wild Tiger", url: "/images/roam/post_tiger.jpg" },
    { label: "Cozy Room", url: "/images/roam/post_cozy.jpg" },
    { label: "Iron Man", url: "/images/roam/post_ironman.jpg" },
  ];

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    setPublishedToast(true);
    setCaption("");
    setTimeout(() => {
      setPublishedToast(false);
      onPostPublished?.();
    }, 2000);
  };

  return (
    <div className="flex-1 min-w-0 bg-transparent flex flex-col h-full overflow-y-auto no-scrollbar pr-1 select-none">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-haven-primary-light flex items-center justify-center text-haven-primary">
            <PlusSquare className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-haven-text tracking-tight leading-tight">
              Create Studio
            </h1>
            <p className="text-xs font-medium text-haven-secondary">
              Share posts, drop stories, or launch polls to the HAVEN community.
            </p>
          </div>
        </div>

        {/* Creation Modes */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-haven-border/60 shadow-xs">
          <button
            onClick={() => setActiveTab("post")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "post"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:text-haven-primary"
            }`}
          >
            Feed Post
          </button>
          <button
            onClick={() => setActiveTab("story")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "story"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:text-haven-primary"
            }`}
          >
            Story Moment
          </button>
          <button
            onClick={() => setActiveTab("poll")}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "poll"
                ? "bg-haven-primary text-white shadow-xs"
                : "text-haven-secondary hover:text-haven-primary"
            }`}
          >
            Community Poll
          </button>
        </div>
      </header>

      {/* Main Creation Card */}
      <div className="bg-white rounded-[28px] p-6 shadow-[0_4px_24px_rgba(118,85,255,0.06)] border border-haven-border/50 max-w-3xl">
        {publishedToast && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-between animate-in fade-in">
            <span>🎉 Post published successfully to HAVEN ROAM!</span>
            <span>Local demonstration</span>
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-5">
          {/* User Row */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-haven-border/60">
              <Image
                src={ROAM_CURRENT_USER.avatar}
                alt={ROAM_CURRENT_USER.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-bold text-haven-text block">
                {ROAM_CURRENT_USER.name}
              </span>
              <span className="text-[11px] text-haven-secondary font-medium">
                Public · Roam Discovery & Followers
              </span>
            </div>
          </div>

          {/* Caption textarea */}
          <div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's inspiring you today? Write a caption, add your thoughts, or describe your moment..."
              className="w-full h-28 p-4 bg-haven-bg rounded-2xl border border-haven-border/60 text-xs text-haven-text placeholder:text-[#9E97B5] focus:outline-none focus:ring-2 focus:ring-haven-primary/30 resize-none font-normal"
              required
            />
          </div>

          {/* Media Picker */}
          <div>
            <label className="text-xs font-bold text-haven-text block mb-2">
              Select Visual Asset
            </label>
            <div className="grid grid-cols-6 gap-2.5">
              {samplePhotos.map((photo) => (
                <button
                  key={photo.label}
                  type="button"
                  onClick={() => setSelectedPhoto(photo.url)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedPhoto === photo.url
                      ? "border-haven-primary ring-2 ring-haven-primary/30 scale-102 shadow-xs"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.label}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Topic Selector */}
          <div>
            <label className="text-xs font-bold text-haven-text block mb-2">
              Category Tag
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {["Photography", "Anime", "Travel", "Gaming", "Aesthetics", "Music"].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedTopic === topic
                      ? "bg-haven-primary text-white shadow-xs"
                      : "bg-haven-primary-subtle text-haven-secondary hover:text-haven-primary"
                  }`}
                >
                  #{topic}
                </button>
              ))}
            </div>
          </div>

          {/* Actions & Submit */}
          <div className="pt-4 border-t border-haven-border/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-haven-secondary">
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle text-haven-primary transition-colors"
                title="Photo"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors"
                title="Video"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-haven-primary-subtle transition-colors"
                title="Poll"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!caption.trim()}
              className="bg-haven-primary hover:bg-haven-primary-hover disabled:opacity-50 text-white text-xs font-bold px-6 py-2.5 rounded-2xl shadow-xs transition-all hover:scale-102"
            >
              Share to HAVEN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
