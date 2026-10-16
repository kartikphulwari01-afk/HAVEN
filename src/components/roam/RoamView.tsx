"use client";

import React, { useState } from "react";
import { RoamNavRail } from "../navigation/RoamNavRail";
import { RoamWorkspace } from "./RoamWorkspace";
import { RoamSidebar } from "./RoamSidebar";
import { CreatePostModal } from "../modals/CreatePostModal";
import { PostDetailModal } from "../modals/PostDetailModal";
import { StoryViewerModal } from "../modals/StoryViewerModal";
import {
  ROAM_POSTS,
  ROAM_RECOMMENDED_USERS,
  ROAM_STORIES,
  ROAM_TRENDING_TOPICS,
} from "@/data/roamMockData";
import { RoamPost, RoamStory, RoamTrendingTopic } from "@/types/roam";
import { StoryItem } from "@/types";

import { HavenGlobalSidebar } from "../navigation/HavenGlobalSidebar";

interface RoamViewProps {
  onNavigateToChats?: () => void;
  hideSidebar?: boolean;
}

export function RoamView({ onNavigateToChats, hideSidebar = false }: RoamViewProps) {
  const [posts, setPosts] = useState<RoamPost[]>(ROAM_POSTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activePostDetail, setActivePostDetail] = useState<RoamPost | null>(null);
  const [activeStory, setActiveStory] = useState<RoamStory | null>(null);

  const handleCreatePost = (newPost: RoamPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleSharePost = (post: RoamPost) => {
    alert(`[Demonstration Action] Shared post by ${post.authorName} to your circle!`);
  };

  // Convert RoamStory to StoryItem for the StoryViewerModal
  const convertedStory: StoryItem | null = activeStory
    ? {
        id: activeStory.id,
        userId: activeStory.userName,
        userName: activeStory.userName,
        userAvatar: activeStory.userAvatar,
        ringGradient: activeStory.ringGradient,
        isOwnStory: activeStory.isOwnStory,
      }
    : null;

  return (
    <div className="w-full h-full flex gap-3 overflow-hidden select-none">
      {/* 1. Left Navigation Rail (Only rendered if hideSidebar is false) */}
      {!hideSidebar && (
        <HavenGlobalSidebar
          activeSection="roam"
          onNavigate={(sec) => {
            if (sec === "chats") onNavigateToChats?.();
          }}
          onCameraClick={() => alert("[Demonstration Action] Camera quick snap preview")}
          onNotificationClick={() => alert("[Demonstration Action] Notifications opened")}
          onSettingsClick={() =>
            alert("[Demonstration Action] User settings & profile preferences")
          }
          onProfileClick={() =>
            alert("[Demonstration Action] Viewing profile of @kartikphulwari")
          }
        />
      )}

      {/* 2. Main Discovery Workspace (~63-64%) */}
      <RoamWorkspace
        posts={posts}
        onStoryClick={(story) => setActiveStory(story)}
        onPostClick={(post) => setActivePostDetail(post)}
        onShareClick={handleSharePost}
        onNotificationClick={() =>
          alert("[Demonstration Action] 4 new notifications in HAVEN ROAM")
        }
        onProfileClick={() =>
          alert("[Demonstration Action] Viewing profile of @kartikphulwari")
        }
      />

      {/* 3. Right Discovery Sidebar (~21-22%) */}
      <RoamSidebar
        recommendedUsers={ROAM_RECOMMENDED_USERS}
        trendingTopics={ROAM_TRENDING_TOPICS}
        onCreatePostClick={() => setIsCreateModalOpen(true)}
        onTopicClick={(topic: RoamTrendingTopic) =>
          alert(`[Demonstration Action] Exploring ${topic.tag}`)
        }
      />

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitPost={handleCreatePost}
      />

      {/* Post Detail & Comments Modal */}
      <PostDetailModal
        post={activePostDetail}
        onClose={() => setActivePostDetail(null)}
      />

      {/* Story Viewer Modal */}
      <StoryViewerModal
        story={convertedStory}
        onClose={() => setActiveStory(null)}
      />
    </div>
  );
}
