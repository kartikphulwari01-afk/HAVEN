"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Copy,
  Check,
  Share2,
  Bell,
  ShieldAlert,
  Plus,
  Send,
  UserCheck,
  UserPlus,
} from "lucide-react";

// --- 1. INVITE MODAL ---
interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [copied, setCopied] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const friends = [
    { id: "f-1", name: "Riya Sharma", handle: "@riyasharma", avatar: "/images/riya.jpg" },
    { id: "f-2", name: "Karan Malhotra", handle: "@karanm", avatar: "/images/roam/karan.jpg" },
    { id: "f-3", name: "Alex Chen", handle: "@alexbeats", avatar: "/images/alex.jpg" },
    { id: "f-4", name: "Shreya V", handle: "@shreyav", avatar: "/images/roam/shreya.jpg" },
  ];

  const handleCopy = () => {
    navigator.clipboard?.writeText("https://haven.gg/c/gaming-zone");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleInvite = (id: string) => {
    setInvitedFriends((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-md bg-white rounded-[26px] p-5 shadow-[0_20px_50px_rgba(33,24,59,0.25)] border border-[#ECE7FC]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center">
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#21183B]">Invite to Gaming Zone</h3>
              <p className="text-xs text-[#6C6382]">Share link or invite your HAVEN friends</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invite Link Box */}
        <div className="mb-4">
          <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1.5">
            Community Link
          </label>
          <div className="flex items-center gap-2 bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl p-1.5 px-3">
            <span className="text-xs text-[#21183B] flex-1 truncate font-mono">
              https://haven.gg/c/gaming-zone
            </span>
            <button
              onClick={handleCopy}
              className="bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Direct Friends List */}
        <div>
          <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-2">
            Suggested Friends
          </label>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {friends.map((f) => {
              const isInvited = !!invitedFriends[f.id];
              return (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8F6FF] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#ECE7FC]">
                      <Image src={f.avatar} alt={f.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#21183B] block leading-none">
                        {f.name}
                      </span>
                      <span className="text-[10px] text-[#8C84A3]">{f.handle}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleInvite(f.id)}
                    className={`text-xs font-semibold px-3 py-1 rounded-xl transition-all ${
                      isInvited
                        ? "bg-[#EDE9FE] text-[#7655FF]"
                        : "bg-[#7655FF] text-white hover:bg-[#6845ee]"
                    }`}
                  >
                    {isInvited ? "Invited ✓" : "Invite"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. SHARE MODAL ---
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText("https://haven.gg/c/gaming-zone");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-sm bg-white rounded-[26px] p-5 shadow-[0_20px_50px_rgba(33,24,59,0.25)] border border-[#ECE7FC]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center">
              <Share2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-bold text-[#21183B]">Share Gaming Zone</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#6C6382] mb-4">
          Spread the word about tournaments, custom matches, and squad channels.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={handleCopy}
            className="w-full bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied to Clipboard! ✓" : "Copy Share Link"}</span>
          </button>

          <button
            onClick={() => {
              alert("[Demonstration Action] Shared to your ROAM discovery feed!");
              onClose();
            }}
            className="w-full bg-[#F7F5FF] hover:bg-[#EDE9FE] text-[#7655FF] text-xs font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-colors border border-[#ECE7FC]"
          >
            <Send className="w-4 h-4" />
            <span>Share to ROAM Feed</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. NOTIFICATION SETTINGS MODAL ---
interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({
  isOpen,
  onClose,
}: NotificationSettingsModalProps) {
  const [allMessages, setAllMessages] = useState(true);
  const [mentionsOnly, setMentionsOnly] = useState(false);
  const [eventAlerts, setEventAlerts] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-sm bg-white rounded-[26px] p-5 shadow-[0_20px_50px_rgba(33,24,59,0.25)] border border-[#ECE7FC]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-bold text-[#21183B]">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 mb-5">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#21183B] block">All Messages</span>
              <span className="text-[10px] text-[#8C84A3]">Get notified for every squad message</span>
            </div>
            <input
              type="checkbox"
              checked={allMessages}
              onChange={() => setAllMessages(!allMessages)}
              className="accent-[#7655FF] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#21183B] block">Mentions Only</span>
              <span className="text-[10px] text-[#8C84A3]">Only notify when @Kartik is tagged</span>
            </div>
            <input
              type="checkbox"
              checked={mentionsOnly}
              onChange={() => setMentionsOnly(!mentionsOnly)}
              className="accent-[#7655FF] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#21183B] block">Event Reminders</span>
              <span className="text-[10px] text-[#8C84A3]">15 mins before tournaments and game nights</span>
            </div>
            <input
              type="checkbox"
              checked={eventAlerts}
              onChange={() => setEventAlerts(!eventAlerts)}
              className="accent-[#7655FF] w-4 h-4"
            />
          </label>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-bold py-2.5 rounded-2xl shadow-xs transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

// --- 4. REPORT MODAL ---
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reason, setReason] = useState("Spam or Advertising");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-sm bg-white rounded-[26px] p-5 shadow-[0_20px_50px_rgba(33,24,59,0.25)] border border-[#ECE7FC]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#FFF1F2] text-[#F43F5E] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-bold text-[#21183B]">Report Community</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-sm font-bold text-[#21183B]">Report Submitted</h4>
            <p className="text-xs text-[#6C6382] mt-1">
              Thank you for keeping HAVEN communities safe and welcoming.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1">
                Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl px-3 py-2 text-xs text-[#21183B] focus:outline-none"
              >
                <option>Spam or Advertising</option>
                <option>Inappropriate Content</option>
                <option>Harassment or Toxic Behavior</option>
                <option>Impersonation or Copyright</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1">
                Additional Details
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Briefly describe what happened..."
                className="w-full bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl p-3 text-xs text-[#21183B] placeholder:text-[#9E97B5] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F43F5E] hover:bg-[#e11d48] text-white text-xs font-bold py-2.5 rounded-2xl shadow-xs transition-colors"
            >
              Submit Report
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// --- 5. CREATE COMMUNITY MODAL ---
interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (name: string, category: string) => void;
}

export function CreateCommunityModal({
  isOpen,
  onClose,
  onCreated,
}: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gaming");
  const [tagline, setTagline] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreated(name.trim(), category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-md bg-white rounded-[26px] p-5 shadow-[0_20px_50px_rgba(33,24,59,0.25)] border border-[#ECE7FC]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#EDE9FE] text-[#7655FF] flex items-center justify-center">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#21183B]">Create a Community</h3>
              <p className="text-xs text-[#6C6382]">Build your tribe and host events</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#6C6382]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1">
              Community Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Apex Legends Champions"
              required
              className="w-full bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl px-3.5 py-2.5 text-xs text-[#21183B] placeholder:text-[#9E97B5] focus:outline-none focus:border-[#7655FF]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl px-3 py-2 text-xs text-[#21183B] focus:outline-none"
            >
              <option>Gaming</option>
              <option>Esports</option>
              <option>Anime & Manga</option>
              <option>Design & Art</option>
              <option>Music & Audio</option>
              <option>Tech & Code</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#8C84A3] uppercase tracking-wider block mb-1">
              Tagline / Short Bio
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="What makes your space special?"
              className="w-full bg-[#F7F5FF] border border-[#ECE7FC] rounded-2xl px-3.5 py-2.5 text-xs text-[#21183B] placeholder:text-[#9E97B5] focus:outline-none focus:border-[#7655FF]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7655FF] hover:bg-[#6845ee] text-white text-xs font-bold py-2.5 rounded-2xl shadow-xs transition-colors mt-2"
          >
            Create Space
          </button>
        </form>
      </div>
    </div>
  );
}
