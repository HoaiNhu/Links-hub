# ✨ New Feature: Dynamic Route Configuration

## 🎯 What's New?

Admin can now **customize URL paths directly from the dashboard** without touching code!

Want to change `/auth/login` to `/login-user`? Just go to Settings page! 🚀

---

## 📦 What Was Added

### 1. New Files Created

#### Models

- `src/models/Settings.ts` - MongoDB schema for storing settings

#### API Routes

- `src/app/api/settings/route.ts` - GET/PUT endpoints for settings management

#### Pages

- `src/app/admin/settings/page.tsx` - Beautiful admin UI for route configuration

#### Contexts

- `src/contexts/SettingsContext.tsx` - Global state management for settings

#### Config

- `src/lib/settings-config.ts` - Default route configurations

### 2. Updated Files

#### Components

- `src/components/Navbar.tsx` - Now uses dynamic routes from settings
- `src/components/AdminSidebar.tsx` - Added Settings menu item

#### Layouts

- `src/app/layout.tsx` - Wrapped with SettingsProvider

#### Pages

- `src/app/auth/register/page.tsx` - Fixed redirect to use correct path

---

## 🚀 How to Use

### For Admin:

1. **Login** as admin (admin@linkshub.com / admin123)
2. Go to **Admin Panel** → **Settings**
3. **Edit the paths** you want to customize:
   - Login Path (default: `/auth/login`)
   - Register Path (default: `/auth/register`)
   - Admin Path (default: `/admin`)
   - Home Path (default: `/`)
4. Click **"Lưu thay đổi"** (Save changes)
5. Page will auto-reload with new paths! ✨

### For Developers:

Use the `useSettings` hook to access dynamic routes:

```typescript
import { useSettings } from "@/contexts/SettingsContext";

function MyComponent() {
  const { settings } = useSettings();
  const routes = settings.routes;

  // Now use routes.loginPath, routes.registerPath, etc.
}
```

---

## 💡 Use Cases

### Case 1: Vietnamese Website

```
Login: /dang-nhap
Register: /dang-ky
Admin: /quan-tri
```

### Case 2: Security (Hide admin path)

```
Login: /auth/login
Register: /auth/register
Admin: /secret-xyz-panel
```

### Case 3: Short URLs

```
Login: /in
Register: /up
Admin: /cp
```

---

## ⚠️ Important Rules

### ✅ Valid Paths:

- Must start with `/`
- Examples: `/login`, `/auth/login`, `/dang-nhap`

### ❌ Invalid Paths:

- Don't start with `/` ❌
- Empty paths ❌
- Duplicate paths ❌
- Special characters (except `-`, `_`) ❌

---

## 🔧 Technical Architecture

```
┌─────────────────────────────────────┐
│   Admin Settings Page               │
│   /admin/settings                   │
└──────────────┬──────────────────────┘
               │
               │ PUT /api/settings
               ↓
┌─────────────────────────────────────┐
│   MongoDB                           │
│   Collection: settings              │
│   { key: "routes", value: {...} }   │
└──────────────┬──────────────────────┘
               │
               │ GET /api/settings
               ↓
┌─────────────────────────────────────┐
│   SettingsContext                   │
│   (Global State)                    │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Navbar, Links, Redirects          │
│   Use dynamic routes                │
└─────────────────────────────────────┘
```

---

## 📚 API Endpoints

### GET /api/settings

Get current settings (public)

**Response:**

```json
{
  "success": true,
  "data": {
    "routes": {
      "loginPath": "/auth/login",
      "registerPath": "/auth/register",
      "adminPath": "/admin",
      "homePath": "/"
    }
  }
}
```

### PUT /api/settings

Update settings (admin only)

**Request:**

```json
{
  "routes": {
    "loginPath": "/login-user",
    "registerPath": "/signup",
    "adminPath": "/dashboard",
    "homePath": "/"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật settings thành công"
}
```

---

## 🔐 Security

- ✅ Only admin can modify settings
- ✅ Path validation on backend
- ✅ XSS/injection prevention
- ✅ Settings stored in MongoDB (not exposed to client code)

---

## 🎨 UI Features

The Settings page includes:

- ✅ Intuitive form inputs
- ✅ Real-time preview
- ✅ Validation messages
- ✅ Reset to defaults button
- ✅ Warning messages
- ✅ Loading states
- ✅ Beautiful design with Tailwind CSS

---

## 🔄 Reset to Defaults

If something goes wrong:

1. Go to Settings page
2. Click **"Reset"** button
3. Paths will restore to defaults

Or manually from MongoDB:

```javascript
db.settings.deleteOne({ key: "routes" });
```

---

## 🐛 Troubleshooting

### 404 Error after changing paths?

- Ensure paths start with `/`
- Clear browser cache
- Check MongoDB for correct saved values

### Can't save settings?

- Verify admin permissions
- Check browser console for API errors
- Ensure MongoDB connection is working

### View current settings in console:

```javascript
fetch("/api/settings")
  .then((r) => r.json())
  .then(console.log);
```

---

## 📝 Testing Checklist

- [ ] Admin can access Settings page
- [ ] Non-admin cannot access Settings page
- [ ] Can update login path
- [ ] Can update register path
- [ ] Can update admin path
- [ ] Can update home path
- [ ] Navbar links update correctly
- [ ] Redirect after register works
- [ ] Reset button works
- [ ] Validation prevents invalid paths
- [ ] Page reload after save

---

## 🎉 Benefits

1. **No Code Changes** - Admin controls paths via UI
2. **Flexibility** - Easy to rebrand or localize
3. **Security** - Can hide admin paths
4. **User Friendly** - Intuitive interface
5. **Persistent** - Saved in database
6. **Type Safe** - Full TypeScript support

---

## 📖 Documentation Files

- `CUSTOM_ROUTES_GUIDE.md` - Detailed Vietnamese guide
- `CUSTOM_ROUTES_FEATURE.md` - This file (English summary)

---

**Now admin has full control over route paths! 🚀**

No more hardcoded URLs in components!
