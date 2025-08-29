import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, AlertTriangle, CheckCircle, XCircle, Eye,
  Flag, MessageSquare, Image, Ban, UserX
} from "lucide-react";

interface Report {
  id: number;
  reporter: string;
  type: string;
  item: string;
  status: string;
  date: string;
  description: string;
  priority: string;
  evidence?: string;
  reportedUser?: string;
  category: string;
}

const ContentModeration: React.FC = () => {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([
    { 
      id: 1, 
      reporter: "User123", 
      type: "inappropriate content", 
      item: "Auction #234", 
      status: "pending", 
      date: "2024-11-25",
      description: "Auction contains inappropriate images and misleading description",
      priority: "high",
      evidence: "Screenshots attached",
      reportedUser: "BadActor1",
      category: "Content Violation"
    },
    { 
      id: 2, 
      reporter: "SafetyFirst", 
      type: "fake item", 
      item: "Auction #189", 
      status: "resolved", 
      date: "2024-11-24",
      description: "Item appears to be counterfeit luxury goods",
      priority: "high",
      evidence: "Expert verification report",
      reportedUser: "FakeDealer",
      category: "Fraud"
    },
    { 
      id: 3, 
      reporter: "TrustGuard", 
      type: "spam behavior", 
      item: "User Profile", 
      status: "investigating", 
      date: "2024-11-23",
      description: "User creating multiple fake bids to inflate prices",
      priority: "medium",
      evidence: "Bid pattern analysis",
      reportedUser: "SpamBot99",
      category: "Bid Manipulation"
    },
    { 
      id: 4, 
      reporter: "CleanPlatform", 
      type: "harassment", 
      item: "Messages", 
      status: "pending", 
      date: "2024-11-22",
      description: "User sending threatening messages to other bidders",
      priority: "high",
      evidence: "Message screenshots",
      reportedUser: "ToxicUser",
      category: "Harassment"
    },
  ]);

  const [moderationActions, setModerationActions] = useState([
    { id: 1, action: "Content Removed", target: "Auction #234", moderator: "Admin1", date: "2024-11-25", reason: "Inappropriate content" },
    { id: 2, action: "User Suspended", target: "FakeDealer", moderator: "Admin2", date: "2024-11-24", reason: "Selling counterfeit items" },
    { id: 3, action: "Warning Issued", target: "SpamBot99", moderator: "Admin1", date: "2024-11-23", reason: "Suspicious bidding pattern" },
  ]);

  const handleReportAction = (reportId: number, action: string, notes?: string) => {
    setReports(reports.map(r => {
      if (r.id === reportId) {
        switch (action) {
          case "approve":
            return { ...r, status: "resolved" };
          case "reject":
            return { ...r, status: "dismissed" };
          case "investigate":
            return { ...r, status: "investigating" };
          default:
            return r;
        }
      }
      return r;
    }));

    // Add to moderation actions log
    const newAction = {
      id: moderationActions.length + 1,
      action: action === "approve" ? "Report Approved" : action === "reject" ? "Report Dismissed" : "Investigation Started",
      target: reports.find(r => r.id === reportId)?.item || "",
      moderator: "Current Admin",
      date: new Date().toISOString().split('T')[0],
      reason: notes || ""
    };
    setModerationActions([newAction, ...moderationActions]);

    toast({
      title: "Report Updated",
      description: `Report has been ${action}d successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "default";
      case "pending": return "secondary";
      case "investigating": return "outline";
      case "dismissed": return "destructive";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Moderation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.status === "pending").length}
            </div>
            <p className="text-xs text-amber-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.status === "investigating").length}
            </div>
            <p className="text-xs text-blue-600">Being reviewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-emerald-600">+8 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter(r => r.priority === "high" && r.status === "pending").length}
            </div>
            <p className="text-xs text-red-600">Urgent attention needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.reporter}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.type}</Badge>
                    </TableCell>
                    <TableCell>{report.item}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(report.priority)}>
                        {report.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedReport(report)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Report Details</DialogTitle>
                            </DialogHeader>
                            {selectedReport && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Reporter</Label>
                                    <p className="text-sm">{selectedReport.reporter}</p>
                                  </div>
                                  <div>
                                    <Label>Category</Label>
                                    <p className="text-sm">{selectedReport.category}</p>
                                  </div>
                                  <div>
                                    <Label>Reported User</Label>
                                    <p className="text-sm">{selectedReport.reportedUser}</p>
                                  </div>
                                  <div>
                                    <Label>Priority</Label>
                                    <Badge variant={getPriorityColor(selectedReport.priority)}>
                                      {selectedReport.priority}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {selectedReport.description}
                                  </p>
                                </div>
                                <div>
                                  <Label>Evidence</Label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {selectedReport.evidence}
                                  </p>
                                </div>
                                {selectedReport.status === "pending" && (
                                  <div className="flex gap-2 pt-4">
                                    <Button 
                                      onClick={() => handleReportAction(selectedReport.id, "approve")}
                                      className="flex-1"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve & Take Action
                                    </Button>
                                    <Button 
                                      variant="outline"
                                      onClick={() => handleReportAction(selectedReport.id, "investigate")}
                                      className="flex-1"
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      Investigate
                                    </Button>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleReportAction(selectedReport.id, "reject")}
                                      className="flex-1"
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Dismiss
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {report.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReportAction(report.id, "approve")}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReportAction(report.id, "reject")}
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

      {/* Recent Moderation Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Moderation Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Moderator</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {moderationActions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <Badge variant="outline">{action.action}</Badge>
                    </TableCell>
                    <TableCell>{action.target}</TableCell>
                    <TableCell>{action.moderator}</TableCell>
                    <TableCell>{action.date}</TableCell>
                    <TableCell className="max-w-xs truncate">{action.reason}</TableCell>
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

export default ContentModeration;