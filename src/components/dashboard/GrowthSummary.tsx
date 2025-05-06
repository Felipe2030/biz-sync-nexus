
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart2 } from 'lucide-react';

const data = [
  { name: 'Service A', value: 400 },
  { name: 'Service B', value: 300 },
  { name: 'Service C', value: 200 },
  { name: 'Others', value: 100 },
];

const COLORS = ['#0a1172', '#1a2f8a', '#3742fa', '#444444'];

const GrowthSummary = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-2">
        <BarChart2 size={18} className="text-mobserv-blue" />
        <CardTitle className="text-lg">Service Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} clients`} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthSummary;
