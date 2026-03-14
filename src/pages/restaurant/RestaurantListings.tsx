import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { StatusBadge } from '@/components/StatusBadge';
import { FoodListing } from '@/types/database';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function RestaurantListings() {
  const { profile } = useAuth();
  const [listings, setListings] = useState<FoodListing[]>([]);

  useEffect(() => {
    if (!profile) return;
    const fetch = async () => {
      const { data: rp } = await supabase.from('restaurant_profiles').select('id').eq('profile_id', profile.id).single();
      if (!rp) return;
      const { data } = await supabase.from('food_listings').select('*').eq('restaurant_profile_id', rp.id).order('created_at', { ascending: false });
      if (data) setListings(data);
    };
    fetch();
  }, [profile]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-foreground">My Listings</h2>
          <Button size="sm" asChild><Link to="/restaurant/listings/new"><Plus className="w-4 h-4 mr-1" /> New</Link></Button>
        </div>
        {listings.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <UtensilsCrossed className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No listings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(l => (
              <div key={l.id} className="bg-card rounded-xl shadow-card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{l.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l.quantity} · {l.meals_count} meals · {l.food_type}</div>
                </div>
                <StatusBadge status={l.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
