import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Send, MessageCircle, Phone, Mail } from "lucide-react";

interface ContactSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  auctionTitle: string;
}

export function ContactSellerModal({ 
  isOpen, 
  onClose, 
  sellerName, 
  auctionTitle 
}: ContactSellerModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: `Inquiry about: ${auctionTitle}`,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: `Your message has been sent to ${sellerName}`,
    });

    setFormData({
      subject: `Inquiry about: ${auctionTitle}`,
      message: ""
    });
    setIsSubmitting(false);
    onClose();
  };

  const handleQuickContact = (method: 'email' | 'phone') => {
    if (method === 'email') {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(formData.message || `Hi ${sellerName}, I'm interested in your auction item: ${auctionTitle}`);
      window.open(`mailto:seller@example.com?subject=${subject}&body=${body}`);
    } else {
      toast({
        title: "Contact Information",
        description: "Seller's phone: +234 123 456 7890",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Contact {sellerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickContact('email')}
              className="h-12"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Seller
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickContact('phone')}
              className="h-12"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Seller
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or send a message
              </span>
            </div>
          </div>

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder={`Hi ${sellerName}, I'm interested in your auction item...`}
                rows={4}
                required
              />
            </div>

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
                disabled={isSubmitting || !user}
                className="flex-1"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
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