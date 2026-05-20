# Ajay Yadav Portfolio Website - Complete Summary

## Project Overview
A two-layer personal portfolio website for Ajay Yadav, an architect and computational designer based in Delhi, India. The website functions as a cinematic, scroll-driven narrative showcasing architectural projects, furniture design, and studio work.

---

## Design System

### Color Palette

**Primary Colors:**
- `#0E0E0E` - Main background (deep black)
- `#E8E5DE` - Primary text color (warm off-white)
- `#0A0A0A` - Footer background (slightly darker than main)

**Accent & UI Colors:**
- `#1A1A1A` - Placeholder backgrounds, image letterboxing
- `#111111` - Image backgrounds for aspect ratio containers
- `rgba(255, 255, 255, 0.08)` - Divider lines (main sections)
- `rgba(255, 255, 255, 0.06)` - Footer border, subtle separators
- `rgba(255, 255, 255, 0.3)` - Footer text, interactive element borders

**Text Opacity Hierarchy:**
- `1.0` (100%) - Hero headlines, primary emphasis
- `0.85` - Body copy, paragraphs
- `0.6` - Italicized secondary text
- `0.45` - Descriptive text, image captions
- `0.4` - Section labels, metadata
- `0.3` - Footer text, ultra-subtle elements

### Typography

**Primary Fonts:**
1. **Instrument Serif** (Google Fonts) - Display & body serif
   - Used for: Hero headlines, project names, body text, descriptions
   - Imported via: `https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap`

2. **Arial** - Sans-serif for UI elements
   - Used for: Labels, metadata, navigation, buttons, captions
   - System fallback: `Arial, sans-serif`

**Font Size Hierarchy:**

| Element | Size | Font | Weight | Notes |
|---------|------|------|--------|-------|
| Hero Name (H1) | `clamp(48px, 10vw, 140px)` | Instrument Serif | 400 | Responsive, no letter-spacing |
| Hero Tagline | `clamp(16px, 2.5vw, 22px)` | Instrument Serif | 400 | Italic, 45% opacity |
| Project Hero Title | `clamp(48px, 8vw, 90px)` | Instrument Serif | 400 | `-0.02em` letter-spacing |
| Studio Name | `34px` | Instrument Serif | 400 | `-0.02em` letter-spacing |
| Section Headings (H2) | `28px` | Instrument Serif | 400 | Used sparingly |
| Contact Email | `clamp(28px, 6vw, 40px)` | Instrument Serif | 400 | Large, clickable |
| Body Text | `15px–17px` | Instrument Serif | 400 | Line height 1.6–1.9 |
| Italicized Body | `17px` | Instrument Serif | 400 | Italic, 60% opacity |
| Project Description | `16px` | Instrument Serif | 400 | Italic, 45% opacity |
| Image Captions | `14px` | Instrument Serif | 400 | 45% opacity |
| Section Labels | `10px` | Arial | 400 | Uppercase, 0.18em spacing |
| Metadata | `11px–13px` | Arial | 400 | Uppercase, 0.14–0.16em spacing |
| Footer Text | `11px` | Arial | 400 | Uppercase, 0.14em spacing, 30% opacity |

**Typography Rules:**
- **Serif (Instrument Serif):** All headlines, names, body copy, descriptions
- **Sans-serif (Arial):** All uppercase labels, metadata, UI elements
- **Letter-spacing:** Uppercase Arial text always uses generous letter-spacing (0.14em–0.18em)
- **Line height:** Body text uses 1.6–1.9 for readability
- **Italic:** Used for secondary descriptive text, philosophical statements

---

## Website Skeleton & Structure

### Navigation
**Fixed Top Navigation Bar:**
- Position: Fixed top, transparent background with backdrop blur
- Height: ~80px
- Left: "Ajay Yadav" logo (links to home)
- Right: WORK | ABOUT | CONTACT (smooth scroll anchor links)
- Styling: 11px Arial, uppercase, 0.14em letter-spacing, 40% opacity
- Hover: Transitions to 70% opacity

### Custom UI Elements
1. **Custom Cursor:** Circular follow cursor (24px diameter, white border, replaces default)
2. **Scroll Progress Bar:** Fixed bottom, shows scroll progress (2px height, white, 30% opacity)

---

## Homepage Structure (10 Sections)

### Section 1: Hero
- **Layout:** Full viewport height, centered content
- **Content:** 
  - Name: "Ajay Yadav" (massive, responsive)
  - Tagline: "Architect · Computational Designer · Delhi"
