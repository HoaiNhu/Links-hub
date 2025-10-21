"use client";
import { HiEye, HiCursorClick, HiTrendingUp } from "react-icons/hi";

interface LinkAnalyticsProps {
  views: number;
  clicks: number;
  showCTR?: boolean;
}

export default function LinkAnalytics({
  views,
  clicks,
  showCTR = true,
}: LinkAnalyticsProps) {
  // Calculate Click-Through Rate
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0.0";

  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      {/* Views */}
      <div className="flex items-center gap-1.5 text-gray-600">
        <HiEye className="w-4 h-4" />
        <span>{views.toLocaleString()}</span>
        <span className="text-xs text-gray-400">views</span>
      </div>

      {/* Clicks */}
      <div className="flex items-center gap-1.5 text-blue-600">
        <HiCursorClick className="w-4 h-4" />
        <span>{clicks.toLocaleString()}</span>
        <span className="text-xs text-gray-400">clicks</span>
      </div>

      {/* CTR (Optional) */}
      {showCTR && views > 0 && (
        <div className="flex items-center gap-1.5 text-green-600">
          <HiTrendingUp className="w-4 h-4" />
          <span>{ctr}%</span>
          <span className="text-xs text-gray-400">CTR</span>
        </div>
      )}
    </div>
  );
}
