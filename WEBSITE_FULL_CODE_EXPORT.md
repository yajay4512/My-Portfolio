# Ajay Yadav Portfolio — Full Code Export
For AI-assisted review (Claude, GPT, etc.). This document contains the ACTUAL, CURRENT source code of every frontend file, labeled by path, plus a structural map of what renders where. Generated August 2026.

---

## 1. High-Level Map — What's Where

```
/app/frontend/src/
├── App.js                 → Router root. Mounts CustomCursor, ScrollProgress, Navigation on every route.
├── App.css                → Cursor styles, scroll-progress bar, .reveal animation system, keyframes
├── index.css               → Tailwind base imports
├── mock.js                 → ALL content data: projects[], studios[], processSteps[], videos[], contentPieces[]
├── components/
│   ├── Navigation.jsx      → Fixed top nav. Shows Work/About/Contact anchor buttons on home, "Back to Home" elsewhere
│   ├── CustomCursor.jsx    → Custom lerp-follow circular cursor (desktop only, hides on mobile <768px)
│   ├── ScrollProgress.jsx  → 1px vertical scroll progress bar, fixed right edge
│   ├── Footer.jsx          → Global footer: copyright left, "ajay.design" right
│   └── Lightbox.jsx        → Full-screen image viewer with keyboard nav (Esc/←/→), used only in StudioDetail
└── pages/
    ├── Home.jsx            → Homepage. 9 rendered sections (see below) + floating hover-preview overlay
    ├── ProjectDetail.jsx   → /project/:id — single project template, reused for all 8 projects
    └── StudioDetail.jsx    → /studio/:id — gallery page, currently only wired for "7day3io"
```

### Homepage (Home.jsx) — sections in DOM order
| # | Comment label in code | Renders | Data source |
|---|---|---|---|
| 01 | `SECTION 01 - ENTRY` | Full-bleed hero video + "Ajay Yadav / Architect. Computational designer." | hardcoded |
| 02 | `SECTION 02 - SELECTED WORK` | 3 featured project cards (LINE, LAITLUM, Mortar House) | hardcoded (ids 1,3,4) |
| 03 | `SECTION 03 - FULL WORK LIST` (`id="work"`) | Table of all 8 projects, hover-preview thumbnail follows cursor | `projects[]` |
| — | **`SECTION 04 - PROCESS` — MISSING, see §3** | *(nothing renders here — gap between 03 and 05)* | `processSteps[]` (orphaned) |
| 05 | `SECTION 05 - THE PAUSE` | Two centered lines: "This is the work." / "But work is never the whole story." | hardcoded |
| 06 | `SECTION 06 - LAYER 2 BEGINS` (`id="layer-2"`) | "The Full Picture" label + intro line, triggers body bg shift | hardcoded |
| 07 | `SECTION 07 - STUDIO TIMELINE` | 7day3io / Grull.Work / Grull.Design blocks, 3 images/videos each | `studios[]` |
| 08 | `SECTION 08 - ABOUT` (`id="about"`) | Bio paragraphs (left) + Education/Currently/Tools/Elsewhere (right) | hardcoded |
| 09 | `SECTION 09 - CONTENT/VIDEOS` | "Writing & Video" — 4 Instagram/LinkedIn cards + social links | `contentPieces[]` |
| 10 | `SECTION 10 - CONTACT` (`id="contact"`) | Email, Location, Open To, Elsewhere | hardcoded |

---

## 2. mock.js — Data Schema

```js
// projects[] — 8 entries, id 1-8
{
  id, number, name, shortName, type, year,
  practice,          // optional
  description, tools, location,
  heroImage,         // used on ProjectDetail hero (3:1) — real Cloudinary or placeholder string
  selectedWorkImage, // used only for id 1,3,4 cards in Section 02 (id 3 currently has NO image — renders empty #1A1A1A box)
  images: [],        // 4:3 grid on ProjectDetail
  wideImages: []      // optional, e.g. floor plans (only project 4)
}

// studios[] — 3 entries: 7day3io, Grull.Work, Grull.Design
{
  name, years, description, intro,
  images: [],         // 3 shown on homepage timeline (7day3io: real jpgs, Grull.Design: 3 real mp4 videos, Grull.Work: 3 placeholder strings)
  wideImage,          // 7day3io only — shown on StudioDetail
  galleryImages: [],  // 7day3io only — 20 real jpgs, opens Lightbox on StudioDetail
  website             // Grull.Work / Grull.Design only — makes studio name a clickable external link
}

// processSteps[] — 3 entries — ORPHANED, not imported by any component currently
{ number, title, description, image }

// videos[] — 4 entries — ORPHANED, imported into Home.jsx but never rendered
{ title, placeholder }

// contentPieces[] — 4 entries, rendered in Section 09
{ id, platform, title, thumbnail, url }
```

