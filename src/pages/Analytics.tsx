
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const data = [
  { month: 'Jan', revenue: 4000, expenses: 2400, clients: 24 },
  { month: 'Feb', revenue: 3000, expenses: 1398, clients: 13 },
  { month: 'Mar', revenue: 2000, expenses: 9800, clients: 18 },
  { month: 'Apr', revenue: 2780, expenses: 3908, clients: 28 },
  { month: 'May', revenue: 1890, expenses: 4800, clients: 20 },
  { month: 'Jun', revenue: 2390, expenses: 3800, clients: 25 },
  { month: 'Jul', revenue: 3490, expenses: 4300, clients: 30 },
];

const clientTypeData = [
  { name: 'Small Business', value: 400 },
  { name: 'Enterprise', value: 300 },
  { name: 'Freelancers', value: 300 },
  { name: 'Individuals', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <PageLayout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.2%</div>
            <p className="text-sm text-muted-foreground">+2.1% from last month</p>
            <div className="h-[180px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3742fa" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Client Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+32</div>
            <p className="text-sm text-muted-foreground">New clients this month</p>
            <div className="h-[180px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" fill="#3742fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Client Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3742fa" />
                  <Bar dataKey="expenses" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Analytics;
