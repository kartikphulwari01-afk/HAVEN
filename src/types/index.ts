export type UserStatus = "online" | "offline" | "typing";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
  bio?: string;
  isStarred?: boolean;
}

export interface StoryItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  isOwnStory?: boolean;
  ringGradient: string;
  hasUnseen?: boolean;
}

export type ConversationFilter = "all" | "unread" | "groups" | "close_friends";

export interface Conversation {
  id: string;
  name: string;
  isGroup?: boolean;
  isStarred?: boolean;
  avatar: string;
  lastMessage: string;
  lastMessageType?: "text" | "voice" | "photo" | "sticker";
  timestamp: string;
  unreadCount?: number;
  isTyping?: boolean;
  isOnline?: boolean;
  category: ConversationFilter[];
  statusBio?: string;
  aboutText?: string;
}

export type MessageType = "text" | "image" | "voice" | "sticker";

export interface Message {
  id: string;
  senderId: "me" | "other";
  senderName: string;
  senderAvatar?: string;
  content?: string;
  type: MessageType;
  mediaUrl?: string;
  voiceDuration?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  reaction?: string;
  stickerLabel?: string;
}

export interface MediaThumbnail {
  id: string;
  url: string;
  alt: string;
  countOverlay?: number;
}

export interface ProfileDetails {
  name: string;
  statusText: string;
  bio: string;
  about: string;
  coverImage: string;
  avatar: string;
  isStarred: boolean;
  mediaCount: number;
  mediaItems: MediaThumbnail[];
  sharedLinksCount: number;
  starredCount: number;
  disappearingStatus: string;
  chatTheme: string;
  filesCount: number;
}
