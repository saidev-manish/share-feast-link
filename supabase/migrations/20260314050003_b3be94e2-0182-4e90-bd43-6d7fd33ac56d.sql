-- Create enums
CREATE TYPE public.user_role AS ENUM ('restaurant', 'ngo', 'volunteer', 'admin');
CREATE TYPE public.listing_status AS ENUM ('available', 'requested', 'approved', 'pickup_scheduled', 'picked_up', 'delivered', 'completed', 'cancelled');

-- 1. Profiles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role user_role DEFAULT 'restaurant',
  phone TEXT,
  avatar_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Restaurant Profiles
CREATE TABLE public.restaurant_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT,
  verification_docs_url TEXT
);

ALTER TABLE public.restaurant_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view restaurant profiles" ON public.restaurant_profiles FOR SELECT USING (true);
CREATE POLICY "Owner can insert restaurant profile" ON public.restaurant_profiles FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Owner can update restaurant profile" ON public.restaurant_profiles FOR UPDATE USING (auth.uid() = profile_id);

-- 3. NGO Profiles
CREATE TABLE public.ngo_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  organization_name TEXT NOT NULL,
  organization_type TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT,
  verification_docs_url TEXT
);

ALTER TABLE public.ngo_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view ngo profiles" ON public.ngo_profiles FOR SELECT USING (true);
CREATE POLICY "Owner can insert ngo profile" ON public.ngo_profiles FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Owner can update ngo profile" ON public.ngo_profiles FOR UPDATE USING (auth.uid() = profile_id);

-- 4. Food Listings
CREATE TABLE public.food_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_profile_id UUID REFERENCES public.restaurant_profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  food_type TEXT DEFAULT 'veg',
  quantity TEXT,
  meals_count INTEGER,
  prepared_at TIMESTAMPTZ,
  best_before TIMESTAMPTZ NOT NULL,
  pickup_start TIMESTAMPTZ NOT NULL,
  pickup_end TIMESTAMPTZ NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image_url TEXT,
  special_instructions TEXT,
  safety_confirmed BOOLEAN DEFAULT false,
  status listing_status DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.food_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view available listings" ON public.food_listings FOR SELECT USING (true);
CREATE POLICY "Restaurant owner can insert listings" ON public.food_listings FOR INSERT WITH CHECK (
  restaurant_profile_id IN (SELECT id FROM public.restaurant_profiles WHERE profile_id = auth.uid())
);
CREATE POLICY "Restaurant owner can update own listings" ON public.food_listings FOR UPDATE USING (
  restaurant_profile_id IN (SELECT id FROM public.restaurant_profiles WHERE profile_id = auth.uid())
);
CREATE POLICY "Restaurant owner can delete own listings" ON public.food_listings FOR DELETE USING (
  restaurant_profile_id IN (SELECT id FROM public.restaurant_profiles WHERE profile_id = auth.uid())
);

-- 5. Donation Requests
CREATE TABLE public.donation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  food_listing_id UUID REFERENCES public.food_listings(id) NOT NULL,
  ngo_profile_id UUID REFERENCES public.ngo_profiles(id) NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "NGO can view own requests" ON public.donation_requests FOR SELECT USING (
  ngo_profile_id IN (SELECT id FROM public.ngo_profiles WHERE profile_id = auth.uid())
  OR food_listing_id IN (SELECT fl.id FROM public.food_listings fl JOIN public.restaurant_profiles rp ON fl.restaurant_profile_id = rp.id WHERE rp.profile_id = auth.uid())
);
CREATE POLICY "NGO can insert requests" ON public.donation_requests FOR INSERT WITH CHECK (
  ngo_profile_id IN (SELECT id FROM public.ngo_profiles WHERE profile_id = auth.uid())
);
CREATE POLICY "Involved parties can update requests" ON public.donation_requests FOR UPDATE USING (
  ngo_profile_id IN (SELECT id FROM public.ngo_profiles WHERE profile_id = auth.uid())
  OR food_listing_id IN (SELECT fl.id FROM public.food_listings fl JOIN public.restaurant_profiles rp ON fl.restaurant_profile_id = rp.id WHERE rp.profile_id = auth.uid())
);

-- 6. Volunteer Assignments
CREATE TABLE public.volunteer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_request_id UUID REFERENCES public.donation_requests(id) NOT NULL,
  volunteer_profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  status TEXT DEFAULT 'assigned',
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.volunteer_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Volunteers can view own assignments" ON public.volunteer_assignments FOR SELECT USING (volunteer_profile_id = auth.uid());
CREATE POLICY "Volunteers can update own assignments" ON public.volunteer_assignments FOR UPDATE USING (volunteer_profile_id = auth.uid());

-- 7. Messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  receiver_profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  food_listing_id UUID REFERENCES public.food_listings(id),
  donation_request_id UUID REFERENCES public.donation_requests(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
  auth.uid() = sender_profile_id OR auth.uid() = receiver_profile_id
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_profile_id);

-- 8. Reports
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_profile_id);
CREATE POLICY "Users can view own reports" ON public.reports FOR SELECT USING (auth.uid() = reporter_profile_id);

-- 9. Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = profile_id);

-- Admin security definer function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND role = 'admin'
  )
$$;

-- Admin policies
CREATE POLICY "Admin can update all profiles" ON public.profiles FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin can view all requests" ON public.donation_requests FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin can view all assignments" ON public.volunteer_assignments FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin can view all reports" ON public.reports FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin can update reports" ON public.reports FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admin can view all notifications" ON public.notifications FOR SELECT USING (public.is_admin(auth.uid()));