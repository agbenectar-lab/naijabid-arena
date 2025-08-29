import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Smartphone, Shield, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; email: string; role: string; mobile?: string }) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState<"auth" | "otp">("auth");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "bidder" // Default role for all users (can both bid and sell)
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (currentStep === "auth") {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move to OTP verification for signup
      if (formData.name) { // This is signup
        setCurrentStep("otp");
        toast({
          title: "OTP Sent",
          description: `Verification code sent to WhatsApp ${formData.mobile}`,
        });
      } else { // This is login
        // Simulate authentication
        onAuthSuccess({
          name: formData.email.split('@')[0],
          email: formData.email,
          role: formData.role,
          mobile: formData.mobile
        });
        onClose();
      }
    } else {
      // OTP verification
      if (otpCode.length === 6) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to OyaBid! You can now buy and sell items.",
        });
        
        onAuthSuccess({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          role: formData.role,
          mobile: formData.mobile
        });
        onClose();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the 6-digit code sent to your WhatsApp",
          variant: "destructive",
        });
      }
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Google Login Successful",
      description: "Welcome back to OyaBid!",
    });
    
    onAuthSuccess({
      name: "Google User",
      email: "user@gmail.com",
      role: "bidder"
    });
    
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "OTP Resent",
      description: `New verification code sent to WhatsApp ${formData.mobile}`,
    });
    
    setIsLoading(false);
  };

  const renderOTPStep = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
          <Smartphone className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Verify Your Number</h3>
        <p className="text-muted-foreground text-sm">
          We've sent a 6-digit code to your WhatsApp
        </p>
        <p className="font-medium text-primary mt-1">{formData.mobile}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="otp">Verification Code</Label>
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="text-center text-lg tracking-widest font-mono"
            maxLength={6}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setCurrentStep("auth")}
            className="flex-1"
          >
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || otpCode.length !== 6}
            className="flex-1 btn-animated"
          >
            {isLoading ? "Verifying..." : "Verify & Create Account"}
          </Button>
        </div>

        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-muted-foreground hover:text-primary"
          >
            Didn't receive code? Resend
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAuthStep = () => (
    <Tabs defaultValue="login" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl">
        <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Login
        </TabsTrigger>
        <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Sign Up
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="login" className="space-y-4 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary transition-colors pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 rounded-xl border-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 rounded-xl bg-gradient-primary btn-animated text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors"
        >
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-4 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-mobile">Mobile Number</Label>
            <Input
              id="signup-mobile"
              type="tel"
              placeholder="+234 800 123 4567"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 rounded-xl border-2 focus:border-primary transition-colors pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 rounded-xl border-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 h-12 rounded-xl bg-gradient-primary btn-animated text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-12 rounded-xl border-2 hover:bg-muted/50 transition-colors"
        >
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md card-modern animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-2xl mx-auto shadow-glow animate-pulse-glow">
            <span className="text-white font-bold text-xl font-playfair">OB</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold gradient-text font-playfair">
              {currentStep === "otp" ? "Verify Account" : "Welcome to OyaBid"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {currentStep === "otp" 
                ? "Complete your account verification" 
                : "Nigeria's premier auction platform"
              }
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStep === "otp" ? renderOTPStep() : renderAuthStep()}
          
          {currentStep === "auth" && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Secure & encrypted</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}