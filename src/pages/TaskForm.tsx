
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format, addHours } from 'date-fns';
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
import { Calendar } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

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
    category: 'Meeting',
    location: 'Conference Room A',
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
    category: 'Task',
    location: 'Office',
  },
];

const taskSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  description: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['scheduled', 'completed']),
  category: z.string().min(1, { message: "Category is required." }),
  assignedTo: z.string().min(1, { message: "Assignee is required." }),
  location: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  // Initialize the form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      priority: "medium",
      status: "scheduled",
      category: "",
      assignedTo: "",
      location: "",
    },
  });

  // If editing, fetch and set task data
  useEffect(() => {
    if (isEditing) {
      const task = INITIAL_TASKS.find(task => task.id === id);
      if (task) {
        form.reset({
          title: task.title,
          description: task.description || "",
          date: task.date,
          startTime: format(task.date, "HH:mm"),
          endTime: format(task.endDate, "HH:mm"),
          priority: task.priority as "low" | "medium" | "high",
          status: task.status as "scheduled" | "completed",
          category: task.category,
          assignedTo: task.assignedTo,
          location: task.location || "",
        });
      }
    }
  }, [id, isEditing, form]);

  // Form submission handler
  const onSubmit = (data: TaskFormValues) => {
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", data);
    
    toast({
      title: isEditing ? "Task updated" : "Task created",
      description: `${data.title} has been ${isEditing ? "updated" : "added"} to your schedule.`,
    });
    
    navigate("/schedule");
  };

  // Task categories
  const categories = ["Meeting", "Call", "Task", "Deadline", "Event"];
  
  // Team members for assignment
  const teamMembers = ["John Doe", "Jane Smith", "Marketing Team", "Sales Team", "Development Team", "Team"];

  return (
    <PageLayout title={isEditing ? "Edit Task" : "Add New Task"}>
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/schedule">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schedule
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Task" : "New Task"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          {categories.map((category) => (
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
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned To</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member} value={member}>
                              {member}
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add task description"
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/schedule')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {isEditing ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default TaskForm;
