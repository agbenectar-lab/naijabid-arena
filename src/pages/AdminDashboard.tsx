import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Users,
  Gavel,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  Megaphone,
  HeadphonesIcon,
  Smartphone,
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  Plus,
  RefreshCw,
  Bell,
  ChevronDown,
  Activity,
  CreditCard,
  FileText,
  MessageSquare,
  Star,
  Globe,
  Lock,
  Mail,
  Ban,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Target,
  PieChart,
  LineChart,
  BarChart2
} from "lucide-react";

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for all admin sections
  const mockStats = {
    totalUsers: 12847,
    activeAuctions: 342,
    totalRevenue: 8924000,
    pendingReports: 23,
    newSignups: 156,
    completedTransactions: 1284,
    systemHealth: 98.5,
    responseTime: 245
  };

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Bidder", status: "Active", joined: "2024-01-15", verified: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Auctioneer", status: "Suspended", joined: "2024-02-10", verified: false },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Bidder", status: "Active", joined: "2024-03-05", verified: true },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Auctioneer", status: "Pending", joined: "2024-03-20", verified: false }
  ];

  const mockAuctions = [
    { id: 1, title: "iPhone 14 Pro Max", seller: "TechStore", currentBid: 485000, status: "Active", category: "Electronics", endDate: "2024-04-15", bids: 24 },
    { id: 2, title: "Gaming Laptop", seller: "GamerHub", currentBid: 680000, status: "Pending", category: "Electronics", endDate: "2024-04-20", bids: 15 },
    { id: 3, title: "Luxury Watch", seller: "TimeZone", currentBid: 1200000, status: "Featured", category: "Accessories", endDate: "2024-04-25", bids: 42 },
    { id: 4, title: "Vintage Camera", seller: "PhotoPro", currentBid: 350000, status: "Flagged", category: "Electronics", endDate: "2024-04-18", bids: 8 }
  ];

  const mockTransactions = [
    { id: 1, buyer: "John Doe", seller: "TechStore", amount: 485000, item: "iPhone 14 Pro Max", date: "2024-03-25", status: "Completed" },
    { id: 2, buyer: "Sarah Wilson", seller: "GamerHub", amount: 680000, item: "Gaming Laptop", date: "2024-03-24", status: "Processing" },
    { id: 3, buyer: "Mike Johnson", seller: "TimeZone", amount: 1200000, item: "Luxury Watch", date: "2024-03-23", status: "Completed" },
    { id: 4, buyer: "Jane Smith", seller: "PhotoPro", amount: 350000, item: "Vintage Camera", date: "2024-03-22", status: "Disputed" }
  ];

  const mockReports = [
    { id: 1, reporter: "User123", target: "Auction #245", reason: "Fake product", status: "Pending", date: "2024-03-25", severity: "High" },
    { id: 2, reporter: "BidderX", target: "User: FakeStore", reason: "Spam messages", status: "Under Review", date: "2024-03-24", severity: "Medium" },
    { id: 3, reporter: "TrustUser", target: "Auction #189", reason: "Misleading description", status: "Resolved", date: "2024-03-23", severity: "Low" },
    { id: 4, reporter: "SafeBuyer", target: "User: ScamSeller", reason: "Fraudulent activity", status: "Escalated", date: "2024-03-22", severity: "Critical" }
  ];

  const mockTickets = [
    { id: 1, user: "John Doe", subject: "Payment not processed", status: "Open", priority: "High", created: "2024-03-25", agent: "Admin1" },
    { id: 2, user: "Jane Smith", subject: "Account verification issue", status: "In Progress", priority: "Medium", created: "2024-03-24", agent: "Admin2" },
    { id: 3, user: "Mike Johnson", subject: "Auction question", status: "Resolved", priority: "Low", created: "2024-03-23", agent: "Admin1" },
    { id: 4, user: "Sarah Wilson", subject: "Refund request", status: "Escalated", priority: "Critical", created: "2024-03-22", agent: "Admin3" }
  ];

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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
              <Badge variant="destructive" className="ml-2">3</Badge>
            </Button>
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
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{mockStats.newSignups}</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeAuctions}</div>
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
              <div className="text-2xl font-bold">₦{(mockStats.totalRevenue / 1000000).toFixed(1)}M</div>
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
              <div className="text-2xl font-bold">{mockStats.systemHealth}%</div>
              <Progress value={mockStats.systemHealth} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="auctions" className="flex items-center gap-1">
                <Gavel className="h-4 w-4" />
                <span className="hidden sm:inline">Auctions</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Finance</span>
              </TabsTrigger>
              <TabsTrigger value="moderation" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Moderation</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-1">
                <Megaphone className="h-4 w-4" />
                <span className="hidden sm:inline">Marketing</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-1">
                <HeadphonesIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
              <TabsTrigger value="operations" className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Operations</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-muted-foreground">sarah@example.com - 2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Gavel className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Auction completed</p>
                        <p className="text-xs text-muted-foreground">iPhone 14 Pro Max sold for ₦485,000</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Content flagged</p>
                        <p className="text-xs text-muted-foreground">Vintage Camera auction reported</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Verify Users
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Gavel className="h-6 w-6 mb-2" />
                      Review Auctions
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Shield className="h-6 w-6 mb-2" />
                      Handle Reports
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <HeadphonesIcon className="h-6 w-6 mb-2" />
                      Support Tickets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health & Performance</CardTitle>
                <CardDescription>Real-time platform monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Uptime</span>
                      <span className="text-sm font-medium text-green-600">99.9%</span>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">{mockStats.responseTime}ms</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Health</span>
                      <span className="text-sm font-medium text-green-600">Excellent</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">User Management</h3>
                <p className="text-sm text-muted-foreground">Manage all platform users</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'Active' ? 'default' : user.status === 'Suspended' ? 'destructive' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.verified ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border shadow-md">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auction Management Tab */}
          <TabsContent value="auctions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Auction Management</h3>
                <p className="text-sm text-muted-foreground">Oversee all platform auctions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Featured Auction
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auction</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Current Bid</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAuctions.map((auction) => (
                      <TableRow key={auction.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{auction.title}</div>
                            <div className="text-sm text-muted-foreground">{auction.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>{auction.seller}</TableCell>
                        <TableCell>₦{auction.currentBid.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            auction.status === 'Active' ? 'default' :
                            auction.status === 'Featured' ? 'secondary' :
                            auction.status === 'Flagged' ? 'destructive' : 'outline'
                          }>
                            {auction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{auction.endDate}</TableCell>
                        <TableCell>{auction.bids}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border shadow-md">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                Feature
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Auction
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Management Tab */}
          <TabsContent value="finance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Financial Management</h3>
                <p className="text-sm text-muted-foreground">Monitor transactions and revenue</p>
              </div>
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦8.92M</div>
                  <p className="text-xs text-green-600">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Commission Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦446K</div>
                  <p className="text-xs text-green-600">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pending Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦128K</div>
                  <p className="text-xs text-muted-foreground">24 pending transactions</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest platform transactions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.item}</div>
                            <div className="text-sm text-muted-foreground">
                              {transaction.buyer} → {transaction.seller}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            transaction.status === 'Completed' ? 'default' :
                            transaction.status === 'Processing' ? 'secondary' :
                            transaction.status === 'Disputed' ? 'destructive' : 'outline'
                          }>
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Content Moderation</h3>
                <p className="text-sm text-muted-foreground">Review flagged content and reports</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Bulk Action
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pending Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{mockStats.pendingReports}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Resolved Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-muted-foreground">Cases closed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Auto-Flagged</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <p className="text-xs text-muted-foreground">By AI system</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Average Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4h</div>
                  <p className="text-xs text-muted-foreground">Resolution time</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Flagged Content Reports</CardTitle>
                <CardDescription>User-reported content for review</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">Report #{report.id}</div>
                          <div className="text-sm text-muted-foreground">by {report.reporter}</div>
                        </TableCell>
                        <TableCell>{report.target}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <Badge variant={
                            report.severity === 'Critical' ? 'destructive' :
                            report.severity === 'High' ? 'destructive' :
                            report.severity === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {report.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            report.status === 'Resolved' ? 'default' :
                            report.status === 'Under Review' ? 'secondary' :
                            report.status === 'Escalated' ? 'destructive' : 'outline'
                          }>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center space-x-1">
                            <Button variant="outline" size="sm">
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Analytics & Reporting</h3>
                <p className="text-sm text-muted-foreground">Platform performance insights</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <PieChart className="h-4 w-4 mr-2" />
                    Page Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2M</div>
                  <p className="text-xs text-green-600">+15.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <LineChart className="h-4 w-4 mr-2" />
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-green-600">+0.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Avg. Session
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4:32</div>
                  <p className="text-xs text-red-600">-0:15 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Bounce Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28.5%</div>
                  <p className="text-xs text-green-600">-2.1% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Most popular auction categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Electronics</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fashion</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-20" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Vehicles</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Antiques</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={25} className="w-20" />
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users trend</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Analytics chart would be displayed here</p>
                    <p className="text-xs text-muted-foreground mt-2">Integration with charting library needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">System Configuration</h3>
              <p className="text-sm text-muted-foreground">Platform settings and configuration</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic platform configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input id="site-name" placeholder="OyaBid" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Site Description</Label>
                    <Textarea id="site-description" placeholder="Nigeria's premier auction platform" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="admin@oyabid.com" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="maintenance-mode" />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Controls</CardTitle>
                  <CardDescription>Enable or disable platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="user-registration">User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new user signups</p>
                    </div>
                    <Switch id="user-registration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auction-creation">Auction Creation</Label>
                      <p className="text-sm text-muted-foreground">Allow users to create auctions</p>
                    </div>
                    <Switch id="auction-creation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approval">Auto Approval</Label>
                      <p className="text-sm text-muted-foreground">Auto-approve new auctions</p>
                    </div>
                    <Switch id="auto-approval" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send system emails</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                    <Input id="commission-rate" type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listing-fee">Listing Fee (₦)</Label>
                    <Input id="listing-fee" type="number" placeholder="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-bid">Minimum Bid Amount (₦)</Label>
                    <Input id="min-bid" type="number" placeholder="1000" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-gateway" defaultChecked />
                    <Label htmlFor="payment-gateway">Enable Paystack</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Platform security configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                    <Input id="max-login-attempts" type="number" placeholder="5" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="two-factor" />
                    <Label htmlFor="two-factor">Require 2FA for Admins</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ip-whitelist" />
                    <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Marketing Tab */}
          <TabsContent value="marketing" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Marketing & Advertising</h3>
                <p className="text-sm text-muted-foreground">Manage campaigns and promotions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Blast
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Running promotions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Email Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.3%</div>
                  <p className="text-xs text-green-600">+2.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Click-through Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.8%</div>
                  <p className="text-xs text-green-600">+0.4% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>Create and manage marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Spring Sale 2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="banner">Banner Ads</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="sms">SMS Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-budget">Budget (₦)</Label>
                    <Input id="campaign-budget" type="number" placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-duration">Duration (days)</Label>
                    <Input id="campaign-duration" type="number" placeholder="30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Campaign Description</Label>
                  <Textarea id="campaign-description" placeholder="Describe your campaign..." />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Support & Disputes</h3>
                <p className="text-sm text-muted-foreground">Manage customer support tickets</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Open Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">47</div>
                  <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Resolved Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <p className="text-xs text-muted-foreground">Tickets closed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Avg. Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.8h</div>
                  <p className="text-xs text-green-600">15min faster than yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.6/5</div>
                  <p className="text-xs text-muted-foreground">Based on 156 ratings</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Recent customer support requests</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">#{ticket.id}</div>
                            <div className="text-sm text-muted-foreground">{ticket.user}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <Badge variant={
                            ticket.priority === 'Critical' ? 'destructive' :
                            ticket.priority === 'High' ? 'destructive' :
                            ticket.priority === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            ticket.status === 'Resolved' ? 'default' :
                            ticket.status === 'In Progress' ? 'secondary' :
                            ticket.status === 'Escalated' ? 'destructive' : 'outline'
                          }>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.agent}</TableCell>
                        <TableCell>{ticket.created}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-background border shadow-md">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="h-4 w-4 mr-2" />
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Escalate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Platform Operations</h3>
              <p className="text-sm text-muted-foreground">Monitor and manage platform infrastructure</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Server Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Online</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">99.9% uptime</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Healthy</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">68% storage used</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">API Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">245ms avg response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">CDN Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Degraded</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Some regions affected</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>Schedule and manage maintenance windows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-type">Maintenance Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled Maintenance</SelectItem>
                        <SelectItem value="emergency">Emergency Maintenance</SelectItem>
                        <SelectItem value="update">System Update</SelectItem>
                        <SelectItem value="backup">Database Backup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <Input id="duration" type="number" placeholder="2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-description">Description</Label>
                    <Textarea id="maintenance-description" placeholder="Describe the maintenance work..." />
                  </div>
                  <Button>
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Backup & Recovery</CardTitle>
                  <CardDescription>Manage data backups and recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Last Backup</p>
                      <p className="text-sm text-muted-foreground">March 25, 2024 at 02:00 AM</p>
                    </div>
                    <Badge variant="default">Success</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">Next Scheduled</p>
                      <p className="text-sm text-muted-foreground">March 26, 2024 at 02:00 AM</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Backup
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Manual Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}