import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { HandHeart, ClipboardList, CheckCircle2, UtensilsCrossed } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { SafetyBanner } from '@/components/SafetyBanner';
import { FoodListing } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NgoDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({ requested: 0, approved: 0, completed: 0 });

  useEffect(() => {
    if (!profile) return;
    const fetch = async () => {
      const { data: ngo } = await supabase.from('ngo_profiles').select('id').eq('profile_id', profile.id).single();
      if (!ngo) return;
      const { data } = await supabase.from('donation_requests').select('status').eq('ngo_profile_id', ngo.id);
      if (data) {
        setStats({
          requested: data.filter(r => r.status === 'pending').length,
          approved: data.filter(r => r.status === 'approved').length,
          completed: data.filter(r => r.status === 'completed').length,
        });
      }
    };
    fetch();
  }, [profile]);

  const verified = profile?.verified;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Welcome, {profile?.full_name}</h2>
          <p className="text-sm text-muted-foreground">
            {verified ? 'Your account is verified. Browse available food donations.' : 'Your account is pending verification by admin.'}
          </p>
        </div>

        {!verified && (
          <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
            <p className="text-sm text-foreground font-medium">⏳ Verification Pending</p>
            <p className="text-xs text-muted-foreground mt-1">Your organization needs to be verified before you can request donations. This usually takes 24-48 hours.</p>
          </div>
        )}

        <SafetyBanner />

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending', value: stats.requested, icon: ClipboardList, color: 'text-warning' },
            { label: 'Approved', value: stats.approved, icon: HandHeart, color: 'text-info' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success' },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <Button asChild className="w-full md:w-auto">
          <Link to="/ngo/browse"><UtensilsCrossed className="w-4 h-4 mr-2" /> Browse Available Food</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}
