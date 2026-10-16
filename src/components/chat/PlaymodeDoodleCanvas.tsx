"use client";

import React from "react";

export function PlaymodeDoodleCanvas() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="crayon-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>

        {/* Soft pastel watercolor brush splashes */}
        {/* Soft yellow/lime chalk stroke top-right */}
        <path
          d="M 520,60 Q 640,40 760,110 Q 730,190 610,180 Q 510,140 520,60 Z"
          fill="#FEF9C3"
          opacity="0.55"
        />
        {/* Soft cyan chalk stroke right side */}
        <path
          d="M 680,260 Q 780,290 810,420 Q 750,480 690,440 Q 660,340 680,260 Z"
          fill="#CFFAFE"
          opacity="0.5"
        />
        {/* Soft pink watercolor stroke bottom-left */}
        <path
          d="M 40,680 Q 120,660 180,720 Q 140,840 50,830 Q -10,780 40,680 Z"
          fill="#FCE7F3"
          opacity="0.5"
        />
        {/* Soft lime accent bottom-center */}
        <path
          d="M 320,780 Q 420,740 480,820 Q 420,910 330,880 Z"
          fill="#ECFCCB"
          opacity="0.4"
        />

        {/* Crayon strokes & sketched doodles */}
        {/* Top-Right Hand-Lettered PLAYMODE Slogan */}
        <g
          transform="translate(480, 160) rotate(-14)"
          filter="url(#crayon-rough)"
        >
          <text
            x="0"
            y="0"
            fill="#8B7BCF"
            fontSize="18"
            fontWeight="800"
            letterSpacing="2.5"
            opacity="0.45"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            GOOD PEOPLE
          </text>
          <text
            x="-30"
            y="26"
            fill="#8B7BCF"
            fontSize="18"
            fontWeight="800"
            letterSpacing="2.5"
            opacity="0.45"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            BRIGHT CONVERSATIONS
          </text>
          <text
            x="30"
            y="52"
            fill="#8B7BCF"
            fontSize="18"
            fontWeight="800"
            letterSpacing="2.5"
            opacity="0.45"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            BETTER DAYS
          </text>
        </g>

        {/* Sketched Soft Purple Heart (Top Center) */}
        <path
          d="M 380,115 C 380,105 370,95 358,95 C 344,95 338,107 338,107 C 338,107 332,95 318,95 C 306,95 296,105 296,115 C 296,132 316,148 338,162 C 360,148 380,132 380,115 Z"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2,1"
          opacity="0.4"
          transform="rotate(12 338 128)"
        />

        {/* Sketched Tiny Heart (Top) */}
        <path
          d="M 440,140 C 440,134 434,128 426,128 C 418,128 414,136 414,136 C 414,136 410,128 402,128 C 394,128 388,134 388,140 C 388,150 400,160 414,170 C 428,160 440,150 440,140 Z"
          fill="#DDD6FE"
          opacity="0.4"
        />

        {/* Large Playful Sketched Heart Outline (Right Midground) */}
        <path
          d="M 640,540 C 640,510 618,485 590,485 C 560,485 545,510 545,510 C 545,510 530,485 500,485 C 472,485 450,510 450,540 C 450,580 495,625 545,660 C 595,625 640,580 640,540 Z"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.55"
          transform="rotate(-18 545 570)"
        />

        {/* Playful Yellow Loop stroke (Lower Right) */}
        <path
          d="M 500,490 Q 530,620 560,690 Q 580,740 620,730 Q 660,710 640,640"
          fill="none"
          stroke="#FDE047"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Soft Lavender Chalk Scribble Lines (Mid-Right) */}
        <path
          d="M 580,240 L 740,380 M 610,230 L 760,350 M 640,220 L 770,320"
          stroke="#DDD6FE"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Pastel Diagonal Scribbles (Left Lower) */}
        <path
          d="M 120,620 L 320,820 M 160,600 L 340,780 M 200,590 L 370,760"
          stroke="#FBCFE8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Cute Sparkle Stars */}
        <g transform="translate(680, 200) scale(0.8)" opacity="0.4">
          <path
            d="M 0,-15 Q 0,0 15,0 Q 0,0 0,15 Q 0,0 -15,0 Q 0,0 0,-15 Z"
            fill="#A78BFA"
          />
        </g>
        <g transform="translate(240, 280) scale(0.6)" opacity="0.35">
          <path
            d="M 0,-15 Q 0,0 15,0 Q 0,0 0,15 Q 0,0 -15,0 Q 0,0 0,-15 Z"
            fill="#F472B6"
          />
        </g>
      </svg>
    </div>
  );
}
