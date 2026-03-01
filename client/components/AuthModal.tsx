import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { setUserName } = useStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle auth logic here
    if (isSignUp && formData.name) {
      setUserName(formData.name);
    } else if (!isSignUp) {
      // For sign in, use email name or keep existing
      const emailName = formData.email.split("@")[0];
      setUserName(emailName);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-lg max-w-md w-full animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="flex items-center bg-muted rounded-lg px-3 py-2 gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-transparent flex-1 outline-none text-sm"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center bg-muted rounded-lg px-3 py-2 gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-transparent flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center bg-muted rounded-lg px-3 py-2 gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="bg-transparent flex-1 outline-none text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition-colors mt-6"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Toggle */}
        <div className="px-6 pb-6 text-center text-sm">
          <span className="text-foreground/60">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
          </span>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold text-primary hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
