"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X, Sparkles, Users, ArrowRight } from "lucide-react";
import { CommunitiesHeader } from "./CommunitiesHeader";
import { GamingZoneHero } from "./GamingZoneHero";
import { CommunityOverviewInfo } from "./CommunityOverviewInfo";
import { FeaturedGamingZone } from "./FeaturedGamingZone";
import { UpcomingEventsSection } from "./UpcomingEventsSection";
import { OpenCommunityDrawer } from "./OpenCommunityDrawer";
import {
  InviteModal,
  ShareModal,
  NotificationSettingsModal,
  ReportModal,
  CreateCommunityModal,
} from "./CommunityModals";
import { MOCK_GAMING_ZONE } from "@/data/communitiesMockData";
import { CommunityTab, CommunityData } from "@/types/communities";

export function CommunitiesView() {
  const [activeTab, setActiveTab] = useState<CommunityTab>("spaces");
  const [searchQuery, setSearchQuery] = useState("");
  const [gamingZoneData, setGamingZoneData] = useState<CommunityData>(MOCK_GAMING_ZONE);

  // Modals visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Invitations local state
  const [invitations, setInvitations] = useState([
    {
      id: "inv-1",
      name: "Valorant Radiant League",
      inviter: "Karan Malhotra",
      avatar: "/images/roam/trend_gaming.jpg",
      members: "3.4K members",
      tag: "Competitive",
    },
    {
      id: "inv-2",
      name: "Late Night Chillwave",
      inviter: "Alex Chen",
      avatar: "/images/neon_room.jpg",
      members: "8.9K members",
      tag: "Music & Beats",
    },
  ]);

  // Explore spaces mock list
  const exploreCommunities = [
    {
      id: "exp-1",
      name: "Anime & Manga Realm",
      description: "Seasonal episode reviews, cosplay showcases, and discussion threads.",
      members: "24.8K members",
      image: "/images/roam/trend_anime.jpg",
      tag: "Anime",
    },
    {
      id: "exp-2",
      name: "Global Backpackers",
      description: "Budget travel hacks, solo routes, scenic spots, and hostel tips.",
      members: "18.3K members",
      image: "/images/roam/post_switzerland.jpg",
      tag: "Travel",
    },
    {
      id: "exp-3",
      name: "Visual Aesthetics & Photo",
      description: "Street photography, moody presets, lens discussions, and challenges.",
      members: "31.5K members",
      image: "/images/roam/post_sunset_city.jpg",
      tag: "Photography",
    },
  ];

  const handleCreateCommunity = (name: string, category: string) => {
    alert(`[Demonstration Action] Community "${name}" created in ${category}!`);
  };

  return (
    <div className="flex-1 min-w-0 bg-transparent flex flex-col h-full overflow-y-auto no-scrollbar gap-3.5 pr-1 select-none">
      {/* 1. Header (Title, Search, Action buttons, Sub-tabs) */}
      <CommunitiesHeader
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onCreateCommunityClick={() => setIsCreateOpen(true)}
        onNotificationClick={() => setIsNotificationsOpen(true)}
        onProfileClick={() =>
          alert("[Demonstration Action] Viewing profile of @kartikphulwari")
        }
        onFilterClick={() =>
          alert("[Demonstration Action] Community search filters toggled")
        }
      />

      {/* 2. TAB 1: Your Spaces (Approved Option A: Focused Community Overview) */}
      {activeTab === "spaces" && (
        <>
          {/* Hero Banner with Avatar, Verified Badge, Stats, Avatars Cluster, and Open Community */}
          <GamingZoneHero
            data={gamingZoneData}
            onOpenCommunity={() => setIsDrawerOpen(true)}
          />

          {/* 3-Column Community Overview Row (About + Quick Actions + Community Activity) */}
          <CommunityOverviewInfo
            data={gamingZoneData}
            onInviteClick={() => setIsInviteOpen(true)}
            onShareClick={() => setIsShareOpen(true)}
            onNotificationsClick={() => setIsNotificationsOpen(true)}
            onReportClick={() => setIsReportOpen(true)}
            onTagClick={(tag) =>
              alert(`[Demonstration Action] Filtered Gaming Zone by #${tag}`)
            }
          />

          {/* Featured in Gaming Zone (Weekend Tournament, Valo Squad, Which game next? poll) */}
          <FeaturedGamingZone
            announcement={gamingZoneData.featuredAnnouncement}
            event={gamingZoneData.featuredEvent}
            poll={gamingZoneData.featuredPoll}
            onSeeAllClick={() =>
              alert("[Demonstration Action] Viewing all featured announcements & tournaments")
            }
          />

          {/* Upcoming Events (Community Game Night, Content Creator Hangout, Squad Tournament Finals) */}
          <UpcomingEventsSection
            events={gamingZoneData.upcomingEvents}
            onSeeAllClick={() =>
              alert("[Demonstration Action] Viewing full community events calendar")
            }
          />
        </>
      )}

      {/* 3. TAB 2: Explore */}
      {activeTab === "explore" && (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-[24px] p-5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.04)]">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7655FF] bg-[#EDE9FE] px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Discover Trending Guilds
            </span>
            <h2 className="text-xl font-extrabold text-[#21183B] mb-1">
              Explore Popular Spaces across HAVEN
            </h2>
            <p className="text-xs text-[#6C6382]">
              Find squads with common gaming goals, creative hobbies, and live stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exploreCommunities.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[22px] p-4 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden relative border border-[#ECE7FC] flex-shrink-0">
                      <Image src={c.image} alt={c.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#21183B] truncate">
                        {c.name}
                      </h3>
                      <span className="text-[11px] text-[#8C84A3] block truncate">
                        {c.members}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#6C6382] leading-snug mb-3">
                    {c.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#ECE7FC] flex items-center justify-between">
                  <span className="text-[10.5px] font-semibold text-[#7655FF] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full">
                    #{c.tag}
                  </span>
                  <button
                    onClick={() =>
                      alert(`[Demonstration Action] Joined ${c.name}!`)
                    }
                    className="bg-[#7655FF] text-white hover:bg-[#6845ee] text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                  >
                    Join Space
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 3: Invitations */}
      {activeTab === "invitations" && (
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-[24px] p-5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.04)] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#21183B]">
                Pending Community Invitations ({invitations.length})
              </h2>
              <p className="text-xs text-[#6C6382]">
                Spaces your friends and squads have invited you to join.
              </p>
            </div>
            <span className="bg-[#FF729E] text-white text-xs font-bold px-3 py-1 rounded-full">
              {invitations.length} new
            </span>
          </div>

          <div className="space-y-3">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-[22px] p-4 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden relative border border-[#ECE7FC] flex-shrink-0">
                    <Image src={inv.avatar} alt={inv.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#21183B]">
                      {inv.name}
                    </h3>
                    <p className="text-xs text-[#6C6382] mt-0.5">
                      Invited by <span className="font-semibold text-[#7655FF]">{inv.inviter}</span> • {inv.members}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert(`[Demonstration Action] Joined ${inv.name}!`);
                      setInvitations((prev) => prev.filter((i) => i.id !== inv.id));
                    }}
                    className="bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      setInvitations((prev) => prev.filter((i) => i.id !== inv.id))
                    }
                    className="bg-[#F7F5FF] hover:bg-[#EDE9FE] text-[#6C6382] text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}

            {invitations.length === 0 && (
              <div className="bg-white rounded-[22px] p-8 text-center border border-[#ECE7FC]">
                <p className="text-xs font-semibold text-[#8C84A3]">
                  All caught up! No pending community invitations.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- Modals and Demonstration Drawers --- */}
      <OpenCommunityDrawer
        data={gamingZoneData}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <NotificationSettingsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <CreateCommunityModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreateCommunity}
      />
    </div>
  );
}
