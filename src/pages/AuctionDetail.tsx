import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { sampleAuctions } from "@/data/sampleAuctions";
import { Clock, Users, MapPin, Shield, Heart, Share2, ArrowLeft, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: Date;
}

export default function AuctionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [bids, setBids] = useState<Bid[]>([
    { id: "1", bidder: "John D.", amount: 480000, timestamp: new Date(Date.now() - 300000) },
    { id: "2", bidder: "Sarah M.", amount: 485000, timestamp: new Date(Date.now() - 180000) },
  ]);
  const [currentBid, setCurrentBid] = useState(485000);
  const [isWatching, setIsWatching] = useState(false);

  const auction = sampleAuctions.find(a => a.id === id);
  
  if (!auction) {
    return <div>Auction not found</div>;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = auction.endTime.getTime() - now;
      
      if (distance < 0) {
        setTimeLeft("Auction ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const handlePlaceBid = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const amount = parseInt(bidAmount.replace(/,/g, ""));
    if (amount <= currentBid) {
      toast({
        title: "Invalid Bid",
        description: `Your bid must be higher than ₦${currentBid.toLocaleString()}`,
        variant: "destructive"
      });
      return;
    }

    const newBid: Bid = {
      id: Date.now().toString(),
      bidder: user?.name || "Anonymous",
      amount,
      timestamp: new Date()
    };

    setBids(prev => [newBid, ...prev]);
    setCurrentBid(amount);
    setBidAmount("");
    
    toast({
      title: "Bid Placed Successfully!",
      description: `Your bid of ₦${amount.toLocaleString()} has been placed.`,
      variant: "default"
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    navigate(`/payment/${auction.id}?type=buynow&amount=${auction.buyNowPrice}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Auctions
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={auction.imageUrl}
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">{auction.category}</Badge>
                    {timeLeft.includes("ended") && (
                      <Badge variant="destructive">Ended</Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/80 hover:bg-background"
                      onClick={() => setIsWatching(!isWatching)}
                    >
                      <Heart className={`h-4 w-4 ${isWatching ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/80 hover:bg-background"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {auction.description}
                </p>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Seller:</span>
                    <p className="text-muted-foreground">{auction.seller}</p>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Lagos, Nigeria
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span>
                    <p className="text-muted-foreground">Excellent</p>
                  </div>
                  <div>
                    <span className="font-medium">Authenticity:</span>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      Verified
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Bid History ({bids.length} bids)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bids.map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{bid.bidder}</p>
                        <p className="text-sm text-muted-foreground">
                          {bid.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <p className="font-bold text-lg">₦{bid.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Panel */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">{auction.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Bid */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Current Bid</p>
                  <p className="text-3xl font-bold text-primary">₦{currentBid.toLocaleString()}</p>
                </div>

                {/* Buy Now Price */}
                {auction.buyNowPrice && (
                  <div className="text-center border-t pt-4">
                    <p className="text-sm text-muted-foreground">Buy It Now</p>
                    <p className="text-xl font-semibold">₦{auction.buyNowPrice.toLocaleString()}</p>
                  </div>
                )}

                {/* Timer */}
                <div className="text-center bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Time Remaining</span>
                  </div>
                  <p className="text-xl font-bold text-warning">{timeLeft}</p>
                </div>

                {/* Bidding Form */}
                {!timeLeft.includes("ended") && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Your Bid Amount</label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₦</span>
                        <Input
                          type="text"
                          placeholder={`Minimum: ${(currentBid + 1000).toLocaleString()}`}
                          value={bidAmount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            if (/^\d*$/.test(value)) {
                              setBidAmount(parseInt(value).toLocaleString());
                            }
                          }}
                          className="pl-8"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={handlePlaceBid}
                      variant="bid" 
                      size="lg" 
                      className="w-full animate-pulse-bid"
                      disabled={!bidAmount}
                    >
                      <Gavel className="h-4 w-4 mr-2" />
                      Place Bid
                    </Button>

                    {auction.buyNowPrice && (
                      <Button 
                        onClick={handleBuyNow}
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                      >
                        Buy It Now
                      </Button>
                    )}
                  </div>
                )}

                {timeLeft.includes("ended") && (
                  <div className="text-center py-4">
                    <p className="text-lg font-semibold text-muted-foreground">Auction Ended</p>
                    {bids.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Won by {bids[0].bidder} with ₦{bids[0].amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center text-sm border-t pt-4">
                  <div>
                    <p className="font-medium">{bids.length}</p>
                    <p className="text-muted-foreground">Bids</p>
                  </div>
                  <div>
                    <p className="font-medium">247</p>
                    <p className="text-muted-foreground">Watching</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={login}
      />
    </div>
  );
}