import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Heart, Users, Target, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">About FoodShare Rescue</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're on a mission to eliminate food waste by connecting restaurants with surplus food to orphanages, NGOs, and shelters that need it most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Heart, title: 'Our Mission', desc: 'Bridge the gap between food surplus and food scarcity through technology.' },
              { icon: Users, title: 'Community First', desc: 'Built by and for communities that believe no meal should go to waste.' },
              { icon: Target, title: 'Transparency', desc: 'Every donation is tracked from listing to delivery for full accountability.' },
              { icon: Globe, title: 'Scalable Impact', desc: 'Designed to work across cities, supporting restaurants and NGOs everywhere.' },
            ].map(item => (
              <div key={item.title} className="bg-card rounded-xl p-6 shadow-card">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
