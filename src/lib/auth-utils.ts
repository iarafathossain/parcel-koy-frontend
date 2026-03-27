import { RoleType } from "@/types/enum-type";

export const authRoutes = [
  "/register",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => authRoutes.includes(pathname);

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const merchantProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/merchant\/dashboard/], // Matches any route that starts with /merchant/dashboard
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin\/dashboard/], // Matches any route that starts with /admin/dashboard
};

export const riderProtectedRoutes: RouteConfig = {
  exact: ["/payment-success"],
  pattern: [/^\/rider\/dashboard/], // Matches any route that starts with /rider/dashboard
};

export const isRouteMatched = (
  pathname: string,
  routeConfig: RouteConfig,
): boolean => {
  if (routeConfig.exact.includes(pathname)) {
    return true;
  }

  return routeConfig.pattern.some((regex: RegExp) => regex.test(pathname));
};

export const getRouteOwner = (pathname: string): RoleType | "COMMON" | null => {
  if (isRouteMatched(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  if (isRouteMatched(pathname, merchantProtectedRoutes)) {
    return "MERCHANT";
  }

  if (isRouteMatched(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatched(pathname, riderProtectedRoutes)) {
    return "RIDER";
  }

  return null; // Public route
};

export const getDefaultDashboardRoute = (role: RoleType): string => {
  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin/dashboard";
    case "MERCHANT":
      return "/merchant/dashboard";
    case "RIDER":
      return "/rider/dashboard";
    default:
      return "/"; // Fallback to home page
  }
};

export const isValidRedirectPathForRole = (
  path: string,
  role: RoleType | null,
): boolean => {
  const routeOwner = getRouteOwner(path);

  // allow for public routes
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  const unifiedSuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;

  if (unifiedSuperAdminAndAdminRole === routeOwner) {
    return true;
  }

  return false;
};
