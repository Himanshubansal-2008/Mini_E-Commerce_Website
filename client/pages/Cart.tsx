import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useStore } from "@/context/StoreContext";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <section className="flex-1 flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-foreground/60 mb-8">
              Looks like you haven't added any items yet. Start shopping to fill your cart!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 border-b border-border last:border-0 flex gap-4"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Category: <span className="capitalize font-medium">{item.category}</span>
                      </p>
                      {item.selectedSize && (
                        <p className="text-sm text-muted-foreground mb-3">
                          Size: <span className="font-medium">{item.selectedSize}</span>
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, Math.min(item.inStock, item.quantity + 1))
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-6 text-primary hover:underline font-medium"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                    Free shipping on orders over $100!
                  </div>
                )}

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-all mb-3">
                  Proceed to Checkout
                </button>

                <button className="w-full border-2 border-primary text-primary font-semibold py-3 rounded-lg hover:bg-primary/5 transition-all">
                  Apply Coupon
                </button>

                {/* Promo Codes */}
                <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Popular Coupons:</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <code className="font-mono font-bold">WELCOME20</code>
                      <span className="text-green-600">-20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="font-mono font-bold">BUNDLE25</code>
                      <span className="text-green-600">-25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <code className="font-mono font-bold">STUDENT15</code>
                      <span className="text-green-600">-15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
