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
import { Progress } from "@/components/ui/progress";
import { Upload, Shield, CheckCircle, AlertTriangle, Camera, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KYCVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 1 | 2;
  onVerificationComplete: (tier: number) => void;
}

export function KYCVerificationModal({ isOpen, onClose, tier, onVerificationComplete }: KYCVerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    occupation: "",
    address: "",
    phoneNumber: "",
    idType: "",
    idNumber: "",
    bankName: "",
    accountNumber: "",
    proofOfAddress: null as File | null,
    idDocument: null as File | null,
    selfieWithId: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const totalSteps = tier === 2 ? 4 : 2;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
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
    setUploading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "KYC Verification Submitted",
      description: `Your Tier ${tier} verification has been submitted and is under review.`,
    });
    
    onVerificationComplete(tier);
    setUploading(false);
    onClose();
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter your full legal name"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select onValueChange={(value) => handleInputChange("nationality", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NG">Nigeria</SelectItem>
              <SelectItem value="GH">Ghana</SelectItem>
              <SelectItem value="KE">Kenya</SelectItem>
              <SelectItem value="ZA">South Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
            placeholder="Your occupation"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Residential Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter your full residential address"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          placeholder="+234 800 123 4567"
        />
      </div>
    </div>
  );

  const renderIdentityVerification = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="idType">ID Document Type</Label>
          <Select onValueChange={(value) => handleInputChange("idType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nin">National ID (NIN)</SelectItem>
              <SelectItem value="passport">International Passport</SelectItem>
              <SelectItem value="drivers">Driver's License</SelectItem>
              <SelectItem value="voters">Voter's Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="idNumber">ID Number</Label>
          <Input
            id="idNumber"
            value={formData.idNumber}
            onChange={(e) => handleInputChange("idNumber", e.target.value)}
            placeholder="Enter ID number"
          />
        </div>
      </div>

      <div>
        <Label>Upload ID Document</Label>
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload clear photo of your ID</p>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload("idDocument", e.target.files[0])}
              className="hidden"
              id="idUpload"
            />
            <Button variant="outline" onClick={() => document.getElementById("idUpload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            {formData.idDocument && (
              <p className="text-xs text-success mt-2">✓ {formData.idDocument.name}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Label>Proof of Address</Label>
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Upload utility bill or bank statement (last 3 months)</p>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => e.target.files && handleFileUpload("proofOfAddress", e.target.files[0])}
              className="hidden"
              id="addressUpload"
            />
            <Button variant="outline" onClick={() => document.getElementById("addressUpload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            {formData.proofOfAddress && (
              <p className="text-xs text-success mt-2">✓ {formData.proofOfAddress.name}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTier2Verification = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bankName">Bank Name</Label>
          <Select onValueChange={(value) => handleInputChange("bankName", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gtb">GTBank</SelectItem>
              <SelectItem value="first">First Bank</SelectItem>
              <SelectItem value="zenith">Zenith Bank</SelectItem>
              <SelectItem value="uba">UBA</SelectItem>
              <SelectItem value="access">Access Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
            placeholder="Enter account number"
          />
        </div>
      </div>

      <div>
        <Label>Selfie with ID Document</Label>
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Camera className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Take a selfie holding your ID document</p>
            <p className="text-xs text-muted-foreground mb-2">Ensure both your face and ID are clearly visible</p>
            <Input
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => e.target.files && handleFileUpload("selfieWithId", e.target.files[0])}
              className="hidden"
              id="selfieUpload"
            />
            <Button variant="outline" onClick={() => document.getElementById("selfieUpload")?.click()}>
              <Camera className="h-4 w-4 mr-2" />
              Take Selfie
            </Button>
            {formData.selfieWithId && (
              <p className="text-xs text-success mt-2">✓ {formData.selfieWithId.name}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-4">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Review Your Information</h3>
        <p className="text-muted-foreground">Please review all information before submitting</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>Name:</strong> {formData.fullName}</p>
            <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
            <p><strong>Nationality:</strong> {formData.nationality}</p>
            <p><strong>Phone:</strong> {formData.phoneNumber}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Identity Verification</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>ID Type:</strong> {formData.idType}</p>
            <p><strong>ID Number:</strong> {formData.idNumber}</p>
            <p><strong>Documents:</strong> {formData.idDocument && formData.proofOfAddress ? "Uploaded" : "Missing"}</p>
          </CardContent>
        </Card>

        {tier === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Enhanced Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Bank:</strong> {formData.bankName}</p>
              <p><strong>Account:</strong> {formData.accountNumber}</p>
              <p><strong>Selfie:</strong> {formData.selfieWithId ? "Uploaded" : "Missing"}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            KYC Verification - Tier {tier}
            <Badge variant={tier === 2 ? "destructive" : "secondary"}>
              {tier === 2 ? "Enhanced" : "Basic"}
            </Badge>
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
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderIdentityVerification()}
            {currentStep === 3 && tier === 2 && renderTier2Verification()}
            {((currentStep === 3 && tier === 1) || (currentStep === 4 && tier === 2)) && renderReview()}
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
                <Button onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={uploading}>
                  {uploading ? "Submitting..." : "Submit Verification"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}