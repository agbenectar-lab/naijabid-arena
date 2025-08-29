import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MessageSquare, Upload, FileText, Clock, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DisputeResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionId: string;
  orderId?: string;
  disputeType?: "seller" | "buyer";
}

interface DisputeMessage {
  id: string;
  sender: "buyer" | "seller" | "admin";
  message: string;
  timestamp: Date;
  attachments?: string[];
}

export function DisputeResolutionModal({ 
  isOpen, 
  onClose, 
  auctionId, 
  orderId,
  disputeType = "buyer" 
}: DisputeResolutionModalProps) {
  const [activeTab, setActiveTab] = useState("create");
  const [disputeForm, setDisputeForm] = useState({
    category: "",
    subject: "",
    description: "",
    evidence: [] as File[],
    requestedAction: "",
  });
  const [newMessage, setNewMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Mock dispute data
  const existingDispute = {
    id: "DSP-001",
    status: "under_review",
    category: "item_not_received",
    subject: "Item not delivered after payment",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    assignedTo: "Support Team",
    priority: "high" as const,
    messages: [
      {
        id: "1",
        sender: "buyer" as const,
        message: "I paid for this item 5 days ago but haven't received it. The seller is not responding to my messages.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        sender: "seller" as const,
        message: "The item was shipped yesterday via DHL. Here's the tracking number: DHL123456789",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        sender: "admin" as const,
        message: "We've verified the tracking information. The package is currently in transit and should arrive within 2-3 business days.",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ] as DisputeMessage[],
  };

  const handleInputChange = (field: string, value: string) => {
    setDisputeForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList) => {
    setDisputeForm(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...Array.from(files)]
    }));
  };

  const handleSubmitDispute = async () => {
    setUploading(true);
    
    // Simulate dispute submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Dispute Submitted",
      description: "Your dispute has been submitted and assigned to our resolution team.",
    });
    
    setActiveTab("existing");
    setUploading(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Message Sent",
      description: "Your message has been added to the dispute thread.",
    });
    
    setNewMessage("");
  };

  const renderCreateDispute = () => (
    <div className="space-y-6">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Create New Dispute</h3>
        <p className="text-muted-foreground">Help us resolve your issue quickly</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="category">Dispute Category</Label>
          <Select onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select dispute category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="item_not_received">Item Not Received</SelectItem>
              <SelectItem value="item_not_as_described">Item Not as Described</SelectItem>
              <SelectItem value="damaged_item">Damaged Item</SelectItem>
              <SelectItem value="fake_item">Counterfeit/Fake Item</SelectItem>
              <SelectItem value="payment_issue">Payment Issue</SelectItem>
              <SelectItem value="seller_unresponsive">Seller Unresponsive</SelectItem>
              <SelectItem value="refund_request">Refund Request</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={disputeForm.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            placeholder="Brief description of the issue"
          />
        </div>

        <div>
          <Label htmlFor="description">Detailed Description</Label>
          <Textarea
            id="description"
            value={disputeForm.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Please provide as much detail as possible about your issue"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="requestedAction">Requested Action</Label>
          <Select onValueChange={(value) => handleInputChange("requestedAction", value)}>
            <SelectTrigger>
              <SelectValue placeholder="What would you like us to do?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_refund">Full Refund</SelectItem>
              <SelectItem value="partial_refund">Partial Refund</SelectItem>
              <SelectItem value="replacement">Replacement Item</SelectItem>
              <SelectItem value="contact_seller">Contact Seller</SelectItem>
              <SelectItem value="investigation">Investigation</SelectItem>
              <SelectItem value="other">Other (explain in description)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Evidence (Photos, Screenshots, Documents)</Label>
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Upload supporting evidence</p>
              <Input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
                id="evidenceUpload"
              />
              <Button variant="outline" onClick={() => document.getElementById("evidenceUpload")?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
              {disputeForm.evidence.length > 0 && (
                <div className="mt-2 text-xs text-success">
                  ✓ {disputeForm.evidence.length} file(s) selected
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleSubmitDispute} 
          disabled={uploading || !disputeForm.category || !disputeForm.subject}
          className="w-full"
        >
          {uploading ? "Submitting..." : "Submit Dispute"}
        </Button>
      </div>
    </div>
  );

  const renderExistingDispute = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Dispute #{existingDispute.id}</h3>
          <p className="text-sm text-muted-foreground">Created {existingDispute.createdAt.toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-warning border-warning">
            <Clock className="h-3 w-3 mr-1" />
            {existingDispute.status.replace("_", " ")}
          </Badge>
          <Badge variant={existingDispute.priority === "high" ? "destructive" : "secondary"}>
            {existingDispute.priority} priority
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Dispute Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Category:</p>
              <p className="text-muted-foreground">{existingDispute.category.replace("_", " ")}</p>
            </div>
            <div>
              <p className="font-medium">Assigned To:</p>
              <p className="text-muted-foreground">{existingDispute.assignedTo}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium">Subject:</p>
              <p className="text-muted-foreground">{existingDispute.subject}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Dispute Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-3">
            {existingDispute.messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg ${
                  message.sender === "admin"
                    ? "bg-primary/10 border border-primary/20"
                    : message.sender === disputeType
                    ? "bg-accent/10 border border-accent/20 ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <Badge variant="outline" className="text-xs">
                    {message.sender === "admin" ? "Support Team" : message.sender}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{message.message}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={2}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Dispute Resolution
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Dispute</TabsTrigger>
            <TabsTrigger value="existing">View Existing</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-6">
            {renderCreateDispute()}
          </TabsContent>

          <TabsContent value="existing" className="mt-6">
            {renderExistingDispute()}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}