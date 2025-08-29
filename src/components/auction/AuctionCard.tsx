import { useState } from "react";
import { Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuctionTimer } from "./AuctionTimer";
import { useNavigate } from "react-router-dom";
import { useBidManager } from "@/hooks/useBidManager";

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
  const navigate = useNavigate();
  const { getHighestBid } = useBidManager();
  const [isWatching, setIsWatching] = useState(false);
  
  const displayCurrentBid = getHighestBid(id)?.amount || currentBid;

  const handleBidNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/auction/${id}`);
  };

  const handleWatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWatching(!isWatching);
  };

  const handleCardClick = () => {
    navigate(`/auction/${id}`);
  };

  return (
    <Card className="group cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1" onClick={handleCardClick}>
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
        <div className="absolute top-2 left-2">
          <AuctionTimer endTime={endTime.toISOString()} size="sm" />
        </div>
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
              ₦{displayCurrentBid.toLocaleString()}
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
        <div className="grid grid-cols-2 gap-2 w-full text-sm text-muted-foreground">
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
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleWatch}
            className={isWatching ? "bg-red-50 text-red-600 border-red-200" : ""}
          >
            {isWatching ? "Watching" : "Watch"}
          </Button>
          <Button variant="bid" size="sm" className="animate-pulse-bid" onClick={handleBidNow}>
            Bid Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
