import { useEffect, useRef } from "react";

interface UseViewTrackingOptions {
  linkId: string;
  onView?: () => void;
  threshold?: number;
  trackOnce?: boolean;
}

/**
 * Hook để track views sử dụng Intersection Observer
 * Tự động gọi API khi element xuất hiện trên màn hình
 */
export function useViewTracking({
  linkId,
  onView,
  threshold = 0.5, // 50% của card phải visible
  trackOnce = true, // Chỉ track 1 lần
}: UseViewTrackingOptions) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Nếu đã track và chỉ track 1 lần thì skip
    if (trackOnce && hasTrackedRef.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        // Khi element visible và chưa track
        if (entry.isIntersecting && !hasTrackedRef.current) {
          hasTrackedRef.current = true;

          try {
            // Gọi API để tăng view count
            await fetch(`/api/links/${linkId}/view`, {
              method: "POST",
            });

            // Callback nếu có
            onView?.();
          } catch (error) {
            console.error("Failed to track view:", error);
            // Reset nếu fail để có thể retry
            hasTrackedRef.current = false;
          }
        }
      },
      {
        threshold, // Bao nhiêu % card phải visible
        rootMargin: "0px", // Margin around viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [linkId, onView, threshold, trackOnce]);

  return elementRef;
}
