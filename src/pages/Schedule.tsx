
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Badge } from '@/components/ui/badge';
import { addDays, format, isSameDay } from 'date-fns';
import { CalendarPlus, CheckCircle2, CircleDashed, Clock, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const INITIAL_TASKS = [
  { 
    id: '1', 
    title: 'Client Meeting - Acme Corp', 
    description: 'Discuss new project requirements',
    date: new Date('2023-05-15T10:00:00'), 
    endDate: new Date('2023-05-15T11:30:00'),
    status: 'scheduled',
    priority: 'high',
    assignedTo: 'John Doe',
    category: 'Meeting'
  },
  { 
    id: '2', 
    title: 'Prepare Project Proposal', 
    description: 'Create proposal for Stark Industries',
    date: new Date('2023-05-16T09:00:00'), 
    endDate: new Date('2023-05-16T12:00:00'),
    status: 'scheduled',
    priority: 'medium',
    assignedTo: 'Jane Smith',
    category: 'Task'
  },
  { 
    id: '3', 
    title: 'Team Status Update', 
    description: 'Weekly team meeting',
    date: new Date('2023-05-17T15:00:00'), 
    endDate: new Date('2023-05-17T16:00:00'),
    status: 'scheduled',
    priority: 'medium',
    assignedTo: 'Team',
    category: 'Meeting'
  },
  { 
    id: '4', 
    title: 'Client Call - Wayne Enterprises', 
    description: 'Follow up on previous project',
    date: new Date('2023-05-18T11:00:00'), 
    endDate: new Date('2023-05-18T11:30:00'),
    status: 'scheduled',
    priority: 'high',
    assignedTo: 'John Doe',
    category: 'Call'
  },
  { 
    id: '5', 
    title: 'Submit Invoice #1234', 
    description: 'Invoice for Pied Piper services',
    date: new Date(new Date().setHours(14, 0, 0, 0)), 
    endDate: new Date(new Date().setHours(14, 30, 0, 0)),
    status: 'completed',
    priority: 'medium',
    assignedTo: 'Jane Smith',
    category: 'Task'
  },
  { 
    id: '6', 
    title: 'Review Marketing Materials', 
    description: 'Check new brochures and website content',
    date: addDays(new Date(), 1), 
    endDate: addDays(new Date().setHours(11, 30, 0, 0), 1),
    status: 'scheduled',
    priority: 'low',
    assignedTo: 'Marketing Team',
    category: 'Task'
  },
];

const Schedule = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };
  
  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: 'completed' } : task
    ));
    toast({
      title: "Task completed",
      description: "The task has been marked as completed.",
    });
  };

  // Filter tasks based on active tab and selected date
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // First filter by tab
      if (activeTab === 'upcoming') {
        return task.status === 'scheduled';
      } else if (activeTab === 'completed') {
        return task.status === 'completed';
      } else if (activeTab === 'all') {
        return true;
      }
      
      // Then filter by date if in calendar view
      if (activeTab === 'calendar') {
        return date ? isSameDay(task.date, date) : false;
      }
      
      return true;
    });
  };

  const filteredTasks = getFilteredTasks();

  // Get tasks for today
  const todayTasks = tasks.filter(task => 
    isSameDay(task.date, new Date()) && task.status === 'scheduled'
  );
  
  // Get tasks for tomorrow
  const tomorrowTasks = tasks.filter(task => 
    isSameDay(task.date, addDays(new Date(), 1)) && task.status === 'scheduled'
  );

  return (
    <PageLayout title="Schedule">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-start border-l-4 border-mobserv-blue pl-4 py-2"
                  >
                    <div className="flex-1">
                      <h4 className="text-base font-medium">{task.title}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" /> 
                        {format(task.date, 'h:mm a')} - {format(task.endDate, 'h:mm a')}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{task.category}</Badge>
                        <Badge 
                          className={`${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                              : task.priority === 'medium' 
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleCompleteTask(task.id)}
                        className="text-green-600"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/schedule/edit/${task.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(task.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CircleDashed className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No tasks for today</h3>
                <p className="mb-4">Looks like you have a clear schedule today.</p>
                <Button asChild>
                  <Link to="/schedule/new">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Add New Task
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle>Task Management</CardTitle>
          <Button asChild>
            <Link to="/schedule/new">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add New Task
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                    <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>
                          {format(task.date, 'MMM dd, yyyy')}
                          <div className="text-xs text-gray-500">
                            {format(task.date, 'h:mm a')} - {format(task.endDate, 'h:mm a')}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{task.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            className={`${
                              task.priority === 'high' 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : task.priority === 'medium' 
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{task.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleCompleteTask(task.id)}
                              className="text-green-600"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/schedule/edit/${task.id}`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(task.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No tasks found. Try a different filter or add a new task.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              {/* Completed tasks tab - reusing the same table structure */}
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0">
              <div className="mb-4 text-lg font-medium">
                Tasks for {format(date, 'MMMM d, yyyy')}
              </div>
              {/* Calendar tab content - reusing the same list structure */}
              {filteredTasks.length > 0 ? (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div 
                      key={task.id}
                      className="flex items-start border-l-4 border-mobserv-blue pl-4 py-2"
                    >
                      <div className="flex-1">
                        <h4 className="text-base font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" /> 
                          {format(task.date, 'h:mm a')} - {format(task.endDate, 'h:mm a')}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline">{task.category}</Badge>
                          <Badge 
                            className={`${
                              task.priority === 'high' 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : task.priority === 'medium' 
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCompleteTask(task.id)}
                          className="text-green-600"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/schedule/edit/${task.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(task.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <CircleDashed className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No tasks for this date</h3>
                  <p className="mb-4">Select another date or add a new task.</p>
                  <Button asChild>
                    <Link to="/schedule/new">
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Add New Task
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              {/* All tasks tab - reusing the same table structure */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Schedule;
