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
  Search, Filter, Eye, Edit, Ban, UserCheck, UserX, 
  Mail, Phone, Calendar, MapPin, CreditCard, AlertTriangle
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  totalSpent: string;
  location: string;
  verified: boolean;
  lastLogin: string;
  actionsCount: number;
}

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com", 
      phone: "+234 803 123 4567",
      role: "bidder", 
      status: "active", 
      joinDate: "2024-01-15", 
      totalSpent: "₦234,500",
      location: "Lagos, Nigeria",
      verified: true,
      lastLogin: "2024-11-28",
      actionsCount: 45
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com",
      phone: "+234 801 987 6543", 
      role: "auctioneer", 
      status: "active", 
      joinDate: "2024-02-10", 
      totalSpent: "₦0",
      location: "Abuja, Nigeria",
      verified: true,
      lastLogin: "2024-11-27",
      actionsCount: 23
    },
    { 
      id: 3, 
      name: "Bob Wilson", 
      email: "bob@example.com",
      phone: "+234 805 555 1234", 
      role: "bidder", 
      status: "suspended", 
      joinDate: "2024-01-20", 
      totalSpent: "₦89,200",
      location: "Kano, Nigeria",
      verified: false,
      lastLogin: "2024-11-20",
      actionsCount: 12
    },
  ]);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUserRole, setNewUserRole] = useState("");
  const [banReason, setBanReason] = useState("");

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
  };

  const handleSaveUser = () => {
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? editUser : u));
      setEditUser(null);
      toast({
        title: "User Updated",
        description: "User information has been successfully updated.",
      });
    }
  };

  const handleBanUser = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === "active" ? "suspended" : "active" }
        : u
    ));
    
    const action = users.find(u => u.id === userId)?.status === "active" ? "banned" : "unbanned";
    toast({
      title: `User ${action}`,
      description: `User has been ${action} successfully.`,
    });
  };

  const handlePromoteUser = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: u.role === "bidder" ? "auctioneer" : "bidder" }
        : u
    ));
    
    toast({
      title: "User Role Updated",
      description: "User role has been changed successfully.",
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              Add User
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.verified && <UserCheck className="h-4 w-4 text-emerald-600" />}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "auctioneer" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.totalSpent}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span>{selectedUser.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span>{selectedUser.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{selectedUser.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>Joined: {selectedUser.joinDate}</span>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="h-4 w-4" />
                                  <span>Total Spent: {selectedUser.totalSpent}</span>
                                </div>
                                <div>
                                  <span>Last Login: {selectedUser.lastLogin}</span>
                                </div>
                                <div>
                                  <span>Actions: {selectedUser.actionsCount}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {selectedUser.verified ? (
                                    <>
                                      <UserCheck className="h-4 w-4 text-emerald-600" />
                                      <span>Verified Account</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                                      <span>Unverified Account</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          {editUser && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                  id="name"
                                  value={editUser.name}
                                  onChange={(e) => setEditUser({...editUser, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                  id="email"
                                  value={editUser.email}
                                  onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="role">Role</Label>
                                <Select 
                                  value={editUser.role} 
                                  onValueChange={(value) => setEditUser({...editUser, role: value})}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bidder">Bidder</SelectItem>
                                    <SelectItem value="auctioneer">Auctioneer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleSaveUser} className="w-full">
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleBanUser(user.id)}
                      >
                        {user.status === "active" ? <Ban className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
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

export default UserManagement;