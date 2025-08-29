import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Upload, Calendar, DollarSign, ArrowLeft, ImagePlus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuctions } from "@/contexts/AuctionContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateAuction() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addAuction } = useAuctions();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    startingBid: "",
    buyNowPrice: "",
    enableBuyNow: false,
    duration: "7",
    location: "Lagos"
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload to a server
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.startingBid) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before publishing.",
        variant: "destructive"
      });
      return;
    }

    if (formData.enableBuyNow && !formData.buyNowPrice) {
      toast({
        title: "Buy Now Price Required",
        description: "Please set a Buy Now price or disable the option.",
        variant: "destructive"
      });
      return;
    }

    // Create auction end time based on duration
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + parseInt(formData.duration));

    // Create new auction
    const newAuction = {
      title: formData.title,
      description: formData.description,
      currentBid: parseFloat(formData.startingBid),
      buyNowPrice: formData.enableBuyNow ? parseFloat(formData.buyNowPrice) : undefined,
      imageUrl: images[0] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      endTime: endTime,
      bidCount: 0,
      category: formData.category,
      seller: user?.name || "Anonymous Seller",
      featured: false
    };

    addAuction(newAuction);
    
    toast({
      title: "Auction Created Successfully!",
      description: "Your auction is now live and accepting bids.",
      variant: "default"
    });
    
    navigate('/bidder-dashboard');
  };

  const categories = [
    "Electronics", "Fashion", "Vehicles", "Real Estate", "Home & Garden",
    "Sports", "Books", "Art & Collectibles", "Jewelry", "Other"
  ];

  const conditions = [
    "New", "Like New", "Excellent", "Good", "Fair", "For Parts/Repair"
  ];

  const durations = [
    { value: "1", label: "1 Day" },
    { value: "3", label: "3 Days" },
    { value: "7", label: "7 Days" },
    { value: "10", label: "10 Days" },
    { value: "14", label: "14 Days" }
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
          Back to Dashboard
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Auction</h1>
            <p className="text-muted-foreground">
              List your item and start accepting bids from our community of buyers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Item Details */}
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear, descriptive title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail - condition, features, history, etc."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition *</Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map(condition => (
                          <SelectItem key={condition} value={condition.toLowerCase()}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    {images.length < 5 && (
                      <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mt-1">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add up to 5 photos. First photo will be the main image.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Duration */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startingBid">Starting Bid (₦) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startingBid"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={formData.startingBid}
                        onChange={(e) => handleInputChange("startingBid", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Auction Duration *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map(duration => (
                          <SelectItem key={duration.value} value={duration.value}>
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableBuyNow"
                    checked={formData.enableBuyNow}
                    onCheckedChange={(checked) => handleInputChange("enableBuyNow", checked)}
                  />
                  <Label htmlFor="enableBuyNow">Enable "Buy It Now" option</Label>
                </div>

                {formData.enableBuyNow && (
                  <div className="max-w-md">
                    <Label htmlFor="buyNowPrice">Buy It Now Price (₦)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="buyNowPrice"
                        type="number"
                        placeholder="0"
                        className="pl-10"
                        value={formData.buyNowPrice}
                        onChange={(e) => handleInputChange("buyNowPrice", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview & Submit */}
            <Card>
              <CardHeader>
                <CardTitle>Review & Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Auction Preview</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Title:</span> {formData.title || "Enter title..."}</p>
                    <p><span className="font-medium">Starting Bid:</span> ₦{formData.startingBid || "0"}</p>
                    <p><span className="font-medium">Duration:</span> {durations.find(d => d.value === formData.duration)?.label}</p>
                    <p><span className="font-medium">Category:</span> {formData.category || "Select category..."}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Publish Auction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}