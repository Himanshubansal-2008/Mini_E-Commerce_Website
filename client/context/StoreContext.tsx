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
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setSearchQuery: (query: string) => void;
  getSearchResults: () => Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const PRODUCTS: Product[] = [
  // Apparel
  {
    id: "1",
    name: "Classic College Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    category: "men",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 234,
    inStock: 8,
    description: "Premium college hoodie with embroidered logo",
  },
  {
    id: "2",
    name: "Vintage T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "men",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 189,
    inStock: 9,
    description: "Vintage style college t-shirt",
  },
  {
    id: "3",
    name: "Campus Crewneck",
    price: 39.99,
    originalPrice: 59.99,
    category: "women",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 312,
    inStock: 7,
    description: "Comfortable campus crewneck sweatshirt",
  },
  {
    id: "4",
    name: "Fitted College Tee",
    price: 22.99,
    originalPrice: 32.99,
    category: "women",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 156,
    inStock: 10,
    description: "Fitted t-shirt perfect for college life",
  },
  {
    id: "5",
    name: "Oversized Logo Hoodie",
    price: 54.99,
    originalPrice: 74.99,
    category: "trending",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 401,
    inStock: 6,
    description: "Trendy oversized hoodie with large logo",
  },
  {
    id: "6",
    name: "Embroidered Sweatshirt",
    price: 59.99,
    originalPrice: 79.99,
    category: "trending",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 5.0,
    reviews: 267,
    inStock: 8,
    description: "Premium embroidered sweatshirt",
  },
  {
    id: "10",
    name: "Hoodie Sweatpants",
    price: 44.99,
    originalPrice: 59.99,
    category: "men",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 203,
    inStock: 9,
    description: "Matching sweatpants for the ultimate comfort look",
  },
  {
    id: "12",
    name: "Cozy Hoodie Blanket",
    price: 39.99,
    category: "trending",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5.0,
    reviews: 156,
    inStock: 5,
    description: "Oversized cozy hoodie blanket for dorm rooms",
  },

  // Electric Accessories
  {
    id: "13",
    name: "Fast Charging Power Bank",
    price: 34.99,
    originalPrice: 49.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 287,
    inStock: 10,
    description: "20000mAh power bank with fast charging - keeps your devices powered all day",
  },
  {
    id: "14",
    name: "Wireless Phone Charger",
    price: 24.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 156,
    inStock: 8,
    description: "Qi-certified wireless charging pad - works with all compatible phones",
  },
  {
    id: "15",
    name: "College USB Hub",
    price: 19.99,
    originalPrice: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 134,
    inStock: 9,
    description: "4-port USB hub for dorm setup - connect multiple devices at once",
  },
  {
    id: "16",
    name: "Universal Phone Charger Cable",
    price: 12.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 412,
    inStock: 10,
    description: "3-in-1 charging cable for Lightning, USB-C, and Micro USB",
  },

  // Bottles & Beverages
  {
    id: "17",
    name: "Insulated College Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 298,
    inStock: 10,
    description: "Double-wall insulated water bottle keeps drinks hot or cold for 24 hours",
  },
  {
    id: "18",
    name: "College Stainless Steel Thermos",
    price: 29.99,
    originalPrice: 39.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 187,
    inStock: 7,
    description: "32oz thermos perfect for hot coffee or cold beverages during classes",
  },
  {
    id: "19",
    name: "College Coffee Mug Set",
    price: 17.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 145,
    inStock: 8,
    description: "Set of 2 ceramic college-themed coffee mugs with college logo",
  },
  {
    id: "20",
    name: "Portable Juice Bottle",
    price: 14.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 98,
    inStock: 9,
    description: "Lightweight sports water bottle - perfect for gym and outdoor activities",
  },

  // Shoes & Footwear
  {
    id: "21",
    name: "College Campus Sneakers",
    price: 69.99,
    originalPrice: 99.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 234,
    inStock: 8,
    description: "Comfortable sneakers with college branding - perfect for campus walking",
  },
  {
    id: "22",
    name: "College Casual Shoes",
    price: 54.99,
    originalPrice: 74.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 167,
    inStock: 6,
    description: "Versatile casual shoes for everyday college life",
  },
  {
    id: "23",
    name: "College Slippers",
    price: 22.99,
    originalPrice: 32.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 156,
    inStock: 10,
    description: "Comfy dorm slippers with college logo - perfect for cozy nights",
  },

  // Accessories & Campus Essentials
  {
    id: "7",
    name: "College Baseball Cap",
    price: 19.99,
    originalPrice: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    reviews: 98,
    inStock: 9,
    description: "Classic baseball cap with embroidered college logo",
  },
  {
    id: "8",
    name: "College Water Bottle",
    price: 14.99,
    originalPrice: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 142,
    inStock: 10,
    description: "Reusable stainless steel college water bottle",
  },
  {
    id: "9",
    name: "College Tote Bag",
    price: 24.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 167,
    inStock: 8,
    description: "Durable canvas tote bag perfect for campus",
  },
  {
    id: "11",
    name: "College Backpack",
    price: 64.99,
    originalPrice: 89.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 89,
    inStock: 7,
    description: "Spacious backpack with laptop compartment",
  },
  {
    id: "24",
    name: "College Desk Lamp",
    price: 32.99,
    originalPrice: 44.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 125,
    inStock: 6,
    description: "LED desk lamp for studying - adjustable brightness and flexible arm",
  },
  {
    id: "25",
    name: "College Desk Organizer",
    price: 16.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.6,
    reviews: 98,
    inStock: 9,
    description: "Bamboo desk organizer for keeping your dorm neat and tidy",
  },
  {
    id: "26",
    name: "College Sunglasses",
    price: 27.99,
    originalPrice: 39.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 167,
    inStock: 10,
    description: "UV protection college-branded sunglasses for sunny campus days",
  },
  {
    id: "27",
    name: "College Notebook Set",
    price: 12.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.7,
    reviews: 145,
    inStock: 10,
    description: "Set of 3 premium college-branded notebooks for classes",
  },
  {
    id: "28",
    name: "College Keychain",
    price: 9.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.9,
    reviews: 89,
    inStock: 10,
    description: "Durable metal college keychain - cute and practical",
  },
];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        setSearchQuery,
        getSearchResults,
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
