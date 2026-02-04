import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartCount?: number;
  isAuthenticated?: boolean;
  onAuthClick?: () => void;
  onLogoutClick?: () => void;
}

export default function Header({
  cartCount = 0,
  isAuthenticated = false,
  onAuthClick,
  onLogoutClick,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", isHash: false },
    { label: "Men", href: "men", isHash: true },
    { label: "Women", href: "women", isHash: true },
    { label: "Trending", href: "trending", isHash: true },
    { label: "Contact", href: "contact", isHash: true },
  ];

  const handleNavClick = (href: string, isHash: boolean) => {
    if (isHash) {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CC</span>
          </div>
          <span className="hidden sm:inline font-bold text-lg md:text-xl text-foreground">
            CollegeCrew
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isHash ? (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isHash)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search - Desktop */}
          <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground"
            />
          </div>

          {/* Cart */}
          <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth Button - Desktop */}
          <button
            onClick={isAuthenticated ? onLogoutClick : onAuthClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
          >
            {isAuthenticated ? (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {/* Mobile Search */}
            <div className="flex items-center bg-muted rounded-lg px-3 py-2 gap-2 mb-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
              />
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.href}
                  onClick={() => {
                    handleNavClick(link.href, link.isHash);
                  }}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2 w-full text-left"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* Mobile Auth Button */}
            <button
              onClick={() => {
                if (isAuthenticated) {
                  onLogoutClick?.();
                } else {
                  onAuthClick?.();
                }
                setIsMenuOpen(false);
              }}
              className={cn(
                "w-full px-4 py-2 rounded-lg font-medium transition-all mt-2",
                isAuthenticated
                  ? "bg-muted text-foreground hover:bg-muted/80"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {isAuthenticated ? "Logout" : "Sign In"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
