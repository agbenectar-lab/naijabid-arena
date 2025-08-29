import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ContactSellerModal } from "@/components/contact/ContactSellerModal";
import { RatingReviewModal } from "@/components/review/RatingReviewModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuctions } from "@/contexts/AuctionContext";
import { 
  Gavel, 
  Heart, 
  Package, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Eye, 
  MessageCircle, 
  Star, 
  Plus,
  DollarSign,
  Users,
  MoreHorizontal,
  Edit,
  Search,
  Filter,
  Bell
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role, permissions } = useUserRole();
  const { getUserAuctions } = useAuctions();
  
  const userAuctions = getUserAuctions(user?.name || "");
  const activeAuctions = userAuctions.filter(auction => auction.endTime > new Date());
  const completedAuctions = userAuctions.filter(auction => auction.endTime <= new Date());
  
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    sellerName: string;
    auctionTitle: string;
  }>({
    isOpen: false,
    sellerName: "",
    auctionTitle: ""
  });
  
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    auctionTitle: string;
    sellerName: string;
    orderId?: string;
  }>({
    isOpen: false,
    auctionTitle: "",
    sellerName: "",
    orderId: ""
  });

  // Mock data for bidding activity
  const activeBids = [
    {
      id: "1",
      title: "iPhone 14 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
      currentBid: 485000,
      myBid: 475000,
      timeLeft: "2h 15m",
      status: "leading"
    },
    {
      id: "2", 
      title: "Gaming Laptop - RTX 3070",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300",
      currentBid: 680000,
      myBid: 650000,
      timeLeft: "1d 4h",
      status: "outbid"
    }
  ];

  const watchlist = [
    {
      id: "3",
      title: "Nike Air Jordan 1 Retro",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300",
      currentBid: 125000,
      timeLeft: "3h 45m",
      bidCount: 18
    },
    {
      id: "4",
      title: "Samsung Galaxy S23 Ultra",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
      currentBid: 420000,
      timeLeft: "6h 30m",
      bidCount: 15
    }
  ];

  const wonAuctions = [
    {
      id: "5",
      title: "Vintage Camera Kit",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300",
      finalBid: 350000,
      wonDate: "2024-01-15",
      status: "payment_pending"
    }
  ];

  // Calculate comprehensive stats
  const totalRevenue = completedAuctions.reduce((total, auction) => total + auction.currentBid, 0);
  const totalBids = userAuctions.reduce((total, auction) => total + auction.bidCount, 0);
  const hasBiddingActivity = activeBids.length > 0 || wonAuctions.length > 0;
  const hasSellingActivity = userAuctions.length > 0;

  // Dynamic stats based on user activity
  const getAdaptiveStats = () => {
    const stats = [];
    
    if (hasBiddingActivity) {
      stats.push(
        { label: "Active Bids", value: activeBids.length.toString(), icon: Gavel, color: "text-blue-600" },
        { label: "Watching", value: watchlist.length.toString(), icon: Heart, color: "text-red-600" }
      );
    }
    
    if (hasSellingActivity) {
      stats.push(
        { label: "Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
        { label: "Total Bidders", value: totalBids.toString(), icon: Users, color: "text-purple-600" }
      );
    }
    
    // Always show these
    stats.push(
      { label: "Won Auctions", value: wonAuctions.length.toString(), icon: Trophy, color: "text-yellow-600" },
      { label: "Success Rate", value: "85%", icon: TrendingUp, color: "text-emerald-600" }
    );
    
    return stats.slice(0, 4); // Limit to 4 stats
  };

  // Dynamic tabs based on user activity
  const getAvailableTabs = () => {
    const tabs = [];
    
    if (hasBiddingActivity) {
      tabs.push({ value: "bids", label: "Active Bids", count: activeBids.length });
    }
    
    tabs.push({ value: "watchlist", label: "Watchlist", count: watchlist.length });
    
    if (hasSellingActivity) {
      tabs.push({ value: "selling", label: "My Auctions", count: activeAuctions.length });
    }
    
    if (wonAuctions.length > 0) {
      tabs.push({ value: "won", label: "Won Items", count: wonAuctions.length });
    }
    
    if (hasSellingActivity) {
      tabs.push({ value: "sales", label: "Sales", count: completedAuctions.length });
    }
    
    tabs.push({ value: "orders", label: "Orders", count: 1 });
    
    if (hasSellingActivity || hasBiddingActivity) {
      tabs.push({ value: "analytics", label: "Analytics", count: null });
    }
    
    return tabs;
  };

  const adaptiveStats = getAdaptiveStats();
  const availableTabs = getAvailableTabs();
  const defaultTab = hasBiddingActivity ? "bids" : hasSellingActivity ? "selling" : "watchlist";
  
  const openContactModal = (sellerName: string, auctionTitle: string) => {
    setContactModal({
      isOpen: true,
      sellerName,
      auctionTitle
    });
  };

  const openReviewModal = (auctionTitle: string, sellerName: string, orderId?: string) => {
    setReviewModal({
      isOpen: true,
      auctionTitle,
      sellerName,
      orderId
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                Your complete auction hub - Buy, sell, and manage all activities
              </p>
              <Badge variant="outline" className="bg-gradient-to-r from-primary/10 to-primary/20">
                {hasSellingActivity && hasBiddingActivity ? "Buyer & Seller" : 
                 hasSellingActivity ? "Seller" : "Buyer"}
              </Badge>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Browse
            </Button>
            <Button onClick={() => navigate('/create-auction')} className="bg-gradient-to-r from-primary to-primary/80">
              <Plus className="h-4 w-4 mr-2" />
              Create Auction
            </Button>
          </div>
        </div>

        {/* Adaptive Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {adaptiveStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-primary/20">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dynamic Tabs */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid grid-cols-7 w-full max-w-4xl">
              {availableTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="relative">
                  {tab.label}
                  {tab.count !== null && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Active Bids Tab */}
          {hasBiddingActivity && (
            <TabsContent value="bids" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    Active Bids ({activeBids.length})
                  </CardTitle>
                  <CardDescription>
                    Auctions you're currently bidding on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeBids.map((bid) => (
                      <div key={bid.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <img 
                          src={bid.image} 
                          alt={bid.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{bid.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Current: ₦{bid.currentBid.toLocaleString()}</span>
                            <span>Your bid: ₦{bid.myBid.toLocaleString()}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {bid.timeLeft}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={bid.status === "leading" ? "default" : "destructive"}
                          >
                            {bid.status === "leading" ? "Leading" : "Outbid"}
                          </Badge>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => openContactModal("Seller Name", bid.title)}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/auction/${bid.id}`)}
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Watchlist Tab */}
          <TabsContent value="watchlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Watchlist ({watchlist.length})
                </CardTitle>
                <CardDescription>
                  Auctions you're interested in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Current: ₦{item.currentBid.toLocaleString()}</span>
                          <span>{item.bidCount} bids</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.timeLeft}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => navigate(`/auction/${item.id}`)}
                        >
                          Bid Now
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Auctions Tab */}
          {hasSellingActivity && (
            <TabsContent value="selling">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Gavel className="h-5 w-5" />
                      My Auctions ({activeAuctions.length} active)
                    </CardTitle>
                    <Button onClick={() => navigate('/create-auction')} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Auction
                    </Button>
                  </div>
                  <CardDescription>
                    Manage your current listings and track performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeAuctions.length === 0 ? (
                    <div className="text-center py-12">
                      <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-2">No active auctions</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Start selling your items by creating your first auction.
                      </p>
                      <Button onClick={() => navigate('/create-auction')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Auction
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
          )}

          {/* Won Auctions Tab */}
          <TabsContent value="won" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Won Auctions ({wonAuctions.length})
                </CardTitle>
                <CardDescription>
                  Auctions you've successfully won
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wonAuctions.map((auction) => (
                    <div key={auction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={auction.image} 
                        alt={auction.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{auction.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>Final bid: ₦{auction.finalBid.toLocaleString()}</span>
                          <span>Won on: {new Date(auction.wonDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {auction.status === "payment_pending" ? "Payment Pending" : "Completed"}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/payment/${auction.id}?type=won&amount=${auction.finalBid}`)}
                        >
                          {auction.status === "payment_pending" ? "Pay Now" : "View Order"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          {hasSellingActivity && (
            <TabsContent value="sales" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Completed Sales ({completedAuctions.length})
                  </CardTitle>
                  <CardDescription>
                    Review your sold items and transaction history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {completedAuctions.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Completed Sales</h3>
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
                                <p className="text-lg font-bold text-green-600">₦{auction.currentBid.toLocaleString()}</p>
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
          )}

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>
                  Track your deliveries and order status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                      alt="Sample order"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">Nike Air Jordan 1 Retro</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Final bid: ₦125,000</span>
                        <span>Delivered: Jan 20, 2024</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openContactModal("Nike Store", "Nike Air Jordan 1 Retro")}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openReviewModal("Nike Air Jordan 1 Retro", "Nike Store", "ORD-2024-001")}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          {(hasSellingActivity || hasBiddingActivity) && (
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Activity</span>
                        <span className="text-2xl font-bold">{activeBids.length + userAuctions.length}</span>
                      </div>
                      {hasSellingActivity && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Revenue</span>
                          <span className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-2xl font-bold">85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {hasBiddingActivity && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Bidding</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Active</span>
                          </div>
                        </div>
                      )}
                      {hasSellingActivity && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Selling</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full">
                              <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium">Growing</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Watching</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">{watchlist.length}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />

      {/* Modals */}
      <ContactSellerModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, sellerName: "", auctionTitle: "" })}
        sellerName={contactModal.sellerName}
        auctionTitle={contactModal.auctionTitle}
      />

      <RatingReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, auctionTitle: "", sellerName: "", orderId: "" })}
        auctionTitle={reviewModal.auctionTitle}
        sellerName={reviewModal.sellerName}
        orderId={reviewModal.orderId}
      />
    </div>
  );
}