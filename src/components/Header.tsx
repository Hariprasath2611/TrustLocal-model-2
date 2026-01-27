import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Technicians', path: '/technicians' },
    { name: 'For Customers', path: '/customer-dashboard' },
    { name: 'For Professionals', path: '/technician-dashboard' },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-border shadow-sm py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              TL
            </div>
            <span className={cn(
              "font-heading text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300",
              scrolled || mobileMenuOpen ? "text-foreground" : "text-primary"
            )}>
              TrustLocal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-paragraph text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary/10",
                  scrolled ? "text-muted-foreground hover:text-primary" : "text-foreground/80 hover:text-black bg-white/50 backdrop-blur-sm mr-2"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/customer-dashboard"
              className={cn(
                "ml-4 px-6 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground z-50 relative"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8 p-6 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-heading text-3xl font-bold text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.name}
                  </motion.span>
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-4"
              >
                <Link
                  to="/customer-dashboard"
                  className="flex items-center justify-center w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading text-lg font-bold shadow-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
