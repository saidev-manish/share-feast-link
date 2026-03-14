import { DashboardLayout } from '@/components/DashboardLayout';
import { ClipboardList } from 'lucide-react';

export default function VolunteerHistory() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Delivery History</h2>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <ClipboardList className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Your completed deliveries will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
