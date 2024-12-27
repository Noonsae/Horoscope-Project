export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      daily_fortunes: {
        Row: {
          content: string;
          date: string;
          id: string;
          stella_id: string;
        };
        Insert: {
          content: string;
          date: string;
          id?: string;
          stella_id?: string;
        };
        Update: {
          content?: string;
          date?: string;
          id?: string;
          stella_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'daily_fortunes_stella_id_fkey';
            columns: ['stella_id'];
            isOneToOne: false;
            referencedRelation: 'stellas';
            referencedColumns: ['id'];
          }
        ];
      };
      daily_results: {
        Row: {
          created_at: string;
          daily_fortune_id: string;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          daily_fortune_id?: string;
          id?: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          daily_fortune_id?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'daily_results_daily_fortune_id_fkey';
            columns: ['daily_fortune_id'];
            isOneToOne: false;
            referencedRelation: 'daily_fortunes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'daily_results_fortune_id_fkey';
            columns: ['daily_fortune_id'];
            isOneToOne: false;
            referencedRelation: 'daily_fortunes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'daily_results_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      guestbook: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'guestBook_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      new_year_fortunes: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          stella_id: string;
          year: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id: string;
          stella_id?: string;
          year: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          stella_id?: string;
          year?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'new_year_fortunes_stella_id_fkey';
            columns: ['stella_id'];
            isOneToOne: false;
            referencedRelation: 'stellas';
            referencedColumns: ['id'];
          }
        ];
      };
      new_year_results: {
        Row: {
          created_at: string;
          id: string;
          new_year_fortune_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          new_year_fortune_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          new_year_fortune_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'new_year_results_new_year_fortune_id_fkey';
            columns: ['new_year_fortune_id'];
            isOneToOne: false;
            referencedRelation: 'new_year_fortunes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'stellaResult_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      stellas: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          img_url: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          img_url: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          img_url?: string;
          name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          birth_date: string;
          created_at: string;
          id: string;
          nickname: string;
          profile_img: string | null;
          stella_id: string;
        };
        Insert: {
          birth_date: string;
          created_at?: string;
          id?: string;
          nickname: string;
          profile_img?: string | null;
          stella_id?: string;
        };
        Update: {
          birth_date?: string;
          created_at?: string;
          id?: string;
          nickname?: string;
          profile_img?: string | null;
          stella_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_stella_id_fkey';
            columns: ['stella_id'];
            isOneToOne: false;
            referencedRelation: 'stellas';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
