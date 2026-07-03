# 🌊 ShopWave — Premium E-Commerce Application

ShopWave is a premium, fully-featured e-commerce web application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **React**. It features a modern, high-contrast dark-mode interface with subtle neon glow accents, smooth page transitions, and interactive visual aesthetics.

---

## 🌐 Live Demo

- **Production URL**: [https://shopwave-iota.vercel.app/](https://shopwave-iota.vercel.app/)


---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) & React 19 |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS & Custom CSS Variables |
| **Icons** | Lucide React |
| **Database** | Ephemeral/Local Concurrency-locked JSON Database |
| **Sessions** | Cryptographically signed HMAC-SHA256 Cookies |

---

## ✨ Features

* **User Authentication**: Secure sign-up, sign-in, and sign-out pages. Passwords are encrypted using SHA-512 PBKDF2 hashing.
* **Cryptographic Sessions**: Stateful cookie management matching sessions with HMAC signatures using Web Crypto APIs (compatible with Next.js Edge Runtime).
* **Protected Routes**: central middleware intercepts `/cart`, `/checkout`, `/orders`, and `/profile`, automatically redirecting guests to login with target page restoration.
* **Interactive Shopping Cart**: Client-hydrated, globally-managed React Context cart with persistent sync to `localStorage` and real-time total calculations.
* **Catalog Sorting & Filters**: Advanced product filtering by Category, Stock Status, Sale status, and Brand. Sort by price, release dates, and reviews.
* **Simulated Checkout & Payment**: Credit card visual formatting, validation checks, inventory stock depletion, and database order logging.
* **Invoice Tracking**: Detailed historic orders list under `/orders/[id]`, preserving the historical price at the exact moment of purchase.
* **Customer Reviews**: Dynamic product rating cards and submission forms for authenticated customers.

---

## 📊 Database Schema & Relationships

ShopWave utilizes a relational database mapped directly to JSON table sheets under `/data/db/` (which dynamically ports to the writeable `/tmp` directory when deployed on serverless cloud platforms):

| Table | Relation | Description |
| :--- | :--- | :--- |
| **`categories`** | `1 ── N` products | Holds product categories and navigation links. |
| **`products`** | `1 ── N` order_items | Holds name, brand, description, tags, pricing, stock count, and badges. |
| **`users`** | `1 ── N` orders | Holds registered names, emails, and PBKDF2 password hashes. |
| **`orders`** | `1 ── N` order_items | Holds shipping details, date, status, total cost, and user foreign key. |
| **`order_items`** | Reference table | Holds individual item line records, capturing a snapshot of `unit_price`. |
| **`reviews`** | Reference table | Holds product ratings, user IDs, and review comments. |

---

## ⚙️ Installation & Setup

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd shopwave
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
```

### 5. Run Lint & Code Checks
```bash
npm run lint
```
