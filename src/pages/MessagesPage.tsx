import { DashboardLayout } from '@/components/DashboardLayout';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-foreground">Messages</h2>
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Your conversations will appear here.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
