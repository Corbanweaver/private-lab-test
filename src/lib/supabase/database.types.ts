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
          clinician_authorization_id: string | null;
          collection_type: Database["public"]["Enums"]["lab_collection_type"] | null;
          concierge_status: string | null;
          created_at: string;
          id: string;
          lab_partner_id: string | null;
          location_id: string | null;
          order_model: string;
          order_mode_v2: Database["public"]["Enums"]["lab_order_mode"] | null;
          order_number: string;
          panel_id: string | null;
          provider_name: string | null;
          provider_order_id: string | null;
          quote_id: string | null;
          requisition_url: string | null;
          route_id: string | null;
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
          clinician_authorization_id?: string | null;
          collection_type?: Database["public"]["Enums"]["lab_collection_type"] | null;
          concierge_status?: string | null;
          created_at?: string;
          id?: string;
          lab_partner_id?: string | null;
          location_id?: string | null;
          order_model?: string;
          order_mode_v2?: Database["public"]["Enums"]["lab_order_mode"] | null;
          order_number: string;
          panel_id?: string | null;
          provider_name?: string | null;
          provider_order_id?: string | null;
          quote_id?: string | null;
          requisition_url?: string | null;
          route_id?: string | null;
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
          clinician_authorization_id?: string | null;
          collection_type?: Database["public"]["Enums"]["lab_collection_type"] | null;
          concierge_status?: string | null;
          created_at?: string;
          id?: string;
          lab_partner_id?: string | null;
          location_id?: string | null;
          order_model?: string;
          order_mode_v2?: Database["public"]["Enums"]["lab_order_mode"] | null;
          order_number?: string;
          panel_id?: string | null;
          provider_name?: string | null;
          provider_order_id?: string | null;
          quote_id?: string | null;
          requisition_url?: string | null;
          route_id?: string | null;
          state?: string;
          status?: Database["public"]["Enums"]["order_status"];
          stripe_checkout_session_id?: string | null;
          total_cents?: number;
          updated_at?: string;
          user_id?: string;
          zip?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lab_orders_lab_partner_id_fkey";
            columns: ["lab_partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lab_orders_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: false;
            referencedRelation: "lab_network_locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lab_orders_route_id_fkey";
            columns: ["route_id"];
            isOneToOne: false;
            referencedRelation: "lab_network_routes";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_network_locations: {
        Row: {
          active: boolean;
          address: string;
          appointment_required: boolean;
          collection_type: Database["public"]["Enums"]["lab_collection_type"];
          created_at: string;
          draw_fee_cents: number;
          id: string;
          name: string;
          partner_id: string;
          route_id: string;
          state: string;
          zip: string;
        };
        Insert: {
          active?: boolean;
          address: string;
          appointment_required?: boolean;
          collection_type: Database["public"]["Enums"]["lab_collection_type"];
          created_at?: string;
          draw_fee_cents?: number;
          id: string;
          name: string;
          partner_id: string;
          route_id: string;
          state: string;
          zip: string;
        };
        Update: {
          active?: boolean;
          address?: string;
          appointment_required?: boolean;
          collection_type?: Database["public"]["Enums"]["lab_collection_type"];
          created_at?: string;
          draw_fee_cents?: number;
          id?: string;
          name?: string;
          partner_id?: string;
          route_id?: string;
          state?: string;
          zip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_network_locations_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lab_network_locations_route_id_fkey";
            columns: ["route_id"];
            isOneToOne: false;
            referencedRelation: "lab_network_routes";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_network_routes: {
        Row: {
          collection_types: Database["public"]["Enums"]["lab_collection_type"][];
          created_at: string;
          draw_fee_cents: number;
          id: string;
          name: string;
          order_mode: Database["public"]["Enums"]["lab_order_mode"];
          partner_id: string;
          platform_fee_cents: number;
          price_multiplier: number;
          restricted_states: string[];
          route_priority: number;
          states_served: string[];
          status: Database["public"]["Enums"]["lab_network_status"];
          support_note: string;
          tier: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround: string;
          updated_at: string;
        };
        Insert: {
          collection_types?: Database["public"]["Enums"]["lab_collection_type"][];
          created_at?: string;
          draw_fee_cents?: number;
          id: string;
          name: string;
          order_mode: Database["public"]["Enums"]["lab_order_mode"];
          partner_id: string;
          platform_fee_cents?: number;
          price_multiplier?: number;
          restricted_states?: string[];
          route_priority?: number;
          states_served?: string[];
          status?: Database["public"]["Enums"]["lab_network_status"];
          support_note: string;
          tier: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround: string;
          updated_at?: string;
        };
        Update: {
          collection_types?: Database["public"]["Enums"]["lab_collection_type"][];
          created_at?: string;
          draw_fee_cents?: number;
          id?: string;
          name?: string;
          order_mode?: Database["public"]["Enums"]["lab_order_mode"];
          partner_id?: string;
          platform_fee_cents?: number;
          price_multiplier?: number;
          restricted_states?: string[];
          route_priority?: number;
          states_served?: string[];
          status?: Database["public"]["Enums"]["lab_network_status"];
          support_note?: string;
          tier?: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_network_routes_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_outreach_activities: {
        Row: {
          activity_type: Database["public"]["Enums"]["lab_outreach_activity_type"];
          completed_at: string | null;
          created_at: string;
          due_at: string | null;
          id: string;
          notes: string | null;
          outcome: string;
          target_id: string;
        };
        Insert: {
          activity_type: Database["public"]["Enums"]["lab_outreach_activity_type"];
          completed_at?: string | null;
          created_at?: string;
          due_at?: string | null;
          id?: string;
          notes?: string | null;
          outcome: string;
          target_id: string;
        };
        Update: {
          activity_type?: Database["public"]["Enums"]["lab_outreach_activity_type"];
          completed_at?: string | null;
          created_at?: string;
          due_at?: string | null;
          id?: string;
          notes?: string | null;
          outcome?: string;
          target_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_outreach_activities_target_id_fkey";
            columns: ["target_id"];
            isOneToOne: false;
            referencedRelation: "lab_outreach_targets";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_outreach_targets: {
        Row: {
          ask: string;
          category: Database["public"]["Enums"]["lab_outreach_category"];
          created_at: string;
          evidence_needed: string[];
          id: string;
          last_contacted_at: string | null;
          name: string;
          next_follow_up_at: string | null;
          next_step: string;
          owner: string | null;
          priority: number;
          relationship_type: string;
          source_note: string;
          stage: Database["public"]["Enums"]["lab_outreach_stage"];
          states_focus: string[];
          updated_at: string;
          website: string;
          why_target: string;
        };
        Insert: {
          ask: string;
          category: Database["public"]["Enums"]["lab_outreach_category"];
          created_at?: string;
          evidence_needed?: string[];
          id: string;
          last_contacted_at?: string | null;
          name: string;
          next_follow_up_at?: string | null;
          next_step: string;
          owner?: string | null;
          priority: number;
          relationship_type: string;
          source_note?: string;
          stage?: Database["public"]["Enums"]["lab_outreach_stage"];
          states_focus?: string[];
          updated_at?: string;
          website: string;
          why_target: string;
        };
        Update: {
          ask?: string;
          category?: Database["public"]["Enums"]["lab_outreach_category"];
          created_at?: string;
          evidence_needed?: string[];
          id?: string;
          last_contacted_at?: string | null;
          name?: string;
          next_follow_up_at?: string | null;
          next_step?: string;
          owner?: string | null;
          priority?: number;
          relationship_type?: string;
          source_note?: string;
          stage?: Database["public"]["Enums"]["lab_outreach_stage"];
          states_focus?: string[];
          updated_at?: string;
          website?: string;
          why_target?: string;
        };
        Relationships: [];
      };
      lab_partner_locations: {
        Row: {
          address: string;
          id: string;
          name: string;
          partner_id: string;
          state: string;
          zip: string;
        };
        Insert: {
          address: string;
          id: string;
          name: string;
          partner_id: string;
          state: string;
          zip: string;
        };
        Update: {
          address?: string;
          id?: string;
          name?: string;
          partner_id?: string;
          state?: string;
          zip?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_partner_locations_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_partner_prices: {
        Row: {
          cash_price_cents: number;
          id: string;
          partner_id: string;
          test_id: string;
        };
        Insert: {
          cash_price_cents: number;
          id?: string;
          partner_id: string;
          test_id: string;
        };
        Update: {
          cash_price_cents?: number;
          id?: string;
          partner_id?: string;
          test_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_partner_prices_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lab_partner_prices_test_id_fkey";
            columns: ["test_id"];
            isOneToOne: false;
            referencedRelation: "lab_tests";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_provider_test_mappings: {
        Row: {
          active: boolean;
          cash_price_cents: number;
          created_at: string;
          id: string;
          internal_test_id: string;
          partner_id: string;
          provider_test_code: string;
        };
        Insert: {
          active?: boolean;
          cash_price_cents: number;
          created_at?: string;
          id?: string;
          internal_test_id: string;
          partner_id: string;
          provider_test_code: string;
        };
        Update: {
          active?: boolean;
          cash_price_cents?: number;
          created_at?: string;
          id?: string;
          internal_test_id?: string;
          partner_id?: string;
          provider_test_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_provider_test_mappings_internal_test_id_fkey";
            columns: ["internal_test_id"];
            isOneToOne: false;
            referencedRelation: "lab_tests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lab_provider_test_mappings_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "lab_partners";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_partners: {
        Row: {
          clia_status: Database["public"]["Enums"]["lab_partner_clia_status"];
          contact_email: string;
          contact_name: string;
          contact_title: string;
          created_at: string;
          critical_result_policy: string;
          id: string;
          name: string;
          order_workflow: string;
          requisition_process: string;
          result_delivery: Database["public"]["Enums"]["result_delivery_method"];
          states_served: string[];
          supported_test_ids: string[];
          tier: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround: string;
        };
        Insert: {
          clia_status?: Database["public"]["Enums"]["lab_partner_clia_status"];
          contact_email: string;
          contact_name: string;
          contact_title: string;
          created_at?: string;
          critical_result_policy: string;
          id: string;
          name: string;
          order_workflow: string;
          requisition_process: string;
          result_delivery: Database["public"]["Enums"]["result_delivery_method"];
          states_served?: string[];
          supported_test_ids?: string[];
          tier: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround: string;
        };
        Update: {
          clia_status?: Database["public"]["Enums"]["lab_partner_clia_status"];
          contact_email?: string;
          contact_name?: string;
          contact_title?: string;
          created_at?: string;
          critical_result_policy?: string;
          id?: string;
          name?: string;
          order_workflow?: string;
          requisition_process?: string;
          result_delivery?: Database["public"]["Enums"]["result_delivery_method"];
          states_served?: string[];
          supported_test_ids?: string[];
          tier?: Database["public"]["Enums"]["lab_partner_tier"];
          turnaround?: string;
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
      waitlist_leads: {
        Row: {
          created_at: string;
          email: string;
          first_name: string | null;
          id: string;
          interest: string | null;
          panel_id: string | null;
          source: string;
          state: string | null;
          updated_at: string;
          zip: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          first_name?: string | null;
          id?: string;
          interest?: string | null;
          panel_id?: string | null;
          source?: string;
          state?: string | null;
          updated_at?: string;
          zip?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string | null;
          id?: string;
          interest?: string | null;
          panel_id?: string | null;
          source?: string;
          state?: string | null;
          updated_at?: string;
          zip?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lab_collection_type: "walk_in" | "mobile" | "kit";
      lab_network_status: "active_mock" | "contracting" | "candidate";
      lab_order_mode: "direct_access" | "provider_authorization_included";
      lab_outreach_activity_type:
        | "email"
        | "call"
        | "form"
        | "meeting"
        | "note"
        | "pricing"
        | "contract"
        | "integration";
      lab_outreach_category:
        | "api_network"
        | "national_lab"
        | "regional_lab"
        | "mobile_phlebotomy"
        | "specialty_lab"
        | "retail_collection"
        | "data_connectivity";
      lab_outreach_stage:
        | "research"
        | "queued"
        | "contacted"
        | "meeting_booked"
        | "packet_sent"
        | "pricing_received"
        | "contracting"
        | "integrating"
        | "active"
        | "not_fit";
      lab_partner_clia_status: "verified" | "pending";
      lab_partner_tier: "aggregator" | "regional" | "mobile" | "national";
      order_status:
        | "draft"
        | "eligible"
        | "clinician_review"
        | "authorized"
        | "paid"
        | "submitted_to_provider"
        | "lab_order_ready"
        | "collected"
        | "results_received"
        | "reviewed"
        | "released";
      result_delivery_method: "api" | "sftp" | "portal" | "manual_pdf";
    };
    CompositeTypes: Record<string, never>;
  };
};

export const Constants = {
  public: {
    Enums: {
      lab_collection_type: ["walk_in", "mobile", "kit"],
      lab_network_status: ["active_mock", "contracting", "candidate"],
      lab_order_mode: ["direct_access", "provider_authorization_included"],
      lab_outreach_activity_type: ["email", "call", "form", "meeting", "note", "pricing", "contract", "integration"],
      lab_outreach_category: [
        "api_network",
        "national_lab",
        "regional_lab",
        "mobile_phlebotomy",
        "specialty_lab",
        "retail_collection",
        "data_connectivity",
      ],
      lab_outreach_stage: [
        "research",
        "queued",
        "contacted",
        "meeting_booked",
        "packet_sent",
        "pricing_received",
        "contracting",
        "integrating",
        "active",
        "not_fit",
      ],
      lab_partner_clia_status: ["verified", "pending"],
      lab_partner_tier: ["aggregator", "regional", "mobile", "national"],
      order_status: [
        "draft",
        "eligible",
        "clinician_review",
        "authorized",
        "paid",
        "submitted_to_provider",
        "lab_order_ready",
        "collected",
        "results_received",
        "reviewed",
        "released",
      ],
      result_delivery_method: ["api", "sftp", "portal", "manual_pdf"],
    },
  },
} as const;
