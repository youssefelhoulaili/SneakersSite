# YH E-commerce Website - Deployment Guide

This document provides instructions for deploying the YH e-commerce website to Hostinger.

## Prerequisites

- A Hostinger account with PHP and MySQL support
- Access to Hostinger's MySQL database management
- Domain name configured in Hostinger

## Step 1: Set Up MySQL Database

1. Log in to your Hostinger control panel
2. Navigate to "Databases" > "MySQL Databases"
3. Create a new database named `yh_ecommerce`
4. Create a new database user with a strong password
5. Assign all privileges to the user for the `yh_ecommerce` database
6. Import the database schema from `database/schema.sql` using phpMyAdmin or MySQL command line

## Step 2: Configure Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```
# Database Configuration
DB_HOST=your_hostinger_mysql_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=yh_ecommerce

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# Make.com Webhook
MAKE_WEBHOOK_URL=your_make_webhook_url
```

## Step 3: Build the Next.js Application

1. Install dependencies:
   ```
   npm install
   ```

2. Build the application:
   ```
   npm run build
   ```

## Step 4: Deploy to Hostinger

### Option 1: Manual Deployment

1. Compress the `.next`, `public`, `package.json`, and `.env` files into a ZIP archive
2. Upload the ZIP archive to your Hostinger account using FTP or the File Manager
3. Extract the ZIP archive in your hosting root directory
4. Set up a Node.js environment in Hostinger (if available)
5. Install dependencies using `npm install --production`
6. Start the application using `npm start`

### Option 2: GitHub Actions Deployment

1. Create a GitHub repository for your project
2. Add your Hostinger FTP credentials as GitHub secrets:
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`

3. Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@4.3.0
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/**
          src/**
```

4. Push your code to GitHub to trigger the deployment

## Step 5: Configure Domain and SSL

1. In your Hostinger control panel, navigate to "Domains"
2. Select your domain and ensure it points to the directory where you deployed the application
3. Enable SSL for your domain through the Hostinger control panel

## Step 6: Test the Deployment

1. Visit your website at `https://your-domain.com`
2. Test all functionality:
   - Multilingual support
   - Product browsing
   - Cart and checkout
   - Mobile responsiveness

## Troubleshooting

- **404 errors**: Ensure your Next.js routing is properly configured
- **Database connection issues**: Verify your database credentials in the `.env` file
- **API errors**: Check server logs for detailed error messages

## Make.com Integration

1. Log in to your Make.com account
2. Create a new scenario with the following modules:
   - Webhook trigger (to receive order notifications)
   - WhatsApp Business API module (to send order confirmations)
   - Google Sheets module (to log orders)
   - Email module (for admin notifications)

3. Configure the webhook URL in your `.env` file
4. Test the integration by placing a test order

For any issues or questions, please contact support.
