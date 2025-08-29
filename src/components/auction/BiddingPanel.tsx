import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gavel, Heart, ShoppingCart, TrendingUp, Zap } from "lucide-react";
import { useBidManager } from "@/hooks/useBidManager";
import { useAuth } from "@/contexts/AuthContext";
import { AuctionTimer } from "./AuctionTimer";
import { useNavigate } from "react-router-dom";

interface BiddingPanelProps {
  auctionId: string;
  currentBid: number;
  buyNowPrice?: number;
  endTime: string;
  onAuthRequired: () => void;
}

export function BiddingPanel({ 
  auctionId, 
  currentBid, 
  buyNowPrice, 
  endTime,
  onAuthRequired 
}: BiddingPanelProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { placeBid, loading, isUserWinning, getHighestBid } = useBidManager();
  
  const [bidAmount, setBidAmount] = useState("");
  const [isWatching, setIsWatching] = useState(false);
  
  const minimumBid = currentBid + 1000;
  const isWinning = isUserWinning(auctionId);
  const highestBid = getHighestBid(auctionId);
  const displayCurrentBid = highestBid?.amount || currentBid;

  const handlePlaceBid = async () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) return;

    const success = await placeBid(auctionId, amount, displayCurrentBid);
    if (success) {
      setBidAmount("");
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    navigate(`/payment/${auctionId}`);
  };

  const handleWatch = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    setIsWatching(!isWatching);
  };

  const suggestedBids = [
    minimumBid,
    minimumBid + 5000,
    minimumBid + 10000,
    minimumBid + 25000
  ];

  return (
    <Card className="sticky top-6 shadow-card-hover">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-primary" />
            Bidding
          </span>
          <AuctionTimer endTime={endTime} size="sm" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Bid Display */}
        <div className="text-center space-y-2">
          <div className="text-sm text-muted-foreground">Current Bid</div>
          <div className="text-3xl font-bold text-primary">
            ₦{displayCurrentBid.toLocaleString()}
          </div>
          {isWinning && (
            <Badge variant="default" className="bg-success text-success-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              You're winning!
            </Badge>
          )}
        </div>

        <Separator />

        {/* Bid Input */}
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Bid Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₦
              </span>
              <Input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={minimumBid.toLocaleString()}
                className="pl-8"
                min={minimumBid}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum bid: ₦{minimumBid.toLocaleString()}
            </p>
          </div>

          {/* Quick Bid Suggestions */}
          <div className="grid grid-cols-2 gap-2">
            {suggestedBids.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setBidAmount(amount.toString())}
                className="text-xs"
              >
                ₦{(amount / 1000)}k
              </Button>
            ))}
          </div>

          {/* Place Bid Button */}
          <Button
            onClick={handlePlaceBid}
            disabled={loading || !bidAmount || parseFloat(bidAmount) < minimumBid}
            className="w-full bg-bid-gradient hover:opacity-90 transition-all duration-300"
            size="lg"
          >
            {loading ? (
              "Placing Bid..."
            ) : (
              <>
                <Gavel className="h-4 w-4 mr-2" />
                Place Bid
              </>
            )}
          </Button>
        </div>

        {/* Buy Now Section */}
        {buyNowPrice && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Buy It Now</div>
                <div className="text-xl font-bold">₦{buyNowPrice.toLocaleString()}</div>
              </div>
              <Button
                onClick={handleBuyNow}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </>
        )}

        <Separator />

        {/* Watch Button */}
        <Button
          onClick={handleWatch}
          variant="outline"
          className="w-full"
        >
          <Heart className={`h-4 w-4 mr-2 ${isWatching ? 'fill-current text-red-500' : ''}`} />
          {isWatching ? 'Watching' : 'Watch Item'}
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
          <div className="text-center">
            <div className="font-medium">{highestBid ? '1+' : '0'}</div>
            <div className="text-muted-foreground">Bids</div>
          </div>
          <div className="text-center">
            <div className="font-medium">0</div>
            <div className="text-muted-foreground">Watchers</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}