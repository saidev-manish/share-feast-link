import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { supabase } from '@/lib/supabase';
import { BarChart3, Users, UtensilsCrossed, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, listings: 0, completed: 0, unverified: 0 });

  useEffect(() => {
    const fetch = async () => {
      const [users, listings] = await Promise.all([
        supabase.from('profiles').select('id, verified', { count: 'exact' }),
        supabase.from('food_listings').select('id, status', { count: 'exact' }),
      ]);
      setStats({
        users: users.count || 0,
        listings: listings.count || 0,
        completed: listings.data?.filter(l => l.status === 'completed').length || 0,
        unverified: users.data?.filter(u => !u.verified).length || 0,
      });
    };
    fetch();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Admin Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: stats.users, icon: Users, color: 'text-primary' },
            { label: 'Food Listings', value: stats.listings, icon: UtensilsCrossed, color: 'text-info' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-success' },
            { label: 'Unverified', value: stats.unverified, icon: ShieldCheck, color: 'text-warning' },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
