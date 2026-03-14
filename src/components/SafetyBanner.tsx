import { ShieldCheck } from 'lucide-react';

export function SafetyBanner() {
  return (
    <div className="bg-orange-50 border-l-4 border-primary p-4 rounded-r-lg my-4">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-orange-800 font-medium">
          Food Safety Commitment: Only list food that is fresh, hygienically stored, and safe for immediate consumption.
        </p>
      </div>
    </div>
  );
}
