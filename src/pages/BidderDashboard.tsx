import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Gavel, Heart, Package, Trophy, TrendingUp, Clock, Eye } from "lucide-react";

export default function BidderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const stats = [
    { label: "Active Bids", value: "2", icon: Gavel, color: "text-blue-600" },
    { label: "Watching", value: "8", icon: Heart, color: "text-red-600" },
    { label: "Won Auctions", value: "3", icon: Trophy, color: "text-yellow-600" },
    { label: "Success Rate", value: "85%", icon: TrendingUp, color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Track your bids, manage your watchlist, and discover new auctions.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="active-bids" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active-bids">Active Bids</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="won">Won Auctions</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="active-bids" className="space-y-6">
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/auction/${bid.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                          variant="bid" 
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
                          variant="hero" 
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
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    When you win auctions and complete payments, your orders will appear here.
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