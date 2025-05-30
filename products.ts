// src/pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ProductResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse>
) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return await getProductById(req, res);
      }
      return await getProducts(req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

// Get all products with optional filtering
async function getProducts(req: NextApiRequest, res: NextApiResponse<ProductResponse>) {
  try {
    const { category, sport, gender, sort } = req.query;
    const locale = req.query.locale || 'en';
    
    // In a real implementation, this would query the database with filters
    
    // Mock product data
    const products = [
      {
        id: 1,
        slug: 'yh-air-max',
        name: 'YH Air Max',
        price: 1299,
        category: 'running',
        sport: 'running',
        gender: 'men',
        images: ['/images/products/shoes-1.jpg'],
        stock: 50
      },
      {
        id: 2,
        slug: 'yh-pro-training',
        name: 'YH Pro Training',
        price: 899,
        category: 'training',
        sport: 'training',
        gender: 'women',
        images: ['/images/products/shoes-2.jpg'],
        stock: 75
      },
      {
        id: 3,
        slug: 'yh-basketball-elite',
        name: 'YH Basketball Elite',
        price: 1499,
        category: 'basketball',
        sport: 'basketball',
        gender: 'men',
        images: ['/images/products/shoes-3.jpg'],
        stock: 30
      },
      {
        id: 4,
        slug: 'yh-lifestyle',
        name: 'YH Lifestyle',
        price: 999,
        category: 'lifestyle',
        sport: 'lifestyle',
        gender: 'unisex',
        images: ['/images/products/shoes-4.jpg'],
        stock: 100
      },
      {
        id: 5,
        slug: 'yh-football-cleats',
        name: 'YH Football Cleats',
        price: 1199,
        category: 'football',
        sport: 'football',
        gender: 'men',
        images: ['/images/products/shoes-5.jpg'],
        stock: 45
      }
    ];
    
    // Apply filters
    let filteredProducts = [...products];
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (sport) {
      filteredProducts = filteredProducts.filter(p => p.sport === sport);
    }
    
    if (gender) {
      filteredProducts = filteredProducts.filter(p => p.gender === gender);
    }
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'priceLowToHigh':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
        default:
          filteredProducts.sort((a, b) => b.id - a.id);
          break;
      }
    }
    
    return res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: filteredProducts
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving products'
    });
  }
}

// Get a single product by ID
async function getProductById(req: NextApiRequest, res: NextApiResponse<ProductResponse>) {
  try {
    const { id } = req.query;
    const locale = req.query.locale || 'en';
    
    // In a real implementation, this would query the database for the specific product
    
    // Mock product data
    const product = {
      id: parseInt(id as string),
      slug: `yh-product-${id}`,
      name: `YH Product ${id}`,
      price: 1299,
      category: 'running',
      sport: 'running',
      gender: 'unisex',
      images: ['/images/products/shoes-1.jpg', '/images/products/shoes-2.jpg'],
      stock: 50,
      description: 'Premium athletic shoes with advanced cushioning technology for maximum comfort and performance.',
      details: [
        'Breathable mesh upper',
        'Responsive cushioning',
        'Durable rubber outsole',
        'Reflective details for visibility',
        'Padded collar for comfort'
      ],
      sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
    };
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving product'
    });
  }
}
