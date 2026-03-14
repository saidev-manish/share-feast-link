import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, LayoutDashboard, UtensilsCrossed, ClipboardList, Users, Settings, LogOut, Bell, MessageSquare, Flag, BarChart3, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems: Record<string, { label: string; path: string; icon: any }[]> = {
  restaurant: [
    { label: 'Dashboard', path: '/restaurant/dashboard', icon: LayoutDashboard },
    { label: 'My Listings', path: '/restaurant/listings', icon: UtensilsCrossed },
    { label: 'Requests', path: '/restaurant/requests', icon: ClipboardList },
    { label: 'Messages', path: '/restaurant/messages', icon: MessageSquare },
  ],
  ngo: [
    { label: 'Dashboard', path: '/ngo/dashboard', icon: LayoutDashboard },
    { label: 'Browse Food', path: '/ngo/browse', icon: UtensilsCrossed },
    { label: 'My Requests', path: '/ngo/requests', icon: ClipboardList },
    { label: 'Messages', path: '/ngo/messages', icon: MessageSquare },
  ],
  volunteer: [
    { label: 'Dashboard', path: '/volunteer/dashboard', icon: LayoutDashboard },
    { label: 'Assignments', path: '/volunteer/assignments', icon: Truck },
    { label: 'History', path: '/volunteer/history', icon: ClipboardList },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Verify Users', path: '/admin/verify', icon: ShieldCheck },
    { label: 'All Donations', path: '/admin/donations', icon: UtensilsCrossed },
    { label: 'Reports', path: '/admin/reports', icon: Flag },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Users', path: '/admin/users', icon: Users },
  ],
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const role = profile?.role || 'restaurant';
  const items = navItems[role] || navItems.restaurant;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - hidden on mobile, shown on md+ */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-foreground">FoodShare</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {items.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-xs">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{profile?.full_name}</div>
              <div className="text-xs text-muted-foreground capitalize">{role}</div>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
          <h1 className="font-heading font-semibold text-foreground">
            {items.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden flex overflow-x-auto border-b border-border bg-card px-2 gap-1">
          {items.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                location.pathname === item.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
