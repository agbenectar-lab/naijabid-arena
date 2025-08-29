import { AuctionCard } from "@/components/auction/AuctionCard";
import { Button } from "@/components/ui/button";
import { sampleAuctions } from "@/data/sampleAuctions";
import { ArrowRight } from "lucide-react";

export function FeaturedAuctions() {
  const featuredAuctions = sampleAuctions.filter(auction => auction.featured);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Auctions</h2>
            <p className="text-muted-foreground text-lg">
              Don't miss these exclusive auctions ending soon
            </p>
          </div>
          <Button variant="outline" className="group">
            View All Auctions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </div>
    </section>
  );
}