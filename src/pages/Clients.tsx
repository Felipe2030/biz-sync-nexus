
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Edit, MoreHorizontal, Plus, Search, Trash2, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data for clients
const INITIAL_CLIENTS = [
  { id: '1', name: 'Acme Corporation', email: 'contact@acme.com', phone: '555-1234', status: 'Active', type: 'Enterprise' },
  { id: '2', name: 'Stark Industries', email: 'info@stark.com', phone: '555-5678', status: 'Active', type: 'Enterprise' },
  { id: '3', name: 'Wayne Enterprises', email: 'bruce@wayne.com', phone: '555-9012', status: 'Inactive', type: 'Enterprise' },
  { id: '4', name: 'Pied Piper', email: 'richard@piedpiper.com', phone: '555-3456', status: 'Active', type: 'Startup' },
  { id: '5', name: 'Los Pollos Hermanos', email: 'gus@lph.com', phone: '555-7890', status: 'Active', type: 'Small Business' },
];

const Clients = () => {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Client deleted",
      description: "The client has been successfully deleted.",
    });
  };

  return (
    <PageLayout title="Clients">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="w-full sm:w-[300px] pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link to="/clients/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Client
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{client.type}</TableCell>
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
                            <Link to={`/clients/edit/${client.id}`} className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive cursor-pointer"
                            onClick={() => handleDelete(client.id)}
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
                    No clients found. Try a different search or add a new client.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Clients;