- **Background:** Solid `#0E0E0E`
- **Animation:** Fade-in reveal on load

### Section 2: Hero Video
- **Layout:** Full-width cinematic video
- **Aspect Ratio:** 21:9 (ultra-wide cinematic)
- **Content:** Cloudinary-hosted hero video
- **Styling:** No border-radius, letterboxed with `#111111` background

### Section 3: Introduction Text
- **Layout:** Single column, centered, max-width constrained
- **Content:** 2-3 paragraph introduction to Ajay's work and philosophy
- **Typography:** 17px Instrument Serif, italic, 60% opacity
- **Animation:** Scroll-triggered reveal

### Section 4: Philosophy Statement
- **Layout:** Centered quote-style block
- **Content:** Personal design philosophy
- **Typography:** Larger serif, italic, emphasized
- **Styling:** Extra whitespace, standalone statement

### Section 5: Selected Work Grid
- **ID:** `#work` (anchor link target)
- **Layout:** CSS Grid, 2 columns (desktop), 1 column (mobile)
- **Content:** 8 project cards
- **Card Structure:**
  - Hover-enabled image (3:1 cinematic aspect ratio)
  - Project number (top-left, "01", "02", etc.)
  - Short project name (e.g., "LINE", "KOMFORT1")
  - Project type + year (11px Arial, uppercase)
- **Interaction:** Hover opacity 70%, navigates to `/project/:id`
- **Animation:** Staggered scroll reveal

### Section 6: Process Diagram
- **Layout:** Large visual diagram showing design process
- **Content:** Placeholder for process visualization
- **Styling:** Dark background, minimal contrast

### Section 7: Studio Timeline
- **Layout:** Vertical timeline, 3 studios listed
- **Content:**
  1. **7day3io** (2019–2022): 3 preview images + "View full gallery" link → `/studio/7day3io`
  2. **Grull.Work** (2022–2024): 3 preview images
  3. **Grull.Design** (2024): 3 preview images
- **Structure:** Studio name (34px serif) + years + description + image grid
- **Dividers:** 0.5px white lines between studios (8% opacity)

### Section 8: About
- **ID:** `#about` (anchor link target)
- **Layout:** Two-column grid
- **Left Column:** 4 paragraphs of biographical text (15px serif, 85% opacity)
- **Right Column:** Structured metadata blocks:
  - Education: B.Arch, NIT Hamirpur (2018–2023)
  - Currently: Computational Designer, Facade practice, Delhi
  - Tools: Rhinoceros, Grasshopper, Revit, Lumion, Photoshop, etc.
- **Animation:** Staggered paragraph reveals

### Section 9: Writing & Video
- **Layout:** 2-column grid of video placeholders
- **Content:** 2 video thumbnails with titles
- **Styling:** 16:9 aspect ratio boxes with play button overlays
- **Typography:** 14px serif captions, 45% opacity

### Section 10: Contact
- **ID:** `#contact` (anchor link target)
- **Layout:** Centered email + 3-column metadata grid
- **Content:**
  - Large email: `hello@ajay.design` (clickable mailto link)
  - Three columns:
    1. **Location:** New Delhi, India
    2. **Open To:** Netherlands, Germany, UAE | Full-time from mid-2027
    3. **Elsewhere:** LinkedIn, Portfolio PDF on request
- **Divider:** 0.5px line above contact info
- **Animation:** Fade-in reveals

### Footer (Global)
- **Layout:** Full-width, flexbox, space-between
- **Background:** `#0A0A0A` (darker than page)
- **Border:** 0.5px top border, `rgba(255,255,255,0.06)`
- **Padding:** 24px 48px
- **Content:**
  - Left: "© 2026 Ajay Yadav. All rights reserved."
  - Right: "ajay.design"
- **Typography:** 11px Arial, uppercase, 0.14em letter-spacing, 30% opacity

---

## Project Detail Pages

**Route:** `/project/:id` (8 projects total)

### Page Structure:
1. **Back Link:** Top-left, "← Back to home" (links to `/#work`)
2. **Hero Image:** Full-width, 3:1 cinematic aspect ratio
3. **Project Title:** Large serif headline (48–90px responsive)
4. **Metadata Row:** Project number | Type | Year | Practice (if applicable) | Location
5. **Description:** Full project write-up (16px serif, italic, 45% opacity)
6. **Tools Row:** Listed computational tools used
7. **Image Grid:** 2-column grid, 4:3 aspect ratio images, generous 32px gap
8. **Next Project Button:** Bottom of page, links to next project in sequence
9. **Footer:** Global footer component

