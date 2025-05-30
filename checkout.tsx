import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartItems = [
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
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 50;
  const codFee = 30;
  const total = subtotal + shipping + codFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = t('validation.required');
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    
    // Phone validation (Moroccan format)
    if (formData.phone && !/^(0|\+212)[5-7][0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = t('validation.invalidPhone');
    }
    
    // Postal code validation (Moroccan format)
    if (formData.postalCode && !/^[1-9][0-9]{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = t('validation.invalidPostalCode');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process order
      console.log('Order submitted:', { formData, cartItems, total });
      
      // Redirect to confirmation page
      window.location.href = '/confirmation';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{t('checkout.shippingAddress')}</h2>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        {t('checkout.firstName')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.firstName ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        {t('checkout.lastName')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.lastName ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.lastName && (
                          <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        {t('checkout.email')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.email ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        {t('checkout.phone')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.phone ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        {t('checkout.address')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.address ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        {t('checkout.city')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.city ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        {t('checkout.postalCode')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm ${
                            errors.postalCode ? 'border-red-300' : ''
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">{t('checkout.paymentMethod')}</h2>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <input
                        id="cod"
                        name="paymentMethod"
                        type="radio"
                        checked
                        readOnly
                        className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                      />
                      <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                        {t('checkout.cashOnDelivery')}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-black py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                >
                  {t('checkout.placeOrder')}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">{t('cart.summary')}</h2>
            
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span className="text-xs text-gray-500">{item.name}</span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">{t('cart.subtotal')}</p>
                <p className="text-sm font-medium text-gray-900">{formatPrice(subtotal)}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{t('cart.shipping')}</p>
                <p className="text-sm font-medium text-gray-900">{formatPrice(shipping)}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{t('cart.codFee')}</p>
                <p className="text-sm font-medium text-gray-900">{formatPrice(codFee)}</p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">{t('cart.total')}</p>
                <p className="text-base font-medium text-gray-900">{formatPrice(total)}</p>
              </div>
            </div>
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
