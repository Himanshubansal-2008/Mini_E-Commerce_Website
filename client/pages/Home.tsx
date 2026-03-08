import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/AuthModal";
import ContactModal from "@/components/ContactModal";
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
  MessageCircle,
} from "lucide-react";
import { cn, formatINRPrice } from "@/lib/utils";

interface ProductCardProps {
  product: (typeof PRODUCTS)[0];
}

function ProductCard({ product }: ProductCardProps) {
  const store = useStore();
  const {
    cart = [],
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = store;
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  // Check if product is in cart
  const cartItem = cart?.find((item) => item.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const incrementQuantity = () => {
    if (cartQuantity < product.inStock) {
      updateCartQuantity(product.id, cartQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (cartQuantity <= 1) {
      // Remove from cart if quantity is 1 or less
      removeFromCart(product.id);
    } else {
      updateCartQuantity(product.id, cartQuantity - 1);
    }
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
                : "text-foreground/40 hover:text-foreground",
            )}
          />
        </button>

        {/* In Stock Badge */}
        <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-medium">
          {product.inStock} in stock
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 text-base">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {product.rating.toFixed(1)}/5
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-3">
          <p className="text-xs text-muted-foreground font-medium mb-1">
            Price:
          </p>
          <p className="text-2xl font-bold text-primary mb-2">
            {formatINRPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground">
              <span className="line-through">
                {formatINRPrice(product.originalPrice)}
              </span>
              <span className="ml-2 font-bold text-accent">
                Save {formatINRPrice(product.originalPrice - product.price)}
              </span>
            </p>
          )}
        </div>

        {/* Add to Cart or Quantity */}
        {cartQuantity === 0 ? (
          // Not in cart - show Add to Cart button
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        ) : (
          // In cart - show quantity controls
          <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-2 border border-primary/30">
            <button
              onClick={decrementQuantity}
              className="flex-1 py-2 text-sm font-bold text-primary rounded hover:bg-primary/20 transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center font-bold text-lg text-primary">
              {cartQuantity}
            </span>
            <button
              onClick={incrementQuantity}
              disabled={cartQuantity >= product.inStock}
              className="flex-1 py-2 text-sm font-bold text-primary rounded hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        )}
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
    image:
      "https://images.pexels.com/photos/5530440/pexels-photo-5530440.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "The quality is outstanding! I've already bought 3 different colors. Amazing customer service too!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    college: "Tech Institute",
    image:
      "https://images.pexels.com/photos/9898377/pexels-photo-9898377.png?auto=compress&cs=tinysrgb&w=200",
    review:
      "Perfect prices and excellent quality. The student discount made my purchase even better!",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    college: "Central College",
    image:
      "https://images.pexels.com/photos/7479813/pexels-photo-7479813.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Love the accessories! The water bottle and tote bag are super useful for daily life.",
    rating: 4,
  },
  {
    name: "Alex Rodriguez",
    college: "Metro University",
    image:
      "https://images.pexels.com/photos/9900333/pexels-photo-9900333.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Fantastic selection and the delivery was super fast. Will definitely order again soon!",
    rating: 5,
  },
  {
    name: "Jessica Liu",
    college: "West Coast Academy",
    image:
      "https://images.pexels.com/photos/9838766/pexels-photo-9838766.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "The hoodies are so comfortable and stylish. Best purchase I've made all semester!",
    rating: 5,
  },
  {
    name: "David Thompson",
    college: "Northern College",
    image:
      "https://images.pexels.com/photos/10104320/pexels-photo-10104320.jpeg?auto=compress&cs=tinysrgb&w=200",
    review:
      "Great value for money. The backpack is perfect for campus and travel. Highly recommend!",
    rating: 4,
  },
];

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { userName, setUserName } = useStore();

  const trendingProducts = PRODUCTS.filter((p) => p.category === "trending");
  const menProducts = PRODUCTS.filter((p) => p.category === "men");
  const womenProducts = PRODUCTS.filter((p) => p.category === "women");
  const accessoryProducts = PRODUCTS.filter(
    (p) => p.category === "accessories",
  );

  const handleLogout = () => {
    setUserName(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        cartCount={0}
        isAuthenticated={!!userName}
        userName={userName}
        onAuthClick={() => setAuthModalOpen(true)}
        onLogoutClick={handleLogout}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-black py-16 md:py-32 overflow-hidden min-h-[600px] flex items-center">
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-500/25 rounded-full blur-3xl animate-pulse delay-700 -z-10" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-bounce -z-10" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl -z-10" />

        <div className="container flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full mb-8 border border-cyan-400/60 backdrop-blur">
            <Zap className="w-4 h-4 text-cyan-300 animate-bounce" />
            <span className="text-sm font-bold text-cyan-200">
              New Collection Live
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight slide-up">
            Your College{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 animate-pulse">
              Style
            </span>
            ,
            <br />
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-pink-300">
              Rules
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-medium">
            Discover premium college merchandise designed for students who want
            to stand out. Unbeatable quality, incredible prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-bold rounded-xl hover:shadow-2xl active:scale-95 transition-all duration-200 shadow-lg text-base md:text-lg hover:shadow-cyan-500/50"
            >
              Shop Now
            </button>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-8 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/30 hover:border-white transition-all duration-200 text-base md:text-lg"
            >
              {userName ? "View Account" : "Sign Up Free"}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400">
                50k+
              </div>
              <p className="text-xs md:text-sm text-white/70 mt-1">
                Happy Students
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-violet-400">
                500+
              </div>
              <p className="text-xs md:text-sm text-white/70 mt-1">
                Products
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-fuchsia-400">
                100%
              </div>
              <p className="text-xs md:text-sm text-white/70 mt-1">
                Authentic
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section
        id="trending"
        className="py-16 md:py-24 scroll-mt-16 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950"
      >
        <div className="container">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full mb-6 border border-violet-400/50 backdrop-blur">
              <TrendingUp className="w-4 h-4 text-violet-300 animate-bounce" />
              <span className="text-sm font-bold text-violet-200">
                Trending Now
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
                Hot Right Now
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
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
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-16 md:py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mb-6 border border-cyan-400/50 backdrop-blur">
              <Gift className="w-4 h-4 text-cyan-300 animate-bounce" />
              <span className="text-sm font-bold text-cyan-200">
                Exclusive Offers
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Limited Time{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Coupons
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
              Unlock massive savings with our exclusive discount codes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUPONS.map((coupon, idx) => (
              <div
                key={idx}
                className="stagger-item bg-gradient-to-br from-white to-accent/5 rounded-2xl p-8 border-2 border-accent/20 hover:border-accent/80 transition-all duration-300 group cursor-pointer shadow-md hover:shadow-xl transform hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      Save up to
                    </p>
                    <h3 className="text-5xl font-black text-accent group-hover:scale-110 transition-transform origin-left duration-300">
                      {coupon.discount}
                    </h3>
                  </div>
                  <div className="text-4xl">🎉</div>
                </div>
                <p className="text-foreground/70 font-bold text-lg mb-6">
                  {coupon.description}
                </p>
                <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4 group-hover:from-accent group-hover:to-primary transition-all duration-300 group-hover:text-white border border-accent/20">
                  <p className="text-xs font-bold text-muted-foreground group-hover:text-white/70 uppercase tracking-widest mb-1">
                    Code
                  </p>
                  <p className="text-2xl font-black font-mono group-hover:text-white">
                    {coupon.code}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Collection */}
      <section id="men" className="py-16 md:py-24 scroll-mt-16 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="container">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mb-6 border border-blue-400/50 backdrop-blur">
              <Users className="w-4 h-4 text-blue-300 animate-bounce" />
              <span className="text-sm font-bold text-blue-200">For Him</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Men's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Collection
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
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
      <section
        id="women"
        className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 py-16 md:py-24 scroll-mt-16"
      >
        <div className="container">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-full mb-6 border border-fuchsia-400/50 backdrop-blur">
              <Users className="w-4 h-4 text-fuchsia-300 animate-bounce" />
              <span className="text-sm font-bold text-fuchsia-200">For Her</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Women's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-pink-300">
                Collection
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full mb-6 border border-violet-400/50 backdrop-blur">
              <Award className="w-4 h-4 text-violet-300 animate-bounce" />
              <span className="text-sm font-bold text-violet-200">
                Must-Have Items
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              College{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300">
                Accessories
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
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
      <section className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 py-16 md:py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mb-6 border border-cyan-400/50 backdrop-blur">
              <MessageCircle className="w-4 h-4 text-cyan-300 animate-bounce" />
              <span className="text-sm font-bold text-cyan-200">
                Real Reviews
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What Students Are{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Saying
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
              Join thousands of happy college students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground/70 mb-4">"{testimonial.review}"</p>

                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.college}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16 md:py-24 scroll-mt-16 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Browse All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
                Products
              </span>
            </h2>
            <p className="text-white/70 text-lg font-medium">
              Explore our complete catalog of college merchandise
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
        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-700 text-white py-16 md:py-28 scroll-mt-16 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/15 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl -z-10" />

        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Questions? We're Here to Help
            </h2>
            <p className="text-lg md:text-xl mb-10 font-medium opacity-95">
              Have questions about our products or need support? Get in touch
              with our friendly team and we'll be happy to assist you.
            </p>

            <button
              onClick={() => setContactModalOpen(true)}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl active:scale-95 transition-all duration-200 text-base md:text-lg hover:shadow-white/30"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
        }}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
