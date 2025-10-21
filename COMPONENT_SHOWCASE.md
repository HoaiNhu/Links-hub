# 🎨 Component Showcase - Visual Guide

## 📐 Layout Overview

### Home Page Structure

```
┌─────────────────────────────────────────┐
│  🔗 LinksHub    [Home] [Categories] 👤  │ ← Navigation (Fixed)
├─────────────────────────────────────────┤
│                                         │
│         👋 Xin chào!                    │
│                                         │
│      Chào mừng đến với                  │
│        LinksHub                         │ ← Hero Section
│                                         │
│  [🚀 Khám phá ngay] [Xem Categories]   │
│                                         │
│            ⬇️                            │
├─────────────────────────────────────────┤
│                                         │
│          📊 Thống kê                    │
│                                         │
│  [🔗 100]  [📚 20]  [👥 500]  [👁️ 5K]  │ ← Stats Counter
│  Websites Categories  Users   Views     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│       🔥 Links nổi bật 🔥              │
│                                         │
│  ┌────┐  ┌────┐  ┌────┐               │
│  │ #1 │  │ #2 │  │ #3 │               │ ← Featured Links
│  │Link│  │Link│  │Link│               │   (Grid 3 columns)
│  └────┘  └────┘  └────┘               │
│  ┌────┐  ┌────┐  ┌────┐               │
│  │ #4 │  │ #5 │  │ #6 │               │
│  │Link│  │Link│  │Link│               │
│  └────┘  └────┘  └────┘               │
│                                         │
├─────────────────────────────────────────┤
│  🔗 LinksHub                            │
│  Quick Links    Social Media            │ ← Footer
│  © 2025 Made with ❤️                   │
└─────────────────────────────────────────┘
                                    [↑] ← Scroll to Top
```

### Categories Page Structure

