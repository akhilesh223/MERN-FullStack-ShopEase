const fs = require('fs');
const path = require('path');

const directories = [
  'backend/config',
  'backend/controllers',
  'backend/middleware',
  'backend/models',
  'backend/routes',
  'backend/utils',
  'frontend/public',
  'frontend/src/components',
  'frontend/src/pages/admin',
  'frontend/src/redux/slices',
  'frontend/src/services'
];

const files = [
  'backend/config/db.js',
  'backend/config/cloudinary.js',
  'backend/controllers/authController.js',
  'backend/controllers/productController.js',
  'backend/controllers/orderController.js',
  'backend/controllers/cartController.js',
  'backend/controllers/adminController.js',
  'backend/middleware/auth.js',
  'backend/middleware/admin.js',
  'backend/middleware/errorHandler.js',
  'backend/models/User.js',
  'backend/models/Product.js',
  'backend/models/Order.js',
  'backend/models/Cart.js',
  'backend/routes/auth.js',
  'backend/routes/products.js',
  'backend/routes/orders.js',
  'backend/routes/cart.js',
  'backend/routes/admin.js',
  'backend/utils/sendEmail.js',
  'frontend/src/components/Navbar.jsx',
  'frontend/src/components/ProductCard.jsx',
  'frontend/src/components/CartItem.jsx',
  'frontend/src/components/Loader.jsx',
  'frontend/src/pages/Home.jsx',
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Register.jsx',
  'frontend/src/pages/Products.jsx',
  'frontend/src/pages/ProductDetail.jsx',
  'frontend/src/pages/Cart.jsx',
  'frontend/src/pages/Checkout.jsx',
  'frontend/src/pages/Orders.jsx',
  'frontend/src/pages/admin/Dashboard.jsx',
  'frontend/src/pages/admin/ManageProducts.jsx',
  'frontend/src/pages/admin/ManageOrders.jsx',
  'frontend/src/redux/store.js',
  'frontend/src/redux/slices/authSlice.js',
  'frontend/src/redux/slices/cartSlice.js',
  'frontend/src/redux/slices/productSlice.js',
  'frontend/src/services/api.js'
];

// Create directories
directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create files
files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    let content = '';
    if (file.endsWith('.jsx')) {
      const componentName = path.basename(file, '.jsx');
      content = `import React from 'react';\n\nconst ${componentName} = () => {\n  return (\n    <div>\n      <h1>${componentName}</h1>\n    </div>\n  );\n};\n\nexport default ${componentName};\n`;
    } else if (file.endsWith('.js') && file.includes('frontend/src/redux/slices')) {
      content = `import { createSlice } from '@reduxjs/toolkit';\n\nconst initialState = {};\n\nconst slice = createSlice({\n  name: '${path.basename(file, 'Slice.js').toLowerCase()}',\n  initialState,\n  reducers: {}\n});\n\nexport const {} = slice.actions;\nexport default slice.reducer;\n`;
    }
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${file}`);
  }
});

console.log('Project structure successfully scaffolded!');
