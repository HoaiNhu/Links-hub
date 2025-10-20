# 🎯 Custom Route Paths - Hướng Dẫn Sử Dụng

## 📌 Tính năng mới: Admin có thể tùy chỉnh paths

Bây giờ admin có thể thay đổi các đường dẫn URL trực tiếp từ dashboard admin, không cần code!

---

## 🚀 Cách sử dụng

### Bước 1: Đăng nhập Admin

1. Đăng nhập với tài khoản admin
2. Vào **Admin Panel**

### Bước 2: Vào Settings

1. Click vào **Settings** trong sidebar
2. Bạn sẽ thấy form cấu hình các route paths

### Bước 3: Tùy chỉnh Paths

Bạn có thể thay đổi:

**Login Path**

- Mặc định: `/auth/login`
- Có thể đổi thành: `/login`, `/login-user`, `/dang-nhap`, v.v.

**Register Path**

- Mặc định: `/auth/register`
- Có thể đổi thành: `/register`, `/signup`, `/dang-ky`, v.v.

**Admin Path**

- Mặc định: `/admin`
- Có thể đổi thành: `/dashboard`, `/backend`, `/quan-tri`, v.v.

**Home Path**

- Mặc định: `/`
- Có thể đổi thành: `/home`, `/trang-chu`, v.v.

### Bước 4: Lưu thay đổi

1. Click nút **"Lưu thay đổi"**
2. Website sẽ tự động reload
3. Các link sẽ cập nhật theo cấu hình mới

---

## ⚠️ Lưu ý quan trọng

### ✅ DO:

- ✅ Paths phải bắt đầu bằng `/`
- ✅ Ví dụ hợp lệ: `/login`, `/auth/login`, `/dang-nhap`
- ✅ Test kỹ sau khi thay đổi

### ❌ DON'T:

- ❌ Không để trống paths
- ❌ Không để paths trùng nhau
- ❌ Không dùng ký tự đặc biệt (trừ `-`, `_`)
- ❌ Ví dụ SAI: `login`, `auth/login` (thiếu `/`)

---

## 🛠️ Technical Details

### Files đã tạo:

1. **Models**

   - `src/models/Settings.ts` - Schema lưu settings trong MongoDB

2. **API Routes**

   - `src/app/api/settings/route.ts` - GET/PUT settings

3. **Pages**

   - `src/app/admin/settings/page.tsx` - Admin settings page

4. **Contexts**

   - `src/contexts/SettingsContext.tsx` - Share settings globally

5. **Config**
   - `src/lib/settings-config.ts` - Default values

### Cách hoạt động:

```
1. Admin thay đổi paths trong Settings page
   ↓
2. Settings lưu vào MongoDB (collection: settings)
   ↓
3. SettingsContext fetch settings khi app load
   ↓
4. Navbar và các components dùng dynamic paths từ context
   ↓
5. Links tự động cập nhật theo cấu hình
```

---

## 🔄 Reset về mặc định

Nếu có vấn đề:

1. Vào Settings page
2. Click nút **"Reset"**
3. Paths sẽ trở về giá trị mặc định

---

## 📝 Ví dụ Use Cases

### Case 1: Website Tiếng Việt

```
Login Path: /dang-nhap
Register Path: /dang-ky
Admin Path: /quan-tri
Home Path: /
```

### Case 2: Short URLs

```
Login Path: /in
Register Path: /up
Admin Path: /cp
Home Path: /
```

### Case 3: Security (ẩn admin path)

```
Login Path: /auth/login
Register Path: /auth/register
Admin Path: /secret-panel-xyz
Home Path: /
```

---

## 🔧 Troubleshooting

### Lỗi 404 sau khi đổi paths?

- Kiểm tra paths có bắt đầu bằng `/` không
- Clear browser cache và reload
- Check MongoDB xem settings đã lưu đúng chưa

### Không save được?

- Kiểm tra quyền admin
- Check console log xem có lỗi API không
- Verify MongoDB connection

### Muốn xem settings hiện tại?

```javascript
// Browser console
fetch("/api/settings")
  .then((r) => r.json())
  .then(console.log);
```

---

## 📚 API Documentation

### GET /api/settings

Lấy settings hiện tại

```typescript
// Response
{
  success: true,
  data: {
    routes: {
      loginPath: "/auth/login",
      registerPath: "/auth/register",
      adminPath: "/admin",
      homePath: "/"
    }
  }
}
```

### PUT /api/settings (Admin only)

Cập nhật settings

```typescript
// Request
{
  routes: {
    loginPath: "/login-user",
    registerPath: "/signup",
    adminPath: "/dashboard",
    homePath: "/"
  }
}

// Response
{
  success: true,
  message: "Cập nhật settings thành công"
}
```

---

## 🎨 UI Preview

Settings page bao gồm:

- ✅ Form inputs cho mỗi path
- ✅ Real-time preview
- ✅ Validation và error handling
- ✅ Reset button
- ✅ Warning messages
- ✅ Save button with loading state

---

## 🔐 Security

- ✅ Chỉ admin mới được PUT settings
- ✅ Validation paths ở backend
- ✅ Prevent XSS/injection
- ✅ Settings lưu trong MongoDB, không expose ra client

---

**Giờ admin có full control trên route paths! 🎉**

Không cần động vào code nữa, chỉ cần vào Settings là xong!
