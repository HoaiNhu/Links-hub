/**
 * Initialize all Mongoose models
 * Import this file in API routes to ensure all models are registered
 * This prevents "Schema hasn't been registered" errors in production
 */

// Import all models to register them with Mongoose
import "@/models/User";
import "@/models/Category";
import "@/models/Link";
import "@/models/Settings";

// Export empty object to satisfy TypeScript
export {};
