# 🌱 Database Seeding Guide

## Hướng dẫn chạy seed data cho LinksHub

### 📋 Yêu cầu

- Node.js đã được cài đặt
- MongoDB connection string hợp lệ trong file `.env`
- Dependencies đã được cài đặt (`npm install`)

---

## 🚀 Cách chạy

### 1. Đảm bảo file `.env` có đúng cấu hình:

```env
MONGODB_URI=mongodb+srv://nhoainhu733_db_user:hEU2UboJamgkakg5@link-hub-db.vk0gvwl.mongodb.net/?retryWrites=true&w=majority&appName=LINK-HUB-DB
NEXTAUTH_SECRET=hoainhu04012004linkhub
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Chạy seed script:

```bash
node scripts/seed.js
```

---

## 📊 Dữ liệu được tạo

### **Users:**

1. **Admin Account**

   - Email: `admin@linkshub.com`
   - Password: `admin123`
   - Role: `admin`
   - Quyền: Quản lý toàn bộ hệ thống

2. **User Account** (nếu cần thêm)
   - Email: `user@linkshub.com`
   - Password: `123456`
   - Role: `user`
   - Quyền: Xem và đóng góp links

### **Categories:**

1. 🎨 **Design Tools** - Tools for UI/UX designers
2. 💻 **Development** - Developer tools and resources
3. 🤖 **AI Tools** - Artificial Intelligence tools
4. ⚡ **Productivity** - Productivity and organization tools
5. 📚 **Learning** - Educational resources
6. 🎭 **Icons & Graphics** - Free icons and graphics

### **Links (Optional - có thể thêm trong script):**

- Figma
- VS Code
- ChatGPT
- Notion
- và nhiều links mẫu khác...

---

## 🔄 Reset Database

Nếu muốn xóa toàn bộ data và seed lại:

```bash
# Script tự động xóa data cũ trước khi seed
node scripts/seed.js
```

Script sẽ:

1. ✅ Connect tới MongoDB
2. 🗑️ Xóa toàn bộ Users cũ
3. 🗑️ Xóa toàn bộ Categories cũ
4. 👤 Tạo Admin user mới
5. 📂 Tạo Categories mới
6. ✨ Hoàn tất!

---

## ⚠️ Lưu ý

- Script sẽ **XÓA TOÀN BỘ DATA CŨ** trước khi seed
- Chỉ chạy script này trên môi trường development
- **KHÔNG** chạy trên production database
- Đảm bảo đã backup dữ liệu quan trọng trước khi chạy

---

## 🐛 Troubleshooting

### **Lỗi: "MONGODB_URI not found"**

```bash
❌ MONGODB_URI not found in .env file
```

**Giải pháp:** Kiểm tra file `.env` có biến `MONGODB_URI` (không phải MONGODB_URL)

### **Lỗi: "Connection failed"**

```bash
❌ Seeding failed: MongoServerError: ...
```

**Giải pháp:**

- Kiểm tra connection string có đúng không
- Kiểm tra network có kết nối được MongoDB Atlas không
- Kiểm tra IP của bạn đã được whitelist trong MongoDB Atlas

### **Lỗi: "Module not found"**

```bash
Error: Cannot find module 'bcryptjs'
```

**Giải pháp:** Chạy `npm install` để cài đặt dependencies

---

## 📝 Customize Seed Data

Muốn thêm data riêng? Sửa file `scripts/seed.js`:

```javascript
// Thêm categories mới
const categories = [
  {
    name: "My Custom Category",
    slug: "my-custom-category",
    description: "Custom description",
    icon: "🎯",
    color: "#ff6b6b",
  },
  // ... other categories
];

// Thêm links mẫu
const links = [
  {
    url: "https://example.com",
    title: "Example Site",
    description: "Example description",
    // ... other fields
  },
];
```

---

## ✅ Sau khi seed xong

1. Khởi động dev server: `npm run dev`
2. Truy cập: http://localhost:3000
3. Login với: `admin@linkshub.com` / `admin123`
4. Bắt đầu sử dụng! 🎉
