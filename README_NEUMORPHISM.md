# 🔗 LinksHub - Neumorphism Design

Nền tảng tổng hợp những website hữu ích với thiết kế Neumorphism hiện đại và sinh động.

## ✨ Features

### 🏠 Home Page

- **Hero Section**: Full-screen hero với animated background và greeting message
- **Stats Counter**: Animated counter hiển thị thống kê (links, categories, users, views)
- **Featured Links**: Top 6 links được view/click nhiều nhất với rank badges
- **Footer**: Logo, quick links, social media icons

### 📚 Categories Page

- **Search & Filter**: Tìm kiếm và sắp xếp categories theo tên hoặc số lượng links
- **Accordion Layout**: Expandable categories với smooth animations
- **Link Cards**: Hiển thị links trong mỗi category với stats (views, clicks)
- **Add Link Button**: Quick access để thêm link mới

### 🎨 Design System

- **Neumorphism Style**: Soft shadows và depth effects
- **Color Palette**:
  - Primary: `#03045e` (Navy Blue)
  - Secondary: `#6f2dbd` (Purple)
  - Background: `#caf0f8` (Light Cyan)
- **Animations**: Framer Motion cho smooth transitions và interactive elements
- **Responsive**: Mobile-first design

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Icons**: React Icons
- **TypeScript**: Full type safety

## 📦 Installation

```bash
# Clone repository
git clone <repository-url>
cd my-links-hub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

## 🔧 Environment Variables

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Other configurations...
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── categories/
│   │   └── page.tsx          # Categories page
│   ├── admin/                # Admin panel
│   ├── api/                  # API routes
│   └── globals.css           # Global styles with Neumorphism
├── components/
│   ├── Navigation.tsx        # Main navigation with tabs
│   ├── HeroSection.tsx       # Hero section with animations
│   ├── StatsCounter.tsx      # Animated stats counter
│   ├── FeaturedLinks.tsx     # Featured links grid
│   ├── CategoriesContent.tsx # Categories page content
│   └── Footer.tsx            # Footer component
├── models/                   # MongoDB models
├── lib/                      # Utilities and helpers
└── types/                    # TypeScript type definitions
```

## 🎨 Design System

Chi tiết về design system được documented trong [DESIGN_SYSTEM_NEUMORPHISM.md](./DESIGN_SYSTEM_NEUMORPHISM.md)

### Key Classes

```css
/* Cards */
.neuro-card - Neumorphism card effect
.neuro-button - Neumorphism button
.neuro-input - Neumorphism input field

/* Variants */
.neuro-dark - Dark variant for contrast
.neuro-purple - Purple variant for CTAs

/* Shadows */
shadow-neuro - Standard neumorphism shadow
shadow-neuro-lg - Large neumorphism shadow
shadow-neuro-inset - Inset shadow for inputs;
```

## 🎬 Animations

### Common Patterns

```tsx
// Fade in on mount
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

// Slide up on scroll
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>

// Hover effects
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  whileTap={{ scale: 0.95 }}
>
```

## 📱 Pages Overview

### Home (`/`)

1. Navigation bar với tabs (Home, Categories)
2. Hero section full-screen với animated elements
3. Stats counter với animated numbers
4. Featured links grid (top 6)
5. Footer với social links

### Categories (`/categories`)

1. Navigation bar
2. Page header với title và description
3. Search bar + Filter dropdown + Add button
4. Accordion-style categories list
5. Each category expands to show links grid
6. Footer

### Admin (`/admin`)

- Existing admin functionality
- Access via user icon in navigation

## 🔐 Authentication

- NextAuth.js với MongoDB adapter
- User roles: user, admin
- Protected routes
- Session management

## 🌐 API Routes

```
/api/links - CRUD operations for links
/api/links/[id]/click - Track link clicks
/api/links/[id]/view - Track link views
/api/categories - CRUD operations for categories
/api/auth - NextAuth endpoints
```

## 🎯 Features Checklist

- [x] Neumorphism design system
- [x] Framer Motion animations
- [x] Home page with hero section
- [x] Stats counter with animation
- [x] Featured links section
- [x] Categories page with accordion
- [x] Search and filter functionality
- [x] Responsive design
- [x] Navigation with tabs
- [x] Footer with social links
- [ ] User authentication UI update
- [ ] Admin panel UI update with Neumorphism
- [ ] Dark mode toggle
- [ ] Advanced search filters
- [ ] Link submission form
- [ ] User dashboard

## 🐛 Known Issues

- TypeScript lint warnings for `any` types in some components (non-critical)
- Need to update existing admin panel to match new design
- Mobile menu animation needs refinement

## 🚧 Todo

1. Update admin panel with Neumorphism design
2. Add link submission modal with new design
3. Implement user profile page
4. Add more animation variants
5. Optimize images and assets
6. Add loading skeletons
7. Implement error boundaries
8. Add unit tests
9. Add E2E tests
10. SEO optimization

## 📝 License

MIT License

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Design inspiration from modern Neumorphism UIs
- Framer Motion for amazing animation library
- Next.js team for the excellent framework

---

Made with ❤️ and neumorphism
