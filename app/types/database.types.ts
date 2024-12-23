export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      background_tasks: {
        Row: {
          created_at: string
          generation_id: string | null
          id: string
          message: string | null
          progress: number | null
          queue: string | null
          result: Json | null
          runtime: number | null
          status: Database["public"]["Enums"]["task_status"]
          traceback: string | null
          updated_at: string
          user_id: string
          worker: string | null
        }
        Insert: {
          created_at?: string
          generation_id?: string | null
          id: string
          message?: string | null
          progress?: number | null
          queue?: string | null
          result?: Json | null
          runtime?: number | null
          status: Database["public"]["Enums"]["task_status"]
          traceback?: string | null
          updated_at: string
          user_id: string
          worker?: string | null
        }
        Update: {
          created_at?: string
          generation_id?: string | null
          id?: string
          message?: string | null
          progress?: number | null
          queue?: string | null
          result?: Json | null
          runtime?: number | null
          status?: Database["public"]["Enums"]["task_status"]
          traceback?: string | null
          updated_at?: string
          user_id?: string
          worker?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "background_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          created_at: string
          id: string
          stripe_customer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          stripe_customer_id: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          stripe_customer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      generations: {
        Row: {
          background_task_id: string | null
          canceled_at: string | null
          completed_at: string | null
          cost: number | null
          created_at: string
          error_message: string | null
          failed_at: string | null
          id: string
          input_params: Json
          max_retries: number
          output_url: string | null
          priority: number
          retries: number
          scheduled_at: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["generation_status"]
          subscription_id: string | null
          type: Database["public"]["Enums"]["generation_type"]
          updated_at: string
          usage_amount: number | null
          usage_metric: Database["public"]["Enums"]["usage_metric"] | null
          user_id: string
        }
        Insert: {
          background_task_id?: string | null
          canceled_at?: string | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          error_message?: string | null
          failed_at?: string | null
          id: string
          input_params: Json
          max_retries?: number
          output_url?: string | null
          priority?: number
          retries?: number
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["generation_status"]
          subscription_id?: string | null
          type: Database["public"]["Enums"]["generation_type"]
          updated_at: string
          usage_amount?: number | null
          usage_metric?: Database["public"]["Enums"]["usage_metric"] | null
          user_id: string
        }
        Update: {
          background_task_id?: string | null
          canceled_at?: string | null
          completed_at?: string | null
          cost?: number | null
          created_at?: string
          error_message?: string | null
          failed_at?: string | null
          id?: string
          input_params?: Json
          max_retries?: number
          output_url?: string | null
          priority?: number
          retries?: number
          scheduled_at?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["generation_status"]
          subscription_id?: string | null
          type?: Database["public"]["Enums"]["generation_type"]
          updated_at?: string
          usage_amount?: number | null
          usage_metric?: Database["public"]["Enums"]["usage_metric"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generations_background_task_id_fkey"
            columns: ["background_task_id"]
            isOneToOne: false
            referencedRelation: "background_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generations_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          message: string
          sent_at: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          message: string
          sent_at?: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string
          sent_at?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          interval: string | null
          interval_count: number | null
          metadata: Json | null
          product_id: string
          trial_period_days: number | null
          type: string
          unit_amount: number | null
        }
        Insert: {
          active: boolean
          created_at?: string
          currency: string
          id: string
          interval?: string | null
          interval_count?: number | null
          metadata?: Json | null
          product_id: string
          trial_period_days?: number | null
          type: string
          unit_amount?: number | null
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          interval?: string | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string
          trial_period_days?: number | null
          type?: string
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          active: boolean
          created_at?: string
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name: string
          updated_at: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean
          canceled_at: string | null
          cancellation_details: Json | null
          created_at: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string
          status: string
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end: boolean
          canceled_at?: string | null
          cancellation_details?: Json | null
          created_at?: string
          current_period_end: string
          current_period_start: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id: string
          status: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at: string
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          cancellation_details?: Json | null
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string
          status?: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_data: {
        Row: {
          billing_cycle_end: string
          billing_cycle_start: string
          created_at: string
          id: number
          limit_amount: number | null
          metric_name: string
          subscription_id: string
          updated_at: string
          usage_amount: number
          user_id: string
        }
        Insert: {
          billing_cycle_end: string
          billing_cycle_start: string
          created_at?: string
          id?: number
          limit_amount?: number | null
          metric_name: string
          subscription_id: string
          updated_at: string
          usage_amount?: number
          user_id: string
        }
        Update: {
          billing_cycle_end?: string
          billing_cycle_start?: string
          created_at?: string
          id?: number
          limit_amount?: number | null
          metric_name?: string
          subscription_id?: string
          updated_at?: string
          usage_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_data_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          billing_address: Json | null
          created_at: string
          email: string
          id: string
          status: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          email: string
          id: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at: string
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          email?: string
          id?: string
          status?: Database["public"]["Enums"]["account_status"]
          updated_at?: string
        }
        Relationships: []
      }
      webhook_logs: {
        Row: {
          event_data: Json
          event_id: string
          event_type: string
          id: number
          processed: boolean
          received_at: string
        }
        Insert: {
          event_data: Json
          event_id: string
          event_type: string
          id?: number
          processed?: boolean
          received_at?: string
        }
        Update: {
          event_data?: Json
          event_id?: string
          event_type?: string
          id?: number
          processed?: boolean
          received_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_status: "active" | "suspended" | "canceled"
      generation_status:
        | "Pending"
        | "Scheduled"
        | "Processing"
        | "Completed"
        | "Failed"
        | "Canceled"
      generation_type: "Video" | "Audio" | "Image" | "Text"
      notification_type:
        | "PaymentFailed"
        | "SubscriptionUpdated"
        | "GenerationCompleted"
        | "GenerationFailed"
        | "UsageLimitApproaching"
        | "UsageLimitExceeded"
      task_status:
        | "PENDING"
        | "STARTED"
        | "SUCCESS"
        | "FAILURE"
        | "RETRY"
        | "REVOKED"
      usage_metric: "video_minutes" | "tts_characters"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
