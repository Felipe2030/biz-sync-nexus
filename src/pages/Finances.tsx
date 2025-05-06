
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
} from '@/components/ui/dropdown-menu';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, Edit, Filter, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const INITIAL_TRANSACTIONS = [
  { id: '1', date: '2023-05-15', description: 'Client Payment - Acme Corp', amount: 5000.00, type: 'income', category: 'Services', status: 'Completed' },
  { id: '2', date: '2023-05-14', description: 'Office Supplies', amount: 120.50, type: 'expense', category: 'Supplies', status: 'Completed' },
  { id: '3', date: '2023-05-10', description: 'Client Payment - Wayne Enterprises', amount: 7500.00, type: 'income', category: 'Services', status: 'Completed' },
  { id: '4', date: '2023-05-08', description: 'Monthly Rent', amount: 2200.00, type: 'expense', category: 'Rent', status: 'Completed' },
  { id: '5', date: '2023-05-05', description: 'Software Subscription', amount: 99.00, type: 'expense', category: 'Software', status: 'Completed' },
  { id: '6', date: '2023-05-01', description: 'Client Payment - Pied Piper', amount: 3000.00, type: 'income', category: 'Services', status: 'Pending' },
];

const summaryData = [
  { name: 'Jan', income: 9000, expenses: 6000 },
  { name: 'Feb', income: 10000, expenses: 5500 },
  { name: 'Mar', income: 8500, expenses: 7000 },
  { name: 'Apr', income: 12000, expenses: 5800 },
  { name: 'May', income: 15500, expenses: 6200 },
];

const Finances = () => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been successfully deleted.",
    });
  };

  // Filter transactions based on search term and active tab
  const filteredTransactions = transactions
    .filter(tx => 
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(tx => {
      if (activeTab === 'all') return true;
      return tx.type === activeTab;
    });

  // Calculate financial totals
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const netIncome = totalIncome - totalExpenses;

  return (
    <PageLayout title="Finances">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netIncome.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Current month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#10b981" />
                  <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
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
            <Button asChild>
              <Link to="/finances/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[300px]">Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>{tx.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {tx.type === 'income' ? (
                              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                            )}
                            <span className={tx.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                              ${tx.amount.toLocaleString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tx.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tx.status}
                          </span>
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
                                <Link to={`/finances/edit/${tx.id}`} className="cursor-pointer">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive cursor-pointer"
                                onClick={() => handleDelete(tx.id)}
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
                        No transactions found. Try a different search or add a new transaction.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="income" className="mt-0">
              {/* Income tab content - reusing the same table structure */}
            </TabsContent>
            
            <TabsContent value="expense" className="mt-0">
              {/* Expense tab content - reusing the same table structure */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Finances;
