-- Create database
CREATE DATABASE IF NOT EXISTS yh_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE yh_ecommerce;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  preferred_locale ENUM('en', 'fr', 'ar') DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_preferred_locale (preferred_locale)
);

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  price_mad DECIMAL(10, 2) NOT NULL,
  stock_qty INT NOT NULL DEFAULT 0,
  images JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_price (price_mad)
);

-- Product translations table
CREATE TABLE product_translations (
  product_id INT NOT NULL,
  locale ENUM('en', 'fr', 'ar') NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (product_id, locale),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_locale (locale)
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  total_mad DECIMAL(10, 2) NOT NULL,
  cod_fee_mad DECIMAL(10, 2) NOT NULL,
  shipping_address JSON NOT NULL,
  locale ENUM('en', 'fr', 'ar') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price_mad DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
);

-- Automations log table
CREATE TABLE automations_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event VARCHAR(255) NOT NULL,
  payload JSON,
  status ENUM('pending', 'processed', 'failed') DEFAULT 'pending',
  processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event (event),
  INDEX idx_status (status),
  INDEX idx_processed_at (processed_at)
);

-- Trigger to prevent overselling
DELIMITER //
CREATE TRIGGER before_order_item_insert
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
  DECLARE available_stock INT;
  
  SELECT stock_qty INTO available_stock
  FROM products
  WHERE id = NEW.product_id;
  
  IF available_stock < NEW.quantity THEN
    SIGNAL SQLSTATE '45000' 
    SET MESSAGE_TEXT = 'Insufficient stock available';
  END IF;
END //

CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
  UPDATE products
  SET stock_qty = stock_qty - NEW.quantity
  WHERE id = NEW.product_id;
END //
DELIMITER ;

-- Sample data insertion
INSERT INTO products (slug, price_mad, stock_qty, images) VALUES
('yh-air-max', 1299.00, 50, '["air-max-1.jpg", "air-max-2.jpg", "air-max-3.jpg"]'),
('yh-pro-training', 899.00, 75, '["pro-training-1.jpg", "pro-training-2.jpg"]'),
('yh-basketball-elite', 1499.00, 30, '["basketball-elite-1.jpg", "basketball-elite-2.jpg", "basketball-elite-3.jpg"]'),
('yh-lifestyle', 999.00, 100, '["lifestyle-1.jpg", "lifestyle-2.jpg"]'),
('yh-football-cleats', 1199.00, 45, '["football-cleats-1.jpg", "football-cleats-2.jpg"]');

-- English product translations
INSERT INTO product_translations (product_id, locale, name, description) VALUES
(1, 'en', 'YH Air Max', 'Premium running shoes with advanced cushioning technology for maximum comfort and performance.'),
(2, 'en', 'YH Pro Training', 'Versatile training shoes designed for gym workouts and everyday athletic activities.'),
(3, 'en', 'YH Basketball Elite', 'Professional-grade basketball shoes with superior ankle support and court grip.'),
(4, 'en', 'YH Lifestyle', 'Stylish casual shoes perfect for everyday wear with athletic-inspired design.'),
(5, 'en', 'YH Football Cleats', 'High-performance football cleats designed for speed and agility on the field.');

-- French product translations
INSERT INTO product_translations (product_id, locale, name, description) VALUES
(1, 'fr', 'YH Air Max', 'Chaussures de course premium avec technologie d\'amorti avancée pour un confort et des performances maximales.'),
(2, 'fr', 'YH Pro Training', 'Chaussures d\'entraînement polyvalentes conçues pour les séances de gym et les activités sportives quotidiennes.'),
(3, 'fr', 'YH Basketball Elite', 'Chaussures de basketball de qualité professionnelle avec un soutien supérieur de la cheville et une adhérence au sol.'),
(4, 'fr', 'YH Lifestyle', 'Chaussures décontractées élégantes parfaites pour un usage quotidien avec un design d\'inspiration athlétique.'),
(5, 'fr', 'YH Football Cleats', 'Crampons de football haute performance conçus pour la vitesse et l\'agilité sur le terrain.');

-- Arabic product translations
INSERT INTO product_translations (product_id, locale, name, description) VALUES
(1, 'ar', 'واي اتش اير ماكس', 'أحذية جري فاخرة مع تقنية تخميد متطورة لأقصى قدر من الراحة والأداء.'),
(2, 'ar', 'واي اتش برو ترينينج', 'أحذية تدريب متعددة الاستخدامات مصممة لتمارين الصالة الرياضية والأنشطة الرياضية اليومية.'),
(3, 'ar', 'واي اتش باسكتبول إيليت', 'أحذية كرة سلة احترافية مع دعم فائق للكاحل وقبضة ممتازة على الأرض.'),
(4, 'ar', 'واي اتش لايف ستايل', 'أحذية عصرية غير رسمية مثالية للارتداء اليومي بتصميم مستوحى من الرياضة.'),
(5, 'ar', 'واي اتش فوتبول كليتس', 'أحذية كرة قدم عالية الأداء مصممة للسرعة والرشاقة على الملعب.');
