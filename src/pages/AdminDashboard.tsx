import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, Gavel, DollarSign, Activity, Settings, TrendingUp, 
  Shield, MessageSquare, Megaphone, BarChart3, Search, 
  Filter, MoreHorizontal, Ban, CheckCircle, XCircle,
  Eye, Edit, Trash2, UserCheck, UserX, AlertTriangle
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "bidder", status: "active", joinDate: "2024-01-15", totalSpent: "₦234,500" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "auctioneer", status: "active", joinDate: "2024-02-10", totalSpent: "₦0" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "bidder", status: "suspended", joinDate: "2024-01-20", totalSpent: "₦89,200" },
  ];

  const auctions = [
    { id: 1, title: "Vintage Watch Collection", auctioneer: "Jane Smith", status: "active", currentBid: "₦45,000", endDate: "2024-12-01", bids: 23 },
    { id: 2, title: "Art Painting Original", auctioneer: "Mike Johnson", status: "ended", currentBid: "₦125,000", endDate: "2024-11-25", bids: 45 },
    { id: 3, title: "Electronics Bundle", auctioneer: "Sarah Davis", status: "pending", currentBid: "₦0", endDate: "2024-12-05", bids: 0 },
  ];

  const transactions = [
    { id: 1, user: "John Doe", amount: "₦45,000", type: "payment", status: "completed", date: "2024-11-25", auction: "Vintage Watch" },
    { id: 2, user: "Bob Wilson", amount: "₦125,000", type: "payment", status: "pending", date: "2024-11-24", auction: "Art Painting" },
    { id: 3, user: "Alice Brown", amount: "₦2,250", type: "commission", status: "completed", date: "2024-11-23", auction: "Electronics" },
  ];

  const reports = [
    { id: 1, reporter: "User123", type: "inappropriate content", item: "Auction #234", status: "pending", date: "2024-11-25" },
    { id: 2, reporter: "SafetyFirst", type: "fake item", item: "Auction #189", status: "resolved", date: "2024-11-24" },
    { id: 3, reporter: "TrustGuard", type: "spam behavior", item: "User Profile", status: "investigating", date: "2024-11-23" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto py-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive platform management</p>
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

        {/* Main Admin Sections */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
            <TabsTrigger value="users">👥 Users</TabsTrigger>
            <TabsTrigger value="auctions">🔨 Auctions</TabsTrigger>
            <TabsTrigger value="financial">💰 Financial</TabsTrigger>
            <TabsTrigger value="moderation">🛡️ Moderation</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            <TabsTrigger value="marketing">🎯 Marketing</TabsTrigger>
            <TabsTrigger value="support">🎧 Support</TabsTrigger>
            <TabsTrigger value="operations">📱 Operations</TabsTrigger>
            <TabsTrigger value="intelligence">📈 Business</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search users..." 
                        className="pl-8 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === "auctioneer" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.totalSpent}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                {user.status === "active" ? <Ban className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auction Management */}
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Auction Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Auction</TableHead>
                        <TableHead>Auctioneer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Bid</TableHead>
                        <TableHead>Bids</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auctions.map((auction) => (
                        <TableRow key={auction.id}>
                          <TableCell className="font-medium">{auction.title}</TableCell>
                          <TableCell>{auction.auctioneer}</TableCell>
                          <TableCell>
                            <Badge variant={
                              auction.status === "active" ? "default" : 
                              auction.status === "ended" ? "secondary" : "outline"
                            }>
                              {auction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{auction.currentBid}</TableCell>
                          <TableCell>{auction.bids}</TableCell>
                          <TableCell>{auction.endDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Ban className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Management */}
          <TabsContent value="financial">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦8,945,230</div>
                    <p className="text-xs text-emerald-600">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Pending Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦234,890</div>
                    <p className="text-xs text-amber-600">23 transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Commission Earned</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦447,261</div>
                    <p className="text-xs text-emerald-600">5% average rate</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Auction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.user}</TableCell>
                            <TableCell className="font-medium">{transaction.amount}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{transaction.type}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                                {transaction.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>{transaction.auction}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Moderation */}
          <TabsContent value="moderation">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.reporter}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell>{report.item}</TableCell>
                          <TableCell>
                            <Badge variant={
                              report.status === "resolved" ? "default" : 
                              report.status === "pending" ? "secondary" : "destructive"
                            }>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <XCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Daily Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-emerald-600">+8.2% today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.4%</div>
                  <p className="text-xs text-emerald-600">+0.5% this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Avg Session Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12m 34s</div>
                  <p className="text-xs text-emerald-600">+2m from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Bounce Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.1%</div>
                  <p className="text-xs text-red-600">-3.2% improvement</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Commission Rates</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">Buyer Commission (%)</label>
                        <Input type="number" defaultValue="2.5" />
                      </div>
                      <div>
                        <label className="text-sm">Seller Commission (%)</label>
                        <Input type="number" defaultValue="5.0" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Auction Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm">Min Auction Duration (hours)</label>
                        <Input type="number" defaultValue="24" />
                      </div>
                      <div>
                        <label className="text-sm">Max Auction Duration (days)</label>
                        <Input type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marketing */}
          <TabsContent value="marketing">
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
          </TabsContent>

          {/* Support */}
          <TabsContent value="support">
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
          </TabsContent>

          {/* Operations */}
          <TabsContent value="operations">
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
          </TabsContent>

          {/* Business Intelligence */}
          <TabsContent value="intelligence">
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
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;