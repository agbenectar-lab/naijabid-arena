import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedAuctions } from "@/components/sections/FeaturedAuctions";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { RecentAuctions } from "@/components/sections/RecentAuctions";
import { Footer } from "@/components/layout/Footer";
import { AdvertisementBanner } from "@/components/advertising/AdvertisementBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />
      <main className="flex-1">
        <HeroSection />
        <AdvertisementBanner position="top" className="container my-8" />
        <FeaturedAuctions />
        <AdvertisementBanner position="inline" className="container my-8" />
        <CategoriesSection />
        <RecentAuctions />
        <AdvertisementBanner position="bottom" className="container my-8" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
