import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import MessagesPage from "./pages/MessagesPage";

import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import CreateListing from "./pages/restaurant/CreateListing";
import RestaurantListings from "./pages/restaurant/RestaurantListings";
import RestaurantRequests from "./pages/restaurant/RestaurantRequests";

import NgoDashboard from "./pages/ngo/NgoDashboard";
import BrowseFood from "./pages/ngo/BrowseFood";
import NgoRequests from "./pages/ngo/NgoRequests";

import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerAssignments from "./pages/volunteer/VolunteerAssignments";
import VolunteerHistory from "./pages/volunteer/VolunteerHistory";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerify from "./pages/admin/AdminVerify";
import { AdminDonations, AdminReports, AdminAnalytics, AdminUsers } from "./pages/admin/AdminPages";

const queryClient = new QueryClient();

function AuthRedirect() {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  if (!user) return <AuthPage />;
  if (profile) return <Navigate to={`/${profile.role}/dashboard`} replace />;
  return <AuthPage />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthRedirect />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Restaurant */}
            <Route path="/restaurant/dashboard" element={<ProtectedRoute allowedRoles={['restaurant']}><RestaurantDashboard /></ProtectedRoute>} />
            <Route path="/restaurant/listings" element={<ProtectedRoute allowedRoles={['restaurant']}><RestaurantListings /></ProtectedRoute>} />
            <Route path="/restaurant/listings/new" element={<ProtectedRoute allowedRoles={['restaurant']}><CreateListing /></ProtectedRoute>} />
            <Route path="/restaurant/requests" element={<ProtectedRoute allowedRoles={['restaurant']}><RestaurantRequests /></ProtectedRoute>} />
            <Route path="/restaurant/messages" element={<ProtectedRoute allowedRoles={['restaurant']}><MessagesPage /></ProtectedRoute>} />

            {/* NGO */}
            <Route path="/ngo/dashboard" element={<ProtectedRoute allowedRoles={['ngo']}><NgoDashboard /></ProtectedRoute>} />
            <Route path="/ngo/browse" element={<ProtectedRoute allowedRoles={['ngo']}><BrowseFood /></ProtectedRoute>} />
            <Route path="/ngo/requests" element={<ProtectedRoute allowedRoles={['ngo']}><NgoRequests /></ProtectedRoute>} />
            <Route path="/ngo/messages" element={<ProtectedRoute allowedRoles={['ngo']}><MessagesPage /></ProtectedRoute>} />

            {/* Volunteer */}
            <Route path="/volunteer/dashboard" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerDashboard /></ProtectedRoute>} />
            <Route path="/volunteer/assignments" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerAssignments /></ProtectedRoute>} />
            <Route path="/volunteer/history" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerHistory /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/verify" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerify /></ProtectedRoute>} />
            <Route path="/admin/donations" element={<ProtectedRoute allowedRoles={['admin']}><AdminDonations /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
