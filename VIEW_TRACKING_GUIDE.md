# 📊 View & Click Tracking Implementation

## 🎯 Overview

Hệ thống tracking được implement với 2 metrics riêng biệt:

- **Views**: Số lần link card xuất hiện trên màn hình (tracked tự động)
- **Clicks**: Số lần user click vào nút "Visit" (tracked khi click)

## 🔧 Technical Implementation

### 1. Database Schema (Link Model)

```typescript
{
  views: Number,   // Tự động tăng khi card visible 50%
  clicks: Number   // Tăng khi user click "Visit"
}
```

### 2. API Endpoints

#### Track View

```
POST /api/links/[id]/view
```

- Được gọi tự động bởi Intersection Observer
- Tăng `views` counter

#### Track Click

```
POST /api/links/[id]/click
```

- Được gọi khi user click nút "Visit"
- Tăng `clicks` counter

### 3. Frontend Implementation

#### useViewTracking Hook

```typescript
const cardRef = useViewTracking({
  linkId: link._id.toString(),
  threshold: 0.5, // 50% card phải visible
  trackOnce: true, // Chỉ track 1 lần per session
});
```

**Intersection Observer:**

- Monitor khi card xuất hiện trên viewport
- Track view khi 50% card visible
- Chỉ track 1 lần để tránh spam

#### LinkCard Component

```tsx
<div ref={cardRef}>
  {" "}
  {/* Attach observer */}
  {/* Card content */}
  <button onClick={handleClick}>
    {" "}
    {/* Track click */}
    Visit
  </button>
</div>
```

## 📈 Use Cases

### 1. Click-Through Rate (CTR)

```typescript
const ctr = (clicks / views) * 100;
```

- Measure link attractiveness
- High CTR = engaging title/thumbnail
- Low CTR = need improvement

### 2. Ranking Algorithm

```typescript
score = clicks * 2 + views;
```

- Prioritize clicked links
- Balance engagement + exposure

### 3. Analytics Categories

**Popular Links**: High clicks

```typescript
Link.find().sort({ clicks: -1 }).limit(10);
```

**Trending Links**: High CTR in short time

```typescript
const trending = links.filter((l) => {
  const ctr = (l.clicks / l.views) * 100;
  return ctr > 20 && l.createdAt > last7Days;
});
```

**Hidden Gems**: High views, low clicks

```typescript
const needsOptimization = links.filter((l) => {
  return l.views > 100 && l.clicks < 10;
});
```

### 4. Quality Score

```typescript
qualityScore = (clicks / views) * (clicks + views);
```

- Combine engagement + exposure
- Filter spam/low-quality links

## 🎨 UI Display

### LinkCard Footer

```tsx
<div>
  <HiEye /> {views} // View count
  <HiCursorClick /> {clicks} // Click count
  <HiClock /> {date} // Created date
</div>
```

### Admin Dashboard (Future)

```tsx
<LinkAnalytics
  views={1250}
  clicks={450}
  showCTR={true} // Shows 36% CTR
/>
```

## 🚀 Future Enhancements

### 1. Analytics Dashboard

- Top viewed links
- Top clicked links
- CTR trends over time
- Category performance

### 2. A/B Testing

- Test different titles/thumbnails
- Compare CTR between variations
- Auto-optimize based on results

### 3. User Behavior

- Track scroll depth
- Time spent viewing
- Return visitor tracking

### 4. Monetization

- Impression-based ads (views)
- CPC model (clicks)
- Featured links pricing

### 5. Recommendations

```typescript
// Similar links based on CTR
const recommended = links
  .filter((l) => l.category === current.category)
  .sort((a, b) => {
    const ctrA = (a.clicks / a.views) * 100;
    const ctrB = (b.clicks / b.views) * 100;
    return ctrB - ctrA;
  })
  .slice(0, 5);
```

## 🔍 Debugging

### Check if tracking works

1. Open browser DevTools > Network
2. Scroll to view a link card
3. Should see: `POST /api/links/[id]/view`
4. Click "Visit" button
5. Should see: `POST /api/links/[id]/click`

### Verify in Database

```javascript
db.links.find({}, { title: 1, views: 1, clicks: 1 });
```

## ⚡ Performance

### Intersection Observer Benefits

- ✅ Native browser API (no library needed)
- ✅ Better performance than scroll listeners
- ✅ Automatically handles visibility
- ✅ Works with lazy loading

### Optimization

- Only track once per session
- Debounce API calls
- Batch updates for multiple cards
- Cache results client-side

## 📝 Notes

- Views track **exposure** (impression)
- Clicks track **engagement** (action)
- CTR = clicks / views (engagement rate)
- Higher threshold = more accurate views
- Lower threshold = capture more views

## 🐛 Common Issues

**Views not increasing?**

- Check if Intersection Observer is supported
- Verify threshold setting (0.5 = 50%)
- Check console for API errors

**Multiple views per card?**

- Set `trackOnce: true` in hook
- Clear browser cache if testing

**Clicks not tracked?**

- Check button onClick handler
- Verify API endpoint exists
- Check network tab for errors
