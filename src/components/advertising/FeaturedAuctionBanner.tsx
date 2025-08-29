import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Eye, TrendingUp } from "lucide-react";
import { Auction } from "@/data/sampleAuctions";

interface FeaturedAuctionBannerProps {
  auction: Auction;
  position: "hero" | "sidebar" | "grid";
  onClick: () => void;
}

export function FeaturedAuctionBanner({ auction, position, onClick }: FeaturedAuctionBannerProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const diff = auction.endTime.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  if (position === "hero") {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-accent text-accent-foreground flex items-center gap-1 animate-pulse">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="outline" className="bg-background/90 border-warning text-warning">
            <Clock className="h-3 w-3 mr-1" />
            {getTimeRemaining()}
          </Badge>
        </div>

        <CardContent className="p-0" onClick={onClick}>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {auction.title}
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  {auction.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Bid</p>
                  <p className="text-2xl font-bold text-accent">
                    {formatCurrency(auction.currentBid)}
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{auction.bidCount} bids</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending</span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full md:w-auto">
                Bid Now
              </Button>
            </div>

            <div className="relative">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-48 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (position === "sidebar") {
    return (
      <Card className="relative overflow-hidden border-accent/20 hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-accent text-accent-foreground text-xs">
            <Star className="h-2 w-2 mr-1 fill-current" />
            Featured
          </Badge>
        </div>

        <CardContent className="p-0" onClick={onClick}>
          <div className="relative">
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-2 right-2">
              <Badge variant="outline" className="bg-background/90 text-xs">
                <Clock className="h-2 w-2 mr-1" />
                {getTimeRemaining()}
              </Badge>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors">
              {auction.title}
            </h3>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="font-bold text-accent text-sm">
                  {formatCurrency(auction.currentBid)}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {auction.bidCount} bids
              </Badge>
            </div>

            <Button size="sm" className="w-full text-xs">
              Bid Now
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid position (default)
  return (
    <Card className="relative overflow-hidden border-accent/20 hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
      <div className="absolute top-3 left-3 z-10">
        <Badge className="bg-accent text-accent-foreground">
          <Star className="h-3 w-3 mr-1 fill-current" />
          Featured
        </Badge>
      </div>

      <CardContent className="p-0" onClick={onClick}>
        <div className="relative">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-background/90 border-warning text-warning">
              <Clock className="h-3 w-3 mr-1" />
              {getTimeRemaining()}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 group-hover:text-accent transition-colors">
            {auction.title}
          </h3>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Current Bid</p>
              <p className="font-bold text-accent">
                {formatCurrency(auction.currentBid)}
              </p>
            </div>
            <Badge variant="outline">
              {auction.bidCount} bids
            </Badge>
          </div>

          <Button className="w-full">
            Bid Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}