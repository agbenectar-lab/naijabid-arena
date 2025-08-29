import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { sampleAuctions } from "@/data/sampleAuctions";
import { CreditCard, Smartphone, Building, Shield, Truck, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentFlow() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const type = searchParams.get('type'); // 'buynow' or 'won'
  const amount = parseInt(searchParams.get('amount') || '0');
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });

  const auction = sampleAuctions.find(a => a.id === id);
  
  if (!auction) {
    return <div>Auction not found</div>;
  }

  const deliveryFee = 5000;
  const serviceFee = Math.round(amount * 0.025); // 2.5% service fee
  const total = amount + deliveryFee + serviceFee;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Your payment of ₦${total.toLocaleString()} has been processed.`,
        variant: "default"
      });
      
      navigate(`/order-tracking/${id}?payment=success`);
      setProcessing(false);
    }, 3000);
  };

  const paymentMethods = [
    { 
      id: "card", 
      name: "Credit/Debit Card", 
      icon: CreditCard,
      description: "Visa, Mastercard, Verve"
    },
    { 
      id: "transfer", 
      name: "Bank Transfer", 
      icon: Building,
      description: "Direct bank transfer"
    },
    { 
      id: "mobile", 
      name: "Mobile Money", 
      icon: Smartphone,
      description: "PayStack, Flutterwave"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Choose Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex items-center space-x-3 flex-1">
                              <Icon className="h-6 w-6 text-primary" />
                              <div>
                                <Label htmlFor={method.id} className="font-medium">{method.name}</Label>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Payment Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Card Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Bank Transfer Details</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Account Name:</span>
                          <span className="font-medium">NaijaAuction Escrow</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Account Number:</span>
                          <span className="font-medium">0123456789</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bank:</span>
                          <span className="font-medium">First Bank Nigeria</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-medium">₦{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Please use your order reference as the transfer description.
                    </p>
                  </div>
                )}

                {paymentMethod === "mobile" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Mobile Payment</h3>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+234 801 234 5678"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will receive a payment prompt on your mobile device.
                    </p>
                  </div>
                )}

                <Separator />

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Lagos"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Lagos State"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <img
                    src={auction.imageUrl}
                    alt={auction.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{auction.title}</h3>
                    <p className="text-sm text-muted-foreground">{auction.seller}</p>
                    <Badge className="mt-1" variant="secondary">
                      {type === "buynow" ? "Buy Now" : "Auction Won"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Item Price</span>
                    <span>₦{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₦{serviceFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Delivery
                    </span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  disabled={processing}
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                >
                  {processing ? "Processing..." : `Pay ₦${total.toLocaleString()}`}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}