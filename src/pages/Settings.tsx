
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
    });
  };

  return (
    <PageLayout title="Settings">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your company information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="MobServ Technologies" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="contact@mobserv.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(123) 456-7890" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://mobserv.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Business Ave, Suite 100&#10;San Francisco, CA 94107" />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select 
                        id="dateFormat" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <select 
                        id="currency" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New Client Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when new clients are added
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders for upcoming tasks and deadlines
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Financial Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about important financial changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Summary</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary of all activity
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Assignments</Label>
                        <p className="text-sm text-muted-foreground">
                          Show notifications when tasks are assigned to you
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Comments and Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when someone mentions you in comments
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about system updates
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Preferences</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions</h3>
                  
                  <div className="space-y-2">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on Windows • San Francisco, CA • Active now
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Current
                        </span>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Safari on MacOS</p>
                          <p className="text-sm text-muted-foreground">
                            New York, NY • Last active 2 days ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Sign out</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile App on iPhone</p>
                          <p className="text-sm text-muted-foreground">
                            San Francisco, CA • Last active 5 hours ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Sign out</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">Sign out from all devices</Button>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Security Settings</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your billing details and subscription.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Current Plan</h3>
                  
                  <div className="rounded-md border p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-bold">Business Pro</h4>
                        <p className="text-muted-foreground">$49.99/month</p>
                        <p className="text-sm mt-2">
                          All features included with 10 team members and unlimited clients
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="destructive">Cancel Plan</Button>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Your next billing date is <span className="font-medium">June 1, 2023</span></p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-700 font-bold text-sm">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/24
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  
                  <Button variant="outline">Add Payment Method</Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Description</th>
                          <th className="text-left py-3 px-4">Amount</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">May 1, 2023</td>
                          <td className="py-3 px-4">Business Pro Plan - Monthly</td>
                          <td className="py-3 px-4">$49.99</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Paid
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Apr 1, 2023</td>
                          <td className="py-3 px-4">Business Pro Plan - Monthly</td>
                          <td className="py-3 px-4">$49.99</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Paid
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Mar 1, 2023</td>
                          <td className="py-3 px-4">Business Pro Plan - Monthly</td>
                          <td className="py-3 px-4">$49.99</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Paid
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          {/* Team tab content will go here */}
        </TabsContent>
        
        <TabsContent value="advanced">
          {/* Advanced tab content will go here */}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
