import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, ShoppingBag, Zap, Gift } from "lucide-react";

interface StickyAdProps {
  position: "bottom-right" | "bottom-left";
  className?: string;
}

export function StickyAd({ position, className = "" }: StickyAdProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  const ad = {
    id: "sticky-ad",
    title: "Download OyaBid App",
    description: "Get the mobile app for faster bidding and instant notifications!",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200",
    ctaText: "Download Now",
    sponsor: "OyaBid"
  };

  if (!isVisible) return null;

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 w-80 max-w-[calc(100vw-2rem)] ${className}`}>
      <Card className="border-2 border-primary/20 shadow-2xl bg-background/95 backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>

        <CardContent className="p-4">
          <div className="flex gap-3">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm truncate">{ad.title}</h3>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {ad.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  by {ad.sponsor}
                </span>
                <Button size="sm" className="text-xs h-7">
                  <ExternalLink className="h-2 w-2 mr-1" />
                  {ad.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}