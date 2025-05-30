/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
