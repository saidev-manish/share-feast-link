export type UserRole = 'restaurant' | 'ngo' | 'volunteer' | 'admin';
export type ListingStatus = 'available' | 'requested' | 'approved' | 'pickup_scheduled' | 'picked_up' | 'delivered' | 'completed' | 'cancelled';
export type FoodType = 'veg' | 'non-veg' | 'vegan';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: UserRole;
  phone: string | null;
  avatar_url: string | null;
  verified: boolean;
  created_at: string;
}

export interface RestaurantProfile {
  id: string;
  profile_id: string;
  business_name: string;
  business_type: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  verification_docs_url: string | null;
}

export interface NgoProfile {
  id: string;
  profile_id: string;
  organization_name: string;
  organization_type: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  verification_docs_url: string | null;
}

export interface FoodListing {
  id: string;
  restaurant_profile_id: string;
  title: string;
  description: string | null;
  category: string | null;
  food_type: FoodType;
  quantity: string | null;
  meals_count: number | null;
  prepared_at: string | null;
  best_before: string;
  pickup_start: string;
  pickup_end: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  special_instructions: string | null;
  safety_confirmed: boolean;
  status: ListingStatus;
  created_at: string;
  restaurant_profile?: RestaurantProfile;
}

export interface DonationRequest {
  id: string;
  food_listing_id: string;
  ngo_profile_id: string;
  message: string | null;
  status: string;
  requested_at: string;
  approved_at: string | null;
  completed_at: string | null;
  food_listing?: FoodListing;
  ngo_profile?: NgoProfile;
}

export interface VolunteerAssignment {
  id: string;
  donation_request_id: string;
  volunteer_profile_id: string;
  status: string;
  assigned_at: string;
  completed_at: string | null;
  donation_request?: DonationRequest;
}

export interface Message {
  id: string;
  sender_profile_id: string;
  receiver_profile_id: string;
  food_listing_id: string | null;
  donation_request_id: string | null;
  content: string;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_profile_id: string;
  target_type: string;
  target_id: string;
  reason: string;
  details: string | null;
  status: string;
  created_at: string;
}

export interface Notification {
  id: string;
  profile_id: string;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}
