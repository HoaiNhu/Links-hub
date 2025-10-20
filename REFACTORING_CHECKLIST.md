# 📋 Refactoring Checklist - Apply to Remaining Files

Use this checklist when refactoring other files to use the new utilities.

---

## 🔧 Step-by-Step Process

### 1. Update Imports

```typescript
// ❌ Remove these:
import toast from "react-hot-toast";

// ✅ Add these:
import { ApiClient } from "@/lib/api-client";
import { showToast } from "@/lib/toast-utils";
import LoadingSpinner from "@/components/LoadingSpinner";
```

### 2. Replace Fetch Calls

#### Find all fetch() calls:

```typescript
// ❌ OLD:
const res = await fetch("/api/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

if (!res.ok) {
  const error = await res.json();
  throw new Error(error.error || "Failed");
}

const result = await res.json();
```

#### Replace with ApiClient:

```typescript
// ✅ NEW:
const result = await ApiClient.post("/api/endpoint", data);
```

**Methods:**

- `fetch(..., { method: "GET" })` → `ApiClient.get(...)`
- `fetch(..., { method: "POST" })` → `ApiClient.post(..., data)`
- `fetch(..., { method: "PUT" })` → `ApiClient.put(..., data)`
- `fetch(..., { method: "DELETE" })` → `ApiClient.delete(...)`

### 3. Replace Toast Calls

#### Find all toast.\* calls:

```typescript
// ❌ OLD:
toast.success("Message");
toast.error("Error");
const id = toast.loading("Loading...");
toast.success("Done!", { id });

// Error handling
catch (error) {
  toast.error(error instanceof Error ? error.message : "Error");
}
```

#### Replace with showToast:

```typescript
// ✅ NEW:
showToast.success("Message");
showToast.error(error); // Auto handles Error objects
const id = showToast.loading("Loading...");
showToast.success("Done!", id);

// Error handling
catch (error) {
  showToast.error(error); // Automatic!
}
```

### 4. Replace Loading Spinners

#### Find duplicated spinner JSX:

```typescript
// ❌ OLD:
{
  loading && (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
```

#### Replace with component:

```typescript
// ✅ NEW:
{
  loading && <LoadingSpinner className="h-64" />;
}
```

### 5. Consider Custom Hooks (Optional)

If component has:

- Manual state management (`useState` for data, loading, error)
- `useEffect` for fetching data
- Multiple fetch calls with similar patterns

Consider using:

```typescript
// ✅ Instead of manual state:
const { links, loading, error, refetch } = useLinks({
  status: "approved",
});

const { categories } = useCategories();
```

---

## ✅ File-by-File Checklist

### File: `src/app/admin/links/page.tsx`

- [ ] Import `ApiClient`
- [ ] Import `showToast`
- [ ] Import `LoadingSpinner`
- [ ] Replace all `fetch()` calls with `ApiClient.*`
- [ ] Replace all `toast.*` with `showToast.*`
- [ ] Replace loading spinner JSX with `<LoadingSpinner />`
- [ ] Remove manual error message extraction
- [ ] Test the changes

**Pattern to replace:**

