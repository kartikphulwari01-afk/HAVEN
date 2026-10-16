import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAVEN — PLAYMODE Desktop Chat",
  description: "Faithful implementation of HAVEN PLAYMODE Desktop Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-haven-canvas text-haven-text selection:bg-haven-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
