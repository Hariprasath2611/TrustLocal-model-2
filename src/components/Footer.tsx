import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-secondary">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-2xl uppercase text-foreground mb-4">
              TrustLocal
            </h3>
            <p className="font-paragraph text-base text-secondary-foreground">
              Connecting customers with verified local service technicians for all your home and business needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg uppercase text-foreground mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/technicians" 
                className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
              >
                Find Technicians
              </Link>
              <Link 
                to="/customer-dashboard" 
                className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
              >
                Customer Dashboard
              </Link>
              <Link 
                to="/technician-dashboard" 
                className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
              >
                Technician Dashboard
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg uppercase text-foreground mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-3 font-paragraph text-base text-secondary-foreground">
              <li>Plumbing</li>
              <li>Electrical Work</li>
              <li>HVAC Services</li>
              <li>Carpentry</li>
              <li>Appliance Repair</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg uppercase text-foreground mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground">
                  support@trustlocal.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-secondary-foreground">
                  123 Service Street, Tech City, TC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutralborder">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground">
              © 2026 TrustLocal. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="font-paragraph text-sm text-secondary-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="font-paragraph text-sm text-secondary-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
