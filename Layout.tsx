import { useTranslation } from 'next-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { dir } = useLanguage();
  
  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
