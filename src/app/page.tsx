"use client";

import React, { useState } from "react";
import {
  HavenGlobalSidebar,
  HavenNavSection,
} from "@/components/navigation/HavenGlobalSidebar";
import { ConversationSidebar } from "@/components/sidebar/ConversationSidebar";
import { ChatWorkspace } from "@/components/chat/ChatWorkspace";
import { ProfilePanel } from "@/components/profile/ProfilePanel";
import { StoryViewerModal } from "@/components/modals/StoryViewerModal";
import { CallModal } from "@/components/modals/CallModal";
import { RoamView } from "@/components/roam/RoamView";
import { CommunitiesView } from "@/components/communities/CommunitiesView";
import { BingeView } from "@/components/binge/BingeView";
import { CreateView } from "@/components/create/CreateView";
import { HangoutView } from "@/components/hangout/HangoutView";
import {
  MOCK_CONVERSATIONS,
  MOCK_STORIES,
  MOCK_MESSAGES_RIYA,
  MOCK_PROFILE_RIYA,
} from "@/data/mockData";
import { Conversation, Message, ProfileDetails, StoryItem } from "@/types";

export default function HavenDesktopChat() {
  const [activeNavSection, setActiveNavSection] = useState<HavenNavSection>("chats");
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>("riya");
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  // Modals state
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);
  const [activeCall, setActiveCall] = useState<{
    isOpen: boolean;
    type: "audio" | "video";
  }>({
    isOpen: false,
    type: "audio",
  });

  // Messages map per conversation
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>({
    riya: MOCK_MESSAGES_RIYA,
    "inner-circle": [
      {
        id: "ic-1",
        senderId: "other",
        senderName: "Karan",
        content: "Guys, check out this resort near the lake! 🏞️",
        type: "text",
        timestamp: "11:45 AM",
        status: "read",
      },
      {
        id: "ic-2",
        senderId: "me",
        senderName: "Arjun",
        content: "Looks epic! How many people are confirmed?",
        type: "text",
        timestamp: "12:10 PM",
        status: "read",
      },
      {
        id: "ic-3",
        senderId: "other",
        senderName: "Karan",
        content: "Karan: Weekend plan final? 🥳",
        type: "text",
        timestamp: "12:12 PM",
        status: "read",
      },
    ],
    alex: [
      {
        id: "al-1",
        senderId: "me",
        senderName: "Arjun",
        content: "Yo Alex, got the latest audio track ready?",
        type: "text",
        timestamp: "1:40 PM",
        status: "read",
      },
      {
        id: "al-2",
        senderId: "other",
        senderName: "Alex",
        type: "voice",
        voiceDuration: "0:24",
        timestamp: "2:04 PM",
        status: "read",
      },
    ],
  });

  // Current active conversation object
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  // Dynamic profile details based on active conversation
  const currentProfile: ProfileDetails =
    activeConversation.id === "riya"
      ? MOCK_PROFILE_RIYA
      : {
          name: activeConversation.name,
          statusText: activeConversation.isOnline ? "Online" : "Offline",
          bio: activeConversation.statusBio || "HAVEN community member ✨",
          about:
            activeConversation.aboutText ||
            "Chatting and sharing good vibes on HAVEN.",
          coverImage: "/images/riya_cover.jpg",
          avatar: activeConversation.avatar,
          isStarred: !!activeConversation.isStarred,
          mediaCount: 42,
          mediaItems: MOCK_PROFILE_RIYA.mediaItems,
          sharedLinksCount: 5,
          starredCount: 2,
          disappearingStatus: "Off",
          chatTheme: "Default",
          filesCount: 14,
        };

  // Current active messages
  const currentMessages = messagesMap[activeConversation.id] || [
    {
      id: "init-1",
      senderId: "other",
      senderName: activeConversation.name,
      content: `Hey Arjun! Welcome to the chat with ${activeConversation.name}.`,
      type: "text",
      timestamp: "12:00 PM",
      status: "read",
    },
  ];

  // Local send handler with demonstrative feedback
  const handleSendMessage = (text: string, type: "text" | "sticker" = "text") => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "me",
      senderName: "Arjun",
      content: type === "text" ? text : undefined,
      type: type,
      stickerLabel: type === "sticker" ? text : undefined,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "read",
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? {
              ...c,
              lastMessage: type === "text" ? `You: ${text}` : "You: Sticker",
              lastMessageType: type,
              timestamp: "Just now",
              isTyping: false,
            }
          : c
      )
    );
  };

  return (
    <main className="w-screen h-screen bg-haven-canvas flex items-center justify-center p-2.5 lg:p-3 select-none overflow-hidden">
      {/* Desktop Frame Container spanning viewport with balanced insets */}
      <div className="w-full h-full flex gap-2.5 lg:gap-3 overflow-hidden">
        {/* Permanent Shared Global Sidebar (Matches approved ROAM styling) */}
        <HavenGlobalSidebar
          activeSection={activeNavSection}
          onNavigate={(sec) => setActiveNavSection(sec)}
          onCameraClick={() =>
            alert("[Demonstration Action] Camera quick snap preview")
          }
          onNotificationClick={() =>
            alert("[Demonstration Action] 3 unread notifications in HAVEN")
          }
          onSettingsClick={() =>
            alert("[Demonstration Action] User settings & profile preferences")
          }
          onProfileClick={() =>
            alert("[Demonstration Action] Viewing profile of @kartikphulwari")
          }
        />

        {/* Section 1: Chats Interface */}
        {activeNavSection === "chats" && (
          <>
            {/* Conversation and Social Sidebar */}
            <ConversationSidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => setActiveConversationId(id)}
              stories={MOCK_STORIES}
              onStoryClick={(story) => setSelectedStory(story)}
              onOpenNotifications={() => {
                alert("[Demonstration Action] Notifications drawer opened");
              }}
            />

            {/* Central Conversation Workspace */}
            <ChatWorkspace
              conversation={activeConversation}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
              onAudioCallClick={() =>
                setActiveCall({ isOpen: true, type: "audio" })
              }
              onVideoCallClick={() =>
                setActiveCall({ isOpen: true, type: "video" })
              }
              onToggleProfile={() => setIsProfileOpen(!isProfileOpen)}
            />

            {/* Right-side Contextual Profile Panel */}
            {isProfileOpen && (
              <ProfilePanel
                profile={currentProfile}
                onClose={() => setIsProfileOpen(false)}
                onAudioCallClick={() =>
                  setActiveCall({ isOpen: true, type: "audio" })
                }
                onVideoCallClick={() =>
                  setActiveCall({ isOpen: true, type: "video" })
                }
              />
            )}
          </>
        )}

        {/* Section 2: ROAM Social Discovery */}
        {activeNavSection === "roam" && (
          <RoamView hideSidebar={true} />
        )}

        {/* Section 3: Communities */}
        {activeNavSection === "communities" && (
          <CommunitiesView />
        )}

        {/* Section 4: Binge */}
        {activeNavSection === "binge" && (
          <BingeView />
        )}

        {/* Section 5: Create */}
        {activeNavSection === "create" && (
          <CreateView onPostPublished={() => setActiveNavSection("roam")} />
        )}

        {/* Section 6: Hangout */}
        {activeNavSection === "hangout" && (
          <HangoutView />
        )}
      </div>

      {/* Story Viewer Modal */}
      <StoryViewerModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onNextStory={() => {
          if (!selectedStory) return;
          const idx = MOCK_STORIES.findIndex((s) => s.id === selectedStory.id);
          if (idx < MOCK_STORIES.length - 1) {
            setSelectedStory(MOCK_STORIES[idx + 1]);
          } else {
            setSelectedStory(null);
          }
        }}
        onPrevStory={() => {
          if (!selectedStory) return;
          const idx = MOCK_STORIES.findIndex((s) => s.id === selectedStory.id);
          if (idx > 0) {
            setSelectedStory(MOCK_STORIES[idx - 1]);
          }
        }}
      />

      {/* Local Call Demonstration Modal */}
      <CallModal
        isOpen={activeCall.isOpen}
        type={activeCall.type}
        conversation={activeConversation}
        onClose={() => setActiveCall({ isOpen: false, type: "audio" })}
      />
    </main>
  );
}
