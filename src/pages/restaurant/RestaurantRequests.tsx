import { DashboardLayout } from '@/components/DashboardLayout';
import { ClipboardList } from 'lucide-react';

export default function RestaurantRequests() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Incoming Requests</h2>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <ClipboardList className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No requests yet. They'll appear here when NGOs request your listings.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
