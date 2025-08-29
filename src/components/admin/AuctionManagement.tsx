import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, Filter, Eye, Edit, Ban, CheckCircle, XCircle,
  Clock, DollarSign, Users, Calendar, AlertTriangle, Pause
} from "lucide-react";

interface Auction {
  id: number;
  title: string;
  auctioneer: string;
  status: string;
  currentBid: string;
  endDate: string;
  bids: number;
  category: string;
  description: string;
  startingBid: string;
  bidIncrement: string;
  featured: boolean;
  views: number;
}

const AuctionManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [auctions, setAuctions] = useState<Auction[]>([
    { 
      id: 1, 
      title: "Vintage Watch Collection", 
      auctioneer: "Jane Smith", 
      status: "active", 
      currentBid: "₦45,000", 
      endDate: "2024-12-01", 
      bids: 23,
      category: "Collectibles",
      description: "Rare vintage watch collection from the 1960s",
      startingBid: "₦25,000",
      bidIncrement: "₦1,000",
      featured: true,
      views: 342
    },
    { 
      id: 2, 
      title: "Art Painting Original", 
      auctioneer: "Mike Johnson", 
      status: "ended", 
      currentBid: "₦125,000", 
      endDate: "2024-11-25", 
      bids: 45,
      category: "Art",
      description: "Original oil painting by renowned artist",
      startingBid: "₦50,000",
      bidIncrement: "₦2,500",
      featured: false,
      views: 789
    },
    { 
      id: 3, 
      title: "Electronics Bundle", 
      auctioneer: "Sarah Davis", 
      status: "pending", 
      currentBid: "₦0", 
      endDate: "2024-12-05", 
      bids: 0,
      category: "Electronics",
      description: "Brand new electronics bundle including laptop and accessories",
      startingBid: "₦15,000",
      bidIncrement: "₦500",
      featured: false,
      views: 156
    },
  ]);

  const [editAuction, setEditAuction] = useState<Auction | null>(null);

  const handleViewAuction = (auction: Auction) => {
    setSelectedAuction(auction);
  };

  const handleEditAuction = (auction: Auction) => {
    setEditAuction(auction);
  };

  const handleSaveAuction = () => {
    if (editAuction) {
      setAuctions(auctions.map(a => a.id === editAuction.id ? editAuction : a));
      setEditAuction(null);
      toast({
        title: "Auction Updated",
        description: "Auction details have been successfully updated.",
      });
    }
  };

  const handleAuctionAction = (auctionId: number, action: string) => {
    setAuctions(auctions.map(a => {
      if (a.id === auctionId) {
        switch (action) {
          case "approve":
            return { ...a, status: "active" };
          case "reject":
            return { ...a, status: "rejected" };
          case "pause":
            return { ...a, status: "paused" };
          case "feature":
            return { ...a, featured: !a.featured };
          default:
            return a;
        }
      }
      return a;
    }));

    toast({
      title: "Action Completed",
      description: `Auction has been ${action}d successfully.`,
    });
  };

  const filteredAuctions = auctions.filter(auction => 
    auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    auction.auctioneer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "ended": return "secondary";
      case "pending": return "outline";
      case "paused": return "destructive";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Auction Management</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search auctions..." 
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auction</TableHead>
                <TableHead>Auctioneer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Bid</TableHead>
                <TableHead>Bids</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {auction.title}
                        {auction.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{auction.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>{auction.auctioneer}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(auction.status)}>
                      {auction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{auction.currentBid}</TableCell>
                  <TableCell>{auction.bids}</TableCell>
                  <TableCell>{auction.endDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleViewAuction(auction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Auction Details</DialogTitle>
                          </DialogHeader>
                          {selectedAuction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Starting Bid: {selectedAuction.startingBid}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Current Bid: {selectedAuction.currentBid}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Total Bids: {selectedAuction.bids}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>End Date: {selectedAuction.endDate}</span>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <span>Category: {selectedAuction.category}</span>
                                  </div>
                                  <div>
                                    <span>Views: {selectedAuction.views}</span>
                                  </div>
                                  <div>
                                    <span>Bid Increment: {selectedAuction.bidIncrement}</span>
                                  </div>
                                  <div>
                                    <span>Auctioneer: {selectedAuction.auctioneer}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {selectedAuction.description}
                                </p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEditAuction(auction)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Auction</DialogTitle>
                          </DialogHeader>
                          {editAuction && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="title">Title</Label>
                                <Input 
                                  id="title"
                                  value={editAuction.title}
                                  onChange={(e) => setEditAuction({...editAuction, title: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                  value={editAuction.status} 
                                  onValueChange={(value) => setEditAuction({...editAuction, status: value})}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                    <SelectItem value="ended">Ended</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea 
                                  id="description"
                                  value={editAuction.description}
                                  onChange={(e) => setEditAuction({...editAuction, description: e.target.value})}
                                />
                              </div>
                              <Button onClick={handleSaveAuction} className="w-full">
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {auction.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAuctionAction(auction.id, "approve")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleAuctionAction(auction.id, "reject")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      {auction.status === "active" && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAuctionAction(auction.id, "pause")}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AuctionManagement;