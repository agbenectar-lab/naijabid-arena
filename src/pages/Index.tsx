import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedAuctions } from "@/components/sections/FeaturedAuctions";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { RecentAuctions } from "@/components/sections/RecentAuctions";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1">
        <HeroSection />
        <FeaturedAuctions />
        <CategoriesSection />
        <RecentAuctions />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
