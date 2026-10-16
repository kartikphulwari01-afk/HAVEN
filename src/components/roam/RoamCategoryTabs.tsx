"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

interface RoamCategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function RoamCategoryTabs({
  categories,
  activeCategory,
  onSelectCategory,
}: RoamCategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-4 select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none ${
              isActive
                ? "bg-haven-primary text-white shadow-xs"
                : "bg-white text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle border border-haven-border/40"
            }`}
          >
            {cat}
          </button>
        );
      })}

      {/* More Button */}
      <button
        className="w-8 h-8 rounded-full bg-white border border-haven-border/40 flex items-center justify-center text-haven-secondary hover:text-haven-primary hover:bg-haven-primary-subtle transition-colors flex-shrink-0 focus:outline-none"
        title="More categories"
        aria-label="More categories"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
