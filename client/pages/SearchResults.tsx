import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useStore } from "@/context/StoreContext";
import { Heart, Star, ShoppingCart, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchResults() {
  const { searchQuery, getSearchResults, addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const results = getSearchResults();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "rating">("newest");

  const categories = ["men", "women", "trending", "accessories"];

  const filteredResults = selectedCategory
    ? results.filter((p) => p.category === selectedCategory)
    : results;

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Search Results
            </h1>
            <p className="text-foreground/60">
              {searchQuery && (
                <>
                  Showing results for <span className="font-semibold">"{searchQuery}"</span>
                </>
              )}
              {results.length === 0 ? (
                <span className="text-red-500"> - No products found</span>
              ) : (
                <span> - {sortedResults.length} products found</span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="hidden lg:block">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">Filters</h3>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Category</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedCategory === null
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-muted text-foreground/70"
                      )}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted text-foreground/70"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Filter */}
                <div>
                  <h4 className="font-semibold text-sm mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {sortedResults.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-foreground/60 mb-6">Try adjusting your search or filters</p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedResults.map((product) => (
                    <div
                      key={product.id}
                      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                    >
                      {/* Image */}
                      <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.originalPrice && (
                          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-xs font-bold">
                            -
                            {Math.round(
                              ((product.originalPrice - product.price) / product.originalPrice) * 100
                            )}
                            %
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (isInWishlist(product.id)) {
                              removeFromWishlist(product.id);
                            } else {
                              addToWishlist(product);
                            }
                          }}
                          className="absolute top-3 left-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all"
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isInWishlist(product.id)
                                ? "fill-accent text-accent"
                                : "text-foreground/40"
                            )}
                          />
                        </button>

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
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
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
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
