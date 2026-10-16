export type CommunityTab = "spaces" | "explore" | "invitations";

export interface CommunityTag {
  label: string;
  colorClass: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
}

export interface CommunityActivityMetrics {
  members: string;
  onlineNow: number;
  activeGroups: number;
  upcomingEvents: number;
}

export interface FeaturedAnnouncementCard {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  likesCount: number;
  commentsCount: number;
  image: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface FeaturedEventCard {
  id: string;
  title: string;
  timeSlot: string;
  attendeesText: string;
  image: string;
  isInterested?: boolean;
}

export interface PollOptionItem {
  id: string;
  label: string;
  percentage: number;
  votes: number;
}

export interface FeaturedPollCard {
  id: string;
  title: string;
  totalVotes: number;
  daysLeft: number;
  image: string;
  options: PollOptionItem[];
  userVotedId?: string;
}

export interface UpcomingEventCardItem {
  id: string;
  title: string;
  scheduleTime: string;
  attendeesText: string;
  actionType: "join" | "interested" | "remind";
  actionState?: boolean;
  image: string;
}

export interface CommunityData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  avatarImage: string;
  isVerified: boolean;
  membersCountText: string;
  onlineNowText: string;
  avatarCluster: string[];
  extraMembersCountText: string;
  tags: CommunityTag[];
  metrics: CommunityActivityMetrics;
  featuredAnnouncement: FeaturedAnnouncementCard;
  featuredEvent: FeaturedEventCard;
  featuredPoll: FeaturedPollCard;
  upcomingEvents: UpcomingEventCardItem[];
}
