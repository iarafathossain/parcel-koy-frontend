import { getDashboardStatsAction } from "@/actions/dashboard-action";
import AdminDashboardCharts from "@/components/modules/admin/dashboard/admin-dashboard-charts";
import AdminFinancialsOverview from "@/components/modules/admin/dashboard/admin-financials-overview";
import AdminOverviewCards from "@/components/modules/admin/dashboard/admin-overview-cards";
import AdminParcelOverview from "@/components/modules/admin/dashboard/admin-parcel-overview";
import AdminSystemMetrics from "@/components/modules/admin/dashboard/admin-system-metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/helpers/format-price";
import {
  AdminFinancials,
  AdminOverview,
  AdminUsers,
  ChartData,
  isAdminDashboardData,
  ParcelStats,
} from "@/types/dashboard-stats-type";
import { IHub } from "@/types/hub-type";

const AdminDashboard = async () => {
  const response = await getDashboardStatsAction();

  if (!response.success || !response.data) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          {response.message || "Failed to load dashboard"}
        </p>
      </div>
    );
  }

  if (!isAdminDashboardData(response.data)) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">Invalid dashboard data for admin.</p>
      </div>
    );
  }

  const data = response.data;

  // Define a permissive admin-like type to cover both system and managed-hubs scopes
  type AdminLikeData = {
    role: "ADMIN" | "SUPER_ADMIN";
    scope?: string;
    overview: AdminOverview;
    users?: AdminUsers;
    parcels: ParcelStats;
    financials?: Partial<AdminFinancials>;
    operations?: {
      riders: number;
      trackingLogs: number;
      notes: number;
    };
    charts: ChartData;
    managedHubs?: IHub[];
  };

  const adminData = data as AdminLikeData;

  const isSuperAdmin = adminData.role === "SUPER_ADMIN";
  const isAdmin = adminData.role === "ADMIN";
  const scope = adminData.scope ?? "system";

  // safe defaults for fields that may be missing for certain admin scopes
  const users: AdminUsers = adminData.users ?? { active: 0, blocked: 0 };

  const managedHubs = adminData.managedHubs;

  const defaultFinancials: AdminFinancials = {
    totalCodAmount: 0,
    totalDeliveryCharge: 0,
    deliveredCodAmount: 0,
    totalMerchantBalance: 0,
    totalRiderCashInHand: 0,
    totalCashCollection: 0,
    pendingPayoutAmount: 0,
    completedPayoutAmount: 0,
  };

  const financials: AdminFinancials = {
    ...defaultFinancials,
    ...(adminData.financials ?? {}),
  };

  const operations = adminData.operations;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">System Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Complete overview of your entire delivery network
        </p>
      </div>

      <AdminOverviewCards
        overview={adminData.overview}
        users={users}
        isSuperAdmin={isSuperAdmin}
      />

      {/* Show system-level metrics only for system-scoped dashboards */}
      {scope === "system" && <AdminSystemMetrics parcels={adminData.parcels} />}

      {/* Financial overview: use safe defaults so ADMIN scoped responses won't break */}
      <AdminFinancialsOverview financials={financials} />

      {/* Super-admin specific summary cards */}
      {isSuperAdmin && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{users.active}</div>
                  <div className="text-xs text-muted-foreground">
                    Active users
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{users.blocked}</div>
                  <div className="text-xs text-muted-foreground">
                    Blocked users
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatPrice(financials.pendingPayoutAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Pending payouts
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {formatPrice(financials.completedPayoutAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Completed payouts
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AdminParcelOverview statuses={adminData.parcels.byStatus} />

      <AdminDashboardCharts charts={adminData.charts} />

      {/* Admin operations summary for scoped admins */}
      {isAdmin && operations && (
        <Card>
          <CardHeader>
            <CardTitle>Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="p-2 rounded border border-muted">
                <div className="text-xs text-muted-foreground">Riders</div>
                <div className="text-lg font-bold">{operations.riders}</div>
              </div>
              <div className="p-2 rounded border border-muted">
                <div className="text-xs text-muted-foreground">
                  Tracking Logs
                </div>
                <div className="text-lg font-bold">
                  {operations.trackingLogs}
                </div>
              </div>
              <div className="p-2 rounded border border-muted">
                <div className="text-xs text-muted-foreground">Notes</div>
                <div className="text-lg font-bold">{operations.notes}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* For ADMINs scoped to specific hubs, show their managed hubs */}
      {isAdmin &&
        scope === "managed-hubs" &&
        managedHubs &&
        managedHubs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Managed Hubs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {managedHubs.map((hub) => (
                  <div key={hub.id} className="p-2 rounded border border-muted">
                    <div className="font-medium">{hub.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {hub.slug}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default AdminDashboard;
