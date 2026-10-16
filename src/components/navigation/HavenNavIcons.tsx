"use client";

import React from "react";

interface IconBaseProps {
  size?: number;
  isActive?: boolean;
  className?: string;
}

/**
 * 1. Chats Icon
 * Dimensional layered chat bubbles with three indicator dots and soft depth.
 */
export function HavenChatIcon({
  size = 24,
  isActive = false,
  className = "",
}: IconBaseProps) {
  const primaryFill = isActive ? "#FFFFFF" : "#21183B";
  const secondaryFill = isActive ? "rgba(255, 255, 255, 0.25)" : "#7655FF";
  const dotFill = isActive ? "#DFFF68" : "#7655FF"; // Acid-lime dots when active!

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Soft gradient for active state */}
        <linearGradient id="chat-active-grad" x1="4" y1="4" x2="24" y2="24">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EDE8FD" />
        </linearGradient>
        <linearGradient id="chat-inactive-grad" x1="4" y1="4" x2="24" y2="24">
          <stop offset="0%" stopColor="#21183B" />
          <stop offset="100%" stopColor="#35265D" />
        </linearGradient>
      </defs>

      {/* Background Secondary Mini Bubble for Depth */}
      <path
        d="M 18 6 C 22.4 6 25 8.8 25 12.5 C 25 15.2 23.5 17.5 21 18.5 L 21.8 21.5 L 18.5 20.2 C 17.7 20.5 16.9 20.6 16 20.6 C 16.1 19.8 16.2 19 16.2 18.2 C 16.2 13.8 13.5 10.2 9.5 9.4 C 11.2 7.3 14.3 6 18 6 Z"
        fill={secondaryFill}
        opacity={isActive ? 0.35 : 0.25}
      />

      {/* Main Front Chat Bubble */}
      <path
        d="M 5 8 C 5 5.2 7.2 3 10 3 L 18 3 C 20.8 3 23 5.2 23 8 L 23 15 C 23 17.8 20.8 20 18 20 L 10 20 L 5 24 L 5 8 Z"
        fill={isActive ? "url(#chat-active-grad)" : "url(#chat-inactive-grad)"}
        stroke={isActive ? "rgba(255,255,255,0.4)" : "#21183B"}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Inner Highlight Luster on top edge */}
      <path
        d="M 7.5 5.5 C 7.5 5.5 11 4.5 17 4.5 C 19 4.5 20.5 5.2 20.5 5.2"
        stroke={isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 3 Dimensional Indicator Dots */}
      <circle cx="10" cy="11.5" r="1.5" fill={dotFill} />
      <circle
        cx="14"
        cy="11.5"
        r="1.5"
        fill={isActive ? "#FFFFFF" : "#7655FF"}
      />
      <circle
        cx="18"
        cy="11.5"
        r="1.5"
        fill={isActive ? "#FFFFFF" : "#7655FF"}
      />
    </svg>
  );
}

/**
 * 2. ROAM Icon
 * Enhanced dimensional globe, supersonic aircraft, curved orbit with acid-lime accent.
 */
export function HavenRoamIcon({
  size = 24,
  isActive = false,
  className = "",
}: IconBaseProps) {
  const mainStroke = isActive ? "#FFFFFF" : "#21183B";
  const globeFill = isActive ? "rgba(255, 255, 255, 0.12)" : "rgba(118, 85, 255, 0.08)";
  const planeFill = isActive ? "#DFFF68" : "#7655FF"; // Acid-lime aircraft when active!
  const planeOutline = isActive ? "#21183B" : "#FFFFFF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Globe Sphere with subtle gradient depth */}
      <circle
        cx="14"
        cy="14"
        r="8.5"
        fill={globeFill}
        stroke={mainStroke}
        strokeWidth="1.8"
      />

      {/* Globe Longitude Grid Curves */}
      <ellipse
        cx="14"
        cy="14"
        rx="4.2"
        ry="8.5"
        stroke={mainStroke}
        strokeWidth="1.2"
        opacity={0.8}
      />
      <line
        x1="14"
        y1="5.5"
        x2="14"
        y2="22.5"
        stroke={mainStroke}
        strokeWidth="1.2"
        opacity={0.8}
      />

      {/* Globe Latitude Curved Line */}
      <path
        d="M 5.8 14 C 8 16.5 20 16.5 22.2 14"
        stroke={mainStroke}
        strokeWidth="1.2"
        opacity={0.8}
      />

      {/* Dynamic 3D Orbit Ring Sweeping Across */}
      <path
        d="M 4 20 C 3 13 8 7 18 5 C 24 3.8 27.5 8 26 14 C 24.5 20 16.5 24.5 7 21.5"
        stroke={isActive ? "#FFFFFF" : "#7655FF"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="2.5 1.5"
      />

      {/* Supersonic Jet / Aircraft Flying Along Orbit Path */}
      <g transform="translate(21.5, 5.5) rotate(42) scale(0.95)">
        {/* Airplane Silhouette */}
        <path
          d="M 0 -8 L 4.5 4 L 0 2.2 L -4.5 4 Z"
          fill={planeFill}
          stroke={planeOutline}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Supersonic Wings */}
        <path
          d="M -7.5 1.5 L 0 -1.5 L 7.5 1.5"
          stroke={isActive ? "#FFFFFF" : "#7655FF"}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>

      {/* Playful Contrail Star Sparkle */}
      <circle
        cx="24"
        cy="19"
        r="1"
        fill={isActive ? "#DFFF68" : "#7655FF"}
      />
      <circle
        cx="5"
        cy="9"
        r="0.8"
        fill={isActive ? "#FFFFFF" : "#FF729E"}
      />
    </svg>
  );
}

