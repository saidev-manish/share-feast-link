import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Heart, UtensilsCrossed, Users, Truck, ShieldCheck,
  ArrowRight, Building2, HandHeart, UserCheck, Clock,
  ChevronDown, MapPin, BarChart3, Star
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stats = [
  { label: 'Meals Rescued', value: '12,482', icon: UtensilsCrossed },
  { label: 'Active Restaurants', value: '340', icon: Building2 },
  { label: 'Partner NGOs', value: '89', icon: HandHeart },
  { label: 'Volunteers', value: '1,200+', icon: Users },
];

const steps = [
  { icon: UtensilsCrossed, title: 'List Surplus Food', description: 'Restaurants list extra food with quantity, pickup window, and safety details.' },
  { icon: HandHeart, title: 'NGOs Request', description: 'Verified orphanages and charities browse and request available donations.' },
  { icon: Truck, title: 'Pickup & Deliver', description: 'Volunteers help pick up and deliver food to those who need it most.' },
  { icon: Heart, title: 'Make Impact', description: 'Track your contributions and see the real difference you\'re making.' },
];

const features = [
  { icon: ShieldCheck, title: 'Food Safety First', description: 'Strict safety confirmation and best-before tracking on every listing.' },
  { icon: MapPin, title: 'Location Matching', description: 'Find donations near you with distance-based search and filtering.' },
  { icon: Clock, title: 'Real-time Tracking', description: 'Track every donation from listing to delivery with live status updates.' },
  { icon: BarChart3, title: 'Impact Analytics', description: 'Measure your contribution with detailed metrics and reports.' },
  { icon: UserCheck, title: 'Verified Partners', description: 'Admin-verified NGOs and restaurants ensure trust and accountability.' },
  { icon: Star, title: 'Easy to Use', description: 'Clean, intuitive interface designed for quick listing and requesting.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Restaurant Owner', quote: 'We used to throw away 20kg of food daily. Now it feeds 50 children at a nearby orphanage.', avatar: 'PS' },
  { name: 'Rajesh Kumar', role: 'NGO Director', quote: 'FoodShare Rescue has been a lifeline for our shelter. We receive fresh meals every single day.', avatar: 'RK' },
  { name: 'Anita Desai', role: 'Volunteer', quote: 'Delivering food to families in need is the most rewarding thing I do each week.', avatar: 'AD' },
];

const faqs = [
  { q: 'How does FoodShare Rescue work?', a: 'Restaurants list surplus food, verified NGOs and orphanages request it, and volunteers help with delivery. The entire process is tracked digitally for transparency.' },
  { q: 'Is the food safe to consume?', a: 'Every listing requires a food safety confirmation. We track best-before times and pickup windows to ensure freshness. Only hygienically stored, safe food is listed.' },
  { q: 'How do NGOs get verified?', a: 'NGOs submit their registration documents during signup. Our admin team reviews and verifies them before they can request donations.' },
  { q: 'Can I volunteer for deliveries?', a: 'Yes! Sign up as a volunteer, and you\'ll see available delivery assignments near you. Accept and track deliveries right from your dashboard.' },
  { q: 'Is this service free?', a: 'Absolutely. FoodShare Rescue is completely free for all users — restaurants, NGOs, and volunteers.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" /> Fighting food waste, one meal at a time
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground leading-tight text-balance mb-6">
              Don't waste food.{' '}
              <span className="text-primary">Share it.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
              Connect restaurants with orphanages and charities for timely food donation and community support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="w-full sm:w-auto gap-2">
                <Link to="/auth?tab=signup&role=restaurant">
                  <UtensilsCrossed className="w-4 h-4" /> List Surplus Food
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto gap-2">
                <Link to="/auth?tab=signup&role=ngo">
                  <HandHeart className="w-4 h-4" /> Find Donations
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto gap-2">
                <Link to="/auth?tab=signup&role=volunteer">
                  <Truck className="w-4 h-4" /> Help Deliver
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-heading font-extrabold text-foreground tabular-nums">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to rescue food and feed communities.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute top-4 right-4 text-4xl font-heading font-extrabold text-muted/60">{i + 1}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Built for trust, speed, and real impact.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-xl border border-border hover:border-primary/20 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who can use */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Who Can Use This?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Building2, title: 'Restaurants & Hotels', desc: 'List surplus food instead of throwing it away. Build your brand as a responsible business.', cta: 'Start Donating', link: '/auth?tab=signup&role=restaurant' },
              { icon: HandHeart, title: 'NGOs & Orphanages', desc: 'Browse and request fresh food donations near you. Feed more people with zero cost.', cta: 'Find Food', link: '/auth?tab=signup&role=ngo' },
              { icon: Truck, title: 'Volunteers', desc: 'Help deliver food from restaurants to charities. Make a direct, tangible impact.', cta: 'Start Helping', link: '/auth?tab=signup&role=volunteer' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to={item.link}>{item.cta} <ArrowRight className="w-3 h-3 ml-1" /></Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Why It Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-card p-6 rounded-xl shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-2">🍽️ Food Waste Crisis</h3>
                <p className="text-sm text-muted-foreground">Over 1.3 billion tonnes of food is wasted globally each year while 828 million people go hungry. Restaurants alone waste up to 10% of the food they purchase.</p>
              </div>
              <div className="bg-card p-6 rounded-xl shadow-card">
                <h3 className="font-heading font-semibold text-foreground mb-2">❤️ Community Impact</h3>
                <p className="text-sm text-muted-foreground">Every meal rescued feeds a child, supports a shelter, or nourishes a family. Small actions create massive ripples of positive change.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What People Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-card"
              >
                <p className="text-sm text-muted-foreground mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center bg-card rounded-2xl p-8 md:p-12 shadow-elevated"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Ready to make a difference?</h2>
            <p className="text-muted-foreground mb-6">Join thousands of restaurants, NGOs, and volunteers fighting food waste together.</p>
            <Button size="lg" asChild>
              <Link to="/auth?tab=signup">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
