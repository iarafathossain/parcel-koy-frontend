import { NavSection } from "@/types/dashboard-type";
import { RoleType } from "@/types/enum-type";
import { getDefaultDashboardRoute } from "./auth-utils";

export interface PublicNavItem {
  title: string;
  href: string;
}

export const publicNavbarItems: PublicNavItem[] = [
  { title: "Pricing", href: "/pricing" },
  { title: "Coverage", href: "/coverage" },
  { title: "About Us", href: "/about-us" },
  { title: "Contact", href: "/contact" },
];

export const getCommonNavItems = (role: RoleType): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      title: "",
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "BarChart2",
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
        },
      ],
    },
    {
      title: "Security",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Lock",
        },
      ],
    },
  ];
};

//
// ================= MERCHANT =================
//
export const merchantNavItems: NavSection[] = [
  {
    title: "Parcel Management",
    items: [
      {
        title: "Create Parcel",
        href: "/merchant/create-parcel",
        icon: "Package",
      },
      {
        title: "My Parcels",
        href: "/merchant/my-parcels",
        icon: "Package",
      },
      {
        title: "Track Parcel",
        href: "/track-parcel",
        icon: "Search",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        title: "My Payouts",
        href: "/merchant/my-payments",
        icon: "Link",
      },
    ],
  },
];

//
// ================= ADMIN =================
//
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "ShieldCheck",
      },
      {
        title: "Merchants",
        href: "/admin/dashboard/merchants-management",
        icon: "Store",
      },
      {
        title: "Riders",
        href: "/admin/dashboard/riders-management",
        icon: "Users",
      },
    ],
  },
  {
    title: "Logistics Core",
    items: [
      {
        title: "Parcels",
        href: "/admin/dashboard/parcels-management",
        icon: "Package",
      },
      {
        title: "Zones",
        href: "/admin/dashboard/zones-management",
        icon: "Map",
      },
      {
        title: "Areas",
        href: "/admin/dashboard/areas-management",
        icon: "MapPin",
      },
      {
        title: "Hubs",
        href: "/admin/dashboard/hubs-management",
        icon: "Home",
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Categories",
        href: "/admin/dashboard/categories-management",
        icon: "Tag",
      },
      {
        title: "Delivery Speeds",
        href: "/admin/dashboard/speeds-management",
        icon: "Zap",
      },
      {
        title: "Delivery Methods",
        href: "/admin/dashboard/methods-management",
        icon: "Truck",
      },
      {
        title: "Pricing Rules",
        href: "/admin/dashboard/pricing-management",
        icon: "DollarSign",
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "Merchant Payouts",
        href: "/admin/dashboard/merchant-payouts",
        icon: "CreditCard",
      },
      {
        title: "Cash Collections",
        href: "/admin/dashboard/cash-collections",
        icon: "Banknote",
      },
      {
        title: "Hub Collections",
        href: "/admin/dashboard/hub-cash-collections",
        icon: "Wallet",
      },
    ],
  },
];

//
// ================= RIDER =================
//
export const riderNavItems: NavSection[] = [
  {
    title: "Delivery Operations",
    items: [
      {
        title: "My Assigned Parcels",
        href: "/rider/dashboard/assigned-parcels",
        icon: "Package",
      },
      {
        title: "Track Parcel",
        href: "/track-parcel",
        icon: "Search",
      },
    ],
  },
];

//
// ================= ROLE SWITCH =================
//
export const getNavItemsByRole = (role: RoleType): NavSection[] => {
  const commonItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonItems, ...adminNavItems];

    case "MERCHANT":
      return [...commonItems, ...merchantNavItems];

    case "RIDER":
      return [...commonItems, ...riderNavItems];

    default:
      return commonItems;
  }
};
