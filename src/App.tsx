
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Clients from "./pages/Clients";
import Finances from "./pages/Finances";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Database from "./pages/Database";
import ClientForm from "./pages/ClientForm";
import FinanceForm from "./pages/FinanceForm";
import TaskForm from "./pages/TaskForm";
import DatabaseItemForm from "./pages/DatabaseItemForm";
import AdminLogin from "./pages/AdminLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/edit/:id" element={<ClientForm />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/finances/new" element={<FinanceForm />} />
            <Route path="/finances/edit/:id" element={<FinanceForm />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedule/new" element={<TaskForm />} />
            <Route path="/schedule/edit/:id" element={<TaskForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/database" element={<Database />} />
            <Route path="/database/new" element={<DatabaseItemForm />} />
            <Route path="/database/edit/:id" element={<DatabaseItemForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
