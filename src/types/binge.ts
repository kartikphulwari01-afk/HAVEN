export interface BingeCreator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isFollowing?: boolean;
}

export interface BingeComment {
  id: string;
  userName: string;
  userHandle: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface BingeVideo {
  id: string;
  creator: BingeCreator;
  caption: string;
  hashtags: string[];
  audioTrack: string;
  posterUrl: string;
  videoUrl?: string;
  likesCount: number;
  commentsCount: number;
  savesCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: BingeComment[];
}

export type BingeFeedTab = "for_you" | "following";
