"use client";

import React from "react";

interface RoamIconProps {
  className?: string;
  size?: number;
  variant?: "white" | "primary" | "accent";
}

export function RoamIcon({
  className = "",
  size = 24,
  variant = "white",
}: RoamIconProps) {
  // Color configuration
  const strokeColor =
    variant === "white"
      ? "#FFFFFF"
      : variant === "primary"
      ? "#7655FF"
      : "#7655FF";

  const planeColor =
    variant === "white"
      ? "#FFFFFF"
      : variant === "primary"
      ? "#7655FF"
      : "#DFFF68";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label="ROAM"
    >
      {/* Central Globe Circle */}
      <circle
        cx="18"
        cy="18"
        r="10.5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Globe Longitude Grid Lines */}
      <ellipse
        cx="18"
        cy="18"
        rx="5.5"
        ry="10.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray="0.5 0"
        opacity="0.85"
      />
      <line
        x1="18"
        y1="7.5"
        x2="18"
        y2="28.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        opacity="0.85"
      />

      {/* Globe Latitude Grid Line */}
      <ellipse
        cx="18"
        cy="18"
        rx="10.5"
        ry="4"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeDasharray="0.5 0"
        opacity="0.85"
      />

      {/* Curved Elliptical Orbital Path */}
      <path
        d="M 6 25 C 4 17, 10 9, 22 7 C 29 5.5, 33 11, 31 18 C 29 25, 20 30, 9 27"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="3 2"
        opacity="0.9"
      />

      {/* Supersonic Jet / Airplane flying along orbit */}
      <g transform="translate(26, 7) rotate(42) scale(0.85)">
        <path
          d="M 0 -7 L 4 5 L 0 3 L -4 5 Z"
          fill={planeColor}
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Airplane Wing sweeps */}
        <path
          d="M -7 2 L 0 -1 L 7 2"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Small Star / Sparkle accent */}
      <circle cx="29" cy="24" r="1" fill={variant === "white" ? "#DFFF68" : "#7655FF"} />
      <circle cx="8" cy="11" r="0.8" fill={variant === "white" ? "#FFFFFF" : "#FF729E"} />
    </svg>
  );
}
