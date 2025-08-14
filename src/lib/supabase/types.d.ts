export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      candidatos: {
        Row: {
          area_profissional: string;
          ativo: string;
          cpf: string;
          created_at: string | null;
          email: string;
          endereco: string;
          foto_certificado_reservista: string | null;
          foto_identidade_frente: string | null;
          foto_identidade_verso: string | null;
          id: string;
          localizacao: string;
          nome_completo: string;
          numero_ctps: string | null;
          numero_identidade: string;
          numero_reservista: string | null;
          numero_titulo_eleitor: string | null;
          profissao: string;
          telefone_principal: string;
          telefone_secundario: string | null;
          updated_at: string | null;
        };
        Insert: {
          area_profissional: string;
          ativo: string;
          cpf: string;
          created_at?: string | null;
          email: string;
          endereco: string;
          foto_certificado_reservista?: string | null;
          foto_identidade_frente?: string | null;
          foto_identidade_verso?: string | null;
          id?: string;
          localizacao: string;
          nome_completo: string;
          numero_ctps?: string | null;
          numero_identidade: string;
          numero_reservista?: string | null;
          numero_titulo_eleitor?: string | null;
          profissao: string;
          telefone_principal: string;
          telefone_secundario?: string | null;
          updated_at?: string | null;
        };
        Update: {
          area_profissional?: string;
          ativo?: string;
          cpf?: string;
          created_at?: string | null;
          email?: string;
          endereco?: string;
          foto_certificado_reservista?: string | null;
          foto_identidade_frente?: string | null;
          foto_identidade_verso?: string | null;
          id?: string;
          localizacao?: string;
          nome_completo?: string;
          numero_ctps?: string | null;
          numero_identidade?: string;
          numero_reservista?: string | null;
          numero_titulo_eleitor?: string | null;
          profissao?: string;
          telefone_principal?: string;
          telefone_secundario?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profissoes: {
        Row: {
          id: number;
          nome: string;
          segmentos: number[] | null;
        };
        Insert: {
          id?: never;
          nome: string;
          segmentos?: number[] | null;
        };
        Update: {
          id?: never;
          nome?: string;
          segmentos?: number[] | null;
        };
        Relationships: [];
      };
      segmentos: {
        Row: {
          id: number;
          nome: string;
        };
        Insert: {
          id?: number;
          nome: string;
        };
        Update: {
          id?: number;
          nome?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      candidatos_view: {
        Row: {
          area_profissional: string | null;
          cpf: string | null;
          created_at: string | null;
          email: string | null;
          endereco: string | null;
          id: string | null;
          localizacao: string | null;
          nome_completo: string | null;
          numero_ctps: string | null;
          numero_identidade: string | null;
          numero_reservista: string | null;
          numero_titulo_eleitor: string | null;
          profissao: string | null;
          telefone_principal: string | null;
          telefone_secundario: string | null;
          updated_at: string | null;
          url_certificado_reservista: string | null;
          url_identidade_frente: string | null;
          url_identidade_verso: string | null;
        };
        Insert: {
          area_profissional?: string | null;
          cpf?: string | null;
          created_at?: string | null;
          email?: string | null;
          endereco?: string | null;
          id?: string | null;
          localizacao?: string | null;
          nome_completo?: string | null;
          numero_ctps?: string | null;
          numero_identidade?: string | null;
          numero_reservista?: string | null;
          numero_titulo_eleitor?: string | null;
          profissao?: string | null;
          telefone_principal?: string | null;
          telefone_secundario?: string | null;
          updated_at?: string | null;
          url_certificado_reservista?: never;
          url_identidade_frente?: never;
          url_identidade_verso?: never;
        };
        Update: {
          area_profissional?: string | null;
          cpf?: string | null;
          created_at?: string | null;
          email?: string | null;
          endereco?: string | null;
          id?: string | null;
          localizacao?: string | null;
          nome_completo?: string | null;
          numero_ctps?: string | null;
          numero_identidade?: string | null;
          numero_reservista?: string | null;
          numero_titulo_eleitor?: string | null;
          profissao?: string | null;
          telefone_principal?: string | null;
          telefone_secundario?: string | null;
          updated_at?: string | null;
          url_certificado_reservista?: never;
          url_identidade_frente?: never;
          url_identidade_verso?: never;
        };
        Relationships: [];
      };
    };
    Functions: {
      buscar_segmento_por_nome: {
        Args: { p_nome: string };
        Returns: {
          ativo: boolean;
          created_at: string;
          descricao: string;
          id: string;
          nome: string;
        }[];
      };
      inserir_candidato: {
        Args: {
          p_area_profissional: string;
          p_cpf: string;
          p_email: string;
          p_endereco: string;
          p_localizacao: string;
          p_nome_completo: string;
          p_numero_ctps: string;
          p_numero_identidade: string;
          p_numero_reservista?: string;
          p_numero_titulo_eleitor?: string;
          p_profissao: string;
          p_telefone_principal: string;
          p_telefone_secundario?: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
