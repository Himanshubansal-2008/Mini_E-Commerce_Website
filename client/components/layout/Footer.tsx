import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="font-bold text-lg">CollegeCrew</span>
            </div>
            <p className="text-background/70 text-sm">
              Your go-to destination for college merchandise and apparel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Shop Men
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Shop Women
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Trending
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:hello@collegecrew.com"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  hello@collegecrew.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+1234567890"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <p className="text-background/70">
                  123 College Ave, University City, ST 12345
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <p>&copy; 2024 CollegeCrew. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
