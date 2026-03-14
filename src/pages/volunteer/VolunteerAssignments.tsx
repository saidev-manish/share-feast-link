import { DashboardLayout } from '@/components/DashboardLayout';
import { Truck } from 'lucide-react';

export default function VolunteerAssignments() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">My Assignments</h2>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <Truck className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Available delivery tasks will show here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
