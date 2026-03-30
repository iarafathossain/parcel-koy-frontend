"use client";

import BarChartComponent from "@/components/shared/bar-chart";
import PieChartComponent from "@/components/shared/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartData } from "@/types/dashboard-stats-type";

interface DashboardChartsProps {
  charts: ChartData;
}

const DashboardCharts = ({ charts }: DashboardChartsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2">
            <TabsTrigger value="bar">Delivery Trends</TabsTrigger>
            <TabsTrigger value="pie">Status Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="mt-6">
            <div className="w-full h-80">
              <BarChartComponent data={charts.bar.data} />
            </div>
          </TabsContent>

          <TabsContent value="pie" className="mt-6">
            <div className="w-full flex justify-center">
              <PieChartComponent
                data={charts.pie.data}
                total={charts.pie.total}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardCharts;
