import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SafetyBanner } from '@/components/SafetyBanner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function CreateListing() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [safetyConfirmed, setSafetyConfirmed] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: '', food_type: 'veg',
    quantity: '', meals_count: '', best_before: '', pickup_start: '',
    pickup_end: '', address: '', special_instructions: '',
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyConfirmed) {
      toast.error('Please confirm food safety');
      return;
    }
    setLoading(true);
    try {
      const { data: rp } = await supabase
        .from('restaurant_profiles')
        .select('id')
        .eq('profile_id', profile!.id)
        .single();
      if (!rp) throw new Error('Restaurant profile not found');

      const { error } = await supabase.from('food_listings').insert({
        restaurant_profile_id: rp.id,
        title: form.title,
        description: form.description,
        category: form.category,
        food_type: form.food_type,
        quantity: form.quantity,
        meals_count: parseInt(form.meals_count) || null,
        best_before: form.best_before,
        pickup_start: form.pickup_start,
        pickup_end: form.pickup_end,
        address: form.address,
        special_instructions: form.special_instructions,
        safety_confirmed: true,
        status: 'available',
      });
      if (error) throw error;
      toast.success('Food listing created!');
      navigate('/restaurant/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/restaurant/dashboard" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-heading font-bold text-foreground">List Surplus Food</h2>
        </div>

        <SafetyBanner />

        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Food Title *</Label>
              <Input value={form.title} onChange={e => update('title', e.target.value)} required placeholder="e.g., Biryani, Dal Rice" />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={e => update('category', e.target.value)} placeholder="e.g., Main Course, Snacks" />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe the food..." rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Food Type *</Label>
              <Select value={form.food_type} onValueChange={v => update('food_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input value={form.quantity} onChange={e => update('quantity', e.target.value)} placeholder="e.g., 5kg, 20 plates" />
            </div>
            <div>
              <Label>Number of Meals</Label>
              <Input type="number" value={form.meals_count} onChange={e => update('meals_count', e.target.value)} placeholder="e.g., 50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Best Before *</Label>
              <Input type="datetime-local" value={form.best_before} onChange={e => update('best_before', e.target.value)} required />
            </div>
            <div>
              <Label>Pickup Start *</Label>
              <Input type="datetime-local" value={form.pickup_start} onChange={e => update('pickup_start', e.target.value)} required />
            </div>
            <div>
              <Label>Pickup End *</Label>
              <Input type="datetime-local" value={form.pickup_end} onChange={e => update('pickup_end', e.target.value)} required />
            </div>
          </div>

          <div>
            <Label>Pickup Address</Label>
            <Input value={form.address} onChange={e => update('address', e.target.value)} placeholder="Full address for pickup" />
          </div>

          <div>
            <Label>Special Instructions</Label>
            <Textarea value={form.special_instructions} onChange={e => update('special_instructions', e.target.value)} placeholder="Any dietary notes, allergens, storage instructions..." rows={2} />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Checkbox id="safety" checked={safetyConfirmed} onCheckedChange={(v) => setSafetyConfirmed(v === true)} />
            <label htmlFor="safety" className="text-sm text-foreground cursor-pointer leading-relaxed">
              I confirm this food is fresh, safe for donation, hygienically stored, and within the eligible donation window.
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Listing'}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
