
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Dashboard' }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 rounded-md bg-background pl-8"
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-mobserv-blue text-[10px] text-white">
              3
            </span>
          </Button>
          <div className="h-7 w-7 rounded-full bg-mobserv-blue flex items-center justify-center">
            <span className="text-white text-xs">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
