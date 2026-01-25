import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-primary border-b border-neutralborder">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl md:text-3xl uppercase text-primary-foreground">
            TrustLocal
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
            >
              Home
            </Link>
            <Link 
              to="/technicians" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
            >
              Find Technicians
            </Link>
            <Link 
              to="/customer-dashboard" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
            >
              Customer Dashboard
            </Link>
            <Link 
              to="/technician-dashboard" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
            >
              Technician Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary-foreground"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 flex flex-col gap-4 pb-4">
            <Link 
              to="/" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/technicians" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Technicians
            </Link>
            <Link 
              to="/customer-dashboard" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customer Dashboard
            </Link>
            <Link 
              to="/technician-dashboard" 
              className="font-paragraph text-base text-primary-foreground hover:underline transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Technician Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
