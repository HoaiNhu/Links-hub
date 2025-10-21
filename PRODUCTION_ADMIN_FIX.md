# 🐛 Fix: Admin Login Redirect Issue - Production

## ❌ Vấn đề:

- Login admin thành công ✅
- Bấm "Admin" tab → Bị redirect về `/auth/login` ❌
- Console error: `404 GET /register?_rsc=...` ❌

---

## ✅ Root Cause (Nguyên nhân):

### 1. **NEXTAUTH_URL có dấu `/` thừa**

```env
# ❌ SAI
NEXTAUTH_URL=https://links-hub-e1jn.vercel.app/

# ✅ ĐÚNG
NEXTAUTH_URL=https://links-hub-e1jn.vercel.app
```

### 2. **Admin Layout dùng `getCurrentUser()` thay vì `getServerSession()`**

- `getCurrentUser()` có thể không hoạt động đúng trên production
- Nên dùng trực tiếp `getServerSession(authOptions)`

### 3. **Middleware có thể không xử lý đúng redirect**

---

## 🔧 Các file đã được fix:

### 1. ✅ `.env` - Đã fix

```diff
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_URL=https://links-hub-e1jn.vercel.app/
- NODE_ENV=development
+ NEXTAUTH_URL=https://links-hub-e1jn.vercel.app
+ NODE_ENV=production
```

### 2. ✅ `middleware.ts` - Đã improve

- Thêm proper error handling
- Fix redirect logic

### 3. ✅ `src/app/admin/layout.tsx` - Đã fix

```diff
- import { getCurrentUser } from "@/lib/auth";
+ import { getServerSession } from "next-auth";
+ import { authOptions } from "@/app/api/auth/[...nextauth]/route";

- const user = await getCurrentUser();
- if (!user || user.role !== "admin") {
+ const session = await getServerSession(authOptions);
+ if (!session || !session.user || session.user.role !== "admin") {
    redirect("/auth/login");
```

### 4. ✅ `src/app/api/auth/[...nextauth]/route.ts` - Đã improve

- Thêm `error` page redirect
- Thêm session maxAge
- Enable debug mode cho development

---

## 🚀 Steps to Deploy Fix:

### Bước 1: Commit & Push code

```bash
git add .
git commit -m "Fix: Admin redirect issue on production"
git push origin main
```

### Bước 2: Update Vercel Environment Variables

**QUAN TRỌNG:** Phải update trên Vercel Dashboard!

1. Vào: https://vercel.com/dashboard
2. Chọn project: `links-hub-e1jn`
3. Settings → Environment Variables
4. **Xóa và tạo lại** các biến sau:

   | Variable          | Value                                                                                                                                 | Environments                     |
   | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
   | `MONGODB_URI`     | `mongodb+srv://nhoainhu733_db_user:hEU2UboJamgkakg5@link-hub-db.vk0gvwl.mongodb.net/?retryWrites=true&w=majority&appName=LINK-HUB-DB` | Production, Preview, Development |
   | `NEXTAUTH_URL`    | `https://links-hub-e1jn.vercel.app`                                                                                                   | Production                       |
   | `NEXTAUTH_URL`    | `http://localhost:3000`                                                                                                               | Development                      |
   | `NEXTAUTH_SECRET` | `hoainhu04012004linkhub`                                                                                                              | Production, Preview, Development |
   | `NODE_ENV`        | `production`                                                                                                                          | Production                       |

   ⚠️ **CHÚ Ý:**

   - `NEXTAUTH_URL` **KHÔNG CÓ** dấu `/` cuối
   - Production và Development có `NEXTAUTH_URL` khác nhau
   - Nhớ check đúng environment (Production/Preview/Development)

5. Click **"Save"**

### Bước 3: Redeploy

**Option 1: Auto (Recommended)**

- Vercel sẽ tự động deploy khi bạn push code

**Option 2: Manual**

- Deployments tab
- Tìm deployment mới nhất
- Click "..." → **Redeploy**
- Chọn "Use existing Build Cache" = NO (để build lại từ đầu)

### Bước 4: Clear Cache & Test

1. **Clear browser:**

   - Chrome: `Ctrl + Shift + Delete`
   - Clear "Cookies and other site data"
   - Clear "Cached images and files"
   - Time range: "All time"

2. **Test flow:**
   ```
   1. Vào: https://links-hub-e1jn.vercel.app
   2. Login với admin account
   3. Bấm "Admin" button
   4. → Phải vào được /admin (không redirect)
   5. → Console không có lỗi 404
   ```

---

## 🧪 Debug Commands:

### Check Session API:

```javascript
// Mở console trên trang admin, chạy:
fetch("/api/auth/session")
  .then((r) => r.json())
  .then((data) => {
    console.log("Session:", data);
    // Phải có: { user: { role: "admin", ... } }
  });
```

### Check Vercel Logs:

```bash
# Terminal (nếu có Vercel CLI)
vercel logs links-hub-e1jn.vercel.app --follow

# Hoặc xem trên Dashboard:
# https://vercel.com/dashboard → Project → Logs
```

---

## ✅ Expected Result:

### Trước:

```
1. Login admin ✅
2. Click "Admin"
3. → Redirect to /auth/login ❌
4. Console: GET /register?_rsc=... 404 ❌
```

### Sau:

```
1. Login admin ✅
2. Click "Admin"
3. → Vào /admin thành công ✅
4. → Hiển thị Admin Dashboard ✅
5. Console: Không có lỗi ✅
```

---

## 🔒 Security Note:

Sau khi fix xong, nên generate `NEXTAUTH_SECRET` mới:

```bash
# Generate secret mới
openssl rand -base64 32

# Output example:
# xK8v2Lp9mN4qR7tY3wZ6aB5cD8eF1gH2jK4lM7nP9qS0
```

Rồi update trên Vercel và redeploy.

---

## 📋 Checklist:

- [x] Fix `.env` file (remove trailing slash)
- [x] Fix `middleware.ts` (better redirect handling)
- [x] Fix `admin/layout.tsx` (use getServerSession)
- [x] Fix `[...nextauth]/route.ts` (add error page)
- [ ] Commit & push code
- [ ] Update Vercel environment variables
- [ ] Redeploy on Vercel
- [ ] Clear browser cache
- [ ] Test admin login
- [ ] Verify no 404 errors

---

## 💬 Support:

Nếu vẫn còn lỗi sau khi làm theo hướng dẫn:

1. Check Vercel logs để xem error cụ thể
2. Kiểm tra lại environment variables
3. Thử login/logout lại vài lần
4. Clear browser cache hoàn toàn

---

**Good luck! 🚀**
