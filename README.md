# HAVEN

HAVEN is a social communication and discovery web platform designed with the vibrant PLAYMODE aesthetic. Built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

---

## ✨ Features & Architecture

### 1. 💬 Chats (`/`)
- Desktop conversation workspace with conversation list, unread indicators, and message history.
- Story carousel modal with auto-progression and interactive controls.
- Voice/Video calling modal with animated call states.
- Contextual profile sidebar with media gallery, mutual contacts, and quick actions.

### 2. 🧭 ROAM (`/roam`)
- Social discovery feed featuring stories row and immersive media cards.
- Interactive engagement actions (Like with count animation, Comments drawer, Save, Share).
- Creator profiles with follow states and tags.

### 3. 👥 Communities (`/communities`)
- Hub for discovering interest-based groups, creator circles, and topics.
- Category filtering, member counters, and discussion channels.

### 4. 🎬 BINGE (`/binge`)
- 3D perspective horizontal desktop video carousel.
- Central 9:16 vertical player with smooth playback simulation, audio pill track indicator, and scrub progress bar.
- Tilted side previews with 3D perspective (`rotateY`) and circular navigation buttons.
- Full keyboard shortcuts (`←` / `→` / `Space` / `M` / `Escape`) and touch/drag gesture support.
- Slide-over comments drawer and multi-destination share modal.

### 5. 🎨 Shared Desktop Navigation Shell
- Persistent illustrated left sidebar featuring the PLAYMODE lavender background, scenic artwork, flight trail, and profile controls.
- Consistent cross-section navigation between Chats, Roam, Communities, Binge, and Create.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/kartikphulwari01-afk/HAVEN.git
cd HAVEN

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Verification

```bash
# Type check
npm run type-check # or: npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **Fonts**: Inter / System Sans

---

## 📄 License

Private repository — all rights reserved.