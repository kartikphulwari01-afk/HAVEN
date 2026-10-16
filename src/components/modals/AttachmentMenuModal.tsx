"use client";

import React, { useRef, useEffect } from "react";
import {
  Image as ImageIcon,
  Camera,
  FileText,
  Mic,
  BarChart2,
  UserCheck,
} from "lucide-react";

interface AttachmentMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionLabel: string) => void;
}

export function AttachmentMenuModal({
  isOpen,
  onClose,
  onSelectAction,
}: AttachmentMenuModalProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "photos",
      label: "Photos & Videos",
      icon: ImageIcon,
      bgColor: "bg-pink-100 text-haven-pink",
    },
    {
      id: "camera",
      label: "Camera",
      icon: Camera,
      bgColor: "bg-indigo-100 text-haven-primary",
    },
    {
      id: "documents",
      label: "Document",
      icon: FileText,
      bgColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "audio",
      label: "Audio file",
      icon: Mic,
      bgColor: "bg-cyan-100 text-cyan-600",
    },
    {
      id: "poll",
      label: "Create Poll",
      icon: BarChart2,
      bgColor: "bg-amber-100 text-amber-600",
    },
    {
      id: "contact",
      label: "Contact",
      icon: UserCheck,
      bgColor: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute bottom-20 left-4 z-40 bg-white rounded-3xl p-3 shadow-2xl border border-haven-border/60 w-64 animate-in fade-in slide-in-from-bottom-2 duration-150"
      role="menu"
      aria-label="Attachment Options"
    >
      <div className="text-[11px] font-bold text-haven-secondary uppercase tracking-wider px-2 py-1 mb-1">
        Share Content
      </div>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectAction(item.label);
                onClose();
              }}
              className="flex flex-col items-center justify-center p-2.5 rounded-2xl hover:bg-haven-primary-subtle transition-all duration-150 group text-center"
              role="menuitem"
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${item.bgColor}`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-semibold text-haven-text group-hover:text-haven-primary">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
