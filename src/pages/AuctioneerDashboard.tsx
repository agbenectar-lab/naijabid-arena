import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, Gavel, TrendingUp, DollarSign, Package, Clock, Edit, Eye, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AuctioneerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const myAuctions = [
    {
      id: "1",
      title: "iPhone 14 Pro Max 256GB - Excellent Condition",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      currentBid: 485000,
      startingBid: 400000,
      bidCount: 23,
      timeLeft: "2h 15m",
      status: "active",
      views: 147
    },
    {
      id: "2",
      title: "Gaming Laptop - RTX 3070, Intel i7",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300",
      currentBid: 650000,
      startingBid: 500000,
      bidCount: 8,
      timeLeft: "1d 4h",
      status: "active",
      views: 89
    },
    {
      id: "3",
      title: "Professional DSLR Camera Kit",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300",
      currentBid: 1200000,
      startingBid: 800000,
      bidCount: 9,
      timeLeft: "5d 2h",
      status: "active",
      views: 234
    }
  ];

  const completedAuctions = [
    {
      id: "4",
      title: "Vintage Watch Collection",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      finalBid: 850000,
      startingBid: 300000,
      bidCount: 15,
      completedDate: "2024-01-15",
      status: "sold"
    }
  ];

  const stats = [
    { label: "Active Auctions", value: "3", icon: Gavel, color: "text-blue-600" },
    { label: "Total Revenue", value: "₦2.1M", icon: DollarSign, color: "text-green-600" },
    { label: "Items Sold", value: "12", icon: Package, color: "text-orange-600" },
    { label: "Success Rate", value: "92%", icon: TrendingUp, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your auctions and track your sales performance.</p>
          </div>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/create-auction')}
            className="group"
          >
            <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            Create Auction
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted/30`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Active Auctions ({myAuctions.length})
                </CardTitle>
                <CardDescription>
                  Monitor your ongoing auctions and bidding activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src={auction.image} 
                        alt={auction.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{auction.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Current Bid:</span>
                            <p className="text-lg font-bold text-primary">₦{auction.currentBid.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">Bids:</span>
                            <p>{auction.bidCount} bids</p>
                          </div>
                          <div>
                            <span className="font-medium">Views:</span>
                            <p>{auction.views} views</p>
                          </div>
                          <div>
                            <span className="font-medium">Time Left:</span>
                            <p className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {auction.timeLeft}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Active</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/auction/${auction.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Auction
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Completed Auctions ({completedAuctions.length})
                </CardTitle>
                <CardDescription>
                  Review your sold items and transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={auction.image} 
                        alt={auction.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{auction.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Final Price:</span>
                            <p className="text-lg font-bold text-success">₦{auction.finalBid.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">Starting Bid:</span>
                            <p>₦{auction.startingBid.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">Completed:</span>
                            <p>{new Date(auction.completedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Sold</Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/order-management/${auction.id}`)}
                        >
                          Manage Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Views</span>
                      <span className="text-2xl font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-2xl font-bold">18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Avg. Sale Price</span>
                      <span className="text-2xl font-bold">₦175K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Electronics</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-16 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fashion</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-8 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Vehicles</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div className="w-4 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seller Settings</CardTitle>
                <CardDescription>
                  Configure your selling preferences and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Settings panel coming soon...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure payment methods, shipping preferences, and notification settings.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}