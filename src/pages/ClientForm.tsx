
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { ArrowLeft, Save } from 'lucide-react';

// Mock client data
const INITIAL_CLIENTS = [
  { id: '1', name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-1234', status: 'Active', type: 'Enterprise', address: '123 Main St, City', notes: 'Important client with multiple projects.' },
  { id: '2', name: 'Stark Industries', email: 'info@stark.com', phone: '555-5678', status: 'Active', type: 'Enterprise', address: '456 Tech Blvd, Metropolis', notes: 'High priority client.' },
  { id: '3', name: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '555-9012', status: 'Inactive', type: 'Enterprise', address: '789 Bat Ave, Gotham', notes: 'Currently on hold.' },
  { id: '4', name: 'Pied Piper', email: 'richard@piedpiper.com', phone: '555-3456', status: 'Active', type: 'Startup', address: '101 Silicon Valley', notes: 'Tech startup with compression algorithm.' },
  { id: '5', name: 'Los Pollos Hermanos', email: 'gus@lph.com', phone: '555-7890', status: 'Active', type: 'Small Business', address: '234 Albuquerque Rd', notes: 'Restaurant chain.' },
];

const clientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Phone number is required." }),
  status: z.string(),
  type: z.string(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  // Initialize the form
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: "Active",
      type: "Small Business",
      address: "",
      notes: "",
    },
  });

  // If editing, fetch and set client data
  useEffect(() => {
    if (isEditing) {
      const client = INITIAL_CLIENTS.find(client => client.id === id);
      if (client) {
        form.reset({
          name: client.name,
          email: client.email,
          phone: client.phone,
          status: client.status,
          type: client.type,
          address: client.address || "",
          notes: client.notes || "",
        });
      }
    }
  }, [id, isEditing, form]);

  // Form submission handler
  const onSubmit = (data: ClientFormValues) => {
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", data);
    
    toast({
      title: isEditing ? "Client updated" : "Client created",
      description: `${data.name} has been ${isEditing ? "updated" : "added"} successfully.`,
    });
    
    navigate("/clients");
  };

  return (
    <PageLayout title={isEditing ? "Edit Client" : "Add New Client"}>
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Client Information" : "New Client Information"}</CardTitle>
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
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
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
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select client type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Small Business">Small Business</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                          <SelectItem value="Startup">Startup</SelectItem>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Non-profit">Non-profit</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional notes about this client"
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/clients')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Client' : 'Create Client'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ClientForm;
