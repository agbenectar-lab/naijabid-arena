import { Search, TrendingUp, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import heroImage from "@/assets/hero-auction.jpg";

export function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartBidding = () => {
    navigate('/auctions');
  };

  const handleSellItems = () => {
    if (isAuthenticated && user?.role === 'auctioneer') {
      navigate('/create-auction');
    } else if (isAuthenticated && user?.role === 'bidder') {
      // Show message that they need auctioneer account
      setShowAuthModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-primary/5 py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Nigerian Auction Platform"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Nigeria's Premier
                <span className="bg-auction-gradient bg-clip-text text-transparent"> Auction Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover amazing deals, bid on unique items, and sell your treasures. 
                Join thousands of Nigerians in the most trusted auction marketplace.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for anything..." 
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button variant="hero" size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={handleStartBidding}>
                Start Bidding
              </Button>
              <Button variant="outline" size="lg" onClick={handleSellItems}>
                Sell Your Items
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Bidders</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-2">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Safe Transactions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mx-auto mb-2">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Live Auctions</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-card-hover p-8 border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Auction</h3>
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    • LIVE
                  </span>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">₦485,000</div>
                    <div className="text-muted-foreground">Current Bid</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground">Ending in</div>
                    <div className="text-lg font-semibold text-warning">47m 23s</div>
                  </div>
                  <Button variant="bid" className="px-8">
                    Place Bid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={login}
      />
    </section>
  );
}