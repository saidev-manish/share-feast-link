import { DashboardLayout } from '@/components/DashboardLayout';
import { Truck } from 'lucide-react';

export default function VolunteerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">Volunteer Dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Open Tasks', value: 0 },
            { label: 'In Progress', value: 0 },
            { label: 'Completed', value: 0 },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card text-center">
              <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <Truck className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No delivery assignments available yet.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
