"use client";
import Image from "next/image";
import { HiExternalLink, HiEye, HiClock, HiCursorClick } from "react-icons/hi";
import { ILink, ICategory } from "@/lib/type";
import { useViewTracking } from "@/hooks/useViewTracking";

interface LinkCardProps {
  link: ILink & {
    category: ICategory;
  };
}

export default function LinkCard({ link }: LinkCardProps) {
  // Track views khi card xuất hiện trên màn hình
  const cardRef = useViewTracking({
    linkId: link._id.toString(),
    threshold: 0.5, // 50% card phải visible
    trackOnce: true, // Chỉ track 1 lần
  });

  const handleClick = async () => {
    try {
      // Tăng số lượt click
      await fetch(`/api/links/${link._id}/click`, {
        method: "POST",
      });
      window.open(link.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to track click:", error);
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="neuro-card rounded-2xl p-5 group h-full flex flex-col cursor-pointer hover:scale-[1.02] transition-all duration-300"
    >
      {/* Thumbnail */}
      {link.image && (
        <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-light-200 flex-shrink-0">
          <Image
            src={link.image}
            alt={link.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content - flex-grow để chiếm hết không gian còn lại */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {link.favicon && (
            <img
              src={link.favicon}
              alt=""
              className="w-6 h-6 rounded flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-primary-500 line-clamp-2 group-hover:text-secondary-500 transition-colors">
              {link.title}
            </h3>
            {link.description && (
              <p className="text-sm text-primary-600 mt-1 line-clamp-2">
                {link.description}
              </p>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 neuro-button rounded-full text-xs font-semibold text-primary-500">
            {link.category?.icon && <span>{link.category.icon}</span>}
            {link.category?.name}
          </span>
        </div>

        {/* Tags */}
        {link.tags && link.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {link.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 neuro-input rounded-lg text-primary-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer - luôn ở dưới cùng */}
      <div className="flex items-center justify-between pt-4 border-t border-primary-200 flex-shrink-0">
        <div className="flex items-center gap-4 text-sm text-primary-600 font-medium">
          <span className="flex items-center gap-1" title="Views">
            <HiEye className="w-4 h-4" />
            {link.views || 0}
          </span>
          <span className="flex items-center gap-1" title="Clicks">
            <HiCursorClick className="w-4 h-4" />
            {link.clicks || 0}
          </span>
          <span className="flex items-center gap-1" title="Created">
            <HiClock className="w-4 h-4" />
            {new Date(link.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="flex items-center gap-2 px-4 py-2 neuro-purple rounded-xl text-white text-sm font-semibold hover:scale-105 transition-all"
        >
          Visit <HiExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
