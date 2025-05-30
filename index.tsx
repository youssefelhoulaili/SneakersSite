import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { t } = useTranslation('common');

  const featuredProducts = [
    {
      id: 1,
      name: 'YH Air Max',
      price: 1299,
      image: '/images/products/shoes-1.jpg',
      category: 'running'
    },
    {
      id: 2,
      name: 'YH Pro Training',
      price: 899,
      image: '/images/products/shoes-2.jpg',
      category: 'training'
    },
    {
      id: 3,
      name: 'YH Basketball Elite',
      price: 1499,
      image: '/images/products/shoes-3.jpg',
      category: 'basketball'
    },
    {
      id: 4,
      name: 'YH Lifestyle',
      price: 999,
      image: '/images/products/shoes-4.jpg',
      category: 'lifestyle'
    }
  ];

  const categories = [
    { name: t('categories.running'), image: '/images/categories/running.jpg', slug: 'running' },
    { name: t('categories.training'), image: '/images/categories/training.jpg', slug: 'training' },
    { name: t('categories.basketball'), image: '/images/categories/basketball.jpg', slug: 'basketball' },
    { name: t('categories.football'), image: '/images/categories/football.jpg', slug: 'football' },
    { name: t('categories.lifestyle'), image: '/images/categories/lifestyle.jpg', slug: 'lifestyle' },
    { name: t('categories.accessories'), image: '/images/categories/accessories.jpg', slug: 'accessories' }
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="relative h-[70vh] bg-gray-900">
          {/* Placeholder for hero image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}></div>
          <div className="relative z-20 flex items-center justify-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white max-w-lg">
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl mb-8">
                {t('home.hero.subtitle')}
              </p>
              <Link
                href="/shop"
                className="inline-block bg-white text-black px-8 py-3 font-medium rounded-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                {t('home.hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {t('home.featured')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    {/* Placeholder for product image */}
                    <span className="text-gray-500">{product.name}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-700">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {t('home.categories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/shop?category=${category.slug}`}
                className="group"
              >
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-2 transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    {/* Placeholder for category image */}
                    <span className="text-gray-500">{category.name}</span>
                  </div>
                </div>
                <h3 className="text-center text-sm font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
