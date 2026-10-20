"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { BingeHeader } from "./BingeHeader";
import { BingeCentralCard } from "./BingeCentralCard";
import { BingeSidePreview } from "./BingeSidePreview";
import { BingeBottomControls } from "./BingeBottomControls";
import { BingeCommentsDrawer } from "./BingeCommentsDrawer";
import { BingeShareModal } from "./BingeShareModal";
import { MOCK_BINGE_VIDEOS } from "@/data/bingeMockData";
import { BingeFeedTab, BingeVideo } from "@/types/binge";

export function BingeView() {
  const [activeTab, setActiveTab] = useState<BingeFeedTab>("for_you");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Modals & Drawers
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter video list based on active tab and search query
  const filteredVideos = React.useMemo(() => {
    let list: BingeVideo[] = MOCK_BINGE_VIDEOS;

    if (activeTab === "following") {
      const followingList = list.filter((v: BingeVideo) => v.creator.isFollowing);
      // Fallback if none are following, keep 2 videos
      list = followingList.length > 0 ? followingList : list.slice(0, 2);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v: BingeVideo) =>
          v.caption.toLowerCase().includes(q) ||
          v.creator.name.toLowerCase().includes(q) ||
          v.creator.handle.toLowerCase().includes(q) ||
          v.hashtags.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return list.length > 0 ? list : MOCK_BINGE_VIDEOS;
  }, [activeTab, searchQuery]);

  // Ensure current index is within bounds
  const safeIndex =
    filteredVideos.length > 0 ? currentIndex % filteredVideos.length : 0;
  const currentVideo = filteredVideos[safeIndex] || MOCK_BINGE_VIDEOS[0];

  const prevIndex =
    (safeIndex - 1 + filteredVideos.length) % filteredVideos.length;
  const nextIndex = (safeIndex + 1) % filteredVideos.length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredVideos.length);
  }, [filteredVideos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length
    );
  }, [filteredVideos.length]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsMuted((m) => !m);
      } else if (e.key === "Escape") {
        setIsCommentsOpen(false);
        setIsShareOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch and drag gesture handling
  const touchStartX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    // Don't initiate drag if clicking buttons, sliders, links, or inputs
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("a") ||
      target.closest('[role="slider"]')
    ) {
      touchStartX.current = null;
      return;
    }
    touchStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.clientX - touchStartX.current;
    touchStartX.current = null;

    const threshold = 45;
    if (deltaX < -threshold) {
      handleNext();
    } else if (deltaX > threshold) {
      handlePrev();
    }
  };

  // Native Laptop Trackpad (two-finger swipe) Gesture Handling
  const containerRef = useRef<HTMLDivElement>(null);
  const accumX = useRef(0);
  const accumY = useRef(0);
  const isGestureActive = useRef(false);
  const lastNavTime = useRef(0);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNextRef = useRef(handleNext);
  handleNextRef.current = handleNext;
  const handlePrevRef = useRef(handlePrev);
  handlePrevRef.current = handlePrev;

  const isModalOpenRef = useRef(false);
  isModalOpenRef.current = isCommentsOpen || isShareOpen;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const HORIZONTAL_THRESHOLD = 45;
    const VERTICAL_THRESHOLD = 60;
    const MIN_COOLDOWN_MS = 400;
    const IDLE_RESET_MS = 180;

    const onWheel = (e: WheelEvent) => {
      // 1. If comments drawer or share modal is open, do not intercept or prevent default
      if (isModalOpenRef.current) return;

      // 2. Ignore if interacting with interactive controls (inputs, sliders, dialogs, etc.)
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'input, textarea, select, [contenteditable="true"], [role="dialog"], [role="slider"]'
        )
      ) {
        return;
      }

      // 3. Prevent unintended page scroll while navigating BINGE
      e.preventDefault();

      // Reset idle timer on every wheel event
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }

      // When gesture ends (no wheel events for IDLE_RESET_MS), reset lock and accumulation
      idleTimer.current = setTimeout(() => {
        isGestureActive.current = false;
        accumX.current = 0;
        accumY.current = 0;
      }, IDLE_RESET_MS);

      const now = Date.now();
      const inCooldown = now - lastNavTime.current < MIN_COOLDOWN_MS;

      // If an existing gesture/momentum is active or still in cooldown, consume event without triggering
      if (isGestureActive.current || inCooldown) {
        return;
      }

      // Accumulate deltas for fresh gesture
      accumX.current += e.deltaX;
      accumY.current += e.deltaY;

      const absX = Math.abs(accumX.current);
      const absY = Math.abs(accumY.current);

      // Horizontal gesture priority
      if (absX >= absY) {
        if (accumX.current >= HORIZONTAL_THRESHOLD) {
          // Two-finger swipe left -> Next video
          handleNextRef.current();
          isGestureActive.current = true;
          lastNavTime.current = now;
          accumX.current = 0;
          accumY.current = 0;
        } else if (accumX.current <= -HORIZONTAL_THRESHOLD) {
          // Two-finger swipe right -> Previous video
          handlePrevRef.current();
          isGestureActive.current = true;
          lastNavTime.current = now;
          accumX.current = 0;
          accumY.current = 0;
        }
      } else {
        // Vertical alternative gesture (swipe up for next, swipe down for prev)
        if (accumY.current >= VERTICAL_THRESHOLD) {
          handleNextRef.current();
          isGestureActive.current = true;
          lastNavTime.current = now;
          accumX.current = 0;
          accumY.current = 0;
        } else if (accumY.current <= -VERTICAL_THRESHOLD) {
          handlePrevRef.current();
          isGestureActive.current = true;
          lastNavTime.current = now;
          accumX.current = 0;
          accumY.current = 0;
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 h-full bg-[#120E24] rounded-[24px] lg:rounded-[32px] flex flex-col justify-between overflow-hidden relative select-none shadow-2xl border border-white/5"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Ambient Lighting & Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#7655FF]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-16 w-[360px] h-[360px] bg-[#FF3B7A]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-8 left-16 w-[320px] h-[320px] bg-[#DFFF68]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1E193C] text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 shadow-xl shadow-black/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#DFFF68] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header: Clapperboard Icon, BINGE wordmark, For You / Following, Search */}
      <BingeHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentIndex(0);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Reel Carousel Stage */}
      <div className="flex-1 flex items-center justify-center relative px-2 lg:px-6 overflow-hidden min-h-0 py-1">
        {/* Left Side Preview Card (Previous Video) */}
        {filteredVideos.length > 1 && (
          <div className="hidden md:flex items-center justify-end flex-shrink-0 z-10 mr-1 lg:mr-3 xl:mr-4">
            <BingeSidePreview
              video={filteredVideos[prevIndex]}
              direction="left"
              onClick={handlePrev}
            />
          </div>
        )}

        {/* Central Active Video Card */}
        <div className="z-20 flex-shrink-0">
          <BingeCentralCard
            video={currentVideo}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((p) => !p)}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((m) => !m)}
            onOpenComments={() => setIsCommentsOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
            onAudioTrackClick={() =>
              showToast(`♫ Playing audio track: ${currentVideo.audioTrack}`)
            }
            onCreatorProfileClick={() =>
              showToast(`Viewing ${currentVideo.creator.handle}'s profile`)
            }
          />
        </div>

        {/* Right Side Preview Card (Next Video) */}
        {filteredVideos.length > 1 && (
          <div className="hidden md:flex items-center justify-start flex-shrink-0 z-10 ml-1 lg:ml-3 xl:ml-4">
            <BingeSidePreview
              video={filteredVideos[nextIndex]}
              direction="right"
              onClick={handleNext}
            />
          </div>
        )}
      </div>

      {/* Bottom Controls: Segmented Dash Indicator, Swipe Hint, Volume Toggle */}
      <BingeBottomControls
        currentIndex={safeIndex}
        totalVideos={filteredVideos.length}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((m) => !m)}
      />

      {/* Slide-over Comments Drawer */}
      <BingeCommentsDrawer
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        video={currentVideo}
      />

      {/* Share Dialog Modal */}
      <BingeShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        video={currentVideo}
      />
    </div>
  );
}
