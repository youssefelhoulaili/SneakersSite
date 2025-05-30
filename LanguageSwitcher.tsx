import { useTranslation } from 'next-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { t } = useTranslation('common');
  const { locale, setLocale } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <span>{t('header.language')}:</span>
        <div className="relative group">
          <button className="flex items-center gap-1 hover:underline">
            {languages.find(lang => lang.code === locale)?.name}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    locale === lang.code ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