### Image Display Rules:
- **Hero:** 3:1 aspect ratio, no border-radius
- **Grid Images:** 4:3 aspect ratio, object-fit cover, no border-radius
- **Placeholders:** Dark grey boxes (`#1A1A1A`) with filename text (13px Arial, 40% opacity)
- **Real Images:** Cloudinary URLs, aspect-ratio CSS property maintains proportions

### Current Project Status:
| Project ID | Name | Hero Image | Grid Images | Status |
|------------|------|------------|-------------|--------|
| 1 | LINE rocking chair | ✅ Real | ✅ 4 Real | Complete |
| 2 | KOMFORT1 lounger | ✅ Real | ✅ 4 Real | Complete |
| 3 | LAITLUM wall art | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |
| 4 | Mortar House | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |
| 5 | UNIT1 welcome console | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |
| 6 | Museum of Architecture | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |
| 7 | The Edge | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |
| 8 | Forest Floors | ⚠️ Placeholder | ⚠️ Placeholders | Needs images |

---

## Studio Detail Pages

**Route:** `/studio/:id` (currently only 7day3io)

### 7day3io Gallery Page:
- **Back Link:** Top-left, "← Back to home"
- **Studio Name:** Large serif headline (48–80px)
- **Years:** "2019 – 2022" (11px Arial, 40% opacity)
- **Introduction:** Full paragraph describing the studio
- **Gallery Grid:** 4-column grid (responsive to 2 columns mobile)
  - 20 image placeholders
  - 16:9 aspect ratio
  - Numbered 01–20
  - Click opens Lightbox
- **Lightbox Component:** 
  - Full-screen overlay (`#0A0A0A` background, 95% opacity)
  - Image centered, max 90vh height
  - Left/Right navigation arrows
  - Close button (top-right)
  - Current image number display
- **Footer:** Global footer component

---

## Animation System

### Scroll-Triggered Reveals
**Implementation:** Pure CSS + IntersectionObserver (no external libraries)

**Classes:**
- `.reveal` - Applied to animated elements
- `.visible` - Added when element enters viewport

**Animation Behavior:**
- Initial state: `opacity: 0`, `transform: translateY(30px)`
- Animated state: `opacity: 1`, `transform: translateY(0)`
- Transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Threshold: 10% of element visible triggers animation

**Staggered Animations:**
- Attribute: `data-stagger-delay="0.1"` (increments: 0.1, 0.2, 0.3, etc.)
- Applied to sequential elements (paragraphs, grid items)
- Creates cascading reveal effect

**Special Animations:**
- `.section-label-reveal` - Section headings fade in first
- `.contact-email-reveal` - Contact email has slight upward motion
- Hover states: `transition-opacity duration-200 hover:opacity-70`

---

## Spacing & Layout System

### Container Padding:
- Desktop: `48px` horizontal, `32px–48px` vertical
- Mobile: `32px` horizontal (via `px-8` = 2rem)
- Section padding: `py-24 md:py-32` (96px–128px vertical)

### Grid Gaps:
- Work grid: `32px` gap
- Image grids: `32px` gap (desktop), `16px` (mobile)
- Studio gallery: `8px` gap (tight, gallery-style)

### Whitespace Philosophy:
- **Generous vertical spacing** between sections (96–128px)
- **Wide margins** around text blocks (max-width constraints)
- **Breathing room** around images (32px+ gaps)
- **Minimal horizontal constraints** on full-width images

### Responsive Breakpoints:
- Mobile: `< 768px` (1 column layouts)
- Desktop: `≥ 768px` (multi-column grids, larger text)
- Uses Tailwind's `md:` prefix for responsive classes

---

## Technical Architecture

### Tech Stack:
- **Frontend:** React 18+ (Create React App)
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS + inline styles (for precise design control)
- **State Management:** React hooks (useState, useEffect, useRef)
- **Data Source:** `/app/frontend/src/mock.js` (centralized data file)
- **Media Hosting:** Cloudinary CDN

### File Structure:
```
/app/frontend/src/
├── App.js                    # Main app component, routing setup
├── App.css                   # Global styles, animations, cursor
├── index.css                 # Tailwind imports, base styles
├── mock.js                   # All content data (projects, studios, videos)
├── components/
│   ├── Navigation.jsx        # Fixed top navigation
│   ├── CustomCursor.jsx      # Custom circular cursor
│   ├── ScrollProgress.jsx    # Bottom scroll indicator
│   ├── Footer.jsx            # Global footer component
│   └── Lightbox.jsx          # Image lightbox for galleries
└── pages/
    ├── Home.jsx              # Homepage (10 sections, ~1050 lines)
    ├── ProjectDetail.jsx     # Project page template
    └── StudioDetail.jsx      # Studio gallery page template
```

