import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { BiddingPanel } from "@/components/auction/BiddingPanel";
import { BidHistoryPanel } from "@/components/auction/BidHistoryPanel";
import { CountdownDisplay } from "@/components/auction/AuctionTimer";
import { ContactSellerModal } from "@/components/contact/ContactSellerModal";
import { sampleAuctions } from "@/data/sampleAuctions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AdvertisementBanner } from "@/components/advertising/AdvertisementBanner";
import { User, Package, Shield, Star, MessageCircle } from "lucide-react";

export default function AuctionDetailSimple() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auction = sampleAuctions.find(a => a.id === id);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Auction Not Found</h1>
            <p className="text-muted-foreground mb-6">The auction you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/auctions')}>View All Auctions</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Top Advertisement Banner */}
        <AdvertisementBanner position="top" className="mb-8" />
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
            {/* Image and Timer */}
            <div className="relative">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-96 object-cover rounded-lg shadow-card"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <CountdownDisplay endTime={auction.endTime.toISOString()} />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{auction.title}</h1>
                  <Badge variant="secondary">{auction.category}</Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {auction.description}
              </p>
            </div>

            <Separator />

            {/* Seller Information */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Seller Information</h3>
                  <p className="text-muted-foreground">Verified seller</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{auction.seller}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">100+ items sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <span className="text-sm">4.8/5 rating</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button 
                  onClick={() => setShowContactModal(true)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
              </div>
            </div>

            
            {/* Inline Advertisement */}
            <AdvertisementBanner position="inline" />

            {/* Bid History */}
            <BidHistoryPanel auctionId={auction.id} currentBid={auction.currentBid} />
            </div>
          </div>
          
          {/* Sidebar with Ads and Bidding */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bidding Panel */}
            <BiddingPanel
              auctionId={auction.id}
              currentBid={auction.currentBid}
              buyNowPrice={auction.buyNowPrice}
              endTime={auction.endTime.toISOString()}
              onAuthRequired={() => setShowAuthModal(true)}
            />
            
            {/* Sidebar Advertisements */}
            <AdvertisementBanner position="sidebar" />
            <AdvertisementBanner position="sidebar" />
          </div>
        </div>
        
        {/* Bottom Advertisement Banner */}
        <AdvertisementBanner position="bottom" className="mt-8" />
      </main>

      <Footer />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setShowAuthModal(false)}
      />
      
      <ContactSellerModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        sellerName={auction.seller}
        auctionTitle={auction.title}
      />
    </div>
  );
}