import { useState, useEffect } from "react";
import { Clock, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuctionCardProps {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  buyNowPrice?: number;
  imageUrl: string;
  endTime: Date;
  bidCount: number;
  category: string;
  seller: string;
}

export function AuctionCard({ 
  id, 
  title, 
  description, 
  currentBid, 
  buyNowPrice,
  imageUrl, 
  endTime, 
  bidCount, 
  category,
  seller 
}: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;
      
      if (distance < 0) {
        setTimeLeft("Auction ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setIsEndingSoon(distance < 3600000); // Less than 1 hour
      
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Card className="group cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm"
        >
          {category}
        </Badge>
        {isEndingSoon && (
          <Badge 
            variant="destructive"
            className="absolute top-2 left-2 animate-pulse"
          >
            Ending Soon!
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current bid</span>
            <span className="text-xl font-bold text-primary">
              ₦{currentBid.toLocaleString()}
            </span>
          </div>
          
          {buyNowPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Buy now</span>
              <span className="text-lg font-semibold">
                ₦{buyNowPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="grid grid-cols-3 gap-2 w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className={isEndingSoon ? "text-warning font-medium" : ""}>
              {timeLeft}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{bidCount} bids</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span className="truncate">{seller}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" size="sm">
            Watch
          </Button>
          <Button variant="bid" size="sm" className="animate-pulse-bid">
            Bid Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}