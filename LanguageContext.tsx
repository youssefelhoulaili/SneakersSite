import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { locale: currentLocale, pathname, asPath, query } = router;
  
  const [locale, setLocaleState] = useState(currentLocale || 'en');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (currentLocale !== locale) {
      setLocaleState(currentLocale || 'en');
    }
  }, [currentLocale]);

  const setLocale = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
