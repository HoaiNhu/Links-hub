/**
 * Reusable loading spinner component
 * Used across multiple pages instead of duplicating JSX
 */

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm z-50"
    : `flex flex-col justify-center items-center ${className}`;

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full ${sizes[size]} border-b-2 border-blue-600`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="mt-4 text-sm  animate-pulse">{message}</p>}
    </div>
  );
}
