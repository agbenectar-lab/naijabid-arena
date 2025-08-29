import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, ShoppingBag, Zap, Gift } from "lucide-react";

interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  sponsor: string;
  type: "product" | "service" | "brand";
  position: "banner" | "sidebar" | "inline";
}

interface AdvertisementBannerProps {
  position: "top" | "sidebar" | "inline" | "bottom";
  className?: string;
}

export function AdvertisementBanner({ position, className = "" }: AdvertisementBannerProps) {
  const [currentAd, setCurrentAd] = useState<Advertisement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Mock advertisements data
  const advertisements: Advertisement[] = [
    {
      id: "ad1",
      title: "Premium Watches Collection",
      description: "Discover luxury timepieces from top brands. Special auction rates for verified members.",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      ctaText: "Shop Now",
      ctaUrl: "/auctions?category=watches",
      sponsor: "TimeZone Nigeria",
      type: "product",
      position: "banner",
    },
    {
      id: "ad2",
      title: "Secure Payment Solutions",
      description: "Fast, secure payments for all your auction wins. Get 2% cashback on all transactions.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      ctaText: "Learn More",
      ctaUrl: "/payment-solutions",
      sponsor: "PayStack",
      type: "service",
      position: "sidebar",
    },
    {
      id: "ad3",
      title: "Electronics Mega Sale",
      description: "Up to 70% off on laptops, phones, and gaming equipment. Limited time offer!",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      ctaText: "Browse Deals",
      ctaUrl: "/auctions?category=electronics&sale=true",
      sponsor: "TechHub Lagos",
      type: "product",
      position: "inline",
    },
    {
      id: "ad4",
      title: "Auction Insurance",
      description: "Protect your purchases with comprehensive auction insurance. Claims processed in 24hrs.",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
      ctaText: "Get Quote",
      ctaUrl: "/insurance",
      sponsor: "SecureAuction Cover",
      type: "service",
      position: "banner",
    },
  ];

  useEffect(() => {
    // Filter ads by position and randomly select one
    const positionAds = advertisements.filter(ad => {
      switch (position) {
        case "top":
        case "bottom":
          return ad.position === "banner";
        case "sidebar":
          return ad.position === "sidebar";
        case "inline":
          return ad.position === "inline";
        default:
          return true;
      }
    });

    if (positionAds.length > 0) {
      const randomAd = positionAds[Math.floor(Math.random() * positionAds.length)];
      setCurrentAd(randomAd);
    }
  }, [position]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    if (currentAd) {
      // Track ad click analytics here
      console.log(`Ad clicked: ${currentAd.id} - ${currentAd.title}`);
      window.open(currentAd.ctaUrl, '_blank');
    }
  };

  if (!currentAd || !isVisible) {
    return null;
  }

  const getIcon = () => {
    switch (currentAd.type) {
      case "product":
        return <ShoppingBag className="h-4 w-4" />;
      case "service":
        return <Zap className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  if (position === "sidebar") {
    return (
      <Card className={`relative overflow-hidden border-dashed border-muted-foreground/30 hover:shadow-card-hover transition-all duration-300 ${className}`}>
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="outline" className="text-xs bg-background/90">
            Sponsored
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={handleClose}
        >
          <X className="h-3 w-3" />
        </Button>

        <CardContent className="p-0 cursor-pointer" onClick={handleClick}>
          <div className="relative">
            <img
              src={currentAd.imageUrl}
              alt={currentAd.title}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="p-3 space-y-2">
            <div className="flex items-center gap-1">
              {getIcon()}
              <h3 className="font-semibold text-sm line-clamp-1">
                {currentAd.title}
              </h3>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2">
              {currentAd.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                by {currentAd.sponsor}
              </span>
              <Button size="sm" variant="outline" className="text-xs h-6">
                <ExternalLink className="h-2 w-2 mr-1" />
                {currentAd.ctaText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Banner position (top, bottom, inline)
  return (
    <Card className={`relative overflow-hidden border-dashed border-muted-foreground/30 hover:shadow-card-hover transition-all duration-300 cursor-pointer ${className}`}>
      <div className="absolute top-3 left-3 z-10">
        <Badge variant="outline" className="bg-background/90">
          Sponsored
        </Badge>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 h-8 w-8 text-muted-foreground hover:text-foreground bg-background/90"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardContent className="p-0" onClick={handleClick}>
        <div className="grid md:grid-cols-3 gap-4 p-6">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              {getIcon()}
              <h3 className="text-lg font-semibold">
                {currentAd.title}
              </h3>
            </div>
            
            <p className="text-muted-foreground line-clamp-2">
              {currentAd.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Sponsored by {currentAd.sponsor}
              </span>
              <Button className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {currentAd.ctaText}
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={currentAd.imageUrl}
              alt={currentAd.title}
              className="w-full h-32 md:h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}