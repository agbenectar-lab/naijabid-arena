import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KYCVerificationModal } from "@/components/kyc/KYCVerificationModal";
import { DisputeResolutionModal } from "@/components/disputes/DisputeResolutionModal";
import { RefundRequestModal } from "@/components/refunds/RefundRequestModal";
import { AuctionCancellationModal } from "@/components/auction/AuctionCancellationModal";
import { FeaturedAuctionBanner } from "@/components/advertising/FeaturedAuctionBanner";
import { AdvertisementBanner } from "@/components/advertising/AdvertisementBanner";
import { Shield, Scale, RefreshCw, Ban, Star, TrendingUp } from "lucide-react";
import { sampleAuctions } from "@/data/sampleAuctions";

export default function BusinessFeatures() {
  const [showKycModal, setShowKycModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [kycTier, setKycTier] = useState<1 | 2>(1);

  const featuredAuction = sampleAuctions.find(a => a.featured) || sampleAuctions[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Features Demo</h1>
          <p className="text-muted-foreground">
            Explore our advanced business features for secure and compliant auctions
          </p>
        </div>

        {/* Advertising Section */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Advertising & Monetization
          </h2>
          
          <AdvertisementBanner position="top" className="mb-4" />
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FeaturedAuctionBanner 
                auction={featuredAuction} 
                position="hero" 
                onClick={() => {}} 
              />
            </div>
            <div className="space-y-4">
              <AdvertisementBanner position="sidebar" />
              <FeaturedAuctionBanner 
                auction={sampleAuctions[1]} 
                position="sidebar" 
                onClick={() => {}} 
              />
            </div>
          </div>
        </div>

        {/* Business Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Identity verification for high-value items (₦100K+)
              </p>
              <div className="space-y-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setKycTier(1);
                    setShowKycModal(true);
                  }}
                >
                  Tier 1 KYC (Basic)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setKycTier(2);
                    setShowKycModal(true);
                  }}
                >
                  Tier 2 KYC (Enhanced)
                </Button>
              </div>
              <Badge variant="outline" className="text-xs">
                Required for items ≥ ₦100K
              </Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-accent" />
                Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Resolve buyer vs seller conflicts efficiently
              </p>
              <Button 
                className="w-full mb-4"
                onClick={() => setShowDisputeModal(true)}
              >
                Open Dispute
              </Button>
              <Badge variant="outline" className="text-xs">
                24/7 Support Team
              </Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-success" />
                Refund Workflow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Streamlined refund process for failed deliveries
              </p>
              <Button 
                variant="outline"
                className="w-full mb-4"
                onClick={() => setShowRefundModal(true)}
              >
                Request Refund
              </Button>
              <Badge variant="outline" className="text-xs">
                3-5 Business Days
              </Badge>
            </CardContent>
          </Card>

          <Card className="hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5 text-destructive" />
                Auction Cancellation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cancel auctions with penalty calculations
              </p>
              <Button 
                variant="destructive"
                className="w-full mb-4"
                onClick={() => setShowCancellationModal(true)}
              >
                Cancel Auction
              </Button>
              <Badge variant="outline" className="text-xs">
                Penalty Applied
              </Badge>
            </CardContent>
          </Card>
        </div>

        <AdvertisementBanner position="bottom" />
      </main>
      <Footer />

      {/* Modals */}
      <KYCVerificationModal
        isOpen={showKycModal}
        onClose={() => setShowKycModal(false)}
        tier={kycTier}
        onVerificationComplete={() => setShowKycModal(false)}
      />

      <DisputeResolutionModal
        isOpen={showDisputeModal}
        onClose={() => setShowDisputeModal(false)}
        auctionId="123"
      />

      <RefundRequestModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        orderId="ORD-123"
        orderAmount={500000}
        orderDate={new Date()}
      />

      <AuctionCancellationModal
        isOpen={showCancellationModal}
        onClose={() => setShowCancellationModal(false)}
        auctionId="AUC-123"
        auctionTitle="Sample Auction"
        currentBid={250000}
        bidCount={15}
        timeRemaining="2d 5h"
        onCancellationConfirm={() => setShowCancellationModal(false)}
      />
    </div>
  );
}