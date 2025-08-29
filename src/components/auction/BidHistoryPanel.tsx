import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Trophy, TrendingUp } from "lucide-react";
import { useBidManager, Bid } from "@/hooks/useBidManager";
import { formatDistanceToNow } from "date-fns";

interface BidHistoryPanelProps {
  auctionId: string;
  currentBid: number;
}

export function BidHistoryPanel({ auctionId, currentBid }: BidHistoryPanelProps) {
  const { getBidsForAuction, getHighestBid } = useBidManager();
  const bids = getBidsForAuction(auctionId);
  const highestBid = getHighestBid(auctionId);

  const formatBidAmount = (amount: number) => `₦${amount.toLocaleString()}`;

  const getBidStatus = (bid: Bid) => {
    if (bid.isWinning && bid === highestBid) {
      return { label: "Winning", variant: "default" as const, icon: Trophy };
    }
    return { label: "Outbid", variant: "secondary" as const, icon: TrendingUp };
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Bid History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bids.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No bids placed yet</p>
            <p className="text-xs">Be the first to bid!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {bids.map((bid, index) => {
              const status = getBidStatus(bid);
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={bid.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                    bid.isWinning 
                      ? 'bg-primary/5 border-primary/20 shadow-sm' 
                      : 'bg-muted/30 border-border/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {bid.bidder.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{bid.bidder}</span>
                        <Badge variant={status.variant} className="h-5 px-2 text-xs">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(bid.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${bid.isWinning ? 'text-primary' : 'text-foreground'}`}>
                      {formatBidAmount(bid.amount)}
                    </p>
                    {index === 0 && bid.amount > currentBid && (
                      <p className="text-xs text-success">
                        +₦{(bid.amount - currentBid).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {bids.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total Bids:</span>
              <span className="font-medium">{bids.length}</span>
            </div>
            {highestBid && (
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-muted-foreground">Current Leader:</span>
                <span className="font-medium text-primary">{highestBid.bidder}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}