import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { sampleAuctions } from "@/data/sampleAuctions";
import { 
  CheckCircle, 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  MessageCircle,
  Download,
  Star
} from "lucide-react";

export default function OrderTracking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paymentSuccess = searchParams.get('payment') === 'success';
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const auction = sampleAuctions.find(a => a.id === id);
  
  if (!auction) {
    return <div>Order not found</div>;
  }

  // Simulate order progression
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < 5) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 3000);
      
      return () => clearInterval(timer);
    }
  }, [paymentSuccess]);

  const orderSteps = [
    {
      id: 1,
      title: "Payment Confirmed",
      description: "Your payment has been processed successfully",
      icon: CheckCircle,
      completed: currentStep >= 1
    },
    {
      id: 2,
      title: "Seller Notified",
      description: "The seller has been notified to prepare your item",
      icon: Package,
      completed: currentStep >= 2
    },
    {
      id: 3,
      title: "Item Prepared",
      description: "Your item has been packaged and is ready for pickup",
      icon: Package,
      completed: currentStep >= 3
    },
    {
      id: 4,
      title: "In Transit",
      description: "Your package is on its way to your delivery address",
      icon: Truck,
      completed: currentStep >= 4
    },
    {
      id: 5,
      title: "Delivered",
      description: "Package has been delivered to your address",
      icon: MapPin,
      completed: currentStep >= 5
    }
  ];

  const progress = (currentStep / orderSteps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {paymentSuccess && (
          <div className="mb-8 p-6 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-success" />
              <div>
                <h2 className="text-lg font-semibold text-success">Payment Successful!</h2>
                <p className="text-sm text-success/80">Your order has been confirmed and is being processed.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order #NA-{id?.slice(0, 8).toUpperCase()}</span>
                    <span className="text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orderSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = step.completed;
                    
                    return (
                      <div key={step.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`
                            flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500
                            ${isCompleted 
                              ? 'bg-success border-success text-success-foreground' 
                              : isActive 
                                ? 'bg-primary border-primary text-primary-foreground animate-pulse' 
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                            }
                          `}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {index < orderSteps.length - 1 && (
                            <div className={`
                              w-0.5 h-12 mt-2 transition-all duration-500
                              ${step.completed ? 'bg-success' : 'bg-muted'}
                            `} />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <h3 className={`font-semibold ${isActive ? 'text-primary' : ''}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>
                          {isActive && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-primary">
                              <Clock className="h-3 w-3" />
                              <span>In progress...</span>
                            </div>
                          )}
                          {isCompleted && step.id < currentStep && (
                            <p className="text-sm text-success mt-2">
                              Completed {new Date().toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Delivery Address</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>John Doe</p>
                      <p>123 Victoria Island</p>
                      <p>Lagos, Nigeria</p>
                      <p>+234 801 234 5678</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Estimated Delivery</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>3-5 business days</p>
                      <p>Standard shipping</p>
                      <p>Tracking ID: NA{id?.slice(0, 6).toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
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
                    <Badge className="mt-1" variant="secondary">Electronics</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Item Price</span>
                    <span>₦{auction.currentBid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₦{Math.round(auction.currentBid * 0.025).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₦5,000</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Paid</span>
                    <span>₦{(auction.currentBid + Math.round(auction.currentBid * 0.025) + 5000).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                {currentStep >= 5 && (
                  <Button variant="hero" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Rate & Review
                  </Button>
                )}
              </CardContent>
            </Card>

            {currentStep >= 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Live Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Current Location</span>
                      <Badge variant="secondary">Lagos Mainland</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Update</span>
                      <span className="text-muted-foreground">In transit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}