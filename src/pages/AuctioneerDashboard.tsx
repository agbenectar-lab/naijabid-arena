import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useAuctions } from "@/contexts/AuctionContext";
import { useNavigate } from "react-router-dom";
import { Plus, Gavel, TrendingUp, DollarSign, Package, Clock, Edit, Eye, MoreHorizontal, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AuctioneerDashboard() {
  const { user } = useAuth();
  const { getUserAuctions } = useAuctions();
  const navigate = useNavigate();

  // Get user's auctions
  const userAuctions = getUserAuctions(user?.name || "");
  
  // Filter active and completed auctions
  const activeAuctions = userAuctions.filter(auction => auction.endTime > new Date());
  const completedAuctions = userAuctions.filter(auction => auction.endTime <= new Date());

  // Calculate stats from user's real auctions
  const totalRevenue = completedAuctions.reduce((total, auction) => total + auction.currentBid, 0);
  const totalBids = userAuctions.reduce((total, auction) => total + auction.bidCount, 0);
  const avgBidValue = totalBids > 0 ? totalRevenue / totalBids : 0;

  const stats = [
    {
      title: "Total Revenue",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: `From ${completedAuctions.length} completed auctions`
    },
    {
      title: "Active Auctions", 
      value: activeAuctions.length.toString(),
      icon: Package,
      description: `${totalBids} total bids received`
    },
    {
      title: "Total Bidders",
      value: totalBids.toString(),
      icon: Users,
      description: `Avg. bid: ₦${avgBidValue.toLocaleString()}`
    },
    {
      title: "Success Rate",
      value: "94%",
      icon: TrendingUp,
      description: "Auctions completed successfully"
    }
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
              <Card key={stat.title} className="hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
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
                  Active Auctions ({activeAuctions.length})
                </CardTitle>
                <CardDescription>
                  Monitor your ongoing auctions and bidding activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Auctions</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any active auctions yet. Create your first auction to start selling!
                    </p>
                    <Button onClick={() => navigate('/create-auction')} variant="hero">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Auction
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeAuctions.map((auction) => {
                      const timeLeft = Math.max(0, auction.endTime.getTime() - Date.now());
                      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                      
                      return (
                        <div key={auction.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <img 
                            src={auction.imageUrl} 
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
                                <span className="font-medium">Category:</span>
                                <p>{auction.category}</p>
                              </div>
                              <div>
                                <span className="font-medium">Time Left:</span>
                                <p className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {days}d {hours}h {minutes}m
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
                      );
                    })}
                  </div>
                )}
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
                {completedAuctions.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Completed Auctions</h3>
                    <p className="text-muted-foreground">
                      Your completed auctions will appear here once they end.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedAuctions.map((auction) => (
                      <div key={auction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img 
                          src={auction.imageUrl} 
                          alt={auction.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{auction.title}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Final Price:</span>
                              <p className="text-lg font-bold text-success">₦{auction.currentBid.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Total Bids:</span>
                              <p>{auction.bidCount} bids</p>
                            </div>
                            <div>
                              <span className="font-medium">Completed:</span>
                              <p>{auction.endTime.toLocaleDateString()}</p>
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
                )}
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