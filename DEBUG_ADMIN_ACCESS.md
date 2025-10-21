# Debug Admin Access Issues

## Vấn đề

Không vào được trang admin sau khi đăng nhập với account admin.

## Nguyên nhân có thể

### 1. User chưa có role "admin" trong database

Kiểm tra role của user trong MongoDB:

```javascript
// Trong MongoDB Shell hoặc Compass
db.users.find({ email: "your-admin-email@example.com" });
```

Nếu `role` không phải `"admin"`, update:

```javascript
db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { role: "admin" } }
);
```

### 2. Session chưa được update

Sau khi đăng nhập, session có thể chưa lưu role đúng cách.

**Giải pháp:**

1. Đăng xuất hoàn toàn
2. Xóa cookies của browser
3. Đăng nhập lại

### 3. Middleware redirect sai

Middleware đang check `/login` và `/register` nhưng routes thực tế là `/auth/login` và `/auth/register`.

**Cần fix middleware:**

```typescript
// middleware.ts - BEFORE
if (
  req.nextUrl.pathname.startsWith("/login") ||
  req.nextUrl.pathname.startsWith("/register")
) {
  return true;
}

// middleware.ts - AFTER
if (
  req.nextUrl.pathname.startsWith("/auth/login") ||
  req.nextUrl.pathname.startsWith("/auth/register")
) {
  return true;
}
```

### 4. NextAuth config redirect page sai

```typescript
// src/app/api/auth/[...nextauth]/route.ts
pages: {
  signIn: "/login",  // ❌ SAI
}

// Phải sửa thành:
pages: {
  signIn: "/auth/login",  // ✅ ĐÚNG
}
```

## Cách kiểm tra

### 1. Check role trong database

```bash
mongosh "your-mongodb-uri"
use your-database-name
db.users.find().pretty()
```

### 2. Check session trong browser

- Mở DevTools (F12)
- Tab Application → Cookies
- Tìm cookie `next-auth.session-token`
- Copy value và decode tại https://jwt.io
- Kiểm tra field `role` trong payload

### 3. Check middleware logs

Thêm console.log vào middleware để debug:

```typescript
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    console.log("🔍 Token:", token); // Debug log
    console.log("🔍 Role:", token?.role); // Debug log
    console.log("🔍 Path:", req.nextUrl.pathname); // Debug log

    const isAdmin = token?.role === "admin";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !isAdmin) {
      console.log("❌ Redirecting - Not admin"); // Debug log
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }
  // ... rest of config
);
```

## Fixes đã áp dụng

### ✅ 1. Fixed Category schema not registered

Thêm import Category vào các API routes:

- `src/app/api/links/route.ts`
- `src/app/api/links/[id]/route.ts`

### ⏳ 2. Cần fix middleware paths

Middleware cần update paths từ `/login` → `/auth/login`

### ⏳ 3. Cần fix NextAuth signIn page

Update `pages.signIn` từ `"/login"` → `"/auth/login"`

## Next Steps

1. **Fix middleware.ts** - Update auth page paths
2. **Fix NextAuth config** - Update signIn page path
3. **Verify admin role** - Check user role in database
4. **Clear session** - Logout and login again
5. **Test access** - Try accessing `/admin` again
