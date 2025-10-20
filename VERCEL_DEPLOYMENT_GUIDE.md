# 🚀 Hướng Dẫn Deploy lên Vercel

## ✅ Checklist trước khi deploy

### 1. **Environment Variables**

Đảm bảo file `.env` có đầy đủ:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. **Vercel Configuration**

Tạo file `vercel.json` (optional nhưng recommended):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

### 3. **Git Repository**

Đảm bảo code đã push lên GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## 🎯 Các bước Deploy

### **Method 1: Deploy qua Vercel Dashboard (Recommended)**

#### Step 1: Tạo tài khoản Vercel

1. Truy cập: https://vercel.com
2. Sign up với GitHub account
3. Authorize Vercel access to GitHub

#### Step 2: Import Project

1. Click **"Add New Project"**
2. Chọn **"Import Git Repository"**
3. Tìm repository: **`HoaiNhu/Proj1_BE`**
4. Click **"Import"**

#### Step 3: Configure Project

1. **Framework Preset**: Next.js (tự động detect)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (auto)
4. **Output Directory**: `.next` (auto)
5. **Install Command**: `npm install` (auto)

#### Step 4: Add Environment Variables

Click **"Environment Variables"**, add:

```
MONGODB_URI = mongodb+srv://...
NEXTAUTH_URL = https://your-project.vercel.app
NEXTAUTH_SECRET = your-secret-key-here
```

⚠️ **IMPORTANT**:

- Dùng PRODUCTION MongoDB URI (không dùng localhost)
- `NEXTAUTH_URL` sẽ được Vercel provide sau khi deploy
- Generate strong `NEXTAUTH_SECRET`:
  ```bash
  openssl rand -base64 32
  ```

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. ✅ Done! Vercel sẽ cho URL: `https://your-project.vercel.app`

---

### **Method 2: Deploy qua Vercel CLI**

#### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

#### Step 2: Login

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Chạy trong project directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? my-links-hub
# - Directory? ./
# - Override settings? No
```

#### Step 4: Add Environment Variables

```bash
vercel env add MONGODB_URI
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
```

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### 1. **Update NEXTAUTH_URL**

Sau khi deploy xong, Vercel cho URL (vd: `https://my-links-hub.vercel.app`)

Quay lại Vercel Dashboard:

1. Project Settings → Environment Variables
2. Edit `NEXTAUTH_URL`
3. Set value: `https://my-links-hub.vercel.app`
4. Redeploy

### 2. **MongoDB Network Access**

Trong MongoDB Atlas:

1. Network Access → Add IP Address
2. Choose: **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Or add Vercel IPs (recommended for security)

### 3. **Custom Domain (Optional)**

1. Vercel Dashboard → Domains
2. Add custom domain: `yourdomain.com`
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to use custom domain

---

## 🐛 Troubleshooting

### Issue 1: Build Failed

**Error:** "Module not found" or "Type errors"

**Fix:**

```bash
# Local test build
npm run build

# Fix any errors
# Then commit and push
git add .
git commit -m "Fix build errors"
git push
```

### Issue 2: MongoDB Connection Failed

**Error:** "MongoServerError: Authentication failed"

**Fix:**

- Check `MONGODB_URI` có đúng format
- Check username/password không có ký tự đặc biệt
- Check Network Access allows Vercel IPs

### Issue 3: NextAuth Error

**Error:** "No secret provided"

**Fix:**

```bash
# Generate new secret
openssl rand -base64 32

# Add to Vercel Environment Variables
# Redeploy
```

### Issue 4: Environment Variables không load

**Error:** Variables undefined in production

**Fix:**

1. Vercel Dashboard → Settings → Environment Variables
2. Ensure "Production" checkbox is checked
3. Click "Redeploy" (not just rebuild)

### Issue 5: 500 Internal Server Error

**Check Logs:**

```bash
vercel logs your-project.vercel.app
```

**Common causes:**

- Missing environment variables
- MongoDB connection issue
- API route errors

---

## 📝 Vercel Configuration Files

### Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  }
}
```

### Update `.gitignore`:

```
# Vercel
.vercel
```

---

## 🎯 Deployment Checklist

### Pre-Deploy:

- [ ] All features working locally
- [ ] `npm run build` successful
- [ ] Environment variables documented
- [ ] MongoDB connection string ready
- [ ] Code pushed to GitHub
- [ ] No console.log in production code (optional cleanup)

### During Deploy:

- [ ] Vercel account created
- [ ] Repository imported
- [ ] Environment variables added
- [ ] Deploy initiated

### Post-Deploy:

- [ ] Deployment successful
- [ ] Update `NEXTAUTH_URL` with production URL
- [ ] Test login/register
- [ ] Test admin features
- [ ] Test link submission
- [ ] Test settings page
- [ ] MongoDB Network Access configured
- [ ] Custom domain added (optional)

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Ensure .env is correct (don't commit it!)
# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 3. Go to vercel.com
# 4. Import repository
# 5. Add environment variables:
#    - MONGODB_URI
#    - NEXTAUTH_URL (use Vercel URL after first deploy)
#    - NEXTAUTH_SECRET
# 6. Deploy!
# 7. Update NEXTAUTH_URL with production URL
# 8. Redeploy
```

---

## 📊 Expected Results

**Deployment Time:** 2-3 minutes

**URLs:**

- Production: `https://your-project.vercel.app`
- Preview (branches): `https://your-project-git-branch.vercel.app`

**Auto-Deploy:**

- Every push to `main` → Production deploy
- Every push to other branches → Preview deploy

---

## 🎉 Post-Deployment

### Share your app:

```
🔗 Production: https://my-links-hub.vercel.app
👤 Admin: admin@linkshub.com / admin123
📱 Responsive
⚡ Fast (Edge Network)
🌍 Global CDN
```

### Monitor:

- Vercel Dashboard → Analytics
- Real-time logs
- Performance metrics
- Error tracking

---

## 💡 Pro Tips

1. **Free Tier Limits:**

   - 100GB bandwidth/month
   - 6000 build minutes/month
   - Should be enough for personal projects

2. **Environment Variables Security:**

   - Never commit `.env` to Git
   - Use strong secrets
   - Rotate secrets regularly

3. **Continuous Deployment:**

   - Every push = auto deploy
   - Preview deployments for branches
   - Instant rollbacks available

4. **Custom Domain:**

   - Free SSL certificate
   - Automatic HTTPS
   - Global CDN

5. **Monitoring:**
   - Check Vercel logs for errors
   - Monitor MongoDB Atlas metrics
   - Use Vercel Analytics

---

## 📚 Useful Links

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel CLI: https://vercel.com/docs/cli

---

**Ready to deploy? Follow Method 1 above! 🚀**

Good luck! 🎉
