import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, getTranslations } from '@/lib/translations';
import { toast } from 'sonner';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  const [t, setT] = useState<Translations>(getTranslations(language));

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
    setT(getTranslations(lang));
    
    // Show toast notification
    const langNames: Record<Language, string> = {
      'en': 'English',
      'hi': 'हिंदी',
      'te': 'తెలుగు',
      'gu': 'ગુજરાતી',
      'ta': 'தமிழ்',
    };
    const langName = langNames[lang];
    toast.success(`${getTranslations(lang).languageChanged} ${langName}! 🌍`);
  };

  useEffect(() => {
    // Update translations when language changes
    setT(getTranslations(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
