
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  ArchiveRestore,
  Copy,
  Database as DatabaseIcon,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Tag,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Mock data for products
const INITIAL_PRODUCTS = [
  { 
    id: '1', 
    name: 'Standard Consultation', 
    type: 'service', 
    category: 'Consulting',
    price: 150.00,
    description: '1-hour consultation with a specialist',
    status: 'active',
    tags: ['consulting', 'professional']
  },
  { 
    id: '2', 
    name: 'Website Development - Basic', 
    type: 'service', 
    category: 'Development',
    price: 1500.00,
    description: 'Basic website development package',
    status: 'active',
    tags: ['web', 'development']
  },
  { 
    id: '3', 
    name: 'Business Analytics Report', 
    type: 'product', 
    category: 'Reports',
    price: 299.00,
    description: 'Comprehensive business analytics report',
    status: 'active',
    tags: ['report', 'analytics']
  },
  { 
    id: '4', 
    name: 'Mobile App Development', 
    type: 'service', 
    category: 'Development',
    price: 5000.00,
    description: 'Custom mobile application development',
    status: 'active',
    tags: ['mobile', 'development', 'app']
  },
  { 
    id: '5', 
    name: 'SEO Audit', 
    type: 'service', 
    category: 'Marketing',
    price: 450.00,
    description: 'Complete SEO audit with recommendations',
    status: 'active',
    tags: ['seo', 'marketing']
  },
];

const Database = () => {
  const [items, setItems] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The item has been successfully deleted.",
    });
  };
  
  const handleDuplicate = (item: typeof INITIAL_PRODUCTS[0]) => {
    const newItem = {
      ...item,
      id: `${Date.now()}`,
      name: `${item.name} (Copy)`,
    };
    
    setItems([...items, newItem]);
    toast({
      title: "Item duplicated",
      description: "A copy of the item has been created.",
    });
  };

  // Filter items based on search term and active tab
  const filteredItems = items
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => {
      if (activeTab === 'all') return true;
      return item.type === activeTab;
    });
  
  // Count total products and services
  const totalProducts = items.filter(item => item.type === 'product').length;
  const totalServices = items.filter(item => item.type === 'service').length;

  return (
    <PageLayout title="Database">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
            <p className="text-sm text-muted-foreground">Products and services in database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-sm text-muted-foreground">Physical and digital products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServices}</div>
            <p className="text-sm text-muted-foreground">Professional services offered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>Products & Services</CardTitle>
          <Button asChild>
            <Link to="/database/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-full sm:w-[300px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="hidden sm:flex">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="product">Products</TabsTrigger>
              <TabsTrigger value="service">Services</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Tags</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === 'product' ? 'default' : 'secondary'}>
                            {item.type === 'product' ? 'Product' : 'Service'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{item.category}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/database/edit/${item.id}`} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(item)} className="cursor-pointer">
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => handleDelete(item.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No items found. Try a different search or add a new item.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="product" className="mt-0">
              {/* Product tab content - reusing the same table structure */}
            </TabsContent>
            
            <TabsContent value="service" className="mt-0">
              {/* Service tab content - reusing the same table structure */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Database;
