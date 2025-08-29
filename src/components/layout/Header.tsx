
import React, { useState } from "react";
import { Search, Plus, User, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { user, isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleSellClick = () => {
    if (isAuthenticated) {
      navigate('/create-auction');
    } else {
      setShowAuthModal(true);
    }
  };

  const handleWatchlistClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center justify-center w-8 h-8 bg-auction-gradient rounded-lg">
              <span className="text-primary-foreground font-bold text-sm">OB</span>
            </div>
            <span className="font-bold text-xl text-primary">OyaBid</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search auctions..." 
                className="pl-10 bg-background"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="hero" size="sm" onClick={handleSellClick}>
              <Plus className="h-4 w-4 mr-2" />
              Sell Your Items
            </Button>
            
            <Button variant="ghost" size="sm" className="relative" onClick={handleWatchlistClick}>
              <Heart className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleUserClick}>
              <User className="h-5 w-5" />
              {isAuthenticated && <span className="ml-2 hidden md:inline">{user?.name}</span>}
            </Button>
            
            {isAuthenticated ? (
              <>
                {user?.email === "admin@oyabid.com" && (
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin')}>
                    Admin
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setShowAuthModal(true)}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={login}
      />
    </>
  );
}
