import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/AuthModal";
import { useStore, PRODUCTS } from "@/context/StoreContext";
import {
  ShoppingCart,
  Heart,
  Star,
  TrendingUp,
  Gift,
  Zap,
  Users,
  Award,
  Truck,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: typeof PRODUCTS[0];
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="stagger-item bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group product-card-hover border border-border/50 hover:border-primary/50">
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 left-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFavorite || isInWishlist(product.id)
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
      <div className="p-5 flex flex-col h-full">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 text-base">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
        >
          <ShoppingCart className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const COUPONS = [
  { code: "WELCOME20", discount: "20%", description: "First order discount" },
  {
    code: "BUNDLE25",
    discount: "25%",
    description: "Buy 3+ items",
  },
  { code: "STUDENT15", discount: "15%", description: "Student exclusive" },
];

const TESTIMONIALS = [
  {
    name: "Emma Johnson",
    college: "State University",
    image: "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "CollegeCrew has the best quality hoodies! I've already bought 3 different colors. Amazing customer service too!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    college: "Tech Institute",
    image: "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=200",
    review:
      "Perfect prices for a college student on a budget. The student discount made it even better!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    college: "Central College",
    image: "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Love the accessories! The water bottle and tote bag are super useful for campus life.",
    rating: 4,
  },
];

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const trendingProducts = PRODUCTS.filter((p) => p.category === "trending");
  const menProducts = PRODUCTS.filter((p) => p.category === "men");
  const womenProducts = PRODUCTS.filter((p) => p.category === "women");
  const accessoryProducts = PRODUCTS.filter((p) => p.category === "accessories");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        cartCount={0}
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
      <section id="trending" className="py-16 md:py-24 scroll-mt-16">
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
            {trendingProducts.map((product) => (
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
      <section id="men" className="py-16 md:py-24 scroll-mt-16">
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
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Collection */}
      <section id="women" className="bg-muted/30 py-16 md:py-24 scroll-mt-16">
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
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Must-Have Items</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              College Accessories
            </h2>
            <p className="text-foreground/60 text-lg">
              Complete your college look with our essential accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Real Reviews</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Students Are Saying
            </h2>
            <p className="text-foreground/60 text-lg">
              Join thousands of happy college students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.college}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground/70">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16 md:py-24 scroll-mt-16">
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
        className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 md:py-24 scroll-mt-16"
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
