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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          action_taken: string | null
          alert_date: string
          alert_type: string
          created_at: string | null
          id: string
          sent_at: string | null
          status: string | null
          subscription_id: string
          user_id: string
        }
        Insert: {
          action_taken?: string | null
          alert_date: string
          alert_type: string
          created_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          subscription_id: string
          user_id: string
        }
        Update: {
          action_taken?: string | null
          alert_date?: string
          alert_type?: string
          created_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          subscription_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cancellation_guides: {
        Row: {
          community_tips: Json | null
          created_at: string | null
          direct_link: string | null
          estimated_time_minutes: number | null
          id: string
          last_verified: string | null
          logo_url: string | null
          platform_name: string
          steps: Json
          updated_at: string | null
        }
        Insert: {
          community_tips?: Json | null
          created_at?: string | null
          direct_link?: string | null
          estimated_time_minutes?: number | null
          id?: string
          last_verified?: string | null
          logo_url?: string | null
          platform_name: string
          steps: Json
          updated_at?: string | null
        }
        Update: {
          community_tips?: Json | null
          created_at?: string | null
          direct_link?: string | null
          estimated_time_minutes?: number | null
          id?: string
          last_verified?: string | null
          logo_url?: string | null
          platform_name?: string
          steps?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          accepted_at: string | null
          id: string
          invited_at: string | null
          member_email: string
          member_name: string | null
          primary_user_id: string
          status: string | null
        }
        Insert: {
          accepted_at?: string | null
          id?: string
          invited_at?: string | null
          member_email: string
          member_name?: string | null
          primary_user_id: string
          status?: string | null
        }
        Update: {
          accepted_at?: string | null
          id?: string
          invited_at?: string | null
          member_email?: string
          member_name?: string | null
          primary_user_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_members_primary_user_id_fkey"
            columns: ["primary_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string | null
          plan_type: string
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          plan_type: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          plan_type?: string
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_imports: {
        Row: {
          created_at: string | null
          id: string
          parsed_data: Json | null
          processed_at: string | null
          raw_sms_text: string
          status: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          parsed_data?: Json | null
          processed_at?: string | null
          raw_sms_text: string
          status?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          parsed_data?: Json | null
          processed_at?: string | null
          raw_sms_text?: string
          status?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_imports_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sms_imports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      spending_analytics: {
        Row: {
          category_breakdown: Json | null
          created_at: string | null
          id: string
          money_saved: number | null
          month: string
          subscription_count: number | null
          total_annual: number | null
          total_monthly: number | null
          user_id: string
        }
        Insert: {
          category_breakdown?: Json | null
          created_at?: string | null
          id?: string
          money_saved?: number | null
          month: string
          subscription_count?: number | null
          total_annual?: number | null
          total_monthly?: number | null
          user_id: string
        }
        Update: {
          category_breakdown?: Json | null
          created_at?: string | null
          id?: string
          money_saved?: number | null
          month?: string
          subscription_count?: number | null
          total_annual?: number | null
          total_monthly?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spending_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          cycle: string
          id: string
          is_active: boolean | null
          name: string
          next_renewal: string
          notes: string | null
          payment_method: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          cycle: string
          id?: string
          is_active?: boolean | null
          name: string
          next_renewal: string
          notes?: string | null
          payment_method?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          cycle?: string
          id?: string
          is_active?: boolean | null
          name?: string
          next_renewal?: string
          notes?: string | null
          payment_method?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          alert_time: string | null
          created_at: string | null
          currency: string | null
          email_alerts: boolean | null
          id: string
          push_notifications: boolean | null
          sms_alerts: boolean | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          whatsapp_alerts: boolean | null
        }
        Insert: {
          alert_time?: string | null
          created_at?: string | null
          currency?: string | null
          email_alerts?: boolean | null
          id?: string
          push_notifications?: boolean | null
          sms_alerts?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          whatsapp_alerts?: boolean | null
        }
        Update: {
          alert_time?: string | null
          created_at?: string | null
          currency?: string | null
          email_alerts?: boolean | null
          id?: string
          push_notifications?: boolean | null
          sms_alerts?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          whatsapp_alerts?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          language: string | null
          name: string | null
          phone: string | null
          premium: boolean | null
          premium_until: string | null
          sms_permission: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          language?: string | null
          name?: string | null
          phone?: string | null
          premium?: boolean | null
          premium_until?: string | null
          sms_permission?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          language?: string | null
          name?: string | null
          phone?: string | null
          premium?: boolean | null
          premium_until?: string | null
          sms_permission?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_monthly_spending:
        | { Args: { p_user_id: string }; Returns: number }
        | { Args: never; Returns: number }
      get_expiring_subscriptions: {
        Args: { days_ahead?: number }
        Returns: {
          amount: number
          days_left: number
          name: string
          next_renewal: string
          subscription_id: string
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
