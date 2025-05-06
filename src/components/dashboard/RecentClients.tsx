
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus } from 'lucide-react';

const clientsData = [
  {
    id: 1,
    name: 'Acme Co.',
    status: 'Active',
    lastInteraction: '2 days ago',
    value: '$5,400',
  },
  {
    id: 2,
    name: 'TechNova Inc.',
    status: 'Active',
    lastInteraction: '5 days ago',
    value: '$3,200',
  },
  {
    id: 3,
    name: 'GlobalServe Ltd',
    status: 'Pending',
    lastInteraction: '1 day ago',
    value: '$2,800',
  },
  {
    id: 4,
    name: 'Bright Solutions',
    status: 'Inactive',
    lastInteraction: '2 weeks ago',
    value: '$1,700',
  },
];

const RecentClients = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-mobserv-blue" />
          <CardTitle className="text-lg">Recent Clients</CardTitle>
        </div>
        <Button className="bg-mobserv-blue hover:bg-mobserv-blue-light">
          <Plus size={16} className="mr-2" /> Add Client
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clientsData.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <h4 className="font-medium">{client.name}</h4>
                <p className="text-xs text-gray-500">Last contact: {client.lastInteraction}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium text-mobserv-gray">{client.value}</p>
                <Badge
                  variant="outline"
                  className={
                    client.status === 'Active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-100'
                      : client.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                  }
                >
                  {client.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClients;
