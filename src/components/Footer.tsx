import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-background">FoodShare Rescue</span>
            </div>
            <p className="text-sm text-background/60">
              Connecting surplus food with those who need it most. Zero waste, maximum impact.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth?tab=signup&role=restaurant" className="hover:text-background transition-colors">For Restaurants</Link></li>
              <li><Link to="/auth?tab=signup&role=ngo" className="hover:text-background transition-colors">For NGOs</Link></li>
              <li><Link to="/auth?tab=signup&role=volunteer" className="hover:text-background transition-colors">For Volunteers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-background transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth?tab=signup" className="hover:text-background transition-colors">Sign Up</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Partner With Us</Link></li>
              <li><Link to="/about" className="hover:text-background transition-colors">Our Impact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/40">
          <p>© {new Date().getFullYear()} FoodShare Rescue. All rights reserved. Built with ❤️ to fight food waste.</p>
        </div>
      </div>
    </footer>
  );
}
