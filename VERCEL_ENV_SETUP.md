# 🔧 Vercel Environment Variables Setup

## ⚠️ QUAN TRỌNG - Vấn đề Admin Login trên Production

### Nguyên nhân:

1. **Session không được lưu đúng** - `NEXTAUTH_URL` không đúng
2. **NEXTAUTH_SECRET** có thể không được set trên Vercel
3. **Middleware** không xử lý đúng redirect

### ✅ Giải pháp - Cập nhật Environment Variables trên Vercel:

1. **Truy cập Vercel Dashboard:**

   - https://vercel.com/dashboard
   - Chọn project: `links-hub-e1jn`
   - Settings → Environment Variables

2. **Xóa và thêm lại các biến sau:**

   ```env
   # MongoDB Connection
   MONGODB_URI = mongodb+srv://nhoainhu733_db_user:hEU2UboJamgkakg5@link-hub-db.vk0gvwl.mongodb.net/?retryWrites=true&w=majority&appName=LINK-HUB-DB

   # NextAuth Configuration
   NEXTAUTH_URL = https://links-hub-e1jn.vercel.app
   NEXTAUTH_SECRET = hoainhu04012004linkhub

   # Node Environment
   NODE_ENV = production
   ```

   ⚠️ **LƯU Ý:**

   - `NEXTAUTH_URL` **KHÔNG** có dấu `/` ở cuối
   - Phải check vào **Production**, **Preview**, và **Development**
   - Sau khi thêm xong, nhấn "Save"

3. **Redeploy Project:**
   - Deployments tab
   - Tìm deployment mới nhất
   - Click "..." → **Redeploy**
   - Hoặc chỉ cần push code mới

### 🧪 Test sau khi deploy:

1. **Clear browser cache & cookies** cho `links-hub-e1jn.vercel.app`
2. Login lại với admin account
3. Bấm vào tab "Admin"
4. Nếu vẫn bị redirect → Check console log

### 🔍 Debug nếu vẫn lỗi:

1. **Kiểm tra Vercel Logs:**

   ```bash
   # Terminal
   vercel logs links-hub-e1jn.vercel.app --follow
   ```

2. **Kiểm tra NextAuth debug:**

   - Thêm biến: `NEXTAUTH_DEBUG = true` (chỉ tạm thời)
   - Redeploy
   - Check Vercel logs để xem JWT errors

3. **Kiểm tra Session:**
   - Console log trong browser:
   ```javascript
   // Trên trang admin, mở console chạy:
   fetch("/api/auth/session")
     .then((r) => r.json())
     .then(console.log);
   ```
   - Phải thấy: `{ user: { role: "admin", ... } }`

### 📋 Checklist:

- [ ] Environment variables đã set đúng trên Vercel
- [ ] `NEXTAUTH_URL` không có `/` ở cuối
- [ ] `NEXTAUTH_SECRET` đã được set
- [ ] Code mới đã được deploy (với middleware fix)
- [ ] Browser cache đã clear
- [ ] Test login lại
- [ ] Test vào admin panel

### 🎯 Expected Behavior:

**Trước khi fix:**

- Login admin ✅
- Bấm "Admin" → Redirect về `/auth/login` ❌
- Console: `404 /register?_rsc=...` ❌

**Sau khi fix:**

- Login admin ✅
- Bấm "Admin" → Vào được admin panel ✅
- Console: Không có lỗi ✅

### 💡 Lưu ý bảo mật:

Sau khi fix xong, bạn nên:

1. Generate `NEXTAUTH_SECRET` mới bằng:
   ```bash
   openssl rand -base64 32
   ```
2. Update trên Vercel
3. Redeploy
4. Logout tất cả users (họ phải login lại)

---

## 🚀 Quick Fix Commands:

```bash
# 1. Commit code mới (đã fix middleware & admin layout)
git add .
git commit -m "Fix: Admin login redirect issue on production"
git push origin main

# 2. Vercel sẽ auto deploy
# 3. Hoặc manual redeploy trên dashboard
```

---

**Sau khi làm xong, báo lại kết quả nhé!** ✅
