export interface ChartBarData {
  date: string;
  total: number;
  delivered: number;
  cancelled: number;
  failed: number;
}

export interface ChartPieDataItem {
  status: string;
  value: number;
}

export interface ChartData {
  pie: {
    data: ChartPieDataItem[];
    total: number;
  };
  bar: {
    data: ChartBarData[];
  };
}

// Merchant Dashboard
export interface MerchantStats {
  businessName: string;
  balance: number;
  creditLimit: number;
  activePaymentAccounts: number;
}

export interface ParcelStats {
  total: number;
  byStatus: Record<string, number>;
}

export interface MerchantFinancials {
  totalCodAmount: number;
  totalDeliveryCharge: number;
  deliveredCodAmount: number;
  pendingPayoutAmount: number;
  completedPayoutAmount: number;
}

export interface MerchantDashboardData {
  role: "MERCHANT";
  scope: "self";
  merchant: MerchantStats;
  parcels: ParcelStats;
  financials: MerchantFinancials;
  charts: ChartData;
}

// Rider Dashboard
export interface RiderStats {
  hubId: string;
  cashInHand: number;
}

export interface RiderParcelStats {
  total: number;
  pickups: number;
  deliveries: number;
  delivered: number;
  byStatus: Record<string, number>;
}

export interface RiderFinancials {
  totalCodAmount: number;
  totalDeliveryCharge: number;
  deliveredCodAmount: number;
  totalCollectedCash: number;
}

export interface RiderDashboardData {
  role: "RIDER";
  scope: "self";
  rider: RiderStats;
  parcels: RiderParcelStats;
  financials: RiderFinancials;
  charts: ChartData;
}

// Admin/Super Admin Dashboard
export interface AdminOverview {
  merchants: number;
  riders: number;
  admins: number;
  hubs: number;
  zones: number;
  areas: number;
  categories: number;
  methods: number;
  speeds: number;
  pricing: number;
  parcels: number;
  trackingLogs: number;
  cashCollections: number;
  paymentAccounts: number;
  payouts: number;
}

export interface AdminUsers {
  active: number;
  blocked: number;
}

export interface AdminFinancials {
  totalCodAmount: number;
  totalDeliveryCharge: number;
  deliveredCodAmount: number;
  totalMerchantBalance: number;
  totalRiderCashInHand: number;
  totalCashCollection: number;
  pendingPayoutAmount: number;
  completedPayoutAmount: number;
}

export interface AdminDashboardData {
  role: "SUPER_ADMIN" | "ADMIN";
  scope: "system";
  overview: AdminOverview;
  users: AdminUsers;
  parcels: ParcelStats;
  financials: AdminFinancials;
  charts: ChartData;
}

// Union type for any dashboard response
export type DashboardData =
  | MerchantDashboardData
  | RiderDashboardData
  | AdminDashboardData;

export interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
