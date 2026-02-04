import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/AuthModal";
import {
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Gift,
  Zap,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "trending";
  image: string;
  rating: number;
  reviews: number;
  inStock: number;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic College Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    category: "men",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    rating: 4.8,
    reviews: 234,
    inStock: 45,
  },
  {
    id: "2",
    name: "Vintage T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "men",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    rating: 4.6,
    reviews: 189,
    inStock: 62,
  },
  {
    id: "3",
    name: "Campus Crewneck",
    price: 39.99,
    originalPrice: 59.99,
    category: "women",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    rating: 4.9,
    reviews: 312,
    inStock: 28,
  },
  {
    id: "4",
    name: "Fitted College Tee",
    price: 22.99,
    originalPrice: 32.99,
    category: "women",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    rating: 4.7,
    reviews: 156,
    inStock: 71,
  },
  {
    id: "5",
    name: "Oversized Logo Hoodie",
    price: 54.99,
    originalPrice: 74.99,
    category: "trending",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    rating: 4.9,
    reviews: 401,
    inStock: 33,
  },
  {
    id: "6",
    name: "Embroidered Sweatshirt",
    price: 59.99,
    originalPrice: 79.99,
    category: "trending",
    image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
    rating: 5.0,
    reviews: 267,
    inStock: 19,
  },
];

const COUPONS = [
  { code: "WELCOME20", discount: "20%", description: "First order discount" },
  {
    code: "BUNDLE25",
    discount: "25%",
    description: "Buy 3+ items",
  },
  { code: "STUDENT15", discount: "15%", description: "Student exclusive" },
];

function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
      {/* Image */}
      <div
        className="relative h-48 md:h-56 bg-gradient-to-br overflow-hidden"
        style={{ backgroundImage: product.image }}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorite
                ? "fill-accent text-accent"
                : "text-foreground/40 hover:text-foreground"
            )}
          />
        </button>

        {/* In Stock Badge */}
        <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
          {product.inStock} in stock
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group/btn">
          <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        cartCount={3}
        isAuthenticated={isAuthenticated}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogoutClick={() => setIsAuthenticated(false)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-12 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

        <div className="container flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">New Collection</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your College <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Style</span>,
            <br />
            Your Rules
          </h1>

          <p className="text-lg text-foreground/70 max-w-2xl mb-8">
            Discover the finest college merchandise designed for students who want to stand out. Premium quality, incredible prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Shop Now
            </button>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-8 py-3.5 bg-card text-foreground font-semibold rounded-lg border border-border hover:bg-muted transition-all"
            >
              {isAuthenticated ? "View Account" : "Sign Up"}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">50k+</div>
              <p className="text-sm text-foreground/60 mt-1">Happy Students</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-secondary">500+</div>
              <p className="text-sm text-foreground/60 mt-1">Products</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-accent">24/7</div>
              <p className="text-sm text-foreground/60 mt-1">Support</p>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <p className="text-sm text-foreground/60 mt-1">Authentic</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's Hot Right Now
            </h2>
            <p className="text-foreground/60 text-lg">
              Check out the bestsellers everyone's talking about
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.filter((p) => p.category === "trending").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coupons Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <Gift className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Save More</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Exclusive Coupons
            </h2>
            <p className="text-foreground/60 text-lg">
              Use these codes at checkout for instant discounts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPONS.map((coupon, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 md:p-8 border-2 border-dashed border-border hover:border-primary transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Save up to
                    </p>
                    <h3 className="text-4xl font-bold text-accent group-hover:scale-110 transition-transform origin-left">
                      {coupon.discount}
                    </h3>
                  </div>
                </div>
                <p className="text-foreground/70 font-medium mb-4">
                  {coupon.description}
                </p>
                <div className="bg-muted rounded-lg p-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                    Code
                  </p>
                  <p className="text-lg font-bold font-mono">
                    {coupon.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Collection */}
      <section id="men" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">For Him</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Men's Collection
            </h2>
            <p className="text-foreground/60 text-lg">
              Premium hoodies and tees designed for the modern college guy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.filter((p) => p.category === "men").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Collection */}
      <section id="women" className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <Users className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">For Her</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Women's Collection
            </h2>
            <p className="text-foreground/60 text-lg">
              Stylish and comfortable apparel for college women
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.filter((p) => p.category === "women").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              All Products
            </h2>
            <p className="text-foreground/60 text-lg">
              Browse our complete catalog of college merchandise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 md:py-24"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions? We're Here to Help
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Have questions about our products or need support? Get in touch
              with our friendly team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:bg-primary-foreground/90 transition-all">
                Contact Us
              </button>
              <button className="px-6 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          setIsAuthenticated(true);
        }}
      />
    </div>
  );
}
