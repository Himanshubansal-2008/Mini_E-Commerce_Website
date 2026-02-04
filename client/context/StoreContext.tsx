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
  {
    id: "1",
    name: "Classic College Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    category: "men",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.8,
    reviews: 234,
    inStock: 45,
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
    inStock: 62,
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
    inStock: 28,
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
    inStock: 71,
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
    inStock: 33,
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
    inStock: 19,
    description: "Premium embroidered sweatshirt",
  },
  {
    id: "7",
    name: "College Baseball Cap",
    price: 19.99,
    originalPrice: 29.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    reviews: 98,
    inStock: 85,
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
    inStock: 120,
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
    inStock: 56,
    description: "Durable canvas tote bag perfect for campus",
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
    inStock: 38,
    description: "Matching sweatpants for the ultimate comfort look",
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
    inStock: 42,
    description: "Spacious backpack with laptop compartment",
  },
  {
    id: "12",
    name: "Cozy Hoodie Blanket",
    price: 39.99,
    category: "trending",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5.0,
    reviews: 156,
    inStock: 29,
    description: "Oversized cozy hoodie blanket for dorm rooms",
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
