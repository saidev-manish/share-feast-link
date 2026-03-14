import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { FoodListing } from '@/types/database';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UtensilsCrossed, Clock, MapPin, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BrowseFood() {
  const { profile } = useAuth();
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [foodTypeFilter, setFoodTypeFilter] = useState('all');
  const [requesting, setRequesting] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('food_listings')
        .select('*, restaurant_profile:restaurant_profiles(*)')
        .eq('status', 'available')
        .order('created_at', { ascending: false });
      if (data) setListings(data as any);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleRequest = async (listingId: string) => {
    if (!profile?.verified) {
      toast.error('Your account must be verified to request donations.');
      return;
    }
    setRequesting(listingId);
    try {
      const { data: ngo } = await supabase.from('ngo_profiles').select('id').eq('profile_id', profile.id).single();
      if (!ngo) throw new Error('NGO profile not found');
      const { error } = await supabase.from('donation_requests').insert({
        food_listing_id: listingId,
        ngo_profile_id: ngo.id,
        status: 'pending',
      });
      if (error) throw error;
      toast.success('Request sent! The restaurant will be notified.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setRequesting(null);
    }
  };

  const filtered = listings.filter(l => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (foodTypeFilter !== 'all' && l.food_type !== foodTypeFilter) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Browse Available Food</h2>

        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search food..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={foodTypeFilter} onValueChange={setFoodTypeFilter}>
            <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="veg">Vegetarian</SelectItem>
              <SelectItem value="non-veg">Non-Veg</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="bg-card rounded-xl shadow-card p-12 text-center">
            <UtensilsCrossed className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No available food listings right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(listing => (
              <div key={listing.id} className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-shadow space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{listing.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{listing.quantity} · {listing.meals_count} meals</p>
                  </div>
                  <StatusBadge status={listing.food_type} />
                </div>
                {listing.description && <p className="text-sm text-muted-foreground">{listing.description}</p>}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Best before: {new Date(listing.best_before).toLocaleString()}</span>
                </div>
                {listing.address && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" /> {listing.address}
                  </div>
                )}
                <Button size="sm" className="w-full" onClick={() => handleRequest(listing.id)} disabled={requesting === listing.id}>
                  {requesting === listing.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Request This Food'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
