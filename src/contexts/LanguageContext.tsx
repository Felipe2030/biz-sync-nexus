
import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'pt';
  setLanguage: (language: 'en' | 'pt') => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Dashboard/Common
    "dashboard": "Dashboard",
    "analytics": "Analytics",
    "clients": "Clients",
    "finances": "Finances",
    "schedule": "Schedule",
    "database": "Database",
    "settings": "Settings",
    "search": "Search...",
    "notifications": "Notifications",

    // Settings
    "account_settings": "Account Settings",
    "profile_settings": "Profile Settings",
    "notification_settings": "Notification Settings",
    "language_settings": "Language Settings",
    "security": "Security",
    "privacy": "Privacy",
    "admin_login": "Admin Login",
    "logout": "Logout",
    "select_language": "Select Language",
    "english": "English",
    "portuguese": "Portuguese",
    "language_changed": "Language changed successfully",
    
    // Admin
    "admin_area": "Admin Area",
    "login": "Login",
    "email": "Email",
    "password": "Password",
    "sign_in": "Sign In",
    "forgot_password": "Forgot Password?",
    "invalid_credentials": "Invalid email or password"
  },
  pt: {
    // Dashboard/Common
    "dashboard": "Painel de Controle",
    "analytics": "Análises",
    "clients": "Clientes",
    "finances": "Finanças",
    "schedule": "Agenda",
    "database": "Base de Dados",
    "settings": "Configurações",
    "search": "Pesquisar...",
    "notifications": "Notificações",

    // Settings
    "account_settings": "Configurações da Conta",
    "profile_settings": "Configurações de Perfil",
    "notification_settings": "Configurações de Notificações",
    "language_settings": "Configurações de Idioma",
    "security": "Segurança",
    "privacy": "Privacidade",
    "admin_login": "Login de Administrador",
    "logout": "Sair",
    "select_language": "Selecionar Idioma",
    "english": "Inglês",
    "portuguese": "Português",
    "language_changed": "Idioma alterado com sucesso",
    
    // Admin
    "admin_area": "Área de Administrador",
    "login": "Login",
    "email": "Email",
    "password": "Senha",
    "sign_in": "Entrar",
    "forgot_password": "Esqueceu a Senha?",
    "invalid_credentials": "Email ou senha inválidos"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'pt',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'pt'>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
