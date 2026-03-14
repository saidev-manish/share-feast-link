export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      donation_requests: {
        Row: {
          approved_at: string | null
          completed_at: string | null
          food_listing_id: string
          id: string
          message: string | null
          ngo_profile_id: string
          requested_at: string | null
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          completed_at?: string | null
          food_listing_id: string
          id?: string
          message?: string | null
          ngo_profile_id: string
          requested_at?: string | null
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          completed_at?: string | null
          food_listing_id?: string
          id?: string
          message?: string | null
          ngo_profile_id?: string
          requested_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_requests_food_listing_id_fkey"
            columns: ["food_listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_requests_ngo_profile_id_fkey"
            columns: ["ngo_profile_id"]
            isOneToOne: false
            referencedRelation: "ngo_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_listings: {
        Row: {
          address: string | null
          best_before: string
          category: string | null
          created_at: string | null
          description: string | null
          food_type: string | null
          id: string
          image_url: string | null
          latitude: number | null
          longitude: number | null
          meals_count: number | null
          pickup_end: string
          pickup_start: string
          prepared_at: string | null
          quantity: string | null
          restaurant_profile_id: string
          safety_confirmed: boolean | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["listing_status"] | null
          title: string
        }
        Insert: {
          address?: string | null
          best_before: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          food_type?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          meals_count?: number | null
          pickup_end: string
          pickup_start: string
          prepared_at?: string | null
          quantity?: string | null
          restaurant_profile_id: string
          safety_confirmed?: boolean | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          title: string
        }
        Update: {
          address?: string | null
          best_before?: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          food_type?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          longitude?: number | null
          meals_count?: number | null
          pickup_end?: string
          pickup_start?: string
          prepared_at?: string | null
          quantity?: string | null
          restaurant_profile_id?: string
          safety_confirmed?: boolean | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_listings_restaurant_profile_id_fkey"
            columns: ["restaurant_profile_id"]
            isOneToOne: false
            referencedRelation: "restaurant_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          donation_request_id: string | null
          food_listing_id: string | null
          id: string
          receiver_profile_id: string
          sender_profile_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          donation_request_id?: string | null
          food_listing_id?: string | null
          id?: string
          receiver_profile_id: string
          sender_profile_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          donation_request_id?: string | null
          food_listing_id?: string | null
          id?: string
          receiver_profile_id?: string
          sender_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_donation_request_id_fkey"
            columns: ["donation_request_id"]
            isOneToOne: false
            referencedRelation: "donation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_food_listing_id_fkey"
            columns: ["food_listing_id"]
            isOneToOne: false
            referencedRelation: "food_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_profile_id_fkey"
            columns: ["receiver_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_profile_id_fkey"
            columns: ["sender_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ngo_profiles: {
        Row: {
          address: string | null
          city: string | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          organization_name: string
          organization_type: string | null
          pincode: string | null
          profile_id: string
          state: string | null
          verification_docs_url: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          organization_name: string
          organization_type?: string | null
          pincode?: string | null
          profile_id: string
          state?: string | null
          verification_docs_url?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          organization_name?: string
          organization_type?: string | null
          pincode?: string | null
          profile_id?: string
          state?: string | null
          verification_docs_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ngo_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string | null
          id: string
          profile_id: string
          read: boolean | null
          title: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          profile_id: string
          read?: boolean | null
          title: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          profile_id?: string
          read?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          verified?: boolean | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_profile_id: string
          status: string | null
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_profile_id: string
          status?: string | null
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_profile_id?: string
          status?: string | null
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_profile_id_fkey"
            columns: ["reporter_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_profiles: {
        Row: {
          address: string | null
          business_name: string
          business_type: string | null
          city: string | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          pincode: string | null
          profile_id: string
          state: string | null
          verification_docs_url: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          business_type?: string | null
          city?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pincode?: string | null
          profile_id: string
          state?: string | null
          verification_docs_url?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          business_type?: string | null
          city?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pincode?: string | null
          profile_id?: string
          state?: string | null
          verification_docs_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_assignments: {
        Row: {
          assigned_at: string | null
          completed_at: string | null
          donation_request_id: string
          id: string
          status: string | null
          volunteer_profile_id: string
        }
        Insert: {
          assigned_at?: string | null
          completed_at?: string | null
          donation_request_id: string
          id?: string
          status?: string | null
          volunteer_profile_id: string
        }
        Update: {
          assigned_at?: string | null
          completed_at?: string | null
          donation_request_id?: string
          id?: string
          status?: string | null
          volunteer_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_assignments_donation_request_id_fkey"
            columns: ["donation_request_id"]
            isOneToOne: false
            referencedRelation: "donation_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_assignments_volunteer_profile_id_fkey"
            columns: ["volunteer_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      listing_status:
        | "available"
        | "requested"
        | "approved"
        | "pickup_scheduled"
        | "picked_up"
        | "delivered"
        | "completed"
        | "cancelled"
      user_role: "restaurant" | "ngo" | "volunteer" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      listing_status: [
        "available",
        "requested",
        "approved",
        "pickup_scheduled",
        "picked_up",
        "delivered",
        "completed",
        "cancelled",
      ],
      user_role: ["restaurant", "ngo", "volunteer", "admin"],
    },
  },
} as const