```typescript
// ❌ OLD:
const fetchLinks = async () => {
  try {
    const res = await fetch(`/api/links?status=${status}`);
    const data = await res.json();
    setLinks(data);
  } catch (error) {
    toast.error("Error");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id: string) => {
  const deleteToast = toast.loading("Deleting...");
  try {
    const res = await fetch(`/api/links/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted!", { id: deleteToast });
    }
  } catch (error) {
    toast.error("Error", { id: deleteToast });
  }
};
```

```typescript
// ✅ NEW:
const fetchLinks = async () => {
  try {
    const data = await ApiClient.get<ILink[]>(`/api/links?status=${status}`);
    setLinks(data);
  } catch (error) {
    showToast.error(error);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id: string) => {
  const deleteToast = showToast.loading("Deleting...");
  try {
    await ApiClient.delete(`/api/links/${id}`);
    showToast.success("Deleted!", deleteToast);
  } catch (error) {
    showToast.error(error, deleteToast);
  }
};
```

---

### File: `src/app/admin/users/page.tsx`

- [ ] Import `ApiClient`
- [ ] Import `showToast`
- [ ] Import `LoadingSpinner`
- [ ] Replace all `fetch()` calls with `ApiClient.*`
- [ ] Replace all `toast.*` with `showToast.*`
- [ ] Replace loading spinner JSX
- [ ] Test the changes

**Common operations:**

```typescript
// Fetch users
const users = await ApiClient.get<IUser[]>("/api/admin/users");

// Update user role
await ApiClient.put(`/api/admin/users/${id}`, { role: newRole });

// Delete user
await ApiClient.delete(`/api/admin/users/${id}`);
```

---

### File: `src/app/auth/register/page.tsx`

- [ ] Import `ApiClient`
- [ ] Import `showToast`
- [ ] Replace registration fetch with `ApiClient.post`
- [ ] Replace toast notifications
- [ ] Consider using `react-hook-form` (already in package.json!)
- [ ] Test the changes

**Pattern:**

```typescript
// ❌ OLD:
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const submitToast = toast.loading("Creating account...");

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error);
    }

    toast.success("Account created!", { id: submitToast });
    router.push("/auth/login");
  } catch (error) {
    toast.error(error.message, { id: submitToast });
  }
};
```

```typescript
// ✅ NEW:
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const submitToast = showToast.loading("Creating account...");

  try {
    await ApiClient.post("/api/auth/register", formData);
    showToast.success("Account created!", submitToast);
    router.push("/auth/login");
  } catch (error) {
    showToast.error(error, submitToast);
  }
};
```

---

### File: `src/components/LinkCard.tsx`

- [ ] Check for any fetch calls (click tracking)
- [ ] Replace with `ApiClient` if needed
- [ ] Minor improvements only

**Pattern:**

```typescript
// If tracking clicks:
const handleClick = async () => {
  try {
    await ApiClient.post(`/api/links/${link._id}/click`, {});
  } catch (error) {
    // Silent fail for analytics
    console.error("Failed to track click", error);
  }
};
```

---

## 🧪 Testing Checklist

After refactoring each file:

- [ ] File compiles without TypeScript errors
- [ ] No console errors in browser
- [ ] Fetch operations work correctly
- [ ] Toast notifications appear and disappear properly
- [ ] Loading states show/hide correctly
- [ ] Error handling works (test with network disabled)
- [ ] All CRUD operations function as before

---

## 🎯 Success Criteria

A file is successfully refactored when:

✅ **No manual fetch calls** - All use `ApiClient`  
✅ **No raw toast calls** - All use `showToast`  
✅ **No duplicated spinners** - All use `LoadingSpinner`  
✅ **Consistent error handling** - All use `showToast.error(error)`  
✅ **Type-safe** - All API calls have proper TypeScript types  
✅ **Tested** - All features work as expected

---

## 💡 Common Patterns

### Pattern 1: Fetch & Display

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const result = await ApiClient.get("/api/data");
    setData(result);
  } catch (error) {
    showToast.error(error);
  } finally {
    setLoading(false);
  }
};

if (loading) return <LoadingSpinner />;
```

### Pattern 2: Create/Update with Toast

```typescript
const handleSubmit = async (data) => {
  const toastId = showToast.loading("Saving...");

  try {
    await ApiClient.post("/api/endpoint", data);
    showToast.success("Saved!", toastId);
    onSuccess?.();
  } catch (error) {
    showToast.error(error, toastId);
  }
};
```

### Pattern 3: Delete with Confirmation

```typescript
const handleDelete = async (id: string) => {
  if (!confirm("Are you sure?")) return;

  const toastId = showToast.loading("Deleting...");

  try {
    await ApiClient.delete(`/api/endpoint/${id}`);
    showToast.success("Deleted!", toastId);
    refetch();
  } catch (error) {
    showToast.error(error, toastId);
  }
};
```

---

## 📚 Quick Reference

### Import Statement

```typescript
import { ApiClient } from "@/lib/api-client";
import { showToast } from "@/lib/toast-utils";
import LoadingSpinner from "@/components/LoadingSpinner";
```

### API Methods

```typescript
ApiClient.get<T>(url);
ApiClient.post<T>(url, data);
ApiClient.put<T>(url, data);
ApiClient.delete<T>(url);
```

### Toast Methods

```typescript
showToast.success(message, [toastId]);
showToast.error(error, [toastId]);
showToast.loading(message); // returns toastId
showToast.info(message);
```

### Loading Component

```typescript
<LoadingSpinner />
<LoadingSpinner size="sm" | "md" | "lg" />
<LoadingSpinner message="Loading..." />
<LoadingSpinner className="h-64" />
<LoadingSpinner fullScreen />
```

---

**Happy refactoring! 🚀**
