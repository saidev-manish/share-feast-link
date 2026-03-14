import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Building2, HandHeart, Truck, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string; icon: any; desc: string }[] = [
  { value: 'restaurant', label: 'Restaurant', icon: Building2, desc: 'Donate surplus food' },
  { value: 'ngo', label: 'NGO / Orphanage', icon: HandHeart, desc: 'Request food donations' },
  { value: 'volunteer', label: 'Volunteer', icon: Truck, desc: 'Help with deliveries' },
];

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<'signin' | 'signup'>(searchParams.get('tab') === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'restaurant');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (forgotPassword) {
        const { supabase } = await import('@/lib/supabase');
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success('Password reset email sent! Check your inbox.');
        setForgotPassword(false);
      } else if (tab === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success('Welcome back!');
        // Navigate handled by auth state change
      } else {
        if (!fullName.trim()) {
          toast.error('Please enter your name');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, role, fullName);
        if (error) throw error;
        toast.success('Account created! Check your email to verify.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">FoodShare Rescue</span>
        </Link>

        <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8">
          {forgotPassword ? (
            <>
              <button onClick={() => setForgotPassword(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to sign in
              </button>
              <h2 className="font-heading font-bold text-xl text-foreground mb-2">Reset Password</h2>
              <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Tab toggle */}
              <div className="flex rounded-lg bg-muted p-1 mb-6">
                <button
                  onClick={() => setTab('signin')}
                  className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${tab === 'signin' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setTab('signup')}
                  className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${tab === 'signup' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'signup' && (
                  <>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Your name" />
                    </div>
                    <div>
                      <Label>I am a...</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1.5">
                        {roles.map(r => (
                          <button
                            key={r.value}
                            type="button"
                            onClick={() => setRole(r.value)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                              role === r.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/30'
                            }`}
                          >
                            <r.icon className={`w-5 h-5 ${role === r.value ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span className="text-xs font-medium">{r.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {tab === 'signin' && (
                      <button type="button" onClick={() => setForgotPassword(true)} className="text-xs text-primary hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" minLength={6} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : tab === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
