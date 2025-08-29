import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Users, DollarSign, Clock, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuctionCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionId: string;
  auctionTitle: string;
  currentBid: number;
  bidCount: number;
  timeRemaining: string;
  onCancellationConfirm: () => void;
}

export function AuctionCancellationModal({ 
  isOpen, 
  onClose, 
  auctionId,
  auctionTitle,
  currentBid,
  bidCount,
  timeRemaining,
  onCancellationConfirm
}: AuctionCancellationModalProps) {
  const [cancellationForm, setCancellationForm] = useState({
    reason: "",
    description: "",
    refundBidders: true,
    notifyBidders: true,
    penaltyAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setCancellationForm(prev => ({ ...prev, [field]: value }));
  };

  const calculatePenalty = () => {
    // Calculate penalty based on bid count and current bid
    const basePenalty = Math.min(currentBid * 0.05, 50000); // 5% of current bid, max ₦50,000
    const bidPenalty = bidCount * 1000; // ₦1,000 per bid
    return basePenalty + bidPenalty;
  };

  const penalty = calculatePenalty();

  const handleSubmit = async () => {
    if (!cancellationForm.penaltyAccepted) {
      toast({
        title: "Penalty Acceptance Required",
        description: "You must accept the cancellation penalty to proceed.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    // Simulate cancellation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Auction Cancelled",
      description: `Auction "${auctionTitle}" has been cancelled. Bidders will be notified and refunded.`,
    });
    
    onCancellationConfirm();
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Ban className="h-5 w-5" />
            Cancel Auction
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-destructive">Warning: Auction Cancellation</p>
                  <p className="text-muted-foreground">
                    Cancelling an active auction may result in penalties and affect your seller rating.
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Auction ID:</p>
                  <p className="text-muted-foreground font-mono">{auctionId}</p>
                </div>
                <div>
                  <p className="font-medium">Time Remaining:</p>
                  <p className="text-muted-foreground">{timeRemaining}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-sm">Title:</p>
                <p className="text-muted-foreground">{auctionTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-3 text-center">
                    <DollarSign className="h-6 w-6 text-accent mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Current Bid</p>
                    <p className="font-semibold text-accent">{formatCurrency(currentBid)}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-3 text-center">
                    <Users className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Total Bids</p>
                    <p className="font-semibold text-primary">{bidCount}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Cancellation Reason</Label>
              <Select onValueChange={(value) => handleInputChange("reason", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cancellation reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item_unavailable">Item No Longer Available</SelectItem>
                  <SelectItem value="item_damaged">Item Damaged/Lost</SelectItem>
                  <SelectItem value="pricing_error">Pricing Error</SelectItem>
                  <SelectItem value="personal_emergency">Personal Emergency</SelectItem>
                  <SelectItem value="technical_issues">Technical Issues</SelectItem>
                  <SelectItem value="fraud_concern">Fraud Concern</SelectItem>
                  <SelectItem value="policy_violation">Policy Violation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Detailed Explanation</Label>
              <Textarea
                id="description"
                value={cancellationForm.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Please provide a detailed explanation for the cancellation"
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="refundBidders"
                  checked={cancellationForm.refundBidders}
                  onCheckedChange={(checked) => handleInputChange("refundBidders", checked as boolean)}
                />
                <Label htmlFor="refundBidders" className="text-sm">
                  Refund all bidders (if applicable)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifyBidders"
                  checked={cancellationForm.notifyBidders}
                  onCheckedChange={(checked) => handleInputChange("notifyBidders", checked as boolean)}
                />
                <Label htmlFor="notifyBidders" className="text-sm">
                  Send cancellation notification to all bidders
                </Label>
              </div>
            </div>
          </div>

          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-warning">
                <DollarSign className="h-4 w-4" />
                Cancellation Penalty
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Base penalty (5% of current bid):</span>
                  <span>{formatCurrency(Math.min(currentBid * 0.05, 50000))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bid penalty (₦1,000 × {bidCount} bids):</span>
                  <span>{formatCurrency(bidCount * 1000)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-warning">
                  <span>Total Penalty:</span>
                  <span>{formatCurrency(penalty)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="penaltyAccepted"
                  checked={cancellationForm.penaltyAccepted}
                  onCheckedChange={(checked) => handleInputChange("penaltyAccepted", checked as boolean)}
                />
                <Label htmlFor="penaltyAccepted" className="text-sm">
                  I understand and accept the cancellation penalty of {formatCurrency(penalty)}
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Keep Auction Active
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleSubmit} 
              disabled={submitting || !cancellationForm.reason || !cancellationForm.penaltyAccepted}
            >
              {submitting ? "Cancelling..." : "Cancel Auction"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}