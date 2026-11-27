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
    PostgrestVersion: "17.1"
  }
  public: {
    Tables: {
      completed_activities: {
        Row: {
          activity_id: string
          completed_at: string
          user_id: string
        }
        Insert: {
          activity_id: string
          completed_at?: string
          user_id: string
        }
        Update: {
          activity_id?: string
          completed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_requests: {
        Row: {
          created_at: string
          id: string
          mentor_id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mentor_id: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mentor_id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mentor_requests_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          bio: string
          created_at: string
          expertise: string
          full_name: string
          id: string
          organization: string
          role_title: string
          verified: boolean
        }
        Insert: {
          bio?: string
          created_at?: string
          expertise?: string
          full_name: string
          id?: string
          organization?: string
          role_title?: string
          verified?: boolean
        }
        Update: {
          bio?: string
          created_at?: string
          expertise?: string
          full_name?: string
          id?: string
          organization?: string
          role_title?: string
          verified?: boolean
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          apply_url: string
          created_at: string
          deadline: string | null
          id: string
          kind: string
          location: string
          organization: string
          summary: string
          title: string
          verified: boolean
        }
        Insert: {
          apply_url?: string
          created_at?: string
          deadline?: string | null
          id?: string
          kind: string
          location?: string
          organization: string
          summary?: string
          title: string
          verified?: boolean
        }
        Update: {
          apply_url?: string
          created_at?: string
          deadline?: string | null
          id?: string
          kind?: string
          location?: string
          organization?: string
          summary?: string
          title?: string
          verified?: boolean
        }
        Relationships: []
      }
      portfolio_items: {
        Row: {
          created_at: string
          description: string
          id: string
          link: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          link?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          link?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string
          consent_at: string | null
          created_at: string
          full_name: string
          headline: string
          id: string
          portfolio_public: boolean
          updated_at: string
        }
        Insert: {
          bio?: string
          consent_at?: string | null
          created_at?: string
          full_name?: string
          headline?: string
          id: string
          portfolio_public?: boolean
          updated_at?: string
        }
        Update: {
          bio?: string
          consent_at?: string | null
          created_at?: string
          full_name?: string
          headline?: string
          id?: string
          portfolio_public?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      saved_opportunities: {
        Row: {
          created_at: string
          opportunity_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          opportunity_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          opportunity_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_assessments: {
        Row: {
          answers: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          updated_at?: string
          user_id?: string
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
