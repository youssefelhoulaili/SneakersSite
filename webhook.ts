// src/pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type WebhookResponse = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { orderId, customerInfo, orderItems, totalAmount } = req.body;

    // Log the webhook event
    console.log('Webhook received:', {
      orderId,
      customerInfo,
      totalAmount,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, this would:
    // 1. Validate the webhook payload
    // 2. Update the order status in the database
    // 3. Trigger the Make.com scenario via their API

    // Mock successful processing
    return res.status(200).json({
      success: true,
      message: `Order ${orderId} webhook processed successfully`,
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing webhook',
    });
  }
}
