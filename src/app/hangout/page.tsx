"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { HavenGlobalSidebar } from "@/components/navigation/HavenGlobalSidebar";
import { HangoutView } from "@/components/hangout/HangoutView";

export default function HangoutPage() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen bg-haven-canvas flex items-center justify-center p-2.5 lg:p-3 select-none overflow-hidden">
      <div className="w-full h-full flex gap-2.5 lg:gap-3 overflow-hidden">
        <HavenGlobalSidebar
          activeSection="hangout"
          onNavigate={(sec) => {
            if (sec === "chats") router.push("/");
            else router.push("/" + sec);
          }}
          onCameraClick={() => alert("[Demonstration Action] Camera quick snap preview")}
          onNotificationClick={() => alert("[Demonstration Action] Notifications opened")}
          onSettingsClick={() => alert("[Demonstration Action] Settings opened")}
          onProfileClick={() => alert("[Demonstration Action] Viewing profile of @kartikphulwari")}
        />
        <HangoutView />
      </div>
    </main>
  );
}
