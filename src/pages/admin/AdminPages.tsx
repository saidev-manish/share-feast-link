import { DashboardLayout } from '@/components/DashboardLayout';
import { UtensilsCrossed, Flag, BarChart3, Users } from 'lucide-react';

function EmptyPage({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">{title}</h2>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <Icon className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">{desc}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function AdminDonations() {
  return <EmptyPage icon={UtensilsCrossed} title="All Donations" desc="All donation listings across the platform will appear here." />;
}

export function AdminReports() {
  return <EmptyPage icon={Flag} title="Reports" desc="Flagged reports from users will appear here." />;
}

export function AdminAnalytics() {
  return <EmptyPage icon={BarChart3} title="Analytics" desc="Platform analytics and metrics will be displayed here." />;
}

export function AdminUsers() {
  return <EmptyPage icon={Users} title="All Users" desc="User management will be available here." />;
}
