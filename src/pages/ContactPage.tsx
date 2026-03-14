import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground mb-8">Have questions or want to partner with us? We'd love to hear from you.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Mail, label: 'Email', value: 'hello@foodsharerescue.org' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
            ].map(item => (
              <div key={item.label} className="bg-card rounded-xl p-5 shadow-card text-center">
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.value}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-6 space-y-4 max-w-xl">
            <div>
              <Label>Name</Label>
              <Input required placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea required placeholder="How can we help?" rows={4} />
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
