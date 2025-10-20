# ⚡ Quick Deploy Checklist

## 🎯 5 Bước Deploy lên Vercel

### 1️⃣ Chuẩn bị Environment Variables

Có 3 biến cần thiết:

```
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://your-app.vercel.app (sẽ update sau)
NEXTAUTH_SECRET=random-secret-string
```

**Generate secret:**

```bash
openssl rand -base64 32
```

---

### 2️⃣ Push code lên GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

### 3️⃣ Deploy trên Vercel

1. Vào: **https://vercel.com**
2. Login với GitHub
3. Click: **"Add New Project"**
4. Import: **`HoaiNhu/Proj1_BE`**
5. Add Environment Variables (3 biến ở trên)
6. Click: **"Deploy"**

---

### 4️⃣ Update NEXTAUTH_URL

Sau khi deploy xong, Vercel cho URL (vd: `https://my-app.vercel.app`)

1. Vào Project Settings → Environment Variables
2. Edit `NEXTAUTH_URL`
3. Set value: `https://your-actual-url.vercel.app`
4. Click: **"Redeploy"**

---

### 5️⃣ Configure MongoDB Atlas

1. MongoDB Atlas → Network Access
2. Add IP: **0.0.0.0/0** (Allow from anywhere)
3. Save

---

## ✅ Test Production

1. Visit: `https://your-app.vercel.app`
2. Test Login: `admin@linkshub.com` / `admin123`
3. Test features:
   - [ ] Homepage loads
   - [ ] Login works
   - [ ] Admin panel accessible
   - [ ] Add link works
   - [ ] Settings page works

---

## 🐛 Common Issues

### Build Failed?

```bash
# Test build locally first
npm run build

# Fix errors, then push
git add .
git commit -m "Fix build errors"
git push
```

### Can't connect to MongoDB?

- Check `MONGODB_URI` format
- Check Network Access allows 0.0.0.0/0
- Check username/password correct

### NextAuth error?

- Check `NEXTAUTH_URL` matches your Vercel URL
- Check `NEXTAUTH_SECRET` is set
- Redeploy after updating env vars

---

## 🎉 Done!

Your app is now live at: `https://your-app.vercel.app`

**Every git push = auto deploy!** 🚀

---

**Need detailed guide? Read `VERCEL_DEPLOYMENT_GUIDE.md`**