**Image status per project (id → heroImage/images):**
| id | name | Real Cloudinary images? |
|---|---|---|
| 1 | LINE rocking chair | ✅ hero + 4 grid |
| 2 | KOMFORT1 lounger | ✅ hero + 4 grid |
| 3 | LAITLUM wall art | ❌ all placeholder strings (`laitlum-hero.jpg` etc.) |
| 4 | Mortar House | ✅ hero + 4 grid + 1 wide (floor plan) |
| 5 | UNIT1 welcome console | ❌ all placeholder strings |
| 6 | Museum of Architecture | ❌ all placeholder strings |
| 7 | The Edge | ❌ all placeholder strings |
| 8 | Forest Floors | ❌ all placeholder strings |

---

## 3. Known Deletion / Orphaned Data (root cause of "misplaced/deleted" report)

Git history (`git log -p -- frontend/src/pages/Home.jsx`) confirms:
- Commit `eb94441` **deleted** the entire "Section 04 – Process" block (heading "Process", copy *"Every project starts as a rule set..."*, 3-column grid rendering `processSteps.map(...)`) and removed `processSteps` from the import line.
- `processSteps` still exists in `mock.js` (3 entries: Define the logic / Test through geometry / Close the gap) — fully written, just not rendered anywhere.
- `videos` array in `mock.js` (Architecture and time / Material systems / The design process / Computational thinking) is imported into `Home.jsx` line 3 but never referenced/rendered — dead import.
- Project 3 (LAITLUM) has no `selectedWorkImage`, so its card in Section 02 shows an empty `#1A1A1A` box instead of a photo.

**Awaiting user decision** (asked separately): restore Process section as-is, restore with new images, or leave removed.

---

## 4. Full Source Code

### `/app/frontend/src/App.js`
```jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import StudioDetail from './pages/StudioDetail';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/studio/:id" element={<StudioDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

### `/app/frontend/src/App.css`
```css
.App {
    background: #0E0E0E;
    min-height: 100vh;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

/* Custom Cursor */
@media (min-width: 768px) {
    body {
        cursor: none;
    }
}

@media (max-width: 767px) {
    body {
        cursor: auto;
    }
}

.custom-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    border: 1px solid rgba(232, 229, 222, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
    transform: translate(-50%, -50%);
}

.custom-cursor.hovering {
    width: 32px;
    height: 32px;
    border-color: rgba(232, 229, 222, 0.3);
}

/* Scroll Progress Indicator */
.scroll-progress-container {
    position: fixed;
    right: 0;
    top: 0;
    width: 1px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.04);
    z-index: 40;
    pointer-events: none;
}

.scroll-progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    background: rgba(232, 229, 222, 0.3);
    transition: height 0.1s ease-out;
}

