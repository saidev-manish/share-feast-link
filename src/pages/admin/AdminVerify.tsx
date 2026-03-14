import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function AdminVerify() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const fetch = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['restaurant', 'ngo'])
      .order('created_at', { ascending: false });
    if (data) setProfiles(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleVerify = async (id: string, verified: boolean) => {
    setActing(id);
    const { error } = await supabase.from('profiles').update({ verified }).eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success(verified ? 'User verified!' : 'Verification removed');
      fetch();
    }
    setActing(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Verify Users</h2>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-3">
            {profiles.map(p => (
              <div key={p.id} className="bg-card rounded-xl shadow-card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{p.full_name}</div>
                  <div className="text-xs text-muted-foreground">{p.email} · <span className="capitalize">{p.role}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.verified ? 'verified' : 'unverified'} />
                  {!p.verified ? (
                    <Button size="sm" variant="outline" onClick={() => handleVerify(p.id, true)} disabled={acting === p.id}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Verify
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleVerify(p.id, false)} disabled={acting === p.id}>
                      <XCircle className="w-4 h-4 mr-1" /> Revoke
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
