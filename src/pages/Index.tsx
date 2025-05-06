
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import FinancialOverview from '@/components/dashboard/FinancialOverview';
import RecentClients from '@/components/dashboard/RecentClients';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import GrowthSummary from '@/components/dashboard/GrowthSummary';

import { Users, Wallet, Calendar, BarChart2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Clients"
              value="124"
              icon={<Users size={20} />}
              change="+12% from last month"
              changeType="positive"
            />
            <StatCard
              title="Revenue"
              value="$24,780"
              icon={<Wallet size={20} />}
              change="+8% from last month"
              changeType="positive"
            />
            <StatCard
              title="Pending Tasks"
              value="18"
              icon={<Calendar size={20} />}
              change="-3% from last month"
              changeType="negative"
            />
            <StatCard
              title="Conversion Rate"
              value="64%"
              icon={<BarChart2 size={20} />}
              change="+5.2% from last month"
              changeType="positive"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <FinancialOverview />
            <GrowthSummary />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentClients />
            <UpcomingTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
