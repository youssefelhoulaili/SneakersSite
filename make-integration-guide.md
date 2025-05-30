# YH E-commerce Website - Make.com Integration Guide

This document provides instructions for integrating the YH e-commerce website with Make.com for order processing automation.

## Overview

The integration uses webhooks to connect your YH e-commerce website with Make.com, enabling automated:
- WhatsApp notifications to customers
- Order logging in Google Sheets
- Email notifications to administrators

## Prerequisites

- An active Make.com account
- WhatsApp Business API access
- Google account with access to Google Sheets
- Email account for sending notifications

## Step 1: Create a Make.com Scenario

1. Log in to your Make.com account
2. Click "Create a new scenario"
3. Start with a webhook trigger module

## Step 2: Configure the Webhook Trigger

1. Add a "Webhooks" module as the first step
2. Select "Custom webhook" as the webhook type
3. Click "Add" to create a new webhook
4. Copy the generated webhook URL
5. Add this URL to your YH e-commerce website's environment variables as `MAKE_WEBHOOK_URL`

## Step 3: Set Up WhatsApp Notification

1. Add a "WhatsApp Business" module after the webhook
2. Connect your WhatsApp Business account
3. Configure the message template with the following mapping:
   - **To**: `{{1.data.customerInfo.phone}}`
   - **Template Name**: Select your order confirmation template
   - **Language**: `{{1.data.locale}}`
   - **Parameters**:
     - Order ID: `{{1.data.orderId}}`
     - Customer Name: `{{1.data.customerInfo.firstName}}`
     - Order Total: `{{1.data.total}} MAD`
     - Estimated Delivery: "3-5 business days"

## Step 4: Set Up Google Sheets Integration

1. Add a "Google Sheets" module after the WhatsApp module
2. Connect your Google account
3. Select "Add a Row" as the action
4. Select or create a spreadsheet for order tracking
5. Configure the columns mapping:
   - Order ID: `{{1.data.orderId}}`
   - Customer Name: `{{1.data.customerInfo.firstName}} {{1.data.customerInfo.lastName}}`
   - Email: `{{1.data.customerInfo.email}}`
   - Phone: `{{1.data.customerInfo.phone}}`
   - Total: `{{1.data.total}}`
   - Status: `{{1.data.status}}`
   - Locale: `{{1.data.locale}}`
   - Date: `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}`

## Step 5: Set Up Admin Email Notification

1. Add an "Email" module as the final step
2. Connect your email account
3. Configure the email with the following mapping:
   - **To**: Your admin email address
   - **Subject**: `New Order: {{1.data.orderId}}`
   - **Content**:
     ```
     A new order has been placed:
     
     Order ID: {{1.data.orderId}}
     Customer: {{1.data.customerInfo.firstName}} {{1.data.customerInfo.lastName}}
     Email: {{1.data.customerInfo.email}}
     Phone: {{1.data.customerInfo.phone}}
     Total: {{1.data.total}} MAD
     Locale: {{1.data.locale}}
     
     View full details in the admin dashboard.
     ```

## Step 6: Test the Integration

1. Enable your Make.com scenario
2. Place a test order on your YH e-commerce website
3. Verify that:
   - The webhook is triggered
   - WhatsApp notification is sent
   - Order is logged in Google Sheets
   - Admin email notification is received

## Step 7: Error Handling

1. Add error handling paths in your Make.com scenario
2. Configure error notifications to alert administrators of failures
3. Set up automatic retries for failed webhook processing

## Troubleshooting

- **Webhook not triggering**: Verify the webhook URL is correctly set in your environment variables
- **WhatsApp messages not sending**: Check your WhatsApp Business API credentials and template approval status
- **Google Sheets errors**: Verify permissions and column mappings
- **Email not sending**: Check email service configuration and spam filters

For any issues or questions, please contact support.
