export type Category =
  | "sneakers"
  | "audio"
  | "watches"
  | "bags"
  | "cameras"
  | "tech";

export interface ProductExtended {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "New" | "Sale" | "Hot" | "Limited";
  slug: string;
  category: Category;
  description: string;
  tags: string[];
  inStock: boolean;
  stockCount?: number;
}

export const PRODUCTS: ProductExtended[] = [
  // ── Sneakers ──────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "Wave Runner Pro Sneakers",
    brand: "Nike",
    price: 129,
    originalPrice: 179,
    rating: 4,
    reviewCount: 214,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    badge: "Sale",
    slug: "wave-runner-pro",
    category: "sneakers",
    description:
      "Lightweight performance runners built for speed and all-day comfort. Mesh upper, responsive foam midsole.",
    tags: ["running", "lightweight", "breathable"],
    inStock: true,
    stockCount: 34,
  },
  {
    id: "2",
    name: "Court Classic Low",
    brand: "Adidas",
    price: 95,
    rating: 4,
    reviewCount: 88,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
    slug: "court-classic-low",
    category: "sneakers",
    description:
      "Timeless low-top silhouette with a premium leather upper and cushioned insole. Goes with everything.",
    tags: ["casual", "leather", "classic"],
    inStock: true,
    stockCount: 19,
  },
  {
    id: "3",
    name: "Trail Blazer X9",
    brand: "Salomon",
    price: 159,
    originalPrice: 199,
    rating: 5,
    reviewCount: 61,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    badge: "Sale",
    slug: "trail-blazer-x9",
    category: "sneakers",
    description:
      "Aggressive trail shoe with Contagrip outsole and protective toe cap for rugged off-road terrain.",
    tags: ["trail", "outdoor", "waterproof"],
    inStock: true,
    stockCount: 8,
  },

  // ── Audio ─────────────────────────────────────────────────────────────────
  {
    id: "4",
    name: "SoundDrop Max Headphones",
    brand: "Sony",
    price: 89,
    rating: 5,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    badge: "Hot",
    slug: "sounddrop-max",
    category: "audio",
    description:
      "Over-ear wireless headphones with 40-hour battery, active noise cancellation, and Hi-Res Audio certification.",
    tags: ["wireless", "noise-cancelling", "hi-res"],
    inStock: true,
    stockCount: 45,
  },
  {
    id: "5",
    name: "BubblePods Air 3",
    brand: "Apple",
    price: 179,
    originalPrice: 199,
    rating: 4,
    reviewCount: 312,
    image:
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&q=80",
    badge: "Sale",
    slug: "bubblepods-air-3",
    category: "audio",
    description:
      "True wireless earbuds with adaptive transparency, spatial audio, and a compact MagSafe charging case.",
    tags: ["earbuds", "wireless", "spatial-audio"],
    inStock: true,
    stockCount: 72,
  },
  {
    id: "6",
    name: "BassDrop Portable Speaker",
    brand: "JBL",
    price: 69,
    rating: 4,
    reviewCount: 145,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    badge: "New",
    slug: "bassdrop-portable",
    category: "audio",
    description:
      "IP67 waterproof Bluetooth speaker with 20-hour playtime, deep bass radiator, and USB-C charging.",
    tags: ["bluetooth", "waterproof", "portable"],
    inStock: true,
    stockCount: 29,
  },

  // ── Watches ───────────────────────────────────────────────────────────────
  {
    id: "7",
    name: "Orbit Watch Series 2",
    brand: "Casio",
    price: 199,
    originalPrice: 249,
    rating: 4,
    reviewCount: 57,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "New",
    slug: "orbit-watch-s2",
    category: "watches",
    description:
      "Minimalist stainless steel case, sapphire crystal glass, and 5ATM water resistance. Solar-powered movement.",
    tags: ["minimalist", "solar", "water-resistant"],
    inStock: true,
    stockCount: 14,
  },
  {
    id: "8",
    name: "ChronoSport Pro",
    brand: "Garmin",
    price: 329,
    rating: 5,
    reviewCount: 203,
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&q=80",
    badge: "Hot",
    slug: "chronosport-pro",
    category: "watches",
    description:
      "GPS multisport smartwatch with heart rate monitoring, VO2 max tracking, and 14-day battery life.",
    tags: ["gps", "fitness", "smartwatch"],
    inStock: true,
    stockCount: 22,
  },
  {
    id: "9",
    name: "Vintage Field Watch",
    brand: "Timex",
    price: 79,
    rating: 4,
    reviewCount: 39,
    image:
      "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&q=80",
    slug: "vintage-field-watch",
    category: "watches",
    description:
      "Classic canvas strap field watch with luminous hands, a 36mm case, and Indiglo night-light display.",
    tags: ["vintage", "canvas", "classic"],
    inStock: false,
  },

  // ── Bags ──────────────────────────────────────────────────────────────────
  {
    id: "10",
    name: "Urban Pack 24L Backpack",
    brand: "Herschel",
    price: 64,
    rating: 4,
    reviewCount: 132,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    slug: "urban-pack-24l",
    category: "bags",
    description:
      "Everyday carry backpack with a padded 15 laptop sleeve, fleece-lined sunglasses pocket, and stripe lining.",
    tags: ["everyday", "laptop", "commute"],
    inStock: true,
    stockCount: 58,
  },
  {
    id: "11",
    name: "Weekender Duffel 40L",
    brand: "Patagonia",
    price: 109,
    originalPrice: 139,
    rating: 5,
    reviewCount: 76,
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80",
    badge: "Sale",
    slug: "weekender-duffel-40l",
    category: "bags",
    description:
      "Rugged recycled nylon duffel with removable shoulder strap, grab handles, and zippered end pocket.",
    tags: ["travel", "duffel", "recycled"],
    inStock: true,
    stockCount: 17,
  },
  {
    id: "12",
    name: "Slim Crossbody Pouch",
    brand: "Bellroy",
    price: 49,
    rating: 4,
    reviewCount: 91,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    badge: "New",
    slug: "slim-crossbody-pouch",
    category: "bags",
    description:
      "Compact leather crossbody with RFID protection, quick-access front pocket, and magnetic clasp.",
    tags: ["leather", "rfid", "compact"],
    inStock: true,
    stockCount: 33,
  },

  // ── Cameras ───────────────────────────────────────────────────────────────
  {
    id: "13",
    name: "SnapShot 35mm Film Camera",
    brand: "Kodak",
    price: 54,
    rating: 4,
    reviewCount: 48,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    badge: "Hot",
    slug: "snapshot-35mm",
    category: "cameras",
    description:
      "Reusable 35mm point-and-shoot with a fixed 28mm lens, built-in flash, and ISO 400 film included.",
    tags: ["film", "analog", "35mm"],
    inStock: true,
    stockCount: 26,
  },
  {
    id: "14",
    name: "Instax Mini 12",
    brand: "Fujifilm",
    price: 79,
    originalPrice: 99,
    rating: 5,
    reviewCount: 284,
    image:
      "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=600&q=80",
    badge: "Sale",
    slug: "instax-mini-12",
    category: "cameras",
    description:
      "Instant film camera with automatic exposure, close-up lens mode, and selfie mirror. Prints in 90 seconds.",
    tags: ["instant", "polaroid", "fun"],
    inStock: true,
    stockCount: 41,
  },
  {
    id: "15",
    name: "Vlog Cam ZV-E10",
    brand: "Sony",
    price: 599,
    rating: 5,
    reviewCount: 167,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    badge: "New",
    slug: "vlog-cam-zv-e10",
    category: "cameras",
    description:
      "APS-C mirrorless camera optimized for vlogging — flip screen, directional mic, and real-time eye-tracking AF.",
    tags: ["mirrorless", "vlogging", "4k"],
    inStock: true,
    stockCount: 9,
  },

  // ── Tech ──────────────────────────────────────────────────────────────────
  {
    id: "16",
    name: 'NovaPad Pro 11"',
    brand: "Samsung",
    price: 449,
    originalPrice: 549,
    rating: 4,
    reviewCount: 193,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    badge: "Sale",
    slug: "novapad-pro-11",
    category: "tech",
    description:
      "11-inch AMOLED tablet with S Pen support, 120Hz refresh rate, and 12,000mAh battery for all-day use.",
    tags: ["tablet", "amoled", "s-pen"],
    inStock: true,
    stockCount: 15,
  },
  {
    id: "17",
    name: "MechKey TKL Keyboard",
    brand: "Keychron",
    price: 89,
    rating: 5,
    reviewCount: 411,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    badge: "Hot",
    slug: "mechkey-tkl",
    category: "tech",
    description:
      "Tenkeyless wireless mechanical keyboard with hot-swappable switches, RGB backlight, and Mac/Windows layout.",
    tags: ["mechanical", "wireless", "rgb"],
    inStock: true,
    stockCount: 67,
  },
  {
    id: "18",
    name: "DeskHub 7-in-1 USB-C",
    brand: "Anker",
    price: 49,
    rating: 4,
    reviewCount: 228,
    image:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&q=80",
    badge: "New",
    slug: "deskhub-7in1",
    category: "tech",
    description:
      "Compact USB-C hub with 4K HDMI, 100W PD pass-through, 2x USB-A 3.0, SD/microSD reader, and Ethernet.",
    tags: ["usb-c", "hub", "4k-hdmi"],
    inStock: true,
    stockCount: 84,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

export const findProductsByName = (query: string) => {
  return PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
};

export function getProductBySlug(slug: string): ProductExtended | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): ProductExtended[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(count = 4): ProductExtended[] {
  return PRODUCTS.filter((p) => p.inStock)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, count);
}

export function searchProducts(query: string): ProductExtended[] {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.includes(q) ||
      p.tags.some((t) => t.includes(q)),
  );
}

export function getSortedProducts(
  products: ProductExtended[],
  sort: "price-asc" | "price-desc" | "rating" | "newest",
): ProductExtended[] {
  return [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating || b.reviewCount - a.reviewCount;
      case "newest":
        return Number(b.id) - Number(a.id);
      default:
        return 0;
    }
  });
}

export const CATEGORY_LABELS: Record<Category, string> = {
  sneakers: "Sneakers",
  audio: "Audio",
  watches: "Watches",
  bags: "Bags",
  cameras: "Cameras",
  tech: "Tech",
};
