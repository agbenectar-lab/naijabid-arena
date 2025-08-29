import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AuctionDetail from "./pages/AuctionDetail";
import BidderDashboard from "./pages/BidderDashboard";
import AuctioneerDashboard from "./pages/AuctioneerDashboard";
import PaymentFlow from "./pages/PaymentFlow";
import OrderTracking from "./pages/OrderTracking";
import CreateAuction from "./pages/CreateAuction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/bidder-dashboard" element={<BidderDashboard />} />
            <Route path="/auctioneer-dashboard" element={<AuctioneerDashboard />} />
            <Route path="/payment/:id" element={<PaymentFlow />} />
            <Route path="/order-tracking/:id" element={<OrderTracking />} />
            <Route path="/create-auction" element={<CreateAuction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