/**
 * 3. Communities Icon
 * Multi-user dimensional squad badge with hero avatar in front and flanking members.
 */
export function HavenCommunitiesIcon({
  size = 24,
  isActive = false,
  className = "",
}: IconBaseProps) {
  const heroFill = isActive ? "#FFFFFF" : "#21183B";
  const flankFill = isActive ? "rgba(255, 255, 255, 0.4)" : "#7655FF";
  const accentDot = isActive ? "#DFFF68" : "#65E7F2";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Left Flanking Member */}
      <circle cx="7" cy="10" r="3" fill={flankFill} />
      <path
        d="M 2 20 C 2 17 4.5 15 8 15 C 9.2 15 10.3 15.3 11.2 15.9 C 10.5 17 10 18.4 10 20 Z"
        fill={flankFill}
      />

      {/* Right Flanking Member */}
      <circle cx="21" cy="10" r="3" fill={flankFill} />
      <path
        d="M 26 20 C 26 17 23.5 15 20 15 C 18.8 15 17.7 15.3 16.8 15.9 C 17.5 17 18 18.4 18 20 Z"
        fill={flankFill}
      />

      {/* Center Hero Member (Raised / Foreground) */}
      <circle
        cx="14"
        cy="8.5"
        r="3.8"
        fill={heroFill}
        stroke={isActive ? "#7655FF" : "#FFFFFF"}
        strokeWidth="1.2"
      />
      <path
        d="M 8.5 22 C 8.5 17.8 11 15 14 15 C 17 15 19.5 17.8 19.5 22 Z"
        fill={heroFill}
        stroke={isActive ? "#7655FF" : "#FFFFFF"}
        strokeWidth="1.2"
      />

      {/* Squad Connection Sparkle / Acid-Lime Accent */}
      <circle cx="14" cy="15" r="1.2" fill={accentDot} />
    </svg>
  );
}

/**
 * 4. BINGE Icon
 * Tactile clapperboard with angled stripes, hinge pin, and central play glyph.
 */
export function HavenBingeIcon({
  size = 24,
  isActive = false,
  className = "",
}: IconBaseProps) {
  const mainStroke = isActive ? "#FFFFFF" : "#21183B";
  const bodyFill = isActive ? "rgba(255, 255, 255, 0.15)" : "rgba(118, 85, 255, 0.1)";
  const playFill = isActive ? "#DFFF68" : "#7655FF"; // Acid-lime play accent when active!
  const stripeAccent = isActive ? "#DFFF68" : "#7655FF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Lower Clapperboard Body */}
      <rect
        x="4"
        y="11"
        width="20"
        height="13"
        rx="3"
        fill={bodyFill}
        stroke={mainStroke}
        strokeWidth="1.8"
      />

      {/* Center Play Symbol */}
      <path
        d="M 12 14.5 L 18 17.5 L 12 20.5 Z"
        fill={playFill}
        stroke={isActive ? "#FFFFFF" : "#21183B"}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Top Clapper Bar with Hinged Tilt */}
      <path
        d="M 4 10 L 24 10 L 23.5 5.5 C 23.5 4.7 22.8 4 22 4 L 5.5 4 C 4.7 4 4 4.7 4 5.5 Z"
        fill={isActive ? "rgba(255,255,255,0.25)" : "rgba(118,85,255,0.2)"}
        stroke={mainStroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Clapper Diagonal Stripes */}
      <path
        d="M 8.5 4 L 6.5 10 M 13.5 4 L 11.5 10 M 18.5 4 L 16.5 10"
        stroke={mainStroke}
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Acid Lime Stripe Accent */}
      <path
        d="M 13.5 4 L 11.5 10"
        stroke={stripeAccent}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Hinge Pin Dot on Left */}
      <circle cx="5.5" cy="10" r="1.2" fill={isActive ? "#DFFF68" : "#7655FF"} />
    </svg>
  );
}

/**
 * 5. Create Icon
 * Dimensional squircle with sculpted plus and sparkling PLAYMODE magic star.
 */
