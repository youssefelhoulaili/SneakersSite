// src/pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type OrderResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse>
) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'POST':
      return await createOrder(req, res);
    case 'GET':
      return await getOrders(req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// Create a new order
async function createOrder(req: NextApiRequest, res: NextApiResponse<OrderResponse>) {
  try {
    const { customerInfo, items, shippingAddress, locale } = req.body;
    
    // Validate required fields
    if (!customerInfo || !items || !shippingAddress || !locale) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Calculate order totals
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = 50; // Fixed shipping cost
    const codFee = 30; // Fixed COD fee
    const total = subtotal + shipping + codFee;
    
    // Create order object (in a real app, this would be saved to the database)
    const order = {
      id: `YH-${Math.floor(10000 + Math.random() * 90000)}`,
      customerInfo,
      items,
      shippingAddress,
      locale,
      subtotal,
      shipping,
      codFee,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // In a real implementation, this would:
    // 1. Save the order to the database
    // 2. Check inventory and update stock levels
    // 3. Trigger the Make.com webhook for order notifications
    
    // Simulate webhook call to Make.com
    console.log('Triggering Make.com webhook for order:', order.id);
    
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        orderId: order.id,
        total: order.total,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating order'
    });
  }
}

// Get orders (with optional filtering)
async function getOrders(req: NextApiRequest, res: NextApiResponse<OrderResponse>) {
  try {
    const { userId, status } = req.query;
    
    // In a real implementation, this would query the database with filters
    
    // Mock response with sample orders
    const orders = [
      {
        id: 'YH-12345',
        status: 'pending',
        total: 2878,
        createdAt: '2025-05-27T14:30:00Z',
        items: [
          { id: 1, name: 'YH Air Max', price: 1299, quantity: 1, size: '42' },
          { id: 3, name: 'YH Basketball Elite', price: 1499, quantity: 1, size: '44' }
        ]
      },
      {
        id: 'YH-12346',
        status: 'confirmed',
        total: 1349,
        createdAt: '2025-05-26T10:15:00Z',
        items: [
          { id: 2, name: 'YH Pro Training', price: 899, quantity: 1, size: '40' },
          { id: 4, name: 'YH Lifestyle', price: 999, quantity: 1, size: '41' }
        ]
      }
    ];
    
    // Filter by status if provided
    const filteredOrders = status 
      ? orders.filter(order => order.status === status)
      : orders;
    
    return res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: filteredOrders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving orders'
    });
  }
}
