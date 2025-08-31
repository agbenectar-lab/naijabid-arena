import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import UserManagement from "@/components/admin/UserManagement";
import AuctionManagement from "@/components/admin/AuctionManagement";
import FinancialManagement from "@/components/admin/FinancialManagement";
import ContentModeration from "@/components/admin/ContentModeration";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import SystemSettings from "@/components/admin/SystemSettings";
import { 
  Users, Gavel, DollarSign, Activity, Settings, TrendingUp, 
  Shield, MessageSquare, Megaphone, BarChart3
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("users");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "auctions":
        return <AuctionManagement />;
      case "financial":
        return <FinancialManagement />;
      case "moderation":
        return <ContentModeration />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "settings":
        return <SystemSettings />;
      case "marketing":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Marketing & Advertising</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Active Campaigns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">Holiday Sale Banner</h5>
                            <p className="text-sm text-muted-foreground">Running until Dec 31</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">Featured Auction Boost</h5>
                            <p className="text-sm text-muted-foreground">Premium placement</p>
                          </div>
                          <Badge variant="outline">Scheduled</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <Button>Create New Campaign</Button>
              </div>
            </CardContent>
          </Card>
        );
      case "support":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Support & Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-sm text-muted-foreground">Open Tickets</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">5</div>
                      <p className="text-sm text-muted-foreground">Active Disputes</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.8</div>
                      <p className="text-sm text-muted-foreground">Avg Response Time (hrs)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Recent Support Tickets</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Payment Issue - Order #1234</h5>
                      <p className="text-sm text-muted-foreground">User: john@example.com</p>
                    </div>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Account Verification Help</h5>
                      <p className="text-sm text-muted-foreground">User: sarah@example.com</p>
                    </div>
                    <Badge>Normal</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "operations":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Platform Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">System Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Database</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Gateway</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email Service</span>
                      <Badge variant="secondary">Degraded</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>CDN</span>
                      <Badge variant="default">Operational</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Maintenance
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Performance Monitor
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Scan
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case "intelligence":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Business Intelligence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Top Performing Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Electronics</span>
                        <span className="text-sm font-medium">₦2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Art & Collectibles</span>
                        <span className="text-sm font-medium">₦1.8M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fashion</span>
                        <span className="text-sm font-medium">₦1.2M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">User Growth Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-600">+23.4%</div>
                    <p className="text-sm text-muted-foreground">Monthly growth rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Platform Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-600">94/100</div>
                    <p className="text-sm text-muted-foreground">Excellent performance</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <UserManagement />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <Header />
        
        <div className="flex w-full">
          <AdminSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          <main className="flex-1 p-6">
            {/* Admin Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Comprehensive platform management</p>
                </div>
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
                    <span className="text-emerald-600">+156</span> new this week
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
                    <span className="text-emerald-600">+12.5%</span> from last month
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

            {/* Active Section Content */}
            <div className="space-y-6">
              {renderActiveSection()}
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;