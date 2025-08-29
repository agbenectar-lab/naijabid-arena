import { Smartphone, Car, Home, Shirt, Monitor, Book, Gamepad2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Electronics", icon: Monitor, color: "text-blue-600" },
  { name: "Fashion", icon: Shirt, color: "text-pink-600" },
  { name: "Vehicles", icon: Car, color: "text-green-600" },
  { name: "Real Estate", icon: Home, color: "text-orange-600" },
  { name: "Phones", icon: Smartphone, color: "text-purple-600" },
  { name: "Books", icon: Book, color: "text-yellow-600" },
  { name: "Gaming", icon: Gamepad2, color: "text-red-600" },
  { name: "Health", icon: Heart, color: "text-emerald-600" },
];

export function CategoryNav() {
  return (
    <nav className="border-b bg-card">
      <div className="container">
        <div className="flex items-center space-x-1 py-2 overflow-x-auto scrollbar-hide">
          <Button variant="ghost" size="sm" className="shrink-0 font-medium">
            All Categories
          </Button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button 
                key={category.name}
                variant="ghost" 
                size="sm" 
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <Icon className={`h-4 w-4 mr-2 ${category.color}`} />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}