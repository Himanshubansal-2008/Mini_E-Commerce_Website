import { useState } from "react";
import { X, Mail, Send } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
            <p className="text-foreground/60">
              Thank you for contacting us. We'll get back to you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-3 rounded-lg hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}

        {/* Contact Info */}
        <div className="px-6 pb-6 border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Or reach us directly
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              <a href="mailto:hello@collegecrew.com" className="text-primary hover:underline">
                hello@collegecrew.com
              </a>
            </p>
            <p>
              <span className="font-semibold text-foreground">Phone:</span>{" "}
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