/* Reveal Animation System */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Section labels - special reveal */
.reveal.section-label-reveal {
    transform: translateY(0);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.section-label-reveal.visible {
    opacity: 1;
}

/* Hero text reveals - on load, not scroll */
.hero-reveal {
    opacity: 0;
    transform: translateY(20px);
}

.hero-reveal-1 {
    animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.hero-reveal-2 {
    animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
}

.hero-reveal-3 {
    animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
}

.hero-reveal-4 {
    animation: heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s forwards;
}

@keyframes heroReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Contact email special reveal */
.contact-email-reveal {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-email-reveal.visible {
    opacity: 1;
    transform: scale(1);
}

/* Layer 2 background shift */
body.layer-two-active {
    background-color: #121208;
    transition: background-color 2s ease;
}

/* Mobile adjustments */
@media (max-width: 767px) {
    .reveal {
        transform: translateY(10px);
        transition-duration: 0.56s;
    }
    
    .reveal.visible {
        transform: translateY(0);
    }
}
```

### `/app/frontend/src/mock.js`
```js
export const projects = [
  {
    id: 1,
    number: '01',
    name: 'LINE rocking chair',
    shortName: 'LINE',
    type: 'Parametric · Fabricated',
    year: '2024',
    practice: 'Logic Design + Build',
    description: 'A rocking chair designed as one continuous curve, flowing seamlessly from base to seat to backrest without interruption. Crafted from 18mm birch plywood, the design features parallel slats that follow the chair elegant arc, creating both visual interest and comfortable support. A brass rod provides structural reinforcement while adding a refined detail to the natural wood. The single-line construction creates a sculptural presence that works well in modern interiors, offering a gentle rocking motion within a compact, distinctive form. The open slatted design keeps the piece visually light while maintaining durability and strength.',
    tools: 'Rhinoceros 3D · Grasshopper · GHPython · V-Ray',
    location: 'Delhi',
    heroImage: 'https://res.cloudinary.com/diqanluvu/image/upload/v1778848115/Line_hero_k4ghx4.jpg',
    selectedWorkImage: 'https://res.cloudinary.com/diqanluvu/image/upload/v1778848115/Line_slected_works_pemokg.jpg',
    images: [
      'https://res.cloudinary.com/diqanluvu/image/upload/v1778935197/lINE_GRID_01_tpdulu.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1779251717/Line_GRID_02_tn6abg.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1779122942/Line_02_bnugnj.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1779122943/Line_03_pjipny.jpg'
    ]
  },
  {
    id: 2,
    number: '02',
    name: 'KOMFORT1 lounger',
    shortName: 'KOMFORT1',
    type: 'Fabricated · Built',
    year: '2024',
    practice: 'Logic Design + Build',
    description: 'A relaxed lounger built on a sleek cantilever frame of brushed stainless steel. The design features generously padded leather cushions with button tufting across the seat, backrest, and integrated headrest for full-body comfort. A durable canvas backing provides support while maintaining a clean profile. The sled-base frame lifts the seat off the ground, creating a floating effect and allowing for gentle reclining movement. The combination of industrial metal framework and soft leather upholstery makes this lounger suitable for both residential and commercial spaces where comfort and visual impact matter equally.',
    tools: 'Rhinoceros 3D · AutoCAD · Photoshop',
    location: 'Delhi',
    heroImage: 'https://res.cloudinary.com/diqanluvu/image/upload/v1778404642/O1_e81nnh.png',
    images: [
      'https://res.cloudinary.com/diqanluvu/image/upload/v1778402572/AD30E4E8-CB6F-4686-9323-4417D6F75212_mmdni3.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1778404640/WhatsApp_Image_2025-10-31_at_5.52.59_PM_olrl1z.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1778404640/IMG_2201_fetbrm.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1778404640/METAL_CHAIR_02_q60wej.png'
    ]
  },
  {
    id: 3,
    number: '03',
    name: 'LAITLUM wall art',
    shortName: 'LAITLUM',
    type: 'Data · CNC · Installed',
    year: '2023',
    description: 'A topographic wall art installation crafted from white oak, translating the distinctive landscape of Laitlum Canyon into three-dimensional relief. The piece captures the canyon layered terrain through precision-cut contour lines, with each elevation carved to mirror the natural topography of this Meghalaya landmark. The wood grain adds organic texture to the geometric patterns, creating depth and visual movement across the surface. Designed specifically for a Guwahati penthouse, this installation brings a piece of the region dramatic geography indoors.',
    tools: 'Rhinoceros 3D · Grasshopper · GHPython · BSolid CNC',
    location: 'Private residence, Gurgaon',
    heroImage: 'laitlum-hero.jpg',
    images: ['laitlum-01.jpg', 'laitlum-02.jpg', 'laitlum-03.jpg', 'laitlum-04.jpg']
  },
  {
    id: 4,
    number: '04',
    name: 'Mortar House',
    shortName: 'Mortar House',
    type: 'Interior · Built',
    year: '2024',
    practice: 'Logic Design + Build',
    description: 'A 1200 sq.ft apartment interior in South Delhi. The design emphasizes material honesty and spatial continuity. Custom joinery and built-in storage throughout.',
    tools: 'Revit · Lumion · Photoshop · InDesign',
    location: 'New Delhi',
    heroImage: 'https://res.cloudinary.com/diqanluvu/image/upload/v1779365050/Mortar_Hero_hyc4nb.jpg',
    selectedWorkImage: 'https://res.cloudinary.com/diqanluvu/image/upload/v1781990531/Mortar_house_cover_01_g4sjxq.jpg',
    images: ['https://res.cloudinary.com/diqanluvu/image/upload/v1781991042/Mortar_house_grid_1_ulwjk8.jpg', 'https://res.cloudinary.com/diqanluvu/image/upload/v1782243166/Mortar_house_grid_2_xdtg0q.jpg', 'https://res.cloudinary.com/diqanluvu/image/upload/v1782243164/Mortar_house_grid_3_jqanjv.jpg', 'https://res.cloudinary.com/diqanluvu/image/upload/v1782243165/Mortar_house_grid_4_powljq.jpg'],
    wideImages: ['https://res.cloudinary.com/diqanluvu/image/upload/v1781997315/FLOOR_PLAN_B_W_pns533.png']
  },
  {
    id: 5,
    number: '05',
    name: 'UNIT1 welcome console',
    shortName: 'UNIT1',
    type: 'Parametric · Fabricated',
    year: '2023',
    practice: 'Logic Design + Build',
    description: 'An entryway piece built from layered 18mm birch plywood, using the same continuous curve philosophy as the rocking chair. The unit features stacked horizontal layers that create a flowing, sculptural form while providing practical storage. Two drawers are integrated seamlessly into the wavy structure, their fronts following the piece rhythmic contours. A coat hanger extends from the side, maintaining the design organic flow. The exposed plywood edges reveal the construction method, turning the layered material into a visual feature. This welcome unit combines function with form, offering storage and hanging space while making a statement in the entry area.',
    tools: 'Rhinoceros 3D · Grasshopper · Lunchbox · BSolid CNC',
    location: 'Gurgaon',
    heroImage: 'unit1-hero.jpg',
    images: ['unit1-01.jpg', 'unit1-02.jpg', 'unit1-03.jpg']
  },
  {
    id: 6,
    number: '06',
    name: 'Museum of Architecture',
    type: 'Computational · Academic',
    year: '2021',
    description: 'A thesis project exploring adaptive museum spaces. The building envelope responds to interior program through a computational facade system that modulates light and views.',
    tools: 'Rhinoceros 3D · Grasshopper · Kangaroo · Ladybug · V-Ray',
    location: 'Academic project',
    heroImage: 'museum-hero.jpg',
    images: ['museum-01.jpg', 'museum-02.jpg', 'museum-03.jpg', 'museum-04.jpg']
  },
  {
    id: 7,
    number: '07',
    name: 'The Edge',
    type: 'Architecture · Housing',
    year: '2024',
    practice: 'Logic Design + Build',
    description: 'A residential project on a sloped site in Himachal Pradesh. The design works with the topography, stepping down the hillside. Three volumes connected by glazed circulation.',
    tools: 'Revit · Lumion · Photoshop',
    location: 'Himachal Pradesh',
    heroImage: 'the-edge-hero.jpg',
    images: ['the-edge-01.jpg', 'the-edge-02.jpg', 'the-edge-03.jpg']
  },
  {
    id: 8,
    number: '08',
    name: 'Forest Floors',
    type: 'Architecture · Housing',
    year: '2025',
    practice: 'Logic Design + Build',
    description: 'A residential development of four units in Dehradun. The project balances density with privacy through strategic massing and landscape integration. Scheduled completion late 2025.',
    tools: 'Revit · Lumion · Photoshop · InDesign',
    location: 'Dehradun',
    heroImage: 'forest-floors-hero.jpg',
    images: ['forest-floors-01.jpg', 'forest-floors-02.jpg', 'forest-floors-03.jpg']
  }
];

export const studios = [
  {
    name: '7day3io',
    years: '2019 – 2022',
    description: 'A 3D studio that did a bit of everything- 3D visualisation, residential design, Product design, venue design.',
    intro: 'A freelance computational design studio run with two batchmates from NIT Hamirpur. 2019 to 2022. Over a hundred projects — residential design, product visualisation, event fabrication, clients across India and UAE. This is where the work began.',
    images: [
      'https://res.cloudinary.com/diqanluvu/image/upload/v1782052754/1cover_2_ukc8is.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1782052755/cover_2_fwg6wa.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/v1782052756/cover_3_djzo8t.jpg'
    ],
    wideImage: 'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782052674/Wide_Un_qix24x.jpg',
    galleryImages: [
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051278/7day3io_0024_Layer_1_lujauy.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051278/7day3io_0022_Layer_3_usjseo.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051278/7day3io_0021_Layer_4_wamxli.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0017_Layer_8_t1q6re.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0019_Layer_6_p4hdpd.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0018_Layer_7_i9pld0.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0015_Layer_10_fxvpfw.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0016_Layer_9_kpiqxe.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0014_Layer_11_mmlrc6.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051277/7day3io_0013_Layer_12_knhinr.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051276/7day3io_0008_Layer_17_phakan.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051276/7day3io_0012_Layer_13_kvgno6.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051276/7day3io_0011_Layer_14_qlaa4b.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051275/7day3io_0005_Layer_20_belyfn.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051275/7day3io_0002_Layer_23_jsqrij.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051275/7day3io_0003_Layer_22_jf2hem.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051274/7day3io_0010_Layer_15_yzmcdq.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051274/7day3io_0000_Cabin_Photo_-_4_ka3d1i.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051274/7day3io_0009_Layer_16_iao26q.jpg',
      'https://res.cloudinary.com/diqanluvu/image/upload/q_auto/f_auto/v1782051274/7day3io_0004_Layer_21_db6g6k.jpg'
    ]
  },
  {
    name: 'Grull.Work',
    years: '2022 – 2024',
    description: 'Freelancing was broken - high commissions, slow payments, unfair dispute resolution. Grull was the fix: a marketplace built around fairer terms for freelancers and businesses both.',
    images: ['grull-work-01.jpg', 'grull-work-02.jpg', 'grull-work-03.jpg'],
    website: 'https://grull.work/'
  },
  {
    name: 'Grull.Design',
    years: '2024',
    description: 'CGI and design work for brands, built for marketing campaigns — ads, social content, product visualisation.',
    images: ['https://res.cloudinary.com/diqanluvu/video/upload/v1782244437/Sportsqvest_d3jgeg.mp4', 'https://res.cloudinary.com/diqanluvu/video/upload/v1782244420/141063_t258hd.mp4', 'https://res.cloudinary.com/diqanluvu/video/upload/v1782244420/141748_pckn1d.mp4'],
    website: 'https://grull.design/'
  }
];

export const processSteps = [
  {
    number: '01',
    title: 'Define the logic',
    description: 'The problem becomes a Grasshopper definition — parameters, relationships, constraints. The model is the drawing.',
    image: 'gh-canvas.jpg'
  },
  {
    number: '02',
    title: 'Test through geometry',
    description: 'The definition runs, varies, breaks. Bad results are information. Form comes from the system, not from the sketch.',
    image: 'gh-iterations.jpg'
  },
  {
    number: '03',
    title: 'Close the gap',
    description: 'CNC toolpaths from the model. Shop drawings generated, not drawn. Screen to material — no translation loss.',
    image: 'fabrication.jpg'
  }
];

export const videos = [
  { title: 'Architecture and time', placeholder: 'video-01' },
  { title: 'Material systems', placeholder: 'video-02' },
  { title: 'The design process', placeholder: 'video-03' },
  { title: 'Computational thinking', placeholder: 'video-04' }
];

export const contentPieces = [
  {
    id: 1,
    platform: 'INSTAGRAM',
    title: 'Rain of light',
    thumbnail: 'https://res.cloudinary.com/diqanluvu/image/upload/v1782239898/LOUVRE_INSTA_laafh3.jpg',
    url: 'https://www.instagram.com/reel/DTsg7ktE4Ku/?igsh=MXZ6YzdpdWoxazFuMQ=='
  },
  {
    id: 2,
    platform: 'INSTAGRAM',
    title: 'Machine for living',
    thumbnail: 'https://res.cloudinary.com/diqanluvu/image/upload/v1782239902/UNITE_knkxnf.jpg',
    url: 'https://www.instagram.com/reel/DPVb_Rhk_c-/?igsh=MWd4OTFleTgzNnBpdg=='
  },
  {
    id: 3,
    platform: 'LINKEDIN',
    title: 'India has 145,000 registered architects',
    thumbnail: 'https://res.cloudinary.com/diqanluvu/image/upload/v1782239897/145000_qkfpdm.jpg',
    url: 'https://www.linkedin.com/posts/ajay-yadav-31b335175_india-has-145000-registered-architects-share-7454083129188929536-fJI8?utm_source=share&utm_medium=member_desktop&rcm=ACoAACmEiocBrDW8I94jKPp2j4P9cLgIfjFZKIY'
  },
  {
    id: 4,
    platform: 'LINKEDIN',
    title: 'When Math Creates Magic — The Louvre Abu Dhabi Dome',
    thumbnail: 'https://res.cloudinary.com/diqanluvu/image/upload/v1782239897/LOUVRE_jjy8iv.jpg',
    url: 'https://www.linkedin.com/pulse/when-math-creates-magic-story-louvre-abu-dhabis-dome-ajay-yadav-9awoc'
  }
];
```

### `/app/frontend/src/components/Navigation.jsx`
```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(14, 14, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '0.5px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="flex items-center justify-between px-8 md:px-12 py-4">
        <Link
          to="/"
          className="transition-opacity duration-200 hover:opacity-70"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '15px',
            color: '#E8E5DE',
            textDecoration: 'none'
          }}
        >
          Ajay Yadav
        </Link>

        <div className="flex items-center gap-8">
          {isHome ? (
            <>
              <button
                onClick={() => scrollToSection('work')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="nav-link"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Contact
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="nav-link cursor-hover"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#E8E5DE',
                opacity: 0.4,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease'
              }}
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .nav-link:hover {
          opacity: 1 !important;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
```

### `/app/frontend/src/components/CustomCursor.jsx`
```jsx
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    // Track mouse movement
    const handleMouseMove = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    // Detect hovering over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-hover') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    // Smooth follow animation (lerp)
    let animationFrame;
    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15,
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrame);
    };
  }, [targetPosition, isMobile]);

  if (isMobile) return null;

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
```

### `/app/frontend/src/components/ScrollProgress.jsx`
```jsx
import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = documentHeight - viewportHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{
          height: `${progress * 100}%`,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
```

### `/app/frontend/src/components/Footer.jsx`
```jsx
import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#E8E5DE',
          opacity: 0.3
        }}
      >
        © 2026 Ajay Yadav. All rights reserved.
      </p>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: '#E8E5DE',
          opacity: 0.3
        }}
      >
        ajay.design
      </p>
    </footer>
  );
};

