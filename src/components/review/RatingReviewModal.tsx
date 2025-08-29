import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Star, Send, Package, Truck, MessageSquare } from "lucide-react";

interface RatingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionTitle: string;
  sellerName: string;
  orderId?: string;
}

interface Rating {
  category: string;
  value: number;
  icon: any;
  label: string;
}

export function RatingReviewModal({ 
  isOpen, 
  onClose, 
  auctionTitle, 
  sellerName,
  orderId 
}: RatingReviewModalProps) {
  const { user } = useAuth();
  const [ratings, setRatings] = useState<Rating[]>([
    { category: 'item', value: 0, icon: Package, label: 'Item Quality' },
    { category: 'shipping', value: 0, icon: Truck, label: 'Shipping' },
    { category: 'communication', value: 0, icon: MessageSquare, label: 'Communication' }
  ]);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => 
      prev.map(rating => 
        rating.category === category 
          ? { ...rating, value } 
          : rating
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const averageRating = ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;
    
    if (averageRating === 0) {
      toast({
        title: "Please provide ratings",
        description: "Please rate at least one category before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate saving review
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage for demo
    const reviews = JSON.parse(localStorage.getItem('auction-reviews') || '[]');
    const newReview = {
      id: Date.now().toString(),
      auctionTitle,
      sellerName,
      reviewerName: user.name,
      ratings: ratings.reduce((acc, rating) => ({
        ...acc,
        [rating.category]: rating.value
      }), {}),
      reviewText,
      date: new Date().toISOString(),
      orderId
    };
    reviews.push(newReview);
    localStorage.setItem('auction-reviews', JSON.stringify(reviews));

    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. Your review helps improve our platform.",
    });

    // Reset form
    setRatings(prev => prev.map(rating => ({ ...rating, value: 0 })));
    setReviewText("");
    setIsSubmitting(false);
    onClose();
  };

  const StarRating = ({ 
    value, 
    onChange, 
    category 
  }: { 
    value: number; 
    onChange: (value: number) => void;
    category: string;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-colors hover:scale-110 transform"
        >
          <Star
            className={`h-6 w-6 ${
              star <= value
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  const averageRating = ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Rate & Review Your Purchase</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-1">{auctionTitle}</h4>
            <p className="text-sm text-muted-foreground">Sold by {sellerName}</p>
            {orderId && (
              <p className="text-xs text-muted-foreground mt-1">Order #{orderId}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Categories */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Rate Your Experience</Label>
              {ratings.map((rating) => {
                const IconComponent = rating.icon;
                return (
                  <div key={rating.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{rating.label}</span>
                    </div>
                    <StarRating
                      value={rating.value}
                      onChange={(value) => handleRatingChange(rating.category, value)}
                      category={rating.category}
                    />
                  </div>
                );
              })}
            </div>

            {/* Overall Rating Display */}
            {averageRating > 0 && (
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {averageRating.toFixed(1)}/5
                </div>
                <div className="text-sm text-muted-foreground">Overall Rating</div>
              </div>
            )}

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="review">Write a Review (Optional)</Label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this purchase..."
                rows={4}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !user || averageRating === 0}
                className="flex-1"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}