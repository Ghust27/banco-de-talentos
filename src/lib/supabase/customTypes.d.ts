import { Tables } from "@/src/lib/supabase/types";

export type Candidato = Tables<"candidatos_view">;

export type Segmentos = Tables<"segmentos">;

export type Profissoes = Tables<"profissoes">;