```
┌─────────────────────────────────────────┐
│  🔗 LinksHub    [Home] [Categories] 👤  │ ← Navigation
├─────────────────────────────────────────┤
│                                         │
│      📚 Categories                      │
│  Khám phá thế giới websites...          │
│                                         │
├─────────────────────────────────────────┤
│  🔍 [Search] [Filter▾] [+ Thêm Link]  │ ← Tools Section
│  Tìm thấy 10 categories với 50 links   │
├─────────────────────────────────────────┤
│                                         │
│  💻 Development Tools        [▼]        │
│  ════════════════════════════════       │ ← Accordion
│  │ Tools for developers                │   (Collapsed)
│  │ 15 links                            │
│  └─────────────────────────────────────┤
│                                         │
│  🎨 Design Resources         [▲]        │
│  ════════════════════════════════       │ ← Accordion
│  │ Resources for designers             │   (Expanded)
│  │ 20 links                            │
│  │                                     │
│  │  ┌────────┐  ┌────────┐            │
│  │  │ Link 1 │  │ Link 2 │            │   Links Grid
│  │  │ 👁️ 100 │  │ 👁️ 200 │            │
│  │  └────────┘  └────────┘            │
│  │  ┌────────┐  ┌────────┐            │
│  │  │ Link 3 │  │ Link 4 │            │
│  │  └────────┘  └────────┘            │
│  └─────────────────────────────────────┤
│                                         │
│  [More categories...]                   │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

---

## 🎨 Component Details

### 1. Navigation Bar

```
┌────────────────────────────────────────────┐
│ 🔗 LinksHub    [Home] [Categories]    👤   │
└────────────────────────────────────────────┘
```

**Features**:

- Fixed position at top
- Neumorphism card logo
- Active tab with underline indicator
- Hover effects on tabs
- Admin icon button
- Smooth animations

**Colors**:

- Background: Light Cyan (#caf0f8)
- Active tab: Purple (#6f2dbd)
- Text: Navy Blue (#03045e)

**Animations**:

- Tab switch: Layout animation
- Hover: Scale up slightly
- Slide down on mount

---

### 2. Hero Section

```
┌────────────────────────────────────┐
│                                    │
│    ~ Animated background ~         │
│                                    │
│      👋 Xin chào, User!            │
│                                    │
│   Chào mừng đến với                │
│      LinksHub                      │
│                                    │
│   Nơi tổng hợp websites...         │
│                                    │
│  [🚀 Khám phá ngay] [Categories]  │
│                                    │
│            ⬇️                       │
│                                    │
└────────────────────────────────────┘
```

**Features**:

- Full-screen height
- Animated gradient circles in background
- Floating emoji decorations (💡🚀⭐)
- Two CTA buttons
- Animated scroll indicator
- Color-transitioning title

**Animations**:

- Background circles: Rotate and scale
- Title: Color transition loop
- Floating elements: Up/down motion
- Scroll indicator: Bounce
- CTA buttons: Hover lift

---

### 3. Stats Counter

```
┌────────────────────────────────────┐
│         📊 Thống kê                │
│                                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌───┐ │
│  │  🔗  │ │  📚  │ │  👥  │ │ 👁️ │ │
│  │ 100  │ │  20  │ │ 500  │ │ 5K │ │
│  │Sites │ │ Cats │ │Users │ │View│ │
│  │──────│ │──────│ │──────│ │────│ │
│  └──────┘ └──────┘ └──────┘ └───┘ │
└────────────────────────────────────┘
```

**Features**:

- 4 stat cards in grid
- Animated number counting
- Icon rotation on hover
- Gradient progress bars
- Staggered entrance

**Animations**:

- Numbers: Count up from 0
- Cards: Slide up on scroll
- Icons: Rotate 360° on hover
- Progress bars: Width expand
- Hover: Lift effect

**Colors**:

- Cards: Neumorphism effect
- Icons: Primary & Secondary colors
- Numbers: Navy Blue
- Labels: Lighter shade

---

### 4. Featured Links

```
┌────────────────────────────────────┐
│      🔥 Links nổi bật 🔥          │
│                                    │
│  ┌────────────┐ ┌────────────┐    │
│  │    #1      │ │    #2      │    │
│  │ Category   │ │ Category   │    │
│  │ Title      │ │ Title      │    │
│  │ Desc...    │ │ Desc...    │    │
│  │ 👁️ 500 🖱️ 20│ │ 👁️ 400 🖱️ 15│    │
│  │ [Truy cập] │ │ [Truy cập] │    │
│  └────────────┘ └────────────┘    │
│                                    │
│  [4 more cards...]                 │
└────────────────────────────────────┘
```

**Features**:

- 3-column grid (responsive)
- Top 6 most popular links
- Rank badges (1-6)
- Category tags
- View/click statistics
- Visit buttons
- Gradient overlay on hover

**Animations**:

- Cards: Slide up on scroll
- Rank badge: Rotate in
- Hover: Lift and scale
- Button: Scale on tap

**Card Structure**:

- Rank badge (top-right)
- Category tag (top-left)
- Title (bold)
- Description (truncated)
- Stats row
- CTA button

---

### 5. Categories Accordion

```
┌────────────────────────────────────┐
│  💻 Development Tools        [▼]   │
│  ════════════════════════════       │
│  15 links                          │
└────────────────────────────────────┘
        ↓ Click to expand
┌────────────────────────────────────┐
│  💻 Development Tools        [▲]   │
│  ════════════════════════════       │
│  Tools for developers              │
│  15 links                          │
│  ┌──────────┐ ┌──────────┐        │
│  │ Link 1   │ │ Link 2   │        │
│  │ Desc...  │ │ Desc...  │        │
│  │ 👁️ 100   │ │ 👁️ 200   │        │
│  │ [Visit]  │ │ [Visit]  │        │
│  └──────────┘ └──────────┘        │
│  [More links...]                   │
└────────────────────────────────────┘
```

**Features**:

- Accordion style (one open at a time)
- Category icon (large)
- Link count
- Description when expanded
- Links grid (2 columns)
- Smooth expand/collapse

**Animations**:

- Expand: Height animation
- Icon: Rotate on hover
- Arrow: Rotate 180° on toggle
- Links: Fade in when expanded
- Hover: Background color change

---

### 6. Footer

```
┌────────────────────────────────────┐
│  🔗 LinksHub    Quick Links         │
│  Description    → Home              │
│                 → Categories        │
│                 → About             │
│                                     │
│  Social Media                       │
│  [GitHub] [Twitter] [LinkedIn] [@]  │
│                                     │
│  ══════════════════════════════     │
│  © 2025 Made with ❤️ by Team       │
└────────────────────────────────────┘
```

**Features**:

- 3-column layout
- Logo and description
- Quick links
- Social media icons
- Animated divider
- Copyright with beating heart

**Animations**:

- Social icons: Scale on hover
- Heart: Beat animation
- Divider: Width expand
- Decorative circles: Rotate

---

### 7. Search & Filter Tools

```
┌────────────────────────────────────┐
│  🔍 [Search categories...]          │
│  🎯 [Sort: A-Z ▾] [+ Thêm Link]   │
│  Tìm thấy 10 categories...         │
└────────────────────────────────────┘
```

**Features**:

- Search input (neumorphism inset)
- Sort dropdown
- Add button (purple CTA)
- Results counter

**Animations**:

- Input: Focus depth effect
- Dropdown: Slide down
- Button: Hover lift

---

## 🎨 Neumorphism Effects

### Card Effect

```
┌─────────────────┐
│                 │  ← Light shadow (top-left)
│   Card Content  │
│                 │  ← Dark shadow (bottom-right)
└─────────────────┘

