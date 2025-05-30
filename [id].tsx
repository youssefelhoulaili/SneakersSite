import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetail({ product }: { product: any }) {
  const { t } = useTranslation('common');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} MAD`;
  };

  const sizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log('Added to cart:', { ...product, size: selectedSize, quantity });
  };

  const relatedProducts = [
    {
      id: 3,
      name: 'YH Basketball Elite',
      price: 1499,
      image: '/images/products/shoes-3.jpg',
    },
    {
      id: 4,
      name: 'YH Lifestyle',
      price: 999,
      image: '/images/products/shoes-4.jpg',
    },
    {
      id: 5,
      name: 'YH Football Cleats',
      price: 1199,
      image: '/images/products/shoes-5.jpg',
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-square w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
              <div className="h-full w-full flex items-center justify-center">
                {/* Placeholder for product image */}
                <span className="text-gray-500">{product.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">View {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">{t('product.price')}</h2>
              <p className="text-3xl tracking-tight text-gray-900">{formatPrice(product.price)}</p>
            </div>

            {/* Size selector */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{t('product.size')}</h3>
                <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </Link>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`flex items-center justify-center rounded-md py-3 px-3 text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">{t('product.quantity')}</h3>
              <div className="flex items-center mt-2">
                <button
                  type="button"
                  className="rounded-l-md bg-gray-100 px-3 py-2 text-gray-900 hover:bg-gray-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="text"
                  className="w-16 border-y border-gray-200 py-2 text-center text-gray-900"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="rounded-r-md bg-gray-100 px-3 py-2 text-gray-900 hover:bg-gray-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="mt-8">
              <button
                type="button"
                className={`flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 ${
                  !selectedSize ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!selectedSize}
                onClick={handleAddToCart}
              >
                {t('product.addToCart')}
              </button>
            </div>

            {/* Product details tabs */}
            <div className="mt-10">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8">
                  <button
                    className={`border-b-2 py-2 px-1 text-sm font-medium ${
                      activeTab === 'description'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    {t('product.description')}
                  </button>
                  <button
                    className={`border-b-2 py-2 px-1 text-sm font-medium ${
                      activeTab === 'details'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    {t('product.details')}
                  </button>
                  <button
                    className={`border-b-2 py-2 px-1 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    {t('product.reviews')}
                  </button>
                </div>
              </div>

              <div className="mt-6 prose prose-sm max-w-none text-gray-500">
                {activeTab === 'description' && (
                  <p>
                    The YH Air Max delivers unparalleled comfort and style for the modern athlete. 
                    Featuring our innovative cushioning system and breathable materials, these shoes 
                    are designed to enhance your performance while keeping you looking your best.
                  </p>
                )}
                {activeTab === 'details' && (
                  <ul>
                    <li>Breathable mesh upper</li>
                    <li>Responsive cushioning</li>
                    <li>Durable rubber outsole</li>
                    <li>Reflective details for visibility</li>
                    <li>Padded collar for comfort</li>
                  </ul>
                )}
                {activeTab === 'reviews' && (
                  <div>
                    <p>No reviews yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-16 sm:mt-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('product.relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
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
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // In a real app, this would fetch from an API or database
  const products = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Create paths for each product in each locale
  const paths = products.flatMap((id) => 
    locales!.map((locale) => ({
      params: { id: id.toString() },
      locale
    }))
  );

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // In a real app, this would fetch from an API or database
  const productId = params?.id;
  
  // Mock product data
  const product = {
    id: productId,
    name: `YH Air Max ${productId}`,
    price: 1299,
    image: '/images/products/shoes-1.jpg',
    category: 'running',
    sport: 'running',
    gender: 'unisex'
  };

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};
