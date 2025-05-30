import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Confirmation() {
  const { t } = useTranslation('common');
  
  // Mock order data
  const order = {
    id: 'YH-12345',
    date: new Date().toLocaleDateString(),
    total: 2878,
    items: [
      {
        id: 1,
        name: 'YH Air Max',
        price: 1299,
        size: '42',
        quantity: 1
      },
      {
        id: 3,
        name: 'YH Basketball Elite',
        price: 1499,
        size: '44',
        quantity: 1
      }
    ]
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('checkout.orderConfirmation')}</h1>
            <p className="text-xl text-gray-600">{t('checkout.thankYou')}</p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm text-gray-600">{t('checkout.orderNumber')}</p>
              <p className="text-sm font-medium text-gray-900">{order.id}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">{t('checkout.orderDate')}</p>
              <p className="text-sm font-medium text-gray-900">{order.date}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('cart.summary')}</h2>
            
            {order.items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <p className="text-base font-medium text-gray-900">{t('cart.total')}</p>
                <p className="text-base font-medium text-gray-900">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('checkout.whatNext')}</h2>
            <p className="text-sm text-gray-600 mb-4">{t('checkout.orderProcessing')}</p>
            <p className="text-sm text-gray-600">{t('checkout.contactInfo')}</p>
          </div>
          
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-black text-white px-8 py-3 font-medium rounded-md hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
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
