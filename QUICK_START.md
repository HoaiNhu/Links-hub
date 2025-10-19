# 🔗 LinksHub - Quick Start Guide

## Tóm tắt Project

**LinksHub** là một web application để tổng hợp và quản lý các website hữu ích, được xây dựng với Next.js 15, React 19, TypeScript và MongoDB.

---

## ✅ Bugs đã được FIX

### Critical Bugs Fixed:

1. ✅ **MongoDB Connection** - Sửa biến env từ `MONGODB_URL` → `MONGODB_URI`
2. ✅ **NextAuth Secret** - Sửa biến env từ `JWT_SECRET` → `NEXTAUTH_SECRET`
3. ✅ **Import Paths** - Sửa tất cả import từ `@/lib/types` → `@/lib/type`
4. ✅ **API Endpoint** - Sửa endpoint từ `/api/scrape` → `/api/metadata`
5. ✅ **NextAuth Types** - Thêm type definitions cho session
6. ✅ **Auth Helper** - Fix getCurrentUser() return type

📄 Chi tiết trong file: **[BUG_FIXES.md](./BUG_FIXES.md)**

---

## 🚀 Hướng dẫn Setup & Chạy Project

### 1. Cài đặt Dependencies

```bash
cd "c:\Users\Lenovo\STUDY\Personal Project\my-links-hub"
npm install
```

### 2. Kiểm tra file .env

Đảm bảo file `.env` có đúng config:

```env
MONGODB_URI=mongodb+srv://nhoainhu733_db_user:hEU2UboJamgkakg5@link-hub-db.vk0gvwl.mongodb.net/?retryWrites=true&w=majority&appName=LINK-HUB-DB
NEXTAUTH_SECRET=hoainhu04012004linkhub
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Seed Database (Tạo dữ liệu mẫu)

```bash
node scripts/seed.js
```

Sẽ tạo:

- Admin account: `admin@linkshub.com` / `admin123`
- 6 categories mẫu
- Sample links (nếu có trong script)

📄 Chi tiết trong file: **[SEEDING_GUIDE.md](./SEEDING_GUIDE.md)**

### 4. Chạy Development Server

```bash
npm run dev
```

### 5. Truy cập Website

```
http://localhost:3000
```

---

## 👥 User Flow

### **Visitor (Chưa đăng nhập):**

- ✅ Xem danh sách links
- ✅ Filter theo category
- ✅ Search links
- ✅ Click để visit website
- ❌ Không thể đóng góp link

### **User (Đã đăng nhập):**

- ✅ Tất cả quyền của Visitor
- ✅ Đóng góp link mới
- ✅ Link sẽ chờ admin duyệt
- ❌ Không truy cập được admin panel

### **Admin (Role: admin):**

- ✅ Tất cả quyền của User
- ✅ Truy cập Admin Panel (`/admin`)
- ✅ Xét duyệt links pending
- ✅ Quản lý tất cả links
- ✅ Quản lý categories
- ✅ Quản lý users
- ✅ Xem analytics/stats

---

## 📁 Cấu trúc Project

```
my-links-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/             # NextAuth
│   │   │   ├── links/            # Links CRUD
│   │   │   ├── categories/       # Categories CRUD
│   │   │   └── metadata/         # Web scraping
│   │   ├── admin/                # Admin pages
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── links/            # Links management
│   │   │   ├── categories/       # Categories management
│   │   │   ├── pending/          # Pending links
│   │   │   └── users/            # Users management
│   │   └── auth/                 # Auth pages
│   │       ├── login/
│   │       └── register/
│   ├── components/               # React Components
│   │   ├── Navbar.tsx
│   │   ├── LinkCard.tsx
│   │   ├── LinkList.tsx
│   │   ├── AddLinkModal.tsx
│   │   └── ...
│   ├── lib/                      # Utilities
│   │   ├── mongodb.ts            # DB connection
│   │   ├── auth.ts               # Auth helpers
│   │   └── type.ts               # TypeScript types
│   ├── models/                   # MongoDB Models
│   │   ├── User.ts
│   │   ├── Category.ts
│   │   └── Link.ts
│   └── types/
│       └── next-auth.d.ts        # NextAuth types
├── scripts/
│   └── seed.js                   # Database seeding
├── .env                          # Environment variables
├── middleware.ts                 # Auth middleware
├── tailwind.config.js
├── next.config.ts
├── package.json
├── BUG_FIXES.md                  # Bug report
├── SEEDING_GUIDE.md              # Seed guide
└── README.md                     # This file
```

---

## 🛠️ Tech Stack

### Frontend:

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS 4**
- **Headless UI**
- **Hero Icons**
- **React Hot Toast**

### Backend:

- **Next.js API Routes**
- **MongoDB + Mongoose**
- **NextAuth.js** (Authentication)
- **Cheerio** (Web scraping)
- **Axios** (HTTP client)

### State Management:

- **Zustand**

### Form Handling:

- **React Hook Form**
- **Zod** (Validation)

---

## 🎯 Tính năng chính

### ✨ User Features:

- 📋 Xem danh sách links theo dạng card/grid
- 🔍 Tìm kiếm links theo title/description
- 🏷️ Filter theo category
- 🌐 Auto-fetch metadata từ URL (title, description, image, favicon)
- 📊 View stats (views, clicks)
- ➕ Đóng góp links mới
- 🔐 Authentication (Login/Register)

### 🛡️ Admin Features:

- ✅ Xét duyệt links pending (Approve/Reject)
- 📝 CRUD operations cho links
- 📂 CRUD operations cho categories
- 👥 User management
- 📊 Dashboard với statistics
- 🎨 Category customization (icon, color)

### 🤖 Auto Features:

- 🌐 Auto web scraping để lấy metadata
- 🖼️ Auto lấy thumbnail/favicon
- 📈 Auto tracking views/clicks
- ✅ Admin links tự động approved

---

## 🔑 Login Credentials

### Admin Account:

```
Email: admin@linkshub.com
Password: admin123
```

### User Account (nếu đã seed):

```
Email: user@linkshub.com
Password: 123456
```

---

## 📝 API Endpoints

### Authentication:

- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Links:

- `GET /api/links` - Get links (với query params)
- `POST /api/links` - Create link (Auth required)
- `PUT /api/links/[id]` - Update link (Admin only)
- `DELETE /api/links/[id]` - Delete link (Admin only)
- `POST /api/links/[id]/click` - Track click

### Categories:

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/[id]` - Update category (Admin only)
- `DELETE /api/categories/[id]` - Delete category (Admin only)

