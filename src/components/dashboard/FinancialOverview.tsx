
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet } from 'lucide-react';

const data = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 },
];

const FinancialOverview = () => {
  return (
    <Card className="animate-fade-in col-span-2">
      <CardHeader className="flex flex-row items-center gap-2">
        <Wallet size={18} className="text-mobserv-blue" />
        <CardTitle className="text-lg">Financial Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#0a1172"
                fill="#1a2f8a"
                fillOpacity={0.6}
                activeDot={{ r: 8 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="#333333"
                fill="#444444"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-8 mt-4 text-sm">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-mobserv-blue mr-2"></div>
            <span>Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-mobserv-gray mr-2"></div>
            <span>Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
