import { createContext, useContext, useState, ReactNode } from "react";
import { sampleAuctions, Auction } from "@/data/sampleAuctions";

interface AuctionContextType {
  auctions: Auction[];
  addAuction: (auction: Omit<Auction, 'id'>) => void;
  getUserAuctions: (sellerName: string) => Auction[];
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [auctions, setAuctions] = useState<Auction[]>(sampleAuctions);

  const addAuction = (auctionData: Omit<Auction, 'id'>) => {
    const newAuction: Auction = {
      ...auctionData,
      id: (auctions.length + 1).toString()
    };
    setAuctions(prev => [newAuction, ...prev]);
  };

  const getUserAuctions = (sellerName: string) => {
    return auctions.filter(auction => auction.seller === sellerName);
  };

  return (
    <AuctionContext.Provider value={{ auctions, addAuction, getUserAuctions }}>
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuctions() {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuctions must be used within an AuctionProvider');
  }
  return context;
}