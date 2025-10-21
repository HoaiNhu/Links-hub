# 🚀 Quick Start Guide - LinksHub Neumorphism

## Bắt đầu nhanh trong 5 phút

### 📋 Prerequisites

- Node.js 18+
- npm hoặc yarn
- MongoDB account (MongoDB Atlas recommended)
- Git

### 🔧 Installation Steps

#### 1. Clone Repository

```bash
git clone <your-repo-url>
cd my-links-hub
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Setup

Tạo file `.env` ở root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Optional: Generate secret with this command
# openssl rand -base64 32
```

#### 4. MongoDB Setup

1. Tạo account trên [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster mới (Free tier)
3. Whitelist IP address (0.0.0.0/0 cho development)
4. Tạo database user
5. Copy connection string vào `.env`

#### 5. Run Development Server

```bash
npm run dev
```

Server sẽ chạy tại: http://localhost:3000

### 🎨 Tính năng chính

#### Home Page (/)

- **Hero Section**: Welcome message với animated background
- **Stats Counter**: Thống kê số lượng links, categories
- **Featured Links**: Top 6 links nổi bật
- **Footer**: Social links và quick navigation

#### Categories Page (/categories)

- **Search Bar**: Tìm kiếm categories
- **Filter/Sort**: Sắp xếp theo tên hoặc số lượng
- **Accordion List**: Click để expand/collapse categories
- **Links Grid**: Hiển thị tất cả links trong category

#### Admin Panel (/admin)

- Existing admin functionality
- Access qua user icon trong navigation

### 🎭 Design Features

#### Neumorphism Style

- Soft shadows tạo depth
- Light background (#caf0f8)
- Contrasting elements với dark (#03045e) và purple (#6f2dbd)

#### Animations

- Framer Motion cho smooth transitions
- Hover effects trên tất cả interactive elements
- Scroll-triggered animations
- Loading states

### 📱 Navigation

#### Main Tabs

- **Home**: Trang chủ với hero và featured content
- **Categories**: Browse tất cả categories
- **Admin**: Access admin panel (icon)

### 🔐 First Time Setup

#### 1. Tạo Admin Account

```bash
# Run MongoDB shell hoặc MongoDB Compass
# Tạo user document với role: "admin"
{
  "name": "Admin",
  "email": "admin@linkshub.com",
  "password": "hashed_password",
  "role": "admin"
}
```

#### 2. Seed Initial Data (Optional)

Tạo một số categories mẫu:

```javascript
// Run trong MongoDB Compass hoặc shell
db.categories.insertMany([
  {
    name: "Development Tools",
    icon: "💻",
    description: "Tools for developers",
  },
  {
    name: "Design Resources",
    icon: "🎨",
    description: "Resources for designers",
  },
  { name: "Learning", icon: "📚", description: "Educational resources" },
  { name: "Productivity", icon: "⚡", description: "Boost your productivity" },
]);
```

#### 3. Add First Links

1. Đăng nhập vào admin panel
2. Click "Add Link"
3. Điền thông tin:
   - Title
   - URL
   - Description
   - Select category
4. Submit và approve

### 🛠️ Development Tips

#### Component Structure

```
src/
├── app/               # Pages
│   ├── page.tsx      # Home
│   └── categories/   # Categories page
├── components/        # Reusable components
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── StatsCounter.tsx
│   ├── FeaturedLinks.tsx
│   ├── CategoriesContent.tsx
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
└── models/           # MongoDB models
```

#### Customization

##### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: { 500: "#03045e" },  // Navy blue
  secondary: { 500: "#6f2dbd" }, // Purple
  light: { 500: "#caf0f8" }      // Light cyan
}
```

##### Animations

Edit animation duration trong components:

```typescript
transition={{ duration: 0.5 }} // Faster
transition={{ duration: 1.0 }} // Slower
```

##### Neumorphism Effects

Edit `src/app/globals.css`:

```css
/* Make shadows stronger */
box-shadow: 12px 12px 24px #a8c5d1, -12px -12px 24px #ffffff;

/* Make shadows softer */
box-shadow: 4px 4px 8px #a8c5d1, -4px -4px 8px #ffffff;
```

### 🐛 Troubleshooting

#### Issue: Port 3000 already in use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Use different port
npm run dev -- -p 3001
```

#### Issue: MongoDB connection failed

- Check connection string format
- Verify IP whitelist settings
- Check database user credentials
- Ensure cluster is running

#### Issue: Animations choppy

- Check browser GPU acceleration
- Reduce `transition duration`
- Test on different browser

#### Issue: TypeScript errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### 📊 Performance Tips

1. **Images**: Add proper image optimization
2. **Fonts**: Use font-display: swap
3. **Lazy Loading**: Implement for images and heavy components
4. **Code Splitting**: Use dynamic imports for large components

### 🎯 Next Steps

1. ✅ Test trên mobile devices
2. ✅ Add more categories và links
3. ✅ Customize colors theo brand
4. ✅ Setup authentication flow
5. ✅ Deploy to production

### 🚀 Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Environment Variables on Vercel

Add these in Vercel dashboard:

- `MONGODB_URI`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`

### 📖 Documentation

- [Design System Guide](./DESIGN_SYSTEM_NEUMORPHISM.md)
- [Full README](./README_NEUMORPHISM.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

### 🆘 Need Help?

- Check documentation files
- Review component code
- Test animations in browser
- Inspect with React DevTools

### 🎉 You're Ready!

Your LinksHub với Neumorphism design đã sẵn sàng!

**Happy Coding! 🚀**

---

Các bước tiếp theo:

1. Thêm content (links, categories)
2. Customize theo brand của bạn
3. Test trên nhiều devices
4. Deploy to production
5. Share với cộng đồng! 🎊
