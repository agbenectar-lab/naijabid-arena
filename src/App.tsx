
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuctionProvider } from "@/contexts/AuctionContext";
import Index from "./pages/Index";
import AuctionDetail from "./pages/AuctionDetailSimple";
import Dashboard from "./pages/Dashboard";
import PaymentFlow from "./pages/PaymentFlow";
import OrderTracking from "./pages/OrderTracking";
import CreateAuction from "./pages/CreateAuction";
import Auctions from "./pages/Auctions";
import BusinessFeatures from "./pages/BusinessFeatures";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AuctionProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/auction/:id" element={<AuctionDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-auction" element={<CreateAuction />} />
              <Route path="/create-auction" element={<CreateAuction />} />
              <Route path="/payment/:id" element={<PaymentFlow />} />
              <Route path="/order-tracking/:id" element={<OrderTracking />} />
              <Route path="/business-features" element={<BusinessFeatures />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuctionProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
