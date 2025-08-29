import { Monitor, Shirt, Car, Home, Smartphone, Book, Gamepad2, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { 
    name: "Electronics", 
    icon: Monitor, 
    count: "1,234 items",
    gradient: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-600"
  },
  { 
    name: "Fashion", 
    icon: Shirt, 
    count: "856 items",
    gradient: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-600"
  },
  { 
    name: "Vehicles", 
    icon: Car, 
    count: "423 items",
    gradient: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-600"
  },
  { 
    name: "Real Estate", 
    icon: Home, 
    count: "187 items",
    gradient: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-600"
  },
  { 
    name: "Phones", 
    icon: Smartphone, 
    count: "967 items",
    gradient: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-600"
  },
  { 
    name: "Books", 
    icon: Book, 
    count: "342 items",
    gradient: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-600"
  },
  { 
    name: "Gaming", 
    icon: Gamepad2, 
    count: "198 items",
    gradient: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-600"
  },
  { 
    name: "Health", 
    icon: Heart, 
    count: "276 items",
    gradient: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-600"
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore thousands of auctions across different categories. 
            Find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0 shadow-card"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}