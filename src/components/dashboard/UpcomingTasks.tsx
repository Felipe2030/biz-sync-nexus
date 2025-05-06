
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

const taskData = [
  {
    id: 1,
    title: 'Client Meeting: TechNova Inc.',
    date: 'Today',
    time: '2:00 PM',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Project Proposal Deadline',
    date: 'Tomorrow',
    time: '5:00 PM',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Team Strategy Session',
    date: 'May 8',
    time: '10:30 AM',
    priority: 'Medium',
  },
  {
    id: 4,
    title: 'Financial Report Review',
    date: 'May 10',
    time: '3:00 PM',
    priority: 'Low',
  },
];

const UpcomingTasks = () => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-mobserv-blue" />
          <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {taskData.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{task.title}</h4>
                <Badge
                  variant="outline"
                  className={
                    task.priority === 'High'
                      ? 'bg-red-100 text-red-800 hover:bg-red-100'
                      : task.priority === 'Medium'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      : 'bg-green-100 text-green-800 hover:bg-green-100'
                  }
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{task.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{task.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
