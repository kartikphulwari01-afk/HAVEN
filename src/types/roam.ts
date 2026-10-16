export interface RoamStory {
  id: string;
  userName: string;
  userAvatar: string;
  ringGradient: string;
  isOwnStory?: boolean;
  hasUnseen?: boolean;
  badge?: "yellow-square" | "red-circle" | "plus";
}

export type RoamMediaType = "image" | "carousel" | "video";

export interface RoamPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  isVerified?: boolean;
  timeAgo: string;
  location?: string;
  mediaType: RoamMediaType;
  mediaUrl: string;
  mediaUrls?: string[];
  carouselCount?: string; // e.g. "1/4", "1/3", "1/5"
  videoDuration?: string; // e.g. "0:28", "0:45"
  caption: string;
  hashtags: string[];
  likesCount: string;
  commentsCount: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface RoamRecommendedUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified?: boolean;
  relationReason: string;
  isFollowing?: boolean;
}

export interface RoamTrendingTopic {
  id: string;
  rank: number;
  tag: string;
  postsCount: string;
  thumbnail: string;
}