### Metadata:

- `POST /api/metadata` - Scrape website metadata

---

## 🎨 Customization

### Thêm Category mới:

1. Login as Admin
2. Vào `/admin/categories`
3. Click "Thêm danh mục"
4. Điền thông tin + chọn icon emoji + chọn màu
5. Save!

### Thêm Link:

1. Login (User hoặc Admin)
2. Click nút "Thêm Link" trên navbar
3. Nhập URL → Click "Lấy thông tin"
4. Chọn category + tags (optional)
5. Submit!
   - Admin: Tự động approved
   - User: Chờ admin duyệt

---

## 🐛 Known Issues & Warnings

### ESLint Warnings (không ảnh hưởng chức năng):

- Unused variables trong error catch blocks
- `<img>` thay vì `<Image>` ở một số nơi
- React Hook dependency warnings

### Có thể optimize:

- Thêm pagination cho danh sách links
- Optimize images với next/image
- Add loading states cho tất cả operations
- Add error boundaries
- Add analytics dashboard

---

## 🚀 Deployment

### Vercel (Recommended):

```bash
# Push code lên GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Deploy trên Vercel
# 1. Import project từ GitHub
# 2. Thêm environment variables trong Vercel dashboard
# 3. Deploy!
```

### Environment Variables cần thiết:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

---

## 📚 Tài liệu tham khảo

- **[BUG_FIXES.md](./BUG_FIXES.md)** - Chi tiết các bugs đã fix
- **[SEEDING_GUIDE.md](./SEEDING_GUIDE.md)** - Hướng dẫn seed database
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

## 💡 Tips

### Development:

```bash
# Dev mode with turbopack (faster)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Database:

```bash
# Seed database
node scripts/seed.js

# Connect to MongoDB (nếu có mongosh)
mongosh "mongodb+srv://..."
```

---

## 🎉 All Set!

Project đã sẵn sàng để chạy! Mọi bug quan trọng đã được fix.

### Next Steps:

1. ✅ Chạy seed để tạo data mẫu
2. ✅ Start dev server
3. ✅ Login với admin account
4. ✅ Test các tính năng
5. ✅ Customize theo ý muốn
6. ✅ Deploy lên Vercel!

**Happy Coding! 🚀**
