# Design System - Neumorphism LinksHub

## 🎨 Color Palette

### Primary Colors

- **Primary Dark**: `#03045e` - Màu chủ đạo chính, dùng cho text và elements quan trọng
- **Light Cyan**: `#caf0f8` - Background chính, tạo hiệu ứng neumorphism
- **Purple Accent**: `#6f2dbd` - Màu nhấn, CTA buttons và highlights

### Color Usage

```css
/* Background */
background: #caf0f8 (light-500)

/* Primary Text */
color: #03045e (primary-500)

/* Accent Elements */
color: #6f2dbd (secondary-500)

/* Shadows for Neumorphism */
light-shadow: #a8c5d1
bright-shadow: #ffffff
```

## 🔨 Neumorphism Effects

### Card Style

```css
.neuro-card {
  background: #caf0f8;
  border-radius: 20px;
  box-shadow: 8px 8px 16px #a8c5d1, -8px -8px 16px #ffffff;
}
```

### Button Style

```css
.neuro-button {
  background: #caf0f8;
  border-radius: 12px;
  box-shadow: 6px 6px 12px #a8c5d1, -6px -6px 12px #ffffff;
}

.neuro-button:hover {
  box-shadow: 8px 8px 16px #a8c5d1, -8px -8px 16px #ffffff;
}

.neuro-button:active {
  box-shadow: inset 4px 4px 8px #a8c5d1, inset -4px -4px 8px #ffffff;
}
```

### Input Style

```css
.neuro-input {
  background: #caf0f8;
  border-radius: 12px;
  box-shadow: inset 4px 4px 8px #a8c5d1, inset -4px -4px 8px #ffffff;
}
```

### Dark Variant (for contrast)

```css
.neuro-dark {
  background: #03045e;
  color: #caf0f8;
  box-shadow: 8px 8px 16px #020339, -8px -8px 16px #050875;
}
```

### Purple Variant (for CTAs)

```css
.neuro-purple {
  background: #6f2dbd;
  color: white;
  box-shadow: 8px 8px 16px #5a249a, -8px -8px 16px #8436e0;
}
```

## ✨ Animations

### Framer Motion Variants

#### Fade In

```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

#### Slide Up

```typescript
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

#### Scale In

```typescript
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}
```

#### Float Effect

```typescript
animate={{ y: [0, -20, 0] }}
transition={{
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut"
}}
```

#### Hover Effects

```typescript
whileHover={{
  y: -5,
  scale: 1.05,
  transition: { duration: 0.2 }
}}
```

#### Tap Effects

```typescript
whileTap={{ scale: 0.95 }}
```

## 📐 Layout Structure

### Home Page Structure

1. **Navigation** (fixed top)
2. **Hero Section** (full screen)
   - Animated background
   - Welcome message
   - CTA buttons
   - Scroll indicator
3. **Stats Counter** (animated)
   - Total links
   - Total categories
   - Total users
   - Total views
4. **Featured Links** (grid layout)
   - Top 6 most viewed/clicked links
   - Rank badges
   - Interactive cards
5. **Footer**
   - Logo
   - Quick links
   - Social media
   - Copyright

### Categories Page Structure

1. **Navigation** (fixed top)
2. **Page Header**
   - Title
   - Description
3. **Tools Section**
   - Search bar
   - Filter/Sort
   - Add Link button
4. **Categories List**
   - Accordion style
   - Expandable cards
   - Links grid inside each category
5. **Footer**

## 🎯 Component Guidelines

### Navigation

- Fixed position at top
- Smooth scroll
- Active tab indicator with layout animation
- Hover effects with color transitions

### Cards

- Always use `neuro-card` class
- Add hover effect: `whileHover={{ y: -5 }}`
- Round corners: `rounded-3xl` or `rounded-2xl`
- Padding: `p-6` or `p-8`

### Buttons

- Primary: `neuro-purple` class
- Secondary: `neuro-button` class
- Always add hover/tap animations
- Icon + Text combination preferred

### Inputs

- Use `neuro-input` class
- Remove default borders
- Add focus state with deeper shadow

### Text Hierarchy

- **H1**: `text-5xl md:text-7xl font-bold text-primary-500`
- **H2**: `text-4xl md:text-5xl font-bold text-primary-500`
- **H3**: `text-2xl font-bold text-primary-500`
- **Body**: `text-lg text-primary-600`
- **Small**: `text-sm text-primary-600`

## 🚀 Best Practices

### Performance

1. Use `useInView` from Framer Motion for scroll animations
2. Add `once: true` to prevent re-triggering
3. Use `layoutId` for shared element transitions
4. Lazy load images and components

### Accessibility

1. Always provide `aria-label` for icon buttons
2. Use semantic HTML
3. Ensure proper color contrast
4. Add focus states for keyboard navigation

### Animation Timing

- **Fade In**: 0.5-0.6s
- **Slide**: 0.4-0.5s
- **Hover**: 0.2-0.3s
- **Stagger Children**: 0.1s delay between each

### Spacing

- **Section Padding**: `py-20`
- **Container Max Width**: `max-w-7xl`
- **Card Gap**: `gap-8` for desktop, `gap-4` for mobile
- **Element Spacing**: Use multiples of 4 (4, 8, 12, 16, 20, 24)

## 📱 Responsive Design

### Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

### Grid Layouts

```tsx
// Categories Grid
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

// Stats Grid
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";

// Links Grid
className = "grid grid-cols-1 md:grid-cols-2 gap-4";
```

## 🎨 Icon Usage

- Use React Icons library
- Prefer `react-icons/fa` for consistency
- Icon size: `text-lg`, `text-xl`, `text-2xl`, `text-3xl`
- Always pair with animations on interactive elements

## 💡 Tips

1. Test animations on slower devices
2. Keep shadows consistent across similar elements
3. Use color transitions for smooth hover effects
4. Add loading states for better UX
5. Implement error boundaries
6. Use TypeScript for type safety
