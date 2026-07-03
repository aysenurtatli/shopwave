# ShopWave — E-Commerce Web Application

**ShopWave** is a premium, fully-functional e-commerce web application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **React**. It features a modern, high-contrast dark-mode interface with subtle neon glow accents and animations.

---

## 🌐 Canlı Demo / Live Demo

- **Demo URL**: [https://shopwave-iota.vercel.app/](https://shopwave-iota.vercel.app/)

### 🔑 Demo Hesap Bilgileri / Demo Account Details
* **Registration**: Registering a new account is fully functional and automatically creates a secure session.
* **Test Account**:
  * **Email**: `customer@shopwave.com`
  * **Password**: `password123`

---

## 🛠️ Kullanılan Teknolojiler / Technologies Used

* **Framework**: Next.js 16 (App Router) & React 19
* **Language**: TypeScript 5 (Strict Type Checking)
* **Styling**: Tailwind CSS & Vanilla CSS (with CSS variables)
* **Icons**: Lucide React
* **Animations**: OGL & Tw-Animate-CSS
* **Database Engine**: Concurrency-locked file-based JSON database (located in `data/db/` or `/tmp/shopwave_db/` when deployed on serverless platforms)

---

## ⚙️ Kurulum Adımları / Setup & Installation

### 1. Projeyi Klonlayın ve Klasöre Geçin / Clone the Project
```bash
cd shopwave
```

### 2. Bağımlılıkları Yükleyin / Install Dependencies
```bash
npm install
```

### 3. Geliştirme Sunucusunu Çalıştırın / Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Üretim Derlemesini Çalıştırın / Production Build Validation
```bash
npm run build
```

### 5. ESLint ve Tip Kontrollerini Çalıştırın / ESLint & Type Checks
```bash
npm run lint
```

---

## 📊 Database Schema & Relationships

ShopWave implements a relational data structure written directly to JSON files inside `data/db/` with strict constraint validation:

- **`categories` (1 ── N) `products`**: Categories have multiple products; products hold a category foreign key.
- **`users` (1 ── N) `orders`**: A user has multiple order records. Orders validate that the `user_id` points to an existing user.
- **`orders` (1 ── N) `order_items`**: An order contains multiple items. Each item maps to a product.
- **`products` (1 ── N) `order_items`**: A product can appear across multiple order details.
- **`order_items`**: Stored separately with a dedicated `unit_price` field, freezing the purchase price against future catalog adjustments.
- **`reviews`**: Stored in a dedicated table referencing both `product_id` and `user_id` foreign keys.
