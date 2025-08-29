import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  LogOut, 
  Gavel, 
  Menu, 
  Bell,
  ShoppingCart,
  Zap,
  Sparkles,
  Heart
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAuthSuccess = (userData: { name: string; email: string; role: string; mobile?: string }) => {
    // This would typically involve calling your auth context login method
    console.log("Auth success:", userData);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-hero rounded-xl shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg font-playfair">OB</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text font-playfair">OyaBid</h1>
              <p className="text-xs text-muted-foreground">Premium Auctions</p>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search auctions, items, sellers..."
                className="pl-10 pr-4 h-11 rounded-xl border-2 focus:border-primary/50 bg-muted/30 backdrop-blur-sm transition-all duration-300"
              />
              <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary/10 text-primary border-primary/20 text-xs">
                ⌘K
              </Badge>
            </div>
          </div>

          {/* Navigation & User Section */}
          <div className="flex items-center space-x-4">
            {/* Sell Button - Always visible when authenticated */}
            {user && (
              <Link to="/create-auction">
                <Button 
                  variant="accent" 
                  size="sm" 
                  className="hidden sm:flex items-center gap-2 rounded-xl"
                >
                  <Sparkles className="h-4 w-4" />
                  Sell Your Items
                </Button>
              </Link>
            )}

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-primary/10">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-xs">
                  3
                </Badge>
              </Button>
            )}

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 rounded-xl hover:bg-primary/10 px-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-sm border-border/50">
                  <DropdownMenuItem asChild>
                    <Link to="/bidder-dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/create-auction" className="flex items-center gap-2">
                      <Gavel className="h-4 w-4" />
                      Create Auction
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/business-features" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Business Features
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded-xl hover:bg-primary/10"
                >
                  Login
                </Button>
                <Button 
                  variant="hero" 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="rounded-xl"
                  size="sm"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-border/40 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search auctions..."
              className="pl-10 pr-4 h-10 rounded-xl border-2 focus:border-primary/50 bg-muted/30"
            />
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}