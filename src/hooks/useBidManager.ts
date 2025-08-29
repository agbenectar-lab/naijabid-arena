import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: number;
  timestamp: Date;
  isWinning: boolean;
}

export interface BidValidation {
  isValid: boolean;
  message?: string;
}

export function useBidManager() {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(false);

  // Load bids from localStorage on mount
  useEffect(() => {
    const savedBids = localStorage.getItem('auction-bids');
    if (savedBids) {
      const parsedBids = JSON.parse(savedBids).map((bid: any) => ({
        ...bid,
        timestamp: new Date(bid.timestamp)
      }));
      setBids(parsedBids);
    }
  }, []);

  // Save bids to localStorage whenever bids change
  useEffect(() => {
    localStorage.setItem('auction-bids', JSON.stringify(bids));
  }, [bids]);

  const validateBid = useCallback((amount: number, currentBid: number, minimumIncrement: number = 1000): BidValidation => {
    if (!user) {
      return { isValid: false, message: 'You must be logged in to place a bid' };
    }

    if (amount <= currentBid) {
      return { isValid: false, message: `Bid must be higher than current bid of ₦${currentBid.toLocaleString()}` };
    }

    if (amount < currentBid + minimumIncrement) {
      return { isValid: false, message: `Minimum bid increment is ₦${minimumIncrement.toLocaleString()}` };
    }

    return { isValid: true };
  }, [user]);

  const placeBid = useCallback(async (auctionId: string, amount: number, currentBid: number): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place a bid",
        variant: "destructive",
      });
      return false;
    }

    const validation = validateBid(amount, currentBid);
    if (!validation.isValid) {
      toast({
        title: "Invalid Bid",
        description: validation.message,
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBid: Bid = {
        id: `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId,
        bidder: user.name,
        amount,
        timestamp: new Date(),
        isWinning: true
      };

      setBids(prevBids => {
        // Mark all previous bids for this auction as not winning
        const updatedBids = prevBids.map(bid => 
          bid.auctionId === auctionId ? { ...bid, isWinning: false } : bid
        );
        
        return [...updatedBids, newBid];
      });

      toast({
        title: "Bid Placed Successfully!",
        description: `Your bid of ₦${amount.toLocaleString()} has been placed`,
      });

      return true;
    } catch (error) {
      toast({
        title: "Bid Failed",
        description: "Failed to place bid. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, validateBid]);

  const getBidsForAuction = useCallback((auctionId: string): Bid[] => {
    return bids
      .filter(bid => bid.auctionId === auctionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [bids]);

  const getHighestBid = useCallback((auctionId: string): Bid | null => {
    const auctionBids = getBidsForAuction(auctionId);
    return auctionBids.length > 0 ? auctionBids[0] : null;
  }, [getBidsForAuction]);

  const getUserBids = useCallback((userId?: string): Bid[] => {
    const targetUser = userId || user?.name;
    if (!targetUser) return [];
    
    return bids
      .filter(bid => bid.bidder === targetUser)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [bids, user]);

  const isUserWinning = useCallback((auctionId: string): boolean => {
    if (!user) return false;
    const highestBid = getHighestBid(auctionId);
    return highestBid?.bidder === user.name;
  }, [user, getHighestBid]);

  return {
    bids,
    loading,
    placeBid,
    validateBid,
    getBidsForAuction,
    getHighestBid,
    getUserBids,
    isUserWinning
  };
}