export function HavenCreateIcon({
  size = 24,
  isActive = false,
  className = "",
}: IconBaseProps) {
  const boxFill = isActive ? "#FFFFFF" : "rgba(118, 85, 255, 0.1)";
  const boxStroke = isActive ? "rgba(255, 255, 255, 0.8)" : "#21183B";
  const plusFill = isActive ? "#7655FF" : "#21183B";
  const starFill = isActive ? "#DFFF68" : "#7655FF"; // Acid-lime magic star!

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Beveled Squircle Body */}
      <rect
        x="4"
        y="4"
        width="20"
        height="20"
        rx="6"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.8"
      />

      {/* Inner depth layer */}
      <rect
        x="6"
        y="6"
        width="16"
        height="16"
        rx="4"
        stroke={isActive ? "rgba(118, 85, 255, 0.15)" : "rgba(255, 255, 255, 0.4)"}
        strokeWidth="1"
      />

      {/* Bold Sculpted Plus Symbol */}
      <path
        d="M 14 9 L 14 19 M 9 14 L 19 14"
        stroke={plusFill}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* PLAYMODE Magic Starburst Accent on Top-Right */}
      <g transform="translate(21, 5) scale(0.7)">
        <path
          d="M 0 -5 Q 0 0 5 0 Q 0 0 0 5 Q 0 0 -5 0 Q 0 0 0 -5 Z"
          fill={starFill}
          stroke={isActive ? "#21183B" : "#FFFFFF"}
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

/**
 * 5. Camera Icon
 * Tactile camera body with concentric optical lens and playful flash glint.
 */
export function HavenCameraIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Camera Body with Soft Radii */}
      <path
        d="M 3 8 C 3 6.3 4.3 5 6 5 L 8.2 5 C 8.8 5 9.3 4.7 9.6 4.2 L 10.4 2.8 C 10.7 2.3 11.2 2 11.8 2 L 12.2 2 C 12.8 2 13.3 2.3 13.6 2.8 L 14.4 4.2 C 14.7 4.7 15.2 5 15.8 5 L 18 5 C 19.7 5 21 6.3 21 8 L 21 17 C 21 18.7 19.7 20 18 20 L 6 20 C 4.3 20 3 18.7 3 17 Z"
        fill="rgba(118, 85, 255, 0.08)"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Concentric Multi-layered Lens */}
      <circle
        cx="12"
        cy="12.5"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12.5"
        r="2"
        fill="currentColor"
        opacity="0.3"
      />

      {/* Optical Reflection Glint */}
      <circle cx="13.5" cy="11" r="0.8" fill="#65E7F2" />

      {/* Flash Notch */}
      <circle cx="17.5" cy="8" r="1" fill="#DFFF68" />
    </svg>
  );
}

/**
 * 6. Notification Bell Icon
 * Sculpted bell with chime curvature and a Bubblegum Pink notification badge.
 */
export function HavenBellIcon({
  size = 20,
  hasNotification = true,
  className = "",
}: {
  size?: number;
  hasNotification?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Bell Body */}
      <path
        d="M 12 3 C 8.7 3 6 5.7 6 9 L 6 12.5 C 6 13.6 5.4 14.6 4.5 15.2 L 3.8 15.8 C 3 16.5 3.5 18 4.7 18 L 19.3 18 C 20.5 18 21 16.5 20.2 15.8 L 19.5 15.2 C 18.6 14.6 18 13.6 18 12.5 L 18 9 C 18 5.7 15.3 3 12 3 Z"
        fill="rgba(118, 85, 255, 0.08)"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Top hanger loop */}
      <path
        d="M 10 3 C 10 1.9 10.9 1 12 1 C 13.1 1 14 1.9 14 3"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Bell Clapper */}
      <path
        d="M 10 18 C 10 19.7 11 21 12 21 C 13 21 14 19.7 14 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Bubblegum Pink Notification Badge */}
      {hasNotification && (
        <g transform="translate(16, 2)">
          <circle cx="3" cy="3" r="3.5" fill="#FF729E" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="3" cy="3" r="1.2" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );
}

/**
 * 7. Settings Icon
 * Modern chamfered gear with central depth ring.
 */
export function HavenSettingsIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" fill="rgba(118,85,255,0.15)" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M 12 1.5 L 13.2 4.2 C 13.8 4.4 14.4 4.7 14.9 5.1 L 17.6 4.1 L 19.1 6.7 L 17 8.5 C 17.1 9.1 17.2 9.7 17.2 10.3 L 20 11.2 L 20 14.2 L 17.2 15.1 C 17.1 15.7 17 16.3 16.8 16.9 L 18.8 18.9 L 17.3 21.5 L 14.6 20.3 C 14.1 20.7 13.5 21 12.9 21.2 L 12 24 L 9 24 L 8.1 21.2 C 7.5 21 6.9 20.7 6.4 20.3 L 3.7 21.5 L 2.2 18.9 L 4.2 16.9 C 4 16.3 3.9 15.7 3.8 15.1 L 1 14.2 L 1 11.2 L 3.8 10.3 C 3.9 9.7 4 9.1 4.2 8.5 L 2.2 6.7 L 3.7 4.1 L 6.4 5.1 C 6.9 4.7 7.5 4.4 8.1 4.2 L 9 1.5 Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
