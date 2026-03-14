import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { UtensilsCrossed, ClipboardList, CheckCircle2, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { SafetyBanner } from '@/components/SafetyBanner';
import { Link } from 'react-router-dom';
import { FoodListing } from '@/types/database';

export default function RestaurantDashboard() {
  const { profile } = useAuth();
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, meals: 0 });

  useEffect(() => {
    if (!profile) return;
    const fetchData = async () => {
      // Get restaurant profile
      const { data: rp } = await supabase
        .from('restaurant_profiles')
        .select('id')
        .eq('profile_id', profile.id)
        .single();
      if (!rp) return;

      const { data } = await supabase
        .from('food_listings')
        .select('*')
        .eq('restaurant_profile_id', rp.id)
        .order('created_at', { ascending: false });

      if (data) {
        setListings(data);
        setStats({
          total: data.length,
          active: data.filter(l => l.status === 'available').length,
          completed: data.filter(l => l.status === 'completed').length,
          meals: data.reduce((sum, l) => sum + (l.meals_count || 0), 0),
        });
      }
    };
    fetchData();
  }, [profile]);

  const statCards = [
    { label: 'Total Donations', value: stats.total, icon: UtensilsCrossed, color: 'text-primary' },
    { label: 'Active Listings', value: stats.active, icon: ClipboardList, color: 'text-info' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success' },
    { label: 'Meals Donated', value: stats.meals, icon: Users, color: 'text-warning' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Welcome back, {profile?.full_name}</h2>
            <p className="text-sm text-muted-foreground">Manage your food donations</p>
          </div>
          <Button asChild>
            <Link to="/restaurant/listings/new"><Plus className="w-4 h-4 mr-2" /> List Food</Link>
          </Button>
        </div>

        <SafetyBanner />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map(s => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div className="bg-card rounded-xl shadow-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">Recent Listings</h3>
          </div>
          {listings.length === 0 ? (
            <div className="p-8 text-center">
              <UtensilsCrossed className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No food listings yet.</p>
              <Button size="sm" className="mt-3" asChild>
                <Link to="/restaurant/listings/new">Create Your First Listing</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {listings.slice(0, 10).map(listing => (
                <div key={listing.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground text-sm">{listing.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {listing.meals_count} meals · {listing.food_type} · Best before: {new Date(listing.best_before).toLocaleDateString()}
                    </div>
                  </div>
                  <StatusBadge status={listing.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
