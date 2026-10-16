import fs from 'fs';
import path from 'path';

const roamImages = [
  // User & Nav
  {
    name: 'kartik.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'nav_scenic.jpg',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
  },

  // Stories
  {
    name: 'shreya.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'aditya.jpg',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'neon_exe.jpg',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'onepiece.jpg',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'travel_diaries.jpg',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'aesthetic7.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'saksham.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'anime_club.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
  },

  // Posts
  // Post 1: Sunset city street with traveler
  {
    name: 'post_sunset_city.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
  },
  // Post 2: Switzerland lake town with mountains
  {
    name: 'post_switzerland.jpg',
    url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80',
  },
  // Post 3: Anime ocean sunset / Luffy vibes
  {
    name: 'post_onepiece.jpg',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
  },
  // Post 4: Siberian Tiger
  {
    name: 'post_tiger.jpg',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80',
  },
  // Post 5: Cozy bedroom aesthetic
  {
    name: 'post_cozy.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
  },
  // Post 6: Sci-fi / Superhero armor
  {
    name: 'post_ironman.jpg',
    url: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800&auto=format&fit=crop&q=80',
  },

  // People you may like
  {
    name: 'aaryan.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'sana.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'madhav.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'ritika.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'karan.jpg',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
  },

  // Trending thumbnails
  {
    name: 'trend_onepiece.jpg',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'trend_travel.jpg',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'trend_anime.jpg',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'trend_photography.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&auto=format&fit=crop&q=80',
  },
  {
    name: 'trend_gaming.jpg',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80',
  },
];

const destDir = path.resolve('public/images/roam');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadAll() {
  console.log('Downloading ROAM demonstration assets...');
  for (const item of roamImages) {
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
  console.log('Finished downloading ROAM assets.');
}

downloadAll();
