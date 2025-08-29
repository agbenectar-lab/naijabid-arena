import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Upload, CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RefundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderAmount: number;
  orderDate: Date;
}

export function RefundRequestModal({ 
  isOpen, 
  onClose, 
  orderId, 
  orderAmount, 
  orderDate 
}: RefundRequestModalProps) {
  const [refundForm, setRefundForm] = useState({
    reason: "",
    description: "",
    refundAmount: orderAmount,
    bankDetails: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankCode: "",
    },
    evidence: [] as File[],
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | number) => {
    setRefundForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    setRefundForm(prev => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value }
    }));
  };

  const handleFileUpload = (files: FileList) => {
    setRefundForm(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...Array.from(files)]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    // Simulate refund request submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Refund Request Submitted",
      description: "Your refund request has been submitted and will be processed within 3-5 business days.",
    });
    
    setSubmitting(false);
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const renderRefundReason = () => (
    <div className="space-y-4">
      <div className="text-center">
        <RefreshCw className="h-12 w-12 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Refund Request</h3>
        <p className="text-muted-foreground">Tell us why you're requesting a refund</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Order Date:</span>
            <span>{orderDate.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-semibold">{formatCurrency(orderAmount)}</span>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="reason">Refund Reason</Label>
        <Select onValueChange={(value) => handleInputChange("reason", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select refund reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="item_not_received">Item Not Received</SelectItem>
            <SelectItem value="item_damaged">Item Arrived Damaged</SelectItem>
            <SelectItem value="wrong_item">Wrong Item Received</SelectItem>
            <SelectItem value="item_not_as_described">Item Not as Described</SelectItem>
            <SelectItem value="quality_issues">Quality Issues</SelectItem>
            <SelectItem value="shipping_delay">Excessive Shipping Delay</SelectItem>
            <SelectItem value="changed_mind">Changed Mind</SelectItem>
            <SelectItem value="duplicate_order">Duplicate Order</SelectItem>
            <SelectItem value="seller_cancelled">Seller Cancelled</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="refundAmount">Refund Amount</Label>
        <Input
          id="refundAmount"
          type="number"
          value={refundForm.refundAmount}
          onChange={(e) => handleInputChange("refundAmount", Number(e.target.value))}
          max={orderAmount}
          min={0}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Maximum refundable amount: {formatCurrency(orderAmount)}
        </p>
      </div>

      <div>
        <Label htmlFor="description">Detailed Description</Label>
        <Textarea
          id="description"
          value={refundForm.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Please provide details about your refund request"
          rows={4}
        />
      </div>

      <div>
        <Label>Supporting Evidence (Optional)</Label>
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload photos or documents</p>
            <Input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="evidenceUpload"
            />
            <Button variant="outline" onClick={() => document.getElementById("evidenceUpload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
            {refundForm.evidence.length > 0 && (
              <p className="text-xs text-success mt-2">✓ {refundForm.evidence.length} file(s) selected</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="space-y-4">
      <div className="text-center">
        <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Bank Details</h3>
        <p className="text-muted-foreground">Where should we send your refund?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="accountName">Account Holder Name</Label>
          <Input
            id="accountName"
            value={refundForm.bankDetails.accountName}
            onChange={(e) => handleBankDetailsChange("accountName", e.target.value)}
            placeholder="Full name as on bank account"
          />
        </div>
        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={refundForm.bankDetails.accountNumber}
            onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
            placeholder="10-digit account number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Select onValueChange={(value) => handleBankDetailsChange("bankName", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gtb">GTBank</SelectItem>
              <SelectItem value="first">First Bank</SelectItem>
              <SelectItem value="zenith">Zenith Bank</SelectItem>
              <SelectItem value="uba">UBA</SelectItem>
              <SelectItem value="access">Access Bank</SelectItem>
              <SelectItem value="fidelity">Fidelity Bank</SelectItem>
              <SelectItem value="union">Union Bank</SelectItem>
              <SelectItem value="sterling">Sterling Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bankCode">Bank Code (Optional)</Label>
          <Input
            id="bankCode"
            value={refundForm.bankDetails.bankCode}
            onChange={(e) => handleBankDetailsChange("bankCode", e.target.value)}
            placeholder="3-digit bank code"
          />
        </div>
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Important</p>
              <p className="text-muted-foreground">
                Please ensure all bank details are correct. Incorrect details may delay your refund.
                Refunds typically take 3-5 business days to process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-4">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Review Refund Request</h3>
        <p className="text-muted-foreground">Please review all details before submitting</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Refund Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Reason:</span>
              <span>{refundForm.reason.replace("_", " ")}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold text-accent">{formatCurrency(refundForm.refundAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Evidence Files:</span>
              <span>{refundForm.evidence.length} files</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Account Name:</span>
              <span>{refundForm.bankDetails.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span>Account Number:</span>
              <span className="font-mono">{refundForm.bankDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Bank:</span>
              <span>{refundForm.bankDetails.bankName}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-warning mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Processing Timeline</p>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li>• Review: 1-2 business days</li>
                  <li>• Approval: 1 business day</li>
                  <li>• Bank transfer: 2-3 business days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Refund Request
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="min-h-[400px]">
            {currentStep === 1 && renderRefundReason()}
            {currentStep === 2 && renderBankDetails()}
            {currentStep === 3 && renderReview()}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              
              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!refundForm.reason || !refundForm.description)) ||
                    (currentStep === 2 && (!refundForm.bankDetails.accountName || !refundForm.bankDetails.accountNumber || !refundForm.bankDetails.bankName))
                  }
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Refund Request"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}