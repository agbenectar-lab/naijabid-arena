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
  Plus, Search, Edit, Trash2, Eye, Package,
  TrendingUp, AlertCircle
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
  parentCategory: string | null;
  itemCount: number;
  createdDate: string;
  totalSales: string;
  isActive: boolean;
}

const CategoryManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      description: "Electronic devices, gadgets, and accessories",
      status: "active",
      parentCategory: null,
      itemCount: 234,
      createdDate: "2024-01-15",
      totalSales: "₦2,340,000",
      isActive: true
    },
    {
      id: 2,
      name: "Smartphones",
      description: "Mobile phones and accessories",
      status: "active",
      parentCategory: "Electronics",
      itemCount: 89,
      createdDate: "2024-01-20",
      totalSales: "₦1,200,000",
      isActive: true
    },
    {
      id: 3,
      name: "Art & Collectibles",
      description: "Artwork, antiques, and collectible items",
      status: "active",
      parentCategory: null,
      itemCount: 156,
      createdDate: "2024-02-01",
      totalSales: "₦890,000",
      isActive: true
    },
    {
      id: 4,
      name: "Fashion",
      description: "Clothing, shoes, and fashion accessories",
      status: "inactive",
      parentCategory: null,
      itemCount: 45,
      createdDate: "2024-02-15",
      totalSales: "₦345,000",
      isActive: false
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parentCategory: "",
    isActive: true
  });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required.",
        variant: "destructive"
      });
      return;
    }

    const category: Category = {
      id: categories.length + 1,
      name: newCategory.name,
      description: newCategory.description,
      status: newCategory.isActive ? "active" : "inactive",
      parentCategory: newCategory.parentCategory || null,
      itemCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      totalSales: "₦0",
      isActive: newCategory.isActive
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "", parentCategory: "", isActive: true });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Category Added",
      description: "New category has been successfully created.",
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editCategory) {
      setCategories(categories.map(c => c.id === editCategory.id ? editCategory : c));
      setEditCategory(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Category Updated",
        description: "Category has been successfully updated.",
      });
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.itemCount > 0) {
      toast({
        title: "Cannot Delete",
        description: "Cannot delete category with existing items.",
        variant: "destructive"
      });
      return;
    }

    setCategories(categories.filter(c => c.id !== categoryId));
    toast({
      title: "Category Deleted",
      description: "Category has been successfully deleted.",
    });
  };

  const handleToggleStatus = (categoryId: number) => {
    setCategories(categories.map(c => 
      c.id === categoryId 
        ? { ...c, status: c.status === "active" ? "inactive" : "active", isActive: !c.isActive }
        : c
    ));
    
    toast({
      title: "Status Updated",
      description: "Category status has been updated.",
    });
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parentCategories = categories.filter(c => c.parentCategory === null);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Category Management</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search categories..." 
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input 
                      id="categoryName"
                      placeholder="Enter category name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryDescription">Description</Label>
                    <Textarea 
                      id="categoryDescription"
                      placeholder="Enter category description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentCategory">Parent Category (Optional)</Label>
                    <Select 
                      value={newCategory.parentCategory} 
                      onValueChange={(value) => setNewCategory({...newCategory, parentCategory: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {parentCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newCategory.isActive}
                      onChange={(e) => setNewCategory({...newCategory, isActive: e.target.checked})}
                      className="rounded"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <Button onClick={handleAddCategory} className="w-full">
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        {category.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{category.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {category.parentCategory ? (
                      <Badge variant="outline">{category.parentCategory}</Badge>
                    ) : (
                      <span className="text-muted-foreground">Root</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{category.itemCount}</span>
                      {category.itemCount > 100 && <TrendingUp className="h-3 w-3 text-emerald-600" />}
                    </div>
                  </TableCell>
                  <TableCell>{category.totalSales}</TableCell>
                  <TableCell>
                    <Badge variant={category.status === "active" ? "default" : "secondary"}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(category)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Category Details</DialogTitle>
                          </DialogHeader>
                          {selectedCategory && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium">Name</h4>
                                  <p>{selectedCategory.name}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Description</h4>
                                  <p>{selectedCategory.description}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Parent Category</h4>
                                  <p>{selectedCategory.parentCategory || "Root Category"}</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium">Total Items</h4>
                                  <p>{selectedCategory.itemCount}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Total Sales</h4>
                                  <p>{selectedCategory.totalSales}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Created Date</h4>
                                  <p>{selectedCategory.createdDate}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          {editCategory && (
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="editName">Name</Label>
                                <Input 
                                  id="editName"
                                  value={editCategory.name}
                                  onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="editDescription">Description</Label>
                                <Textarea 
                                  id="editDescription"
                                  value={editCategory.description}
                                  onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="editParent">Parent Category</Label>
                                <Select 
                                  value={editCategory.parentCategory || ""} 
                                  onValueChange={(value) => setEditCategory({...editCategory, parentCategory: value || null})}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">None</SelectItem>
                                    {parentCategories
                                      .filter(c => c.id !== editCategory.id)
                                      .map((category) => (
                                        <SelectItem key={category.id} value={category.name}>
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleSaveCategory} className="w-full">
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleStatus(category.id)}
                      >
                        {category.status === "active" ? 
                          <AlertCircle className="h-4 w-4" /> : 
                          <Package className="h-4 w-4" />
                        }
                      </Button>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={category.itemCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
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

export default CategoryManagement;