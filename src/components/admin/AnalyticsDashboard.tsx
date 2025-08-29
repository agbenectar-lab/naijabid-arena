import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Eye, Clock, Target } from "lucide-react";

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <p className="text-xs text-emerald-600">+0.5% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12m 34s</div>
            <p className="text-xs text-emerald-600">+2m from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-emerald-600">+12.3% today</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Electronics</p>
                  <p className="text-sm text-muted-foreground">₦2.1M revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">234 auctions</p>
                  <p className="text-sm text-emerald-600">+18% growth</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Art & Collectibles</p>
                  <p className="text-sm text-muted-foreground">₦1.8M revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">156 auctions</p>
                  <p className="text-sm text-emerald-600">+24% growth</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fashion</p>
                  <p className="text-sm text-muted-foreground">₦1.2M revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">189 auctions</p>
                  <p className="text-sm text-emerald-600">+12% growth</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Bounce Rate</span>
                <span className="text-sm font-medium">24.1% (-3.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Return Visitors</span>
                <span className="text-sm font-medium">68.5% (+5.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mobile Users</span>
                <span className="text-sm font-medium">72.3% (+8.2%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Pages/Session</span>
                <span className="text-sm font-medium">4.7 (+0.8)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">₦8.9M</div>
              <p className="text-sm text-muted-foreground">Total Revenue (Monthly)</p>
              <p className="text-xs text-emerald-600">+12.5% vs last month</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₦447K</div>
              <p className="text-sm text-muted-foreground">Commission Earned</p>
              <p className="text-xs text-blue-600">5.0% average rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">₦235K</div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-xs text-amber-600">23 transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;