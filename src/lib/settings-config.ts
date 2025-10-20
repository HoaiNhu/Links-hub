// Default route configurations
export interface RouteConfig {
  loginPath: string;
  registerPath: string;
  adminPath: string;
  homePath: string;
}

export const DEFAULT_ROUTES: RouteConfig = {
  loginPath: "/auth/login",
  registerPath: "/auth/register",
  adminPath: "/admin",
  homePath: "/",
};

export interface SiteSettings {
  routes: RouteConfig;
  siteName: string;
  siteDescription: string;
  // Có thể thêm các settings khác
}

export const DEFAULT_SETTINGS: SiteSettings = {
  routes: DEFAULT_ROUTES,
  siteName: "LinksHub",
  siteDescription: "Quản lý và chia sẻ links hữu ích",
};