### Data Structure (mock.js):

**Projects Array:**
```javascript
{
  id: 1,
  number: '01',
  name: 'LINE rocking chair',
  shortName: 'LINE',              // Used in work grid
  type: 'Parametric · Fabricated',
  year: '2024',
  practice: 'Logic Design + Build', // Optional, only for built projects
  description: '...',              // Full project description
  tools: 'Rhinoceros 3D · Grasshopper · ...',
  location: 'Delhi',
  heroImage: 'cloudinary-url or placeholder.jpg',
  selectedWorkImage: 'cloudinary-url',  // For work grid
  images: ['url1', 'url2', 'url3', 'url4'] // Grid images
}
```

**Studios Array:**
```javascript
{
  name: '7day3io',
  years: '2019 – 2022',
  description: '...',              // Short description for homepage
  intro: '...',                    // Full intro for detail page
  images: ['img1', 'img2', 'img3'], // 3 preview images for homepage
  galleryImages: ['img1', 'img2', ..., 'img20'] // Full gallery (optional)
}
```

---

## Critical Design Rules

### ❌ Never Do:
1. **No border-radius on images** - All images have sharp, 90° corners
2. **No gradients** - Solid colors only (except subtle rgba overlays)
3. **No sans-serif for body text** - Only Arial for UI/labels
4. **No external animation libraries** - Pure CSS/IntersectionObserver only
5. **No URL hardcoding** - All media via mock.js data structure
6. **No color deviations** - Strict adherence to `#0E0E0E` / `#E8E5DE` palette

### ✅ Always Do:
1. **Maintain aspect ratios:** 21:9 (hero video), 3:1 (hero images), 4:3 (grid images), 16:9 (studio previews)
2. **Use letterboxing:** Dark backgrounds (`#111111`) behind images to maintain aspect ratios
3. **Generous whitespace:** 96–128px vertical section spacing
4. **Uppercase labels with letter-spacing:** All Arial UI text (0.14–0.18em)
5. **Opacity hierarchy:** Maintain text opacity system (100% → 85% → 60% → 45% → 40% → 30%)
6. **Scroll reveals:** Apply `.reveal` class to all major content blocks
7. **Hover states:** 70% opacity on interactive elements

---

## Current State & Known Gaps

### Completed:
- ✅ Full 10-section homepage with scroll animations
- ✅ 8 project detail pages with dynamic routing
- ✅ 1 studio gallery page (7day3io) with 20-image grid + Lightbox
- ✅ Global footer on all pages
- ✅ Custom cursor and scroll progress indicator
- ✅ Real images for LINE and KOMFORT1 projects
- ✅ Responsive design (mobile + desktop)

### Pending:
- ⚠️ Replace 20 placeholder images in 7day3io gallery
- ⚠️ Replace placeholder images for 6 remaining projects
- ⚠️ Backend/database integration (currently mock data only)
- ⚠️ Embed links for Writing & Video section
- ⚠️ LinkedIn URL (currently placeholder `#`)

---

## Design Philosophy Summary

**Core Principles:**
1. **Cinematic presentation** - Wide aspect ratios, dramatic whitespace, slow reveals
2. **Typographic hierarchy** - Two fonts only, strict size/opacity system
3. **Minimal color palette** - Near-black + warm white, no color accents
4. **No ornamentation** - Sharp edges, solid colors, functional design
5. **Content-first** - Images and text breathe, UI elements recede
6. **Scroll as narrative** - Page unfolds like a story, not a dashboard

**User Experience:**
- Smooth, slow animations create contemplative pace
- Custom cursor and progress bar reinforce crafted experience
- Generous spacing reduces cognitive load
- Clear hierarchy guides eye through content
- Mobile-responsive without compromising desktop elegance

---

## Future Considerations

### Phase 2 (Backend Integration):
- Replace mock.js with MongoDB/API
- Admin panel for content management
- Dynamic project creation/editing

### Phase 3 (Enhancements):
- Embed YouTube/Vimeo videos in Writing & Video section
- Interactive process diagram (Section 6)
- PDF portfolio download functionality
- Contact form with backend

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Author:** Generated for AI agent comprehension  
**Website Status:** Functional frontend with mock data, ready for content population
