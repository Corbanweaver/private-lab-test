export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      biomarker_results: {
        Row: {
          educational_insight: string;
          flag: string;
          id: string;
          name: string;
          reference_range: string;
          report_id: string;
          unit: string;
          value: string;
        };
        Insert: {
          educational_insight: string;
          flag: string;
          id?: string;
          name: string;
          reference_range: string;
          report_id: string;
          unit: string;
          value: string;
        };
        Update: {
          educational_insight?: string;
          flag?: string;
          id?: string;
          name?: string;
          reference_range?: string;
          report_id?: string;
          unit?: string;
          value?: string;
        };
        Relationships: [
          {
            foreignKeyName: "biomarker_results_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "result_reports";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_orders: {
        Row: {
          appointment_url: string | null;
          created_at: string;
          id: string;
          order_number: string;
          panel_id: string | null;
          provider_name: string | null;
          provider_order_id: string | null;
          requisition_url: string | null;
          state: string;
          status: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id: string | null;
          total_cents: number;
          updated_at: string;
          user_id: string;
          zip: string | null;
        };
        Insert: {
          appointment_url?: string | null;
          created_at?: string;
          id?: string;
          order_number: string;
          panel_id?: string | null;
          provider_name?: string | null;
          provider_order_id?: string | null;
          requisition_url?: string | null;
          state: string;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string | null;
          total_cents: number;
          updated_at?: string;
          user_id: string;
          zip?: string | null;
        };
        Update: {
          appointment_url?: string | null;
          created_at?: string;
          id?: string;
          order_number?: string;
          panel_id?: string | null;
          provider_name?: string | null;
          provider_order_id?: string | null;
          requisition_url?: string | null;
          state?: string;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string | null;
          total_cents?: number;
          updated_at?: string;
          user_id?: string;
          zip?: string | null;
        };
        Relationships: [];
      };
      lab_tests: {
        Row: {
          biomarkers: string[];
          category: string;
          created_at: string;
          description: string;
          fasting: string;
          id: string;
          name: string;
          price_cents: number;
          provider_code: string;
          specimen: string;
          tags: string[];
          turnaround: string;
        };
        Insert: {
          biomarkers?: string[];
          category: string;
          created_at?: string;
          description: string;
          fasting: string;
          id: string;
          name: string;
          price_cents: number;
          provider_code: string;
          specimen: string;
          tags?: string[];
          turnaround: string;
        };
        Update: {
          biomarkers?: string[];
          category?: string;
          created_at?: string;
          description?: string;
          fasting?: string;
          id?: string;
          name?: string;
          price_cents?: number;
          provider_code?: string;
          specimen?: string;
          tags?: string[];
          turnaround?: string;
        };
        Relationships: [];
      };
      panels: {
        Row: {
          compare_at_cents: number;
          created_at: string;
          description: string;
          goal: string;
          id: string;
          name: string;
          price_cents: number;
          subtitle: string;
          tags: string[];
          test_ids: string[];
        };
        Insert: {
          compare_at_cents: number;
          created_at?: string;
          description: string;
          goal: string;
          id: string;
          name: string;
          price_cents: number;
          subtitle: string;
          tags?: string[];
          test_ids?: string[];
        };
        Update: {
          compare_at_cents?: number;
          created_at?: string;
          description?: string;
          goal?: string;
          id?: string;
          name?: string;
          price_cents?: number;
          subtitle?: string;
          tags?: string[];
          test_ids?: string[];
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          role: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          role?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          role?: string;
        };
        Relationships: [];
      };
      result_reports: {
        Row: {
          collection_date: string;
          created_at: string;
          id: string;
          order_id: string;
          released_at: string | null;
          review_status: string;
          storage_path: string;
        };
        Insert: {
          collection_date: string;
          created_at?: string;
          id?: string;
          order_id: string;
          released_at?: string | null;
          review_status?: string;
          storage_path: string;
        };
        Update: {
          collection_date?: string;
          created_at?: string;
          id?: string;
          order_id?: string;
          released_at?: string | null;
          review_status?: string;
          storage_path?: string;
        };
        Relationships: [
          {
            foreignKeyName: "result_reports_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "lab_orders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status:
        | "draft"
        | "eligible"
        | "paid"
        | "submitted_to_provider"
        | "lab_order_ready"
        | "collected"
        | "results_received"
        | "reviewed"
        | "released";
    };
    CompositeTypes: Record<string, never>;
  };
};

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "draft",
        "eligible",
        "paid",
        "submitted_to_provider",
        "lab_order_ready",
        "collected",
        "results_received",
        "reviewed",
        "released",
      ],
    },
  },
} as const;
