
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, X } from 'lucide-react';

// Mock data
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
];

const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["product", "service"]),
  category: z.string().min(1, { message: "Category is required." }),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

const DatabaseItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // Initialize the form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      type: "product",
      category: "",
      price: 0,
      description: "",
      status: "active",
    },
  });

  // If editing, fetch and set product data
  useEffect(() => {
    if (isEditing) {
      const product = INITIAL_PRODUCTS.find(item => item.id === id);
      if (product) {
        form.reset({
          name: product.name,
          type: product.type,
          category: product.category,
          price: product.price,
          description: product.description,
          status: product.status,
        });
        setTags(product.tags || []);
      }
    }
  }, [id, isEditing, form]);

  // Form submission handler
  const onSubmit = (data: ProductFormValues) => {
    // In a real app, you would send this data to your backend
    const itemWithTags = {
      ...data,
      tags,
    };
    
    console.log("Form submitted:", itemWithTags);
    
    toast({
      title: isEditing ? "Item updated" : "Item created",
      description: `${data.name} has been ${isEditing ? "updated" : "added"} successfully.`,
    });
    
    navigate("/database");
  };

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Categories based on type
  const getCategories = () => {
    const type = form.watch("type");
    if (type === "product") {
      return [
        "Software", 
        "Hardware", 
        "Reports", 
        "Ebooks", 
        "Templates", 
        "Other Products"
      ];
    } else {
      return [
        "Consulting", 
        "Development", 
        "Design", 
        "Marketing", 
        "Support", 
        "Training", 
        "Other Services"
      ];
    }
  };

  return (
    <PageLayout title={isEditing ? "Edit Item" : "Add New Item"}>
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/database">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Database
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Item Details" : "New Item Details"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            step="0.01"
                            min="0"
                            className="pl-7"
                            onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                            value={field.value} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getCategories().map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <div 
                        key={tag}
                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md flex items-center text-sm"
                      >
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add tags..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Press Enter to add tags
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add item description"
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/database')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Item' : 'Create Item'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default DatabaseItemForm;
