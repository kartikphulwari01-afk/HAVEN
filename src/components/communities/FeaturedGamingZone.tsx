"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Calendar,
  Heart,
  MessageSquare,
  Bookmark,
  Check,
} from "lucide-react";
import {
  FeaturedAnnouncementCard,
  FeaturedEventCard,
  FeaturedPollCard,
} from "@/types/communities";

interface FeaturedGamingZoneProps {
  announcement: FeaturedAnnouncementCard;
  event: FeaturedEventCard;
  poll: FeaturedPollCard;
  onSeeAllClick: () => void;
}

export function FeaturedGamingZone({
  announcement,
  event,
  poll,
  onSeeAllClick,
}: FeaturedGamingZoneProps) {
  // Local interaction states for Card 1
  const [likesCount, setLikesCount] = useState(announcement.likesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Local interaction states for Card 2
  const [isInterested, setIsInterested] = useState(false);

  // Local interaction states for Card 3 (Poll)
  const [pollOptions, setPollOptions] = useState(poll.options);
  const [totalVotes, setTotalVotes] = useState(poll.totalVotes);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const toggleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleVote = (optionId: string) => {
    if (selectedOptionId === optionId) return;

    const previousId = selectedOptionId;
    setSelectedOptionId(optionId);

    setPollOptions((prev) => {
      const updated = prev.map((opt) => {
        let votes = opt.votes;
        if (opt.id === optionId) votes += 1;
        if (previousId && opt.id === previousId) votes -= 1;
        return { ...opt, votes };
      });

      const newTotal = previousId ? totalVotes : totalVotes + 1;
      setTotalVotes(newTotal);

      return updated.map((opt) => ({
        ...opt,
        percentage: Math.round((opt.votes / newTotal) * 100),
      }));
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 select-none flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-[#21183B] tracking-tight">
          Featured in Gaming Zone
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onSeeAllClick}
            className="text-[11.5px] font-semibold text-[#7655FF] hover:underline cursor-pointer"
          >
            See all
          </button>
          <button
            title="Options"
            className="text-[#8C84A3] hover:text-[#7655FF] transition-colors p-0.5"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Card 1: Weekend Tournament 🎮 */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Image Box with Announcement Badge */}
            <div className="relative w-full h-24 rounded-2xl overflow-hidden mb-2.5 bg-black/20">
              <Image
                src={announcement.image}
                alt={announcement.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#7655FF] text-white text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                Announcement
              </span>
            </div>

            {/* Title & Description */}
            <h4 className="text-[13.5px] font-bold text-[#21183B] tracking-tight leading-snug">
              {announcement.title}
            </h4>
            <p className="text-[11.5px] text-[#6C6382] leading-snug mt-1 line-clamp-2">
              {announcement.description}
            </p>
          </div>

          {/* Footer Metadata & Actions */}
          <div className="flex items-center justify-between pt-3 mt-1 text-[#8C84A3] border-t border-[#F2EFFD]/80">
            {/* Timestamp */}
            <div className="flex items-center gap-1 text-[10.5px]">
              <Calendar className="w-3.5 h-3.5 text-[#8C84A3]" />
              <span>{announcement.timeAgo}</span>
            </div>

            {/* Interaction Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 text-[11px] transition-colors ${
                  isLiked
                    ? "text-[#FF729E] font-semibold"
                    : "hover:text-[#FF729E]"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isLiked ? "fill-[#FF729E] text-[#FF729E]" : ""
                  }`}
                />
                <span>{likesCount}</span>
              </button>

              <div className="flex items-center gap-1 text-[11px]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{announcement.commentsCount}</span>
              </div>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-colors ${
                  isSaved
                    ? "text-[#7655FF]"
                    : "hover:text-[#7655FF]"
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isSaved ? "fill-[#7655FF] text-[#7655FF]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Game Night: Valo Squad */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Image Box with Event Badge */}
            <div className="relative w-full h-24 rounded-2xl overflow-hidden mb-2.5 bg-black/20">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#06B6D4] text-white text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                Event
              </span>
            </div>

            {/* Title & Schedule */}
            <h4 className="text-[13.5px] font-bold text-[#21183B] tracking-tight leading-snug">
              {event.title}
            </h4>
            <p className="text-[11.5px] text-[#6C6382] mt-1">
              {event.timeSlot}
            </p>
          </div>

          {/* Attendees Cluster + Interested Button */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#F2EFFD]/80">
            {/* Cluster */}
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full border-2 border-white overflow-hidden relative shadow-xs">
                  <Image
                    src="/images/roam/shreya.jpg"
                    alt="Attendee"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-white overflow-hidden -ml-1.5 relative shadow-xs">
                  <Image
                    src="/images/roam/karan.jpg"
                    alt="Attendee"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-white overflow-hidden -ml-1.5 relative shadow-xs">
                  <Image
                    src="/images/roam/aaryan.jpg"
                    alt="Attendee"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-[10.5px] font-medium text-[#8C84A3] ml-1.5">
                {event.attendeesText}
              </span>
            </div>

            {/* Interested Button */}
            <button
              onClick={() => setIsInterested(!isInterested)}
              className={`text-xs font-semibold px-3.5 py-1 rounded-full transition-all ${
                isInterested
                  ? "bg-[#7655FF] text-white shadow-xs"
                  : "bg-[#EDE9FE] text-[#7655FF] hover:bg-[#DDD6FE]"
              }`}
            >
              {isInterested ? "Interested ✓" : "Interested"}
            </button>
          </div>
        </div>

        {/* Card 3: Which game next? (Interactive Poll) */}
        <div className="bg-white rounded-[20px] p-3.5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            {/* Image Box with Poll Badge */}
            <div className="relative w-full h-24 rounded-2xl overflow-hidden mb-2 bg-black/20">
              <Image
                src={poll.image}
                alt={poll.title}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#A855F7] text-white text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                Poll
              </span>
            </div>

            {/* Title */}
            <h4 className="text-[13.5px] font-bold text-[#21183B] tracking-tight leading-snug mb-1.5">
              {poll.title}
            </h4>

            {/* Poll Options */}
            <div className="space-y-1">
              {pollOptions.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleVote(opt.id)}
                    className="w-full relative overflow-hidden rounded-lg bg-[#F7F5FF] hover:bg-[#EDE9FE]/70 text-left px-2.5 py-1 transition-all group border border-transparent hover:border-[#7655FF]/20"
                  >
                    {/* Background Progress Bar Fill */}
                    <div
                      className={`absolute top-0 left-0 bottom-0 transition-all duration-500 ${
                        isSelected ? "bg-[#DDD6FE]" : "bg-[#EDE9FE]"
                      }`}
                      style={{ width: `${opt.percentage}%` }}
                    />

                    {/* Text and Percentage */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] leading-tight">
                      <span
                        className={`truncate font-medium ${
                          isSelected
                            ? "text-[#7655FF] font-bold"
                            : "text-[#21183B]"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-[10.5px] font-bold text-[#6C6382] ml-2">
                        {opt.percentage}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 mt-1 border-t border-[#F2EFFD]/80">
            <span className="text-[10.5px] text-[#8C84A3]">
              {totalVotes} votes • {poll.daysLeft} days left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
