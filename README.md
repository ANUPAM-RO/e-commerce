# E-Commerce Application

A modern e-commerce application built with Next.js, NestJS, and PostgreSQL. This application provides a complete shopping experience with user authentication, product management, shopping cart, and order processing.

## Features

### Frontend (Next.js)
- 🛍️ Product browsing and searching
- 🔍 Detailed product views
- 🛒 Shopping cart functionality
- 👤 User authentication (login/register)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time cart updates
- 📦 Order history and tracking
- 💳 Secure checkout process

### Backend (NestJS)
- 🔐 JWT Authentication
- 👥 User management
- 📦 Product management
- 🛒 Cart management
- 📝 Order processing
- 💳 Payment integration
- 📊 Database integration with TypeORM
- 🔒 Role-based access control

## Tech Stack

### Frontend
- Next.js 13+
- TypeScript
- Tailwind CSS
- Ant Design
- Axios
- Framer Motion
- React Icons

### Backend
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT Authentication
- Class Validator
- Passport.js

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-nextjs-app
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:

Create `.env` file in the backend directory:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=ecommerce_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d

# Server
PORT=3001
```

Create `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

5. Set up the database:
```bash
cd backend
npm run migration:run
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run start:dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Customers
- `GET /api/customers` - Get all customers (admin only)
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete customer (admin only)
- `GET /api/customers/user/:userId` - Get customer by user ID

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

## Project Structure

```
ecommerce-nextjs-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── config/
│   │   └── migrations/
│   └── package.json
│
└── README.md
```

## Features in Detail

### User Authentication
- Secure registration and login
- JWT-based authentication
- Password hashing
- Protected routes

### Product Management
- Product listing with filters
- Detailed product views
- Image handling
- Stock management

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time price calculation
- Persistent cart data

### Order Processing
- Secure checkout
- Order history
- Order status tracking
- Email notifications

### Admin Features
- Product management
- Order management
- User management
- Dashboard analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@example.com or create an issue in the repository. 