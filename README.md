# ShopWave — E-Commerce Web Application

**ShopWave** is a premium, fully-functional e-commerce web application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **React**. It features a modern, high-contrast dark-mode interface with subtle neon glow accents and animations.

---

## 🚀 Key Features

1. **User Authentication & Session Management**:
   - **Registration**: Allows users to sign up with their first name, last name, email, and password (minimum 6 characters, passwords are hashed using SHA-512 PBKDF2).
   - **Login**: Secure login verifying passwords against stored PBKDF2 hashes.
   - **Stateless Sessions**: Managed using cryptographically signed HTTP-only cookies (`sw_session` of the form `userId:expiresAt:HMAC-Hex`) powered by the Web Crypto API.
   - **Route Protection Middleware**: A centralized middleware protects private pages (`/cart`, `/checkout`, `/orders`, `/profile`) and automatically redirects unauthenticated users to `/login?redirect=[target]`.

2. **Product Catalog & Advanced Filters**:
   - **Home Page**: Displays featured products and allows fast category navigation.
   - **Grid List View**: Responsive catalog featuring brand tags, ratings, stock indicators, and price comparison.
   - **Search & Filters**: Real-time product search by name, filtering by categories, stock status, sale availability, and sorting (by newest, rating, price low-to-high, price high-to-low).
   - **Dynamic Product Pages**: Consolidates slug and numeric ID routing (`/products/[id]`) to resolve items dynamically on the server.

3. **Persistent Shopping Cart**:
   - Managed globally using the **React Context API** with full state synchronization to the browser's `localStorage` (via the `"sw_cart"` key).
   - Built-in hydration protection ensures zero server-client hydration mismatch errors during Next.js static rendering.
   - Core operations include adding products, incrementing/decrementing quantities directly in the cart drawer, and deleting items completely.

4. **Secure Checkout & Mock Payments**:
   - **Shipping details form**: Collects name, phone, address, city, and zip code.
   - **Mock Payment Form**: Collects card numbers, expiry dates, and CVVs with auto-formatting input helpers.
   - **Database Integration**: Server Action commits order items and shipping details, decrements stock levels, captures the historical price, and clears the client's `localStorage`.

5. **Order History & Details**:
   - `/orders`: Lists past orders with dates, total amounts, and statuses (Pending, Processing, Delivered, etc.).
   - `/orders/[id]`: Detailed invoice display showing delivery information, ordered products, and the **historical unit price** captured at the exact moment of checkout.

6. **Product Reviews (Bonus Feature)**:
   - Dynamic reviews list showing customer ratings, names, dates, and comments.
   - Review submission form (available to logged-in users only) that updates the product's overall rating and review counts.

---

## 🛠️ Technology Stack

- **Core Framework**: Next.js 16 (App Router) & React 19
- **Type Safety**: TypeScript 5+ (Strict mode compliant)
- **Styling**: Tailwind CSS & Vanilla CSS (with CSS variable tokens)
- **Icons**: Lucide React
- **Animations**: OGL & Tw-Animate-CSS
- **Database Engine**: Concurrency-locked file-based JSON database (located in `data/db/`)

---

## 📊 Database Schema & Relationships

ShopWave implements a relational data structure written directly to JSON files inside `data/db/` with strict constraint validation:

- **`categories` (1 ── N) `products`**: Categories have multiple products; products hold a category foreign key.
- **`users` (1 ── N) `orders`**: A user has multiple order records. Orders validate that the `user_id` points to an existing user.
- **`orders` (1 ── N) `order_items`**: An order contains multiple items. Each item maps to a product.
- **`products` (1 ── N) `order_items`**: A product can appear across multiple order details.
- **`order_items`**: Stored separately with a dedicated `unit_price` field, freezing the purchase price against future catalog adjustments.
- **`reviews`**: Stored in a dedicated table referencing both `product_id` and `user_id` foreign keys.

---

## ⚙️ Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Production Build Validation
```bash
npm run build
```

### 4. Code Formatting & Lint Checks
```bash
npm run lint
```
