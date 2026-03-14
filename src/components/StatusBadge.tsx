import { cn } from '@/lib/utils';
import { ListingStatus } from '@/types/database';

const statusConfig: Record<string, { bg: string; text: string }> = {
  available: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  requested: { bg: 'bg-orange-50', text: 'text-orange-700' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-700' },
  pickup_scheduled: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
  picked_up: { bg: 'bg-violet-50', text: 'text-violet-700' },
  delivered: { bg: 'bg-teal-50', text: 'text-teal-700' },
  completed: { bg: 'bg-slate-100', text: 'text-slate-700' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700' },
  verified: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  unverified: { bg: 'bg-slate-100', text: 'text-slate-600' },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
      config.bg, config.text, className
    )}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
