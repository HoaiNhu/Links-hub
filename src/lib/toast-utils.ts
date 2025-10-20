/**
 * Centralized toast notification utilities
 * Provides consistent messaging across the application
 */

import toast from "react-hot-toast";

export const showToast = {
  /**
   * Show loading toast
   * @returns toastId for updating later
   */
  loading: (message: string): string => {
    return toast.loading(message);
  },

  /**
   * Show success toast
   * @param message Success message
   * @param toastId Optional ID to update existing toast
   */
  success: (message: string, toastId?: string): void => {
    if (toastId) {
      toast.success(message, { id: toastId });
    } else {
      toast.success(message);
    }
  },

  /**
   * Show error toast with proper error handling
   * @param error Error object or message
   * @param toastId Optional ID to update existing toast
   */
  error: (error: unknown, toastId?: string): void => {
    const message =
      error instanceof Error
        ? error.message
        : "Có lỗi xảy ra. Vui lòng thử lại.";

    if (toastId) {
      toast.error(message, { id: toastId });
    } else {
      toast.error(message);
    }
  },

  /**
   * Show info toast
   */
  info: (message: string): void => {
    toast(message, {
      icon: "ℹ️",
    });
  },

  /**
   * Promise-based toast for async operations
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ): Promise<T> => {
    return toast.promise(promise, messages);
  },
};
