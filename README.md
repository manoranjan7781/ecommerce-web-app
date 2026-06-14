# E-Commerce Store

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application with JWT authentication, role-based access control, shopping cart, and admin dashboard.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [MongoDB Setup](#mongodb-setup)
- [Running the Application](#running-the-application)
- [Demo Accounts](#demo-accounts)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## Features

### User Features
- Register and login with JWT authentication
- Browse products with search, filter, and sort
- View product details
- Add/remove items from shopping cart
- Update cart quantities
- Place orders with shipping address
- View order history
- Update user profile

### Admin Features
- Full product CRUD (Create, Read, Update, Delete)
- View and manage all orders
- Update order status (Pending → Delivered)
- View and manage users

### General
- Responsive design for mobile, tablet, and desktop
- Protected routes and role-based authorization
- Loading states and error handling
- Sample dummy data via seed script

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, React Router DOM    |
| State      | React Context API (Auth + Cart)       |
| HTTP       | Axios                               |
| Styling    | Custom CSS (responsive)             |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB Atlas, Mongoose               |
| Auth       | JWT, bcryptjs                       |
| Validation | express-validator                   |

---

## Folder Structure

```
Ecommerce-App/
|
|-- client/                          # React Frontend (Vite)
|   |-- public/
|   |-- src/
|   |   |-- assets/styles/           # Global CSS
|   |   |-- components/              # Reusable UI components
|   |   |   |-- Navbar.jsx
|   |   |   |-- Footer.jsx
|   |   |   |-- ProductCard.jsx
|   |   |   |-- Loading.jsx
|   |   |-- context/                 # React Context providers
|   |   |   |-- AuthContext.jsx
|   |   |   |-- CartContext.jsx
|   |   |-- pages/                   # Route pages
|   |   |   |-- HomePage.jsx
|   |   |   |-- ProductsPage.jsx
|   |   |   |-- ProductDetailsPage.jsx
|   |   |   |-- CartPage.jsx
|   |   |   |-- CheckoutPage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   |-- RegisterPage.jsx
|   |   |   |-- UserDashboard.jsx
|   |   |   |-- AdminDashboard.jsx
|   |   |   |-- OrdersPage.jsx
|   |   |   |-- NotFoundPage.jsx
|   |   |-- routes/                  # Route guards
|   |   |   |-- ProtectedRoute.jsx
|   |   |   |-- AdminRoute.jsx
|   |   |-- services/                # API service layer
|   |   |   |-- api.js
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |-- .env.example
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|
|-- server/                          # Express Backend
|   |-- config/
|   |   |-- db.js                    # MongoDB connection
|   |-- controllers/
|   |   |-- authController.js
|   |   |-- productController.js
|   |   |-- orderController.js
|   |   |-- userController.js
|   |-- middleware/
|   |   |-- authMiddleware.js        # JWT + Role authorization
|   |   |-- errorMiddleware.js       # Global error handler
|   |   |-- validateMiddleware.js    # Input validation
|   |-- models/
|   |   |-- User.js
|   |   |-- Product.js
|   |   |-- Order.js
|   |-- routes/
|   |   |-- authRoutes.js
|   |   |-- productRoutes.js
|   |   |-- orderRoutes.js
|   |   |-- userRoutes.js
|   |-- utils/
|   |   |-- generateToken.js
|   |   |-- seedData.js              # Sample data seeder
|   |-- .env.example
|   |-- package.json
|   |-- server.js
|
|-- .gitignore
|-- README.md
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** — [Sign up free](https://www.mongodb.com/atlas)
- **Git** — [Download](https://git-scm.com/)

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ECOMMERCE-WEB-APP
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables

### Server (`server/.env`)

Copy the example file and fill in your values:

```bash
cd server
cp .env.example .env
```

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce-store?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)

```bash
cd client
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5000/api
```

---

## MongoDB Setup

### Step 1: Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new **Shared (Free)** cluster
3. Choose a cloud provider and region closest to you
4. Click **Create Cluster**

### Step 2: Configure Database Access

1. Go to **Database Access** → **Add New Database User**
2. Set a username and password (save these!)
3. Set privileges to **Read and write to any database**

### Step 3: Configure Network Access

1. Go to **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere** (`0.0.0.0/0`) for development
3. For production, restrict to your server's IP

### Step 4: Get Connection String

1. Go to **Database** → **Connect** → **Connect your application**
2. Copy the connection string
3. Replace `<password>` with your database user password
4. Paste it into `server/.env` as `MONGO_URI`

### Step 5: Seed the Database

```bash
cd server
npm run seed
```

This creates:
- 1 admin user
- 1 regular user
- 12 sample products

---

## Running the Application

Open **two terminal windows**:

### Terminal 1 — Start Backend

```bash
cd server
npm run dev
```

Server runs at: `http://localhost:5000`

### Terminal 2 — Start Frontend

```bash
cd client
npm run dev
```

Frontend runs at: `http://localhost:5173`

Open your browser and navigate to **http://localhost:5173**

---

## Demo Accounts

After running the seed script, use these credentials:

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@store.com   | admin123  |
| User  | user@store.com    | user123   |

---

## API Documentation

Base URL: `http://localhost:5000/api`

All protected routes require a JWT token in the header:
```
Authorization: Bearer <token>
```

### Auth APIs

| Method | Endpoint            | Access  | Description         |
|--------|---------------------|---------|---------------------|
| POST   | /api/auth/register  | Public  | Register new user   |
| POST   | /api/auth/login     | Public  | Login user          |
| GET    | /api/auth/me        | Private | Get current user    |

**Register/Login Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Product APIs

| Method | Endpoint              | Access       | Description          |
|--------|-----------------------|--------------|----------------------|
| GET    | /api/products         | Public       | Get all products     |
| GET    | /api/products/featured| Public       | Get featured products|
| GET    | /api/products/categories | Public    | Get categories       |
| GET    | /api/products/:id     | Public       | Get product by ID    |
| POST   | /api/products         | Admin        | Create product       |
| PUT    | /api/products/:id     | Admin        | Update product       |
| DELETE | /api/products/:id     | Admin        | Delete product       |

**Query Parameters for GET /api/products:**
- `search` — Search by name/description
- `category` — Filter by category
- `sort` — `price-asc`, `price-desc`, `name`
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 12)

### Order APIs

| Method | Endpoint                  | Access       | Description           |
|--------|---------------------------|--------------|-----------------------|
| POST   | /api/orders               | Private      | Create order          |
| GET    | /api/orders               | Private      | Get orders            |
| GET    | /api/orders/:id           | Private      | Get order by ID       |
| PUT    | /api/orders/:id/status    | Admin        | Update order status   |

**Create Order Body:**
```json
{
  "products": [
    { "product": "productId", "quantity": 2 }
  ],
  "totalAmount": 299.98,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "United States"
  }
}
```

### User APIs

| Method | Endpoint            | Access       | Description        |
|--------|---------------------|--------------|--------------------|
| GET    | /api/users/profile  | Private      | Get user profile   |
| PUT    | /api/users/profile  | Private      | Update profile     |
| GET    | /api/users          | Admin        | Get all users      |
| DELETE | /api/users/:id      | Admin        | Delete user        |

### Health Check

| Method | Endpoint      | Description     |
|--------|---------------|-----------------|
| GET    | /api/health   | API status check|

---

## Deployment

### Frontend — Deploy to Vercel

1. **Push your code to GitHub**

2. **Go to [Vercel](https://vercel.com)** and sign in with GitHub

3. **Import your repository**

4. **Configure the project:**
   - Framework Preset: **Vite**
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

6. **Deploy** — Vercel will build and deploy automatically

### Backend — Deploy to Render

1. **Go to [Render](https://render.com)** and sign in with GitHub

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Root Directory: `server`
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_production_jwt_secret
   JWT_EXPIRE=7d
   CLIENT_URL=https://your-app.vercel.app
   ```

4. **Deploy** — Render will build and deploy automatically

5. **Seed Production Database** (one time):
   - Use Render's shell or run locally with production MONGO_URI:
   ```bash
   npm run seed
   ```

### Post-Deployment Checklist

- [ ] Update `CLIENT_URL` in backend to your Vercel URL
- [ ] Update `VITE_API_URL` in frontend to your Render URL
- [ ] Add Render URL to MongoDB Atlas Network Access whitelist
- [ ] Run seed script on production database
- [ ] Test login, product browsing, cart, and checkout
- [ ] Test admin dashboard functionality

---

## Scripts Reference

### Server

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm start`     | Start production server        |
| `npm run dev`   | Start dev server with nodemon  |
| `npm run seed`  | Seed database with sample data |

### Client

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## License

MIT License — feel free to use this project for learning and portfolio purposes.

---

## Author

Built with the MERN Stack as a full-stack e-commerce learning project.