box-shadow:
  8px 8px 16px #a8c5d1,    ← Bottom-right
  -8px -8px 16px #ffffff   ← Top-left
```

### Button Effect (Normal)

```
┌───────────┐
│  Button   │  Raised effect
└───────────┘
```

### Button Effect (Pressed)

```
┌───────────┐
│  Button   │  Inset effect
└───────────┘

box-shadow:
  inset 4px 4px 8px #a8c5d1,
  inset -4px -4px 8px #ffffff
```

### Input Effect

```
┌───────────────┐
│ [Input text]  │  Inset effect (always)
└───────────────┘
```

---

## 🎭 Animation Timing

### Quick Reference

```
Fade In:        0.5s
Slide Up:       0.5-0.6s
Scale:          0.3s
Hover:          0.2s
Rotate:         0.6s
Float:          3s (infinite)
Count:          2s
Color:          3s (infinite)
Layout:         0.3s (spring)
```

### Stagger Pattern

```
Item 0: 0.0s delay
Item 1: 0.1s delay
Item 2: 0.2s delay
Item 3: 0.3s delay
...
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)

```
┌──────────┐
│ 1 column │
│          │
│ [Card]   │
│ [Card]   │
│ [Card]   │
└──────────┘
```

### Tablet (768px - 1024px)

```
┌─────────────────┐
│   2 columns     │
│ [Card] [Card]   │
│ [Card] [Card]   │
└─────────────────┘
```

### Desktop (> 1024px)

```
┌──────────────────────────┐
│      3-4 columns         │
│ [Card] [Card] [Card]     │
│ [Card] [Card] [Card]     │
└──────────────────────────┘
```

---

## 🎨 Color Usage Guide

### Primary Navy Blue (#03045e)

- Main text
- Headings
- Dark contrasting elements
- Important labels

### Secondary Purple (#6f2dbd)

- CTA buttons
- Accents
- Active states
- Highlights

### Background Light Cyan (#caf0f8)

- Main background
- Card backgrounds
- Button backgrounds
- Input backgrounds

### Shadows

- Light: #a8c5d1 (bottom-right)
- Bright: #ffffff (top-left)

---

## 🚀 Interactive States

### Button States

```
Normal:   Raised neumorphism
Hover:    Stronger shadow + lift
Active:   Inset shadow
Focus:    Outline (for accessibility)
```

### Card States

```
Normal:   Standard shadow
Hover:    Lift up + stronger shadow
Active:   Slight scale down
```

### Input States

```
Normal:   Inset shadow
Focus:    Deeper inset + ring
Error:    Red tint
Success:  Green tint
```

---

## 💡 Usage Tips

1. **Consistency**: Always use the same shadow pattern for similar elements
2. **Contrast**: Use dark/purple variants for important CTAs
3. **Spacing**: Maintain consistent padding (6, 8 units)
4. **Animations**: Keep smooth and not too fast
5. **Accessibility**: Ensure proper color contrast
6. **Performance**: Use GPU-accelerated properties

---

## 📊 Component Checklist

When creating new components:

- [ ] Use neumorphism classes
- [ ] Add hover effects
- [ ] Add tap/click feedback
- [ ] Implement responsive design
- [ ] Add entrance animation
- [ ] Use proper color tokens
- [ ] Maintain consistent spacing
- [ ] Add loading states
- [ ] Consider accessibility
- [ ] Test on mobile

---

**Visual Guide Version**: 1.0  
**Last Updated**: October 21, 2025

For code examples, see individual component files in `src/components/`