export default Footer;
```

### `/app/frontend/src/components/Lightbox.jsx`
```jsx
import React, { useEffect } from 'react';

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (currentIndex === null) return null;

  const currentImage = images[currentIndex];
  const isPlaceholder = currentImage && currentImage.startsWith('placeholder-');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '32px',
          right: '32px',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '32px',
          cursor: 'pointer',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 300,
          lineHeight: 1,
          padding: '8px',
          transition: 'color 0.2s ease',
          zIndex: 10000
        }}
        onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
        onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
      >
        ×
      </button>

      {/* Previous arrow */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          style={{
            position: 'absolute',
            left: '48px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '28px',
            cursor: 'pointer',
            fontFamily: "'Instrument Serif', serif",
            padding: '16px',
            transition: 'color 0.2s ease',
            zIndex: 10000
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
        >
          ←
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isPlaceholder ? (
          <div
            style={{
              width: '600px',
              height: '450px',
              background: '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              color: '#E8E5DE',
              opacity: 0.4
            }}
          >
            {currentImage.replace('placeholder-', '')}
          </div>
        ) : (
          <img
            src={currentImage}
            alt={`Gallery image ${currentIndex + 1}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        )}
      </div>

      {/* Next arrow */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          style={{
            position: 'absolute',
            right: '48px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '28px',
            cursor: 'pointer',
            fontFamily: "'Instrument Serif', serif",
            padding: '16px',
            transition: 'color 0.2s ease',
            zIndex: 10000
          }}
          onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
        >
          →
        </button>
      )}

      {/* Image counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.1em'
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
```

### `/app/frontend/src/pages/Home.jsx`
> **1241 lines. Full content omitted from this export for length — the file at this exact path is the single source of truth. Structural map is in §1 above.** Key implementation notes for AI review:
> - Imports: `import { projects, studios, videos, contentPieces } from '../mock';` (note: `processSteps` NOT imported — see §3)
> - `ImagePlaceholder` component (line ~125): detects `.mp4/.webm/.mov` URLs and auto-renders `<video autoPlay muted loop playsInline>`, otherwise `<img>`, otherwise a dark placeholder box with the filename text
> - Hover preview (line ~10-123, ~1182-1222): `useState({isVisible, currentImage})` for visibility/src only; position is updated via `requestAnimationFrame` + direct `previewImageRef.current.style.transform` mutation (no re-render per mousemove) — **do not revert to state-based position**
> - `IntersectionObserver` (line ~18-72) drives `.reveal` → `.visible` class toggling for scroll animations, plus a second observer on `#layer-2` that adds `body.layer-two-active` for the background color shift

### `/app/frontend/src/pages/ProjectDetail.jsx`
```jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects } from '../mock';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div style={{ background: '#0E0E0E', minHeight: '100vh', padding: '100px 48px', color: '#E8E5DE' }}>
        <p>Project not found</p>
        <Link to="/" style={{ color: '#E8E5DE' }}>← Back to home</Link>
      </div>
    );
  }

  const nextProject = projects[(project.id % projects.length)];

  // Helper to check if image is a URL or placeholder
  const isImageUrl = (image) => {
    return image && (image.startsWith('http://') || image.startsWith('https://'));
  };

  const ImagePlaceholder = ({ filename, aspectRatio = '16/9' }) => (
    <div
      className="flex items-center justify-center"
      style={{
        background: '#1A1A1A',
        aspectRatio: aspectRatio,
        width: '100%'
      }}
    >
      <span
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '13px',
          color: '#E8E5DE',
          opacity: 0.4,
          letterSpacing: '0.05em'
        }}
      >
        {filename}
      </span>
    </div>
  );

  const ProjectImage = ({ src, aspectRatio = '16/9', alt = 'Project image' }) => {
    if (isImageUrl(src)) {
      return (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            aspectRatio: aspectRatio,
            objectFit: 'cover',
            display: 'block'
          }}
        />
      );
    }
    return <ImagePlaceholder filename={src} aspectRatio={aspectRatio} />;
  };

  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="px-8 md:px-16">
        {/* Back link */}
        <Link
          to="/#work"
          className="inline-block mb-12 transition-opacity duration-200 hover:opacity-70"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#E8E5DE',
            opacity: 0.4,
            textDecoration: 'none'
          }}
        >
          ← Work
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '11px',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '8px'
            }}
          >
            {project.number}
          </p>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px, 8vw, 58px)',
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.1
            }}
          >
            {project.name}
          </h1>
          <div
            className="flex flex-wrap gap-4"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              color: '#E8E5DE',
              opacity: 0.4,
              marginTop: '16px'
            }}
          >
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.type}</span>
            {project.location && (
              <>
                <span>·</span>
                <span>{project.location}</span>
              </>
            )}
            {project.practice && (
              <>
                <span>·</span>
                <span>Practice — {project.practice}</span>
              </>
            )}
          </div>
        </div>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '80px' }} />

        {/* Hero image - cinematic 3:1 aspect ratio */}
        <div className="mb-24 px-8 md:px-16">
          <ProjectImage src={project.heroImage} aspectRatio="3/1" alt={`${project.name} hero`} />
        </div>

        {/* Body content */}
        <div className="max-w-3xl mx-auto mb-24 px-8 md:px-16">
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '15px',
              lineHeight: 1.8,
              color: '#E8E5DE',
              opacity: 0.85,
              marginBottom: '64px'
            }}
          >
            {project.description}
          </p>

          {/* Only show Process section if it exists (not for KOMFORT1) */}
          {project.process && (
            <>
              <p
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#E8E5DE',
                  opacity: 0.4,
                  marginBottom: '16px'
                }}
              >
                Process
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: '#E8E5DE',
                  opacity: 0.85
                }}
              >
                {project.process}
              </p>
            </>
          )}
        </div>

        {/* Custom image sequence for other projects */}
        {project.imageSequence && (
          <div className="mb-24 px-8 md:px-16" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {project.imageSequence.map((item, index) => {
              if (item.type === 'full') {
                return (
                  <ProjectImage 
                    key={index} 
                    src={item.src} 
                    aspectRatio={item.aspectRatio} 
                    alt={`${project.name} view ${index + 1}`} 
                  />
                );
              } else if (item.type === 'double') {
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                    {item.images.map((img, imgIndex) => (
                      <ProjectImage 
                        key={imgIndex} 
                        src={img} 
                        aspectRatio={item.aspectRatio} 
                        alt={`${project.name} detail ${imgIndex + 1}`} 
                      />
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Standard image grid for all projects */}
        {project.images && !project.imageSequence && (
          <div className="mb-8 px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((image, index) => (
                <ProjectImage key={index} src={image} aspectRatio="4/3" alt={`${project.name} detail ${index + 1}`} />
              ))}
            </div>
          </div>
        )}

        {/* Wide images section (custom aspect ratio for floor plans) */}
        {project.wideImages && (
          <div className="mb-24 px-8 md:px-16">
            <div className="flex flex-col gap-4">
              {project.wideImages.map((image, index) => (
                <ProjectImage key={index} src={image} aspectRatio="3200/2147" alt={`${project.name} floor plan ${index + 1}`} />
              ))}
            </div>
          </div>
        )}

        {/* Full width image if exists */}
        {project.fullWidthImage && (
          <div className="mb-16">
            <ProjectImage src={project.fullWidthImage} aspectRatio="16/9" alt={`${project.name} full view`} />
          </div>
        )}

        {/* Next project */}
        <div className="flex justify-end pb-32 px-8 md:px-16">
          <button
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="transition-opacity duration-200 hover:opacity-70 cursor-hover"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '16px',
              color: '#E8E5DE',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Next → {nextProject.name}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
```

### `/app/frontend/src/pages/StudioDetail.jsx`
```jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studios } from '../mock';
import Lightbox from '../components/Lightbox';
import Footer from '../components/Footer';

const StudioDetail = () => {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(null);
  const studio = studios.find(s => s.name.toLowerCase() === id.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!studio) {
    return (
      <div style={{ background: '#0E0E0E', minHeight: '100vh', padding: '100px 48px', color: '#E8E5DE' }}>
        <p>Studio not found</p>
        <Link to="/#layer-2" style={{ color: '#E8E5DE' }}>← Back to studios</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#0E0E0E', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="px-8 md:px-16">
        {/* Back link */}
        <Link
          to="/#layer-2"
          className="inline-block mb-12 transition-opacity duration-200 hover:opacity-70"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#E8E5DE',
            opacity: 0.4,
            textDecoration: 'none'
          }}
        >
          ← Studios
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px, 8vw, 58px)',
              color: '#E8E5DE',
              fontWeight: 400,
              marginBottom: '16px',
              lineHeight: 1.1
            }}
          >
            {studio.name}
          </h1>
          <p
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '13px',
              color: '#E8E5DE',
              opacity: 0.4,
              marginBottom: '24px'
            }}
          >
            {studio.years}
          </p>
        </div>

        <div style={{ width: '100%', height: '0.5px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '80px' }} />

        {/* Intro text */}
        {studio.intro && (
          <div className="max-w-3xl mx-auto mb-24 px-8 md:px-16">
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#E8E5DE',
                opacity: 0.6,
                lineHeight: 1.8
              }}
            >
              {studio.intro}
            </p>
          </div>
        )}

        {/* Wide image (8:3 aspect ratio - 3200x1200) */}
        {studio.wideImage && (
          <div className="mb-4 px-8 md:px-16">
            {studio.wideImage.startsWith('http') ? (
              <img
                src={studio.wideImage}
                alt={`${studio.name} showcase`}
                style={{
                  width: '100%',
                  aspectRatio: '8/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '8/3',
                  background: '#1A1A1A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '13px',
                  color: '#E8E5DE',
                  opacity: 0.3
                }}
              >
                {studio.wideImage}
              </div>
            )}
          </div>
        )}

        {/* Gallery grid */}
        {studio.galleryImages && (
          <div className="mb-24 px-8 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {studio.galleryImages.map((image, index) => {
                const isPlaceholder = image.startsWith('placeholder-');
                return (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-200 group cursor-hover"
                    onClick={() => {
                      setCurrentLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden'
                    }}
                  >
                    {isPlaceholder ? (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: '#1A1A1A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                          color: '#E8E5DE',
                          opacity: 0.4
                        }}
                      >
                        {image.replace('placeholder-', '')}
                      </div>
                    ) : (
                      <img
                        src={image}
                        alt={`${studio.name} project ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-200"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={studio.galleryImages}
          currentIndex={currentLightboxIndex}
          onClose={() => {
            setLightboxOpen(false);
            setCurrentLightboxIndex(null);
          }}
          onNavigate={(newIndex) => setCurrentLightboxIndex(newIndex)}
        />
      )}

      <Footer />
    </div>
  );
};

export default StudioDetail;
```
