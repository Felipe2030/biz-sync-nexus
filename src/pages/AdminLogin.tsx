
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import AppLogo from '@/components/layout/AppLogo';
import { useLanguage } from '@/contexts/LanguageContext';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For prototype purposes, accept any valid email/password
    setLoading(false);
    
    // Mock authentication for demo purposes
    if (data.email === "admin@mobserv.com" && data.password === "admin123") {
      toast({
        title: "Success",
        description: "Login successful",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      toast({
        title: "Error",
        description: t("invalid_credentials"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-mobserv-blue">
      <Card className="w-full max-w-md bg-mobserv-blue-light border-mobserv-blue">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-48 mb-6">
            <AppLogo collapsed={false} />
          </div>
          <CardTitle className="text-2xl text-white">{t("admin_area")}</CardTitle>
          <CardDescription className="text-gray-300">
            {t("login")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">{t("email")}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@mobserv.com" 
                        {...field}
                        disabled={loading}
                        className="bg-white/10 text-white border-white/20 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">{t("password")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••" 
                        {...field}
                        disabled={loading}
                        className="bg-white/10 text-white border-white/20 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-white text-mobserv-blue hover:bg-gray-200" 
                disabled={loading}
              >
                {loading ? "Loading..." : t("sign_in")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="text-gray-300 hover:text-white">
            {t("forgot_password")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
