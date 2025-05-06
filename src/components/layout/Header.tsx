
import React from 'react';
import { Bell, Search, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Dashboard' }: HeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: 'en' | 'pt') => {
    setLanguage(newLanguage);
    toast({
      description: t("language_changed"),
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{t(title.toLowerCase())}</h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("search")}
              className="w-64 rounded-md bg-background pl-8"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className={language === 'en' ? "bg-accent" : ""}
              >
                {t("english")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('pt')}
                className={language === 'pt' ? "bg-accent" : ""}
              >
                {t("portuguese")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
