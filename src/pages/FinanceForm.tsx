
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
import { ArrowLeft, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Mock data
const INITIAL_TRANSACTIONS = [
  { id: '1', date: '2023-05-15', description: 'Client Payment - Acme Corp', amount: 5000.00, type: 'income', category: 'Services', status: 'Completed', notes: 'Monthly retainer' },
  { id: '2', date: '2023-05-14', description: 'Office Supplies', amount: 120.50, type: 'expense', category: 'Supplies', status: 'Completed', notes: 'Printer paper and ink' },
];

const transactionSchema = z.object({
  date: z.date(),
  description: z.string().min(2, { message: "Description is required." }),
  amount: z.number().positive({ message: "Amount must be positive." }),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, { message: "Category is required." }),
  status: z.string(),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const FinanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  // Initialize the form
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      description: "",
      amount: 0,
      type: "income",
      category: "",
      status: "Completed",
      notes: "",
    },
  });

  // If editing, fetch and set transaction data
  useEffect(() => {
    if (isEditing) {
      const transaction = INITIAL_TRANSACTIONS.find(tx => tx.id === id);
      if (transaction) {
        form.reset({
          date: new Date(transaction.date),
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type as "income" | "expense",
          category: transaction.category,
          status: transaction.status,
          notes: transaction.notes || "",
        });
      }
    }
  }, [id, isEditing, form]);

  // Form submission handler
  const onSubmit = (data: TransactionFormValues) => {
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", data);
    
    toast({
      title: isEditing ? "Transaction updated" : "Transaction created",
      description: `Transaction has been ${isEditing ? "updated" : "added"} successfully.`,
    });
    
    navigate("/finances");
  };

  // Income categories
  const incomeCategories = [
    "Services", 
    "Products", 
    "Interest", 
    "Investments", 
    "Refunds", 
    "Other Income"
  ];
  
  // Expense categories
  const expenseCategories = [
    "Rent", 
    "Utilities", 
    "Salaries", 
    "Supplies", 
    "Software", 
    "Hardware", 
    "Marketing", 
    "Travel", 
    "Insurance", 
    "Other Expenses"
  ];

  // Get categories based on selected type
  const getCategories = () => {
    const type = form.watch("type");
    return type === "income" ? incomeCategories : expenseCategories;
  };

  return (
    <PageLayout title={isEditing ? "Edit Transaction" : "Add New Transaction"}>
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/finances">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Finances
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Transaction" : "New Transaction"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Type</FormLabel>
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
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter transaction description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          step="0.01"
                          onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                          value={field.value} 
                        />
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
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
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
                        placeholder="Add any additional notes about this transaction"
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/finances')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Transaction' : 'Create Transaction'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default FinanceForm;
