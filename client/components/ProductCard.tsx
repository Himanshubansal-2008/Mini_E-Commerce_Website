import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useStore, PRODUCTS } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: typeof PRODUCTS[0];
}

export function ProductCard({ product }: ProductCardProps) {
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
            {product.rating.toFixed(1)}/5
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2 mb-4 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">Price:</span>
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Original:</span>
              <span className="text-sm text-muted-foreground line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            </div>
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
