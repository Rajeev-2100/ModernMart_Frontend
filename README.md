# 🛒 ModernMart – Full Stack E-commerce Application

![React](https://img.shields.io/badge/React-19-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple)
![MongoDB](https://img.shields.io/badge/MongoDB-green)
![Express](https://img.shields.io/badge/Express-black)
![Node.js](https://img.shields.io/badge/Node.js-green)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

ModernMart is a full-stack MERN E-commerce application engineered to provide a seamless, end-to-end online shopping experience. The platform streamlines everything from initial product discovery to final transaction completion.

---

## 🚀 Live Demo

### Frontend App

https://modernmart-ecommerce-frontend.vercel.app/


---

### 🛍️ Core User Journey

* **Discover:** Browse through an organized catalog with fluid item filtering and instant search capabilities.
* **Manage:** Dynamically curate your shopping cart and maintain a personalized wishlist for future purchases.
* **Configure:** Set up and save multiple delivery addresses using a persistent CRUD management pipeline.
* **Checkout:** Finalize secure test transactions and instantly receive detailed, broken-down order summaries.

---

## 📸 Application Screenshots

### Dashboard

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d284b2e7-4926-419a-b974-40a55760ceba" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/669f311e-dd58-480e-a5cd-a0c46394c421" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/1049c37e-9184-41a2-9a84-32bff8d3ee14" />

### ProductListing Page

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/2cef7b73-a8e9-4ae6-8de0-56912d7502dc" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/f14d7149-934d-4908-a1f6-abace32e89ce" />

### Cart Listing Page

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/bf74c08b-8bcf-4064-9f45-b7f3db8bb109" />

### Checkout Page

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/33b130b8-243c-42d3-9569-a5c9b05d4282" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/46d701d8-7247-4c88-a1a8-b84f6a81fb31" />

### My Order Page

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0c01aae3-6f46-47ec-b997-60da90c30e93" />

### Order Detail Page

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/60017b9b-a4da-416b-926d-127843adea9e" />

<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/f87535e7-1806-43d1-98f9-4879272e9b81" />

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Rajeev-2100/ModernMart_Backend.git
cd ModernMart_Frontend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:5173
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=https://modernmart-ecommerce-frontend.vercel.app/
```

Example Usage:

```javascript
fetch(`https://modernmart-ecommerce-frontend.vercel.app/leads`)
```

---



## ✨ Features

### 🏠 Home Page
* **Responsive Landing Page:** Fully optimized entry point across multiple viewpoints.
* **Curated Layouts:** Dedicated sections for featured products, promotional banners, and swift category navigation.

### 🛍️ Product Listing & Discovery
* **Catalog Browsing:** Comprehensive interface displaying all available products using responsive product cards.
* **Granular Search & Filters:** Instant search by product name alongside rigid category-based filtering.
* **Live Sorting:** High-performance sorting options by `Price (Low to High)` and `Price (High to Low)`.

### 📦 Product Details
* Rich product page showcasing images, full descriptions, item ratings, pricing, discounted pricing, and available sizes.
* Immediate action paths to **Add to Cart** or **Add to Wishlist**.

### ❤️ Wishlist & 🛒 Shopping Cart
* **Wishlist Ecosystem:** Quick save/remove options for favorite items with direct "Move to Cart" features.
* **Persistent Shopping Cart:** Complete item quantity modifiers (add, update, remove) coupled with automated target calculations (subtotal price, custom delivery charges, and final order summary).

### 📍 Address Management & 💳 Checkout
* **Complete CRUD Pipeline:** Full state handling to **Add**, **Edit**, **Delete**, and **Read** multiple delivery addresses.
* **Streamlined Checkout Flow:** Secure transaction path incorporating address selection, broken-down order summaries, automated invoice generation, and final order confirmation windows.

### 📦 Orders & 🔔 Notifications
* **Order History:** Detailed panel to view previously placed orders, purchased product states, and grand totals.
* **Real-time Feedback:** Application-wide toast notifications managing instantaneous success/error alert updates for carts, wishlists, and pipeline alterations.

### 📱 Responsive Design
* Hand-crafted layout states engineered to scale natively across **Desktop**, **Tablet**, and **Mobile** viewports.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React.js, React Router DOM
* **Styling & UI:** Bootstrap, Bootstrap Icons
* **Data Fetching & Feedback:** React Toastify

### Backend & Database
* **Server Runtime:** Node.js, Express.js
* **Database Layer:** MongoDB, Mongoose ODM

### Deployment
* **Client Host:** Vercel (Frontend)
* **Server Host:** Vercel / Render (Backend)
* **Cloud Database:** MongoDB Atlas

---
 
## 📂 Folder Structure

```text
├── ModernMart/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── CartHeader.jsx
│       │   ├── Footer.jsx
│       │   ├── Header.jsx
│       │   ├── MainHeader.jsx
│       │   ├── OrderDetailsHeader.jsx
│       │   ├── OrderHeader.jsx
│       │   └── WishlistHeader.jsx
│       ├── pages/
│       │   ├── Cart.jsx
│       │   ├── CategoryPage.jsx
│       │   ├── Checkout.jsx
│       │   ├── Order.jsx
│       │   ├── OrderDetail.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── ProductListing.jsx
│       │   ├── UserProfile.jsx
│       │   └── WishListPage.jsx
│       ├── useContext/
│       │   ├── Cart.jsx
│       │   ├── Order.jsx
│       │   ├── User.jsx
│       │   └── proudct.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── useFetch.jsx
├── .gitignore
├── index.html   
└── README.md

```

# 📚 API Architecture

## 🛍️ Products

| Method | Endpoint            | Description                                |
| ------ | ------------------- | ------------------------------------------ |
| GET    | `/api/products`     | Retrieve all available products.           |
| GET    | `/api/products/:id` | Fetch details of a specific product by ID. |

## 🛒 Cart

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/api/cart`     | Retrieve all cart items.             |
| POST   | `/api/cart`     | Add a product to the cart.           |
| PUT    | `/api/cart/:id` | Update product quantity in the cart. |
| DELETE | `/api/cart/:id` | Remove a product from the cart.      |

## ❤️ Wishlist

| Method | Endpoint            | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/api/wishlist`     | Retrieve wishlist items.            |
| POST   | `/api/wishlist`     | Add a product to the wishlist.      |
| DELETE | `/api/wishlist/:id` | Remove a product from the wishlist. |

## 📍 Address Management

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/api/address`     | Retrieve all saved addresses. |
| POST   | `/api/address`     | Add a new delivery address.   |
| PUT    | `/api/address/:id` | Update an existing address.   |
| DELETE | `/api/address/:id` | Delete a saved address.       |

## 📦 Orders

| Method | Endpoint          | Description                           |
| ------ | ----------------- | ------------------------------------- |
| GET    | `/api/orders`     | Retrieve all user orders.             |
| GET    | `/api/orders/:id` | Retrieve details of a specific order. |
| POST   | `/api/orders`     | Place a new order after checkout.     |

# 💡 Key Highlights

* 🚀 Full-Stack MERN Architecture: Developed a comprehensive stack environment relying on a highly scalable client-server architecture model.
* 🛍️ Advanced Discovery Engine: Implemented granular item discovery using live multi-query search, rigid category filtering, and real-time price sorting.
* 🛒 Dynamic Storage Components: Engine-built functional Cart and Wishlist modules supporting instant dynamic item addition, state updates, and record removal.
* 📍 Persistent CRUD Pipeline: Constructed robust address configurations backed by structured relational records in the database.
* 💳 Seamless Transaction Checkout: Designed a strict validation payment layout complete with custom breakdown values, automated invoice routing, and confirmation summaries.
* 📦 Order Lifecycle Tracking: Modeled custom purchase logging environments allowing clients to seamlessly verify historical invoice records.
* 🔔 Real-Time Notification Middleware: Integrated snappy application-wide toast notifications ensuring instant front-facing client feedback.
* 📱 Fluid Universal Layouts: Hand-crafted responsive interfaces utilizing Bootstrap to handle structural integrity natively across desktop, tablet, and mobile dimensions.
* 🔗 Optimized Data Pipeline: Coupled asynchronous frontend states seamlessly with backend architecture via decoupled RESTful API patterns.

# 🛠️ Skills Demonstrated

* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* Bootstrap
* REST API Development
* CRUD Operations
* Component-Based Architecture
* Context API
* Custom React Hooks
* State Management
* Responsive Web Design
* Frontend–Backend Integration
* Asynchronous JavaScript

# 👨‍💻 Author

**Rajeev Rawat**

🌐 **Portfolio:** [rajeev-portfolio-three.vercel.app](https://rajeev-portfolio-three.vercel.app)

💼 **LinkedIn:** [linkedin.com/in/rajeev-rawat2100](https://linkedin.com/in/rajeev-rawat2100)

💻 **GitHub:** [@Rajeev-2100](https://github.com/Rajeev-2100)
---

⭐ **If you found this project helpful, consider giving it a Star on GitHub!**


