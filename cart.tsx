import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function Cart() {
  const { t } = useTranslation('common');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'YH Air Max',
      price: 1299,
      image: '/images/products/shoes-1.jpg',
      size: '42',
      quantity: 1
    },
    {
      id: 3,
      name: 'YH Basketball Elite',
      price: 1499,
      image: '/images/products/shoes-3.jpg',
      size: '44',
      quantity: 1
    }
  ]);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 50;
  const codFee = 30;
  const total = subtotal + shipping + codFee;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('cart.title')}</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-8">{t('cart.empty')}</p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 font-medium rounded-md hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex py-6 border-b border-gray-200">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                      {/* Placeholder for product image */}
                      <span className="text-xs text-gray-500">{item.name}</span>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="rounded-l-md bg-gray-100 px-2 py-1 text-gray-900 hover:bg-gray-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-10 border-y border-gray-200 py-1 text-center text-gray-900"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="rounded-r-md bg-gray-100 px-2 py-1 text-gray-900 hover:bg-gray-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="text-sm font-medium text-black hover:text-gray-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  {t('cart.continueShopping')}
                </Link>
              </div>
            </div>

            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">{t('cart.summary')}</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{t('cart.subtotal')}</p>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(subtotal)}</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">{t('cart.shipping')}</p>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(shipping)}</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600">{t('cart.codFee')}</p>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(codFee)}</p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">{t('cart.total')}</p>
                  <p className="text-base font-medium text-gray-900">{formatPrice(total)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                >
                  {t('cart.checkout')}
                </Link>
              </div>
            </div>
          </div>
        )}
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
