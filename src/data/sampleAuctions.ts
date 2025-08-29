export interface Auction {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  buyNowPrice?: number;
  imageUrl: string;
  endTime: Date;
  bidCount: number;
  category: string;
  seller: string;
  featured?: boolean;
  kycRequired?: boolean;
  sellerKycTier?: 1 | 2;
  status?: "active" | "cancelled" | "ended";
}

// Create end times for various auctions
const now = new Date();
const oneHour = new Date(now.getTime() + 1 * 60 * 60 * 1000);
const sixHours = new Date(now.getTime() + 6 * 60 * 60 * 1000);
const oneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const sampleAuctions: Auction[] = [
  {
    id: "1",
    title: "iPhone 14 Pro Max 256GB - Excellent Condition",
    description: "Barely used iPhone 14 Pro Max in pristine condition. Comes with original box, charger, and screen protector already applied.",
    currentBid: 485000,
    buyNowPrice: 650000,
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    endTime: oneHour,
    bidCount: 23,
    category: "Electronics",
    seller: "TechDeals Lagos",
    featured: true
  },
  {
    id: "2", 
    title: "2019 Toyota Camry LE - Low Mileage",
    description: "Well-maintained Toyota Camry with only 45,000 miles. Regular service records available. Perfect for Lagos traffic.",
    currentBid: 8500000,
    buyNowPrice: 12000000,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
    endTime: threeDays,
    bidCount: 12,
    category: "Vehicles", 
    seller: "AutoHub Abuja",
    featured: true
  },
  {
    id: "3",
    title: "Nike Air Jordan 1 Retro High OG - Size 42",
    description: "Authentic Nike Air Jordan 1 in excellent condition. Original box included. Perfect for sneaker collectors.",
    currentBid: 125000,
    buyNowPrice: 180000,
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    endTime: sixHours,
    bidCount: 18,
    category: "Fashion",
    seller: "SneakerHead NG"
  },
  {
    id: "4",
    title: "Gaming Laptop - RTX 3070, Intel i7",
    description: "High-performance gaming laptop perfect for gaming and content creation. Runs all modern games at high settings.",
    currentBid: 650000,
    buyNowPrice: 850000,
    imageUrl: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
    endTime: oneDay,
    bidCount: 8,
    category: "Electronics",
    seller: "GamerHub"
  },
  {
    id: "5",
    title: "Antique Handcrafted Wooden Chair",
    description: "Beautiful antique chair made from premium mahogany wood. Perfect centerpiece for any living room or office.",
    currentBid: 85000,
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
    endTime: oneWeek,
    bidCount: 5,
    category: "Home",
    seller: "Antique Treasures"
  },
  {
    id: "6",
    title: "Samsung Galaxy S23 Ultra 512GB",
    description: "Latest Samsung flagship phone with S-Pen. Excellent camera system and performance for productivity and entertainment.",
    currentBid: 420000,
    buyNowPrice: 580000,
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    endTime: oneDay,
    bidCount: 15,
    category: "Electronics",
    seller: "MobileWorld Lagos"
  },
  {
    id: "7",
    title: "Traditional Agbada - Premium Quality",
    description: "Handmade traditional Agbada with intricate embroidery. Perfect for special occasions and cultural events.",
    currentBid: 45000,
    buyNowPrice: 75000,
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400",
    endTime: threeDays,
    bidCount: 7,
    category: "Fashion",
    seller: "Cultural Attire NG"
  },
  {
    id: "8",
    title: "Professional DSLR Camera Kit",
    description: "Canon EOS R5 with multiple lenses and accessories. Perfect for professional photography and videography.",
    currentBid: 1200000,
    buyNowPrice: 1650000,
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    endTime: oneWeek,
    bidCount: 9,
    category: "Electronics",
    seller: "PhotoPro Equipment",
    kycRequired: true,
    sellerKycTier: 2,
    status: "active"
  },
  {
    id: "9",
    title: "Luxury Diamond Necklace",
    description: "18k gold necklace with certified diamonds. Appraised value ₦15M. Comes with authenticity certificate.",
    currentBid: 12500000,
    buyNowPrice: 15000000,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    endTime: oneWeek,
    bidCount: 3,
    category: "Jewelry",
    seller: "Precious Gems Ltd",
    kycRequired: true,
    sellerKycTier: 2,
    status: "active"
  }
];