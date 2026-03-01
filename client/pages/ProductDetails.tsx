import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronRight,
  Check,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { cn, formatINRPrice } from "@/lib/utils";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartAdded, setCartAdded] = useState(false);

  const product = {
    id: "1",
    name: "Classic College Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 234,
    inStock: 45,
    category: "Men's Hoodies",
    colors: ["Purple", "Blue", "Black", "White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Experience ultimate comfort with our Classic College Hoodie. Made with premium 100% cotton blend fabric, this hoodie features a spacious front pocket, adjustable drawstrings, and superior stitching. Perfect for college campus life, casual outings, or cozy nights in. The classic design with embroidered college logo makes it a timeless piece that every student needs.",
    features: [
      "Premium cotton blend (80% cotton, 20% polyester)",
      "Spacious front pocket with reinforced stitching",
      "Adjustable drawstrings for perfect fit",
      "Available in 6 sizes (XS-XXL)",
      "4 stylish color options",
      "Machine washable",
      "Durable and long-lasting",
    ],
  };

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={3} />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/" className="text-primary hover:underline">
              Men
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="flex flex-col gap-4">
              <div
                className="w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 relative overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold">
                  -{discount}%
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 left-4 p-3 bg-white/90 rounded-full hover:bg-white transition-all"
                >
                  <Heart
                    className={cn(
                      "w-6 h-6 transition-colors",
                      isFavorite
                        ? "fill-accent text-accent"
                        : "text-foreground/40"
                    )}
                  />
                </button>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-3 text-foreground">
                  Colors
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all hover:border-primary"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                <span className="text-4xl font-bold text-foreground">
                  {formatINRPrice(product.price)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatINRPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-medium text-accent">
                  Save {formatINRPrice(product.originalPrice - product.price)}
                </span>
              </div>

              {/* In Stock */}
              <div className="flex items-center gap-2 mb-8 p-3 bg-green-50 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">
                  {product.inStock} in stock
                </span>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3 text-foreground">
                  Size
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-3 px-4 rounded-lg font-semibold transition-all border-2",
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3 text-foreground">
                  Quantity
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.inStock, quantity + 1))
                    }
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mb-4",
                  cartAdded
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {cartAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <button className="w-full py-4 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                Buy Now
              </button>

              {/* Benefits */}
              <div className="mt-8 space-y-3 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    Free shipping on orders over $50
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    30-day hassle-free returns
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    100% secure checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 md:py-16 border-t border-border bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Product Details
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {product.description}
          </p>

          <h3 className="text-xl font-bold mb-4 text-foreground">Features</h3>
          <ul className="space-y-3">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground/70">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Customer Reviews
          </h2>
          <div className="space-y-6">
            {[
              {
                name: "Sarah K.",
                rating: 5,
                comment:
                  "Amazing hoodie! Super comfy and great quality. Will definitely order again!",
              },
              {
                name: "Mike T.",
                rating: 5,
                comment:
                  "Perfect fit, great colors, and fast shipping. Highly recommend!",
              },
              {
                name: "Emma R.",
                rating: 4,
                comment:
                  "Love the design. Quality is excellent. Fits true to size.",
              },
            ].map((review, idx) => (
              <div key={idx} className="pb-6 border-b border-border last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
