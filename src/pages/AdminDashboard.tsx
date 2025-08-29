import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Gavel, DollarSign, Activity } from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your OyaBid platform</p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+156</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600">+24</span> since yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦8.9M</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to the OyaBid Admin Dashboard. This is a simplified version to ensure it loads properly.
              The full admin dashboard with all features will be restored once any technical issues are resolved.
            </p>
            <div className="mt-4 space-y-2">
              <p>📊 <strong>User Management:</strong> Manage platform users</p>
              <p>🔨 <strong>Auction Management:</strong> Oversee all auctions</p>
              <p>💰 <strong>Financial Management:</strong> Monitor transactions</p>
              <p>🛡️ <strong>Content Moderation:</strong> Review flagged content</p>
              <p>📈 <strong>Analytics:</strong> View platform analytics</p>
              <p>⚙️ <strong>Settings:</strong> Configure platform settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;