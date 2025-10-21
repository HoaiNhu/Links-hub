# Vercel Production Issues & Fixes

## Ngày: October 21, 2025
## Production URL: https://links-hub-e1jn.vercel.app

---

## 🐛 Issue 1: Schema Not Registered Error

### Lỗi
```
GET /api/links?status=approved 500 (Internal Server Error)
Error: Schema hasn't been registered for model "Category"
```

### Nguyên nhân
- Side-effect imports (`import "@/models/..."`) bị tree-shaking loại bỏ trong Vercel production build
- Mongoose models không được register khi API routes chạy

### Giải pháp ✅
**File: `src/lib/mongodb.ts`**

```typescript
import mongoose from "mongoose";

// Import models directly to ensure they are registered
// DO NOT remove these imports - they register Mongoose schemas
import User from "@/models/User";
import Category from "@/models/Category";
import Link from "@/models/Link";
import Settings from "@/models/Settings";

// Prevent tree-shaking from removing these imports
if (process.env.NODE_ENV === "development") {
  console.log("Models loaded:", { User, Category, Link, Settings });
}

// ... rest of connectDB code
```

**Tại sao cách này hoạt động:**
- Import actual default exports thay vì side-effect imports
- Tree-shaking không loại bỏ được vì models được reference
- Development log đảm bảo TypeScript không optimize away

---

## 🐛 Issue 2: 404 Errors for Auth Routes

### Lỗi
```
GET /login?callbackUrl=... 404 (Not Found)
GET /register?_rsc=... 404 (Not Found)
```

### Nguyên nhân
- Một số nơi vẫn dùng paths cũ: `/login`, `/register`
- Routes thực tế: `/auth/login`, `/auth/register`

### Files đã fix ✅

1. **middleware.ts** - Auth page paths
2. **src/app/api/auth/[...nextauth]/route.ts** - NextAuth signIn page
3. **src/app/admin/layout.tsx** - Admin redirect path

### Verification Checklist

- [ ] Check middleware.ts line ~20: `/auth/login`, `/auth/register`
- [ ] Check NextAuth config line ~68: `signIn: "/auth/login"`
- [ ] Check admin layout redirect: `redirect("/auth/login")`
- [ ] Grep search cho `/login` và `/register` không có hardcoded paths

---

## 🚀 Deployment Checklist

### Pre-Deploy (Local)
1. ✅ Build thành công: `npm run build`
2. ✅ No TypeScript errors
3. ✅ All models imported in mongodb.ts
4. ✅ All auth paths use `/auth/` prefix

### Vercel Environment Variables
Đảm bảo có đầy đủ 3 biến:

```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://links-hub-e1jn.vercel.app
NEXTAUTH_SECRET=<random-32-char-string>
```

### Post-Deploy Verification
1. ✅ Homepage loads without errors
2. ✅ `/api/links?status=approved` returns 200
3. ✅ Login page accessible: `/auth/login`
4. ✅ Register page accessible: `/auth/register`
5. ✅ Admin login works
6. ✅ Admin panel accessible: `/admin`
7. ✅ Add link functionality works
8. ✅ Settings API works: `/api/settings`

---

## 🔍 Debug Commands (On Vercel)

### Check Logs
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# View logs
vercel logs <deployment-url>
```

### Check Environment Variables
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Verify all 3 vars exist
4. Redeploy if variables were just added

### Force Redeploy
```bash
# From project directory
git commit --allow-empty -m "Force redeploy"
git push
```

---

## 📝 Common Production Errors

### 1. "Cannot connect to MongoDB"
**Cause:** MongoDB Atlas network access not configured

**Fix:**
1. MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow from anywhere)
3. Wait 2-3 minutes for changes to propagate

### 2. "Invalid NEXTAUTH_SECRET"
**Cause:** Missing or wrong secret in Vercel env vars

**Fix:**
```bash
# Generate new secret
openssl rand -base64 32

# Add to Vercel env vars
# Redeploy
```

### 3. "Schema hasn't been registered"
**Cause:** Tree-shaking removed model imports

**Fix:** Already applied in `src/lib/mongodb.ts`

### 4. "404 /login or /register"
**Cause:** Hardcoded old paths somewhere

**Fix:** Search and replace all instances:
```bash
# Search for hardcoded paths
grep -r '"/login"' src/
grep -r '"/register"' src/

# Replace with
"/auth/login"
"/auth/register"
```

---

## 🎯 Final Verification Steps

### Before Pushing to Production:

1. **Local Production Build Test**
```bash
npm run build
npm run start
```
Visit http://localhost:3000 and test all features

2. **Check All Paths**
```bash
# Search for old paths
grep -r 'href="/login' src/
grep -r 'redirect("/login' src/
grep -r 'href="/register' src/
grep -r 'redirect("/register' src/
```

3. **Verify Model Imports**
```bash
# mongodb.ts should import all 4 models
grep -A 5 "import.*from.*models" src/lib/mongodb.ts
```

Should see:
```typescript
import User from "@/models/User";
import Category from "@/models/Category";
import Link from "@/models/Link";
import Settings from "@/models/Settings";
```

4. **Test Critical Flows**
- [ ] Homepage loads
- [ ] Login with admin account
- [ ] Access admin panel
- [ ] Add new link
- [ ] View link details
- [ ] Logout

---

## 📊 Production Monitoring

### What to Monitor Post-Deploy:

1. **API Response Times**
   - `/api/links` should respond < 500ms
   - `/api/auth/session` should respond < 200ms

2. **Error Rates**
   - 500 errors should be 0%
   - 404 errors only for actual missing pages

3. **Database Connections**
   - MongoDB Atlas Metrics
   - Active connections < 10 for small app

### Vercel Analytics
Enable in Vercel Dashboard → Analytics

---

## 🆘 Emergency Rollback

If production is broken:

1. **Vercel Dashboard → Deployments**
2. Find last working deployment
3. Click "..." → Promote to Production

Or via CLI:
```bash
vercel rollback
```

---

## ✅ Success Criteria

Production is considered stable when:

- [x] No 500 errors in Vercel logs (15 mins)
- [x] All API endpoints return expected data
- [x] User can login/register
- [x] Admin can access admin panel
- [x] Links can be added and displayed
- [x] No console errors in browser

---

## 📚 Related Documentation

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Production Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

**Last Updated:** October 21, 2025
**Status:** 🟡 In Progress - Testing Fixes
