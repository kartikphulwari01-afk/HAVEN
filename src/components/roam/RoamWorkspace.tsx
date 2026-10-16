"use client";

import React, { useState } from "react";
import { RoamHeader } from "./RoamHeader";
import { RoamCategoryTabs } from "./RoamCategoryTabs";
import { RoamStoriesRow } from "./RoamStoriesRow";
import { RoamPostCard } from "./RoamPostCard";
import { RoamPost, RoamStory } from "@/types/roam";
import {
  ROAM_CATEGORIES,
  ROAM_POSTS,
  ROAM_STORIES,
} from "@/data/roamMockData";

interface RoamWorkspaceProps {
  onStoryClick: (story: RoamStory) => void;
  onPostClick: (post: RoamPost) => void;
  onShareClick: (post: RoamPost) => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  posts: RoamPost[];
}

export function RoamWorkspace({
  onStoryClick,
  onPostClick,
  onShareClick,
  onNotificationClick,
  onProfileClick,
  posts,
}: RoamWorkspaceProps) {
  const [activeCategory, setActiveCategory] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts by category and search
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hashtags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "For You"
        ? true
        : activeCategory === "Videos"
        ? p.mediaType === "video"
        : p.hashtags.some((tag) =>
            tag.toLowerCase().includes(activeCategory.toLowerCase())
          );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 min-w-0 bg-transparent flex flex-col h-full overflow-y-auto no-scrollbar pr-1 select-none">
      {/* 1. Header & Search */}
      <RoamHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNotificationClick={onNotificationClick}
        onProfileClick={onProfileClick}
      />

      {/* 2. Category Navigation Tabs */}
      <RoamCategoryTabs
        categories={ROAM_CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 3. Circular Stories / Creators Row */}
      <RoamStoriesRow
        stories={ROAM_STORIES}
        onStoryClick={onStoryClick}
      />

      {/* 4. Three-Column Social Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pb-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full py-16 text-center text-haven-secondary text-xs">
            No posts found for this category or search term.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <RoamPostCard
              key={post.id}
              post={post}
              onPostClick={onPostClick}
              onShareClick={onShareClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
