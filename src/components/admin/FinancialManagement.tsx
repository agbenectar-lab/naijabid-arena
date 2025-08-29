import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, TrendingUp, TrendingDown, CreditCard, 
  CheckCircle, XCircle, Clock, AlertTriangle, Download, RefreshCw
} from "lucide-react";

interface Transaction {
  id: number;
  user: string;
  amount: string;
  type: string;
  status: string;
  date: string;
  auction: string;
  method: string;
  reference: string;
}

const FinancialManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: 1, 
      user: "John Doe", 
      amount: "₦45,000", 
      type: "payment", 
      status: "completed", 
      date: "2024-11-25", 
      auction: "Vintage Watch",
      method: "Bank Transfer",
      reference: "TXN001234567"
    },
    { 
      id: 2, 
      user: "Bob Wilson", 
      amount: "₦125,000", 
      type: "payment", 
      status: "pending", 
      date: "2024-11-24", 
      auction: "Art Painting",
      method: "Card Payment",
      reference: "TXN001234568"
    },
    { 
      id: 3, 
      user: "Alice Brown", 
      amount: "₦2,250", 
      type: "commission", 
      status: "completed", 
      date: "2024-11-23", 
      auction: "Electronics",
      method: "Platform Fee",
      reference: "TXN001234569"
    },
    { 
      id: 4, 
      user: "Mike Johnson", 
      amount: "₦8,500", 
      type: "refund", 
      status: "processing", 
      date: "2024-11-22", 
      auction: "Jewelry Set",
      method: "Bank Transfer",
      reference: "TXN001234570"
    },
  ]);

  const [payouts, setPayouts] = useState([
    { id: 1, auctioneer: "Jane Smith", amount: "₦95,000", status: "pending", date: "2024-11-26", auction: "Watch Collection" },
    { id: 2, auctioneer: "Mike Johnson", amount: "₦118,750", status: "completed", date: "2024-11-25", auction: "Art Painting" },
    { id: 3, auctioneer: "Sarah Davis", amount: "₦28,500", status: "scheduled", date: "2024-11-27", auction: "Electronics Bundle" },
  ]);

  const handleTransactionAction = (transactionId: number, action: string) => {
    setTransactions(transactions.map(t => {
      if (t.id === transactionId) {
        switch (action) {
          case "approve":
            return { ...t, status: "completed" };
          case "reject":
            return { ...t, status: "failed" };
          case "refund":
            return { ...t, status: "refunded" };
          default:
            return t;
        }
      }
      return t;
    }));

    toast({
      title: "Transaction Updated",
      description: `Transaction has been ${action}d successfully.`,
    });
  };

  const handlePayoutAction = (payoutId: number, action: string) => {
    setPayouts(payouts.map(p => {
      if (p.id === payoutId) {
        switch (action) {
          case "process":
            return { ...p, status: "completed" };
          case "hold":
            return { ...p, status: "on_hold" };
          default:
            return p;
        }
      }
      return p;
    }));

    toast({
      title: "Payout Updated",
      description: `Payout has been ${action}ed successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "pending": return "secondary";
      case "processing": return "outline";
      case "failed": return "destructive";
      case "refunded": return "destructive";
      case "on_hold": return "destructive";
      case "scheduled": return "outline";
      default: return "outline";
    }
  };

  const totalRevenue = "₦8,945,230";
  const pendingPayments = "₦234,890";
  const commissionEarned = "₦447,261";
  const refundRequests = "₦45,600";

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-amber-600">23 transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{commissionEarned}</div>
            <p className="text-xs text-emerald-600">5% average rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{refundRequests}</div>
            <p className="text-xs text-amber-600">8 pending requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Auction</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell className="font-medium">{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.auction}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Transaction Details</DialogTitle>
                            </DialogHeader>
                            {selectedTransaction && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <strong>Reference:</strong> {selectedTransaction.reference}
                                  </div>
                                  <div>
                                    <strong>Method:</strong> {selectedTransaction.method}
                                  </div>
                                  <div>
                                    <strong>User:</strong> {selectedTransaction.user}
                                  </div>
                                  <div>
                                    <strong>Amount:</strong> {selectedTransaction.amount}
                                  </div>
                                  <div>
                                    <strong>Type:</strong> {selectedTransaction.type}
                                  </div>
                                  <div>
                                    <strong>Status:</strong> {selectedTransaction.status}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {transaction.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTransactionAction(transaction.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTransactionAction(transaction.id, "reject")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
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

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Auctioneer Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auctioneer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Auction</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>{payout.auctioneer}</TableCell>
                    <TableCell className="font-medium">{payout.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(payout.status)}>
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>{payout.auction}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {payout.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handlePayoutAction(payout.id, "process")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handlePayoutAction(payout.id, "hold")}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
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
    </div>
  );
};

export default FinancialManagement;