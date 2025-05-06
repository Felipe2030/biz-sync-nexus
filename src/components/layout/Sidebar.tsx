
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AppLogo from './AppLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BarChart2,
  Users,
  Wallet,
  Calendar,
  Settings,
  Database,
  ChevronLeft,
  ChevronRight,
  Home,
  Lock
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useLanguage();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { 
      name: t("dashboard"), 
      icon: Home, 
      path: '/dashboard',
      active: true
    },
    { 
      name: t("analytics"), 
      icon: BarChart2, 
      path: '/analytics'
    },
    { 
      name: t("clients"), 
      icon: Users, 
      path: '/clients' 
    },
    { 
      name: t("finances"), 
      icon: Wallet, 
      path: '/finances' 
    },
    { 
      name: t("schedule"), 
      icon: Calendar, 
      path: '/schedule' 
    },
    { 
      name: t("database"), 
      icon: Database, 
      path: '/database' 
    },
  ];

  return (
    <div
      className={cn(
        'bg-mobserv-blue flex flex-col h-screen transition-all duration-300 relative',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-white/10">
        <AppLogo collapsed={collapsed} />
        <button
          onClick={toggleSidebar}
          className="text-white/70 hover:text-white transition-colors p-1 rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  'flex items-center px-3 py-3 rounded-md transition-colors',
                  item.active
                    ? 'bg-mobserv-blue-bright text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          to="/settings"
          className="flex items-center px-3 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-colors"
        >
          <Settings size={20} className="shrink-0" />
          {!collapsed && <span className="ml-3">{t("settings")}</span>}
        </Link>
        
        <Link
          to="/admin/login"
          className="flex items-center px-3 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-md transition-colors"
        >
          <Lock size={20} className="shrink-0" />
          {!collapsed && <span className="ml-3">{t("logout")}</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
