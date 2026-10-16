"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { UpcomingEventCardItem } from "@/types/communities";

interface UpcomingEventsSectionProps {
  events: UpcomingEventCardItem[];
  onSeeAllClick: () => void;
}

export function UpcomingEventsSection({
  events,
  onSeeAllClick,
}: UpcomingEventsSectionProps) {
  const [eventStates, setEventStates] = useState<Record<string, boolean>>({});

  const toggleEvent = (id: string) => {
    setEventStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-2 select-none flex-shrink-0 pb-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-[#21183B] tracking-tight">
          Upcoming events
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

      {/* 3 Horizontal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {events.map((ev) => {
          const isActive = !!eventStates[ev.id];

          // Determine label and style based on actionType
          let label = "Join";
          let activeLabel = "Joined ✓";
          let baseBtnClass =
            "bg-[#7655FF] text-white hover:bg-[#6845ee] shadow-xs";
          let activeBtnClass =
            "bg-[#EDE9FE] text-[#7655FF]";

          if (ev.actionType === "interested") {
            label = "Interested";
            activeLabel = "Interested ✓";
            baseBtnClass =
              "bg-[#EDE9FE] text-[#7655FF] hover:bg-[#DDD6FE]";
            activeBtnClass =
              "bg-[#7655FF] text-white shadow-xs";
          } else if (ev.actionType === "remind") {
            label = "Remind Me";
            activeLabel = "Reminded ✓";
            baseBtnClass =
              "bg-[#EDE9FE] text-[#7655FF] hover:bg-[#DDD6FE]";
            activeBtnClass =
              "bg-[#7655FF] text-white shadow-xs";
          }

          return (
            <div
              key={ev.id}
              className="bg-white rounded-[20px] p-2.5 border border-[#ECE7FC] shadow-[0_4px_20px_rgba(118,85,255,0.03)] flex items-center justify-between gap-3 hover:shadow-md transition-shadow"
            >
              {/* Left Thumbnail + Details */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-14 h-12 rounded-xl overflow-hidden relative flex-shrink-0 bg-black/20 shadow-xs">
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-[12.5px] font-bold text-[#21183B] truncate leading-tight">
                    {ev.title}
                  </h4>
                  <p className="text-[10.5px] text-[#8C84A3] truncate mt-0.5">
                    {ev.scheduleTime}
                  </p>
                  <span className="text-[10px] text-[#6C6382] font-medium block truncate">
                    {ev.attendeesText}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleEvent(ev.id)}
                className={`text-[11.5px] font-semibold px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all ${
                  isActive ? activeBtnClass : baseBtnClass
                }`}
              >
                {isActive ? activeLabel : label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
