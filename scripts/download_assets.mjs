import fs from 'fs';
import path from 'path';

const images = [
  {
    name: 'arjun.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'riya.jpg',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'alex.jpg',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'college_crew.jpg',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'maya.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'tech_guys.jpg',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'design_squad.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'gaming_zone.jpg',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'aarav.jpg',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'sunset.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1000&auto=format&fit=crop&q=80',
  },
  {
    name: 'cat.jpg',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'neon_room.jpg',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'beach.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'friends_selfie.jpg',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'riya_cover.jpg',
    url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&auto=format&fit=crop&q=80',
  },
];

const destDir = path.resolve('public/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadAll() {
  console.log('Downloading placeholder images to public/images...');
  for (const item of images) {
    const filePath = path.join(destDir, item.name);
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
      console.log(`Saved: ${item.name}`);
    } catch (err) {
      console.error(`Failed to download ${item.name}:`, err.message);
    }
  }
  console.log('Done downloading assets.');
}

downloadAll();
