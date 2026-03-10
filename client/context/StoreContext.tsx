import { createContext, useContext, useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "trending" | "accessories";
  image: string;
  rating: number;
  reviews: number;
  inStock: number;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  searchQuery: string;
  userName: string | null;
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setSearchQuery: (query: string) => void;
  getSearchResults: () => Product[];
  setUserName: (name: string | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const PRODUCTS: Product[] = [
  // Apparel
  {
    id: "1",
    name: "Classic Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    category: "men",
    image: "https://images.pexels.com/photos/30095401/pexels-photo-30095401.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 234,
    inStock: 7,
    description: "Premium hoodie with embroidered logo",
  },
  {
    id: "2",
    name: "Vintage T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "men",
    image: "https://images.pexels.com/photos/9558583/pexels-photo-9558583.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 189,
    inStock: 5,
    description: "Vintage style t-shirt",
  },
  {
    id: "3",
    name: "Campus Crewneck",
    price: 39.99,
    originalPrice: 59.99,
    category: "women",
    image: "https://images.pexels.com/photos/9396311/pexels-photo-9396311.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 312,
    inStock: 6,
    description: "Comfortable campus crewneck sweatshirt",
  },
  {
    id: "4",
    name: "Fitted Tee",
    price: 22.99,
    originalPrice: 32.99,
    category: "women",
    image: "https://images.pexels.com/photos/9558699/pexels-photo-9558699.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 156,
    inStock: 8,
    description: "Fitted t-shirt perfect for casual life",
  },
  {
    id: "5",
    name: "Oversized Logo Hoodie",
    price: 54.99,
    originalPrice: 74.99,
    category: "trending",
    image: "https://images.pexels.com/photos/18956666/pexels-photo-18956666.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 401,
    inStock: 3,
    description: "Trendy oversized hoodie with large logo",
  },
  {
    id: "6",
    name: "Embroidered Sweatshirt",
    price: 59.99,
    originalPrice: 79.99,
    category: "trending",
    image: "https://images.pexels.com/photos/9901666/pexels-photo-9901666.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5.0,
    reviews: 267,
    inStock: 5,
    description: "Premium embroidered sweatshirt",
  },
  {
    id: "10",
    name: "Hoodie Sweatpants",
    price: 44.99,
    originalPrice: 59.99,
    category: "men",
    image: "https://images.pexels.com/photos/6083916/pexels-photo-6083916.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 203,
    inStock: 6,
    description: "Matching sweatpants for the ultimate comfort look",
  },
  {
    id: "12",
    name: "Cozy Hoodie Blanket",
    price: 39.99,
    category: "trending",
    image: "https://images.pexels.com/photos/10761593/pexels-photo-10761593.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5.0,
    reviews: 156,
    inStock: 2,
    description: "Oversized cozy hoodie blanket for dorm rooms",
  },

  // Electric Accessories
  {
    id: "13",
    name: "Fast Charging Power Bank",
    price: 34.99,
    originalPrice: 49.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/10104284/pexels-photo-10104284.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 287,
    inStock: 7,
    description: "20000mAh power bank with fast charging - keeps your devices powered all day",
  },
  {
    id: "14",
    name: "Wireless Phone Charger",
    price: 24.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7742588/pexels-photo-7742588.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 156,
    inStock: 5,
    description: "Qi-certified wireless charging pad - works with all compatible phones",
  },
  {
    id: "15",
    name: "USB Hub",
    price: 19.99,
    originalPrice: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/3921708/pexels-photo-3921708.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 134,
    inStock: 4,
    description: "4-port USB hub for dorm setup - connect multiple devices at once",
  },
  {
    id: "16",
    name: "Universal Phone Charger Cable",
    price: 12.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/10343714/pexels-photo-10343714.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 412,
    inStock: 8,
    description: "3-in-1 charging cable for Lightning, USB-C, and Micro USB",
  },

  // Bottles & Beverages
  {
    id: "17",
    name: "Insulated Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/3737800/pexels-photo-3737800.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 298,
    inStock: 6,
    description: "Double-wall insulated water bottle keeps drinks hot or cold for 24 hours",
  },
  {
    id: "18",
    name: "Stainless Steel Thermos",
    price: 29.99,
    originalPrice: 39.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9868632/pexels-photo-9868632.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 187,
    inStock: 4,
    description: "32oz thermos perfect for hot coffee or cold beverages during classes",
  },
  {
    id: "19",
    name: "Coffee Mug Set",
    price: 17.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/6312177/pexels-photo-6312177.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 145,
    inStock: 5,
    description: "Set of 2 ceramic coffee mugs with elegant design",
  },
  {
    id: "20",
    name: "Portable Juice Bottle",
    price: 14.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/8611350/pexels-photo-8611350.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 98,
    inStock: 3,
    description: "Lightweight sports water bottle - perfect for gym and outdoor activities",
  },

  // Shoes & Footwear
  {
    id: "21",
    name: "Campus Sneakers",
    price: 69.99,
    originalPrice: 99.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5413298/pexels-photo-5413298.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 234,
    inStock: 6,
    description: "Comfortable sneakers with branding - perfect for campus walking",
  },
  {
    id: "22",
    name: "Casual Shoes",
    price: 54.99,
    originalPrice: 74.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5584997/pexels-photo-5584997.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 167,
    inStock: 3,
    description: "Versatile casual shoes for everyday life",
  },
  {
    id: "23",
    name: "Soft Slippers",
    price: 22.99,
    originalPrice: 32.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/8669419/pexels-photo-8669419.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 156,
    inStock: 7,
    description: "Comfy dorm slippers - perfect for cozy nights",
  },

  // Accessories & Campus Essentials
  {
    id: "7",
    name: "Baseball Cap",
    price: 19.99,
    originalPrice: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/26956136/pexels-photo-26956136.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    reviews: 98,
    inStock: 5,
    description: "Classic baseball cap with embroidered logo",
  },
  {
    id: "8",
    name: "Water Bottle",
    price: 14.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/11031192/pexels-photo-11031192.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 142,
    inStock: 8,
    description: "Reusable stainless steel water bottle",
  },
  {
    id: "9",
    name: "Tote Bag",
    price: 24.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/19197736/pexels-photo-19197736.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 167,
    inStock: 4,
    description: "Durable canvas tote bag perfect for campus",
  },
  {
    id: "11",
    name: "Backpack",
    price: 64.99,
    originalPrice: 89.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 89,
    inStock: 6,
    description: "Spacious backpack with laptop compartment",
  },
  {
    id: "24",
    name: "LED Desk Lamp",
    price: 32.99,
    originalPrice: 44.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/12885116/pexels-photo-12885116.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 125,
    inStock: 2,
    description: "LED desk lamp for studying - adjustable brightness and flexible arm",
  },
  {
    id: "25",
    name: "Desk Organizer",
    price: 16.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/10567236/pexels-photo-10567236.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 98,
    inStock: 5,
    description: "Bamboo desk organizer for keeping your space neat and tidy",
  },
  {
    id: "26",
    name: "Sunglasses",
    price: 27.99,
    originalPrice: 39.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/13534508/pexels-photo-13534508.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 167,
    inStock: 7,
    description: "UV protection sunglasses for sunny days",
  },
  {
    id: "27",
    name: "Notebook Set",
    price: 12.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/8251117/pexels-photo-8251117.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 145,
    inStock: 8,
    description: "Set of 3 premium notebooks for classes",
  },
  {
    id: "28",
    name: "Keychain",
    price: 9.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/15679988/pexels-photo-15679988.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 89,
    inStock: 6,
    description: "Durable metal keychain - cute and practical",
  },

  // Trending Accessories (New additions with low stock)
  {
    id: "29",
    name: "Wireless Earbuds",
    price: 44.99,
    originalPrice: 64.99,
    category: "trending",
    image: "https://images.pexels.com/photos/33298188/pexels-photo-33298188.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 312,
    inStock: 2,
    description: "Premium wireless earbuds with noise cancellation",
  },
  {
    id: "30",
    name: "Portable Speaker",
    price: 39.99,
    originalPrice: 54.99,
    category: "trending",
    image: "https://images.pexels.com/photos/34241799/pexels-photo-34241799.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 245,
    inStock: 3,
    description: "Waterproof Bluetooth speaker with 360° sound",
  },
  {
    id: "31",
    name: "Phone Ring Stand",
    price: 8.99,
    originalPrice: 12.99,
    category: "trending",
    image: "https://images.pexels.com/photos/14541010/pexels-photo-14541010.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 178,
    inStock: 2,
    description: "Stylish phone ring stand for easy viewing and grip",
  },
];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState<string | null>(null);

  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getSearchResults = () => {
    if (!searchQuery.trim()) return PRODUCTS;
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        searchQuery,
        userName,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        setSearchQuery,
        getSearchResults,
        setUserName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
