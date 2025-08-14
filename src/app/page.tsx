"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "../utils/supabase/client/createClient";
import { Tables } from "../lib/supabase/types";
import CandidatosTable from "../components/organisms/CandidatesTable";
import TableHeader from "../components/organisms/TableHeader";

type Candidatos = Tables<"candidatos_view">[];

interface Filters {
  searchTerm: string;
  segmento: string;
  profissao: string;
}

export default function Page() {
  const [candidatos, setCandidatos] = useState<Candidatos | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    segmento: "",
    profissao: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>({
    searchTerm: "",
    segmento: "",
    profissao: "",
  });

  const [totalCount, setTotalCount] = useState(0);

  // Debounce para esperar o usuário terminar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // atraso de 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const handleUpload = async (cpf: string) => {
    const supabase = createClient();
    if (!file) return;
    try {
      const { data, error } = await supabase.storage
        .from("documentos-candidatos")
        .upload(
          `${cpf}/${file.name
            .replace(/\s+/g, "")
            .replace(/[^a-zA-Z0-9._-]/g, "")
            .toLowerCase()}`,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );
      if (error) {
        console.error(error);
        return error;
      }
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      setLoading(true);

      try {
        let query = supabase.from("candidatos_view").select("*");
        const conditions: string[] = [];

        // Aplicar filtro de busca textual se houver
        if (debouncedFilters.searchTerm) {
          conditions.push(
            [
              `nome_completo.ilike.%${debouncedFilters.searchTerm}%`,
              `cpf.ilike.%${debouncedFilters.searchTerm}%`,
              `email.ilike.%${debouncedFilters.searchTerm}%`,
              `telefone_principal.ilike.%${debouncedFilters.searchTerm}%`,
              `telefone_secundario.ilike.%${debouncedFilters.searchTerm}%`,
              `area_profissional.ilike.%${debouncedFilters.searchTerm}%`,
              `profissao.ilike.%${debouncedFilters.searchTerm}%`,
              `localizacao.ilike.%${debouncedFilters.searchTerm}%`,
              `numero_identidade.ilike.%${debouncedFilters.searchTerm}%`,
              `numero_titulo_eleitor.ilike.%${debouncedFilters.searchTerm}%`,
            ].join(",")
          );
        }

        // Aplicar filtro de segmento (baseado no campo area_profissional)
        if (debouncedFilters.segmento) {
          query = query.ilike(
            "area_profissional",
            `%${debouncedFilters.segmento}%`
          );
        }

        // Aplicar filtro de profissão
        if (debouncedFilters.profissao) {
          query = query.ilike("profissao", `%${debouncedFilters.profissao}%`);
        }

        // Se há busca textual, aplicar como OR
        if (conditions.length > 0) {
          query = query.or(conditions[0]);
        }

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        // Buscar contagem total (sem filtros para mostrar o total geral)
        const { count, error: countError } = await supabase
          .from("candidatos_view")
          .select("*", { count: "exact", head: true });

        if (count) setTotalCount(count);

        if (error || countError) {
          console.error(error || countError);
          return;
        }

        setCandidatos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedFilters]);

  const handleFilter = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={() => handleUpload("123.456.789.11")}>Enviar</button>
      </div>

      <TableHeader
        onFilter={handleFilter}
        totalCandidates={totalCount}
        filteredCandidates={candidatos?.length}
      />

      {!loading && candidatos && (
        <div className="text-center py-4">
          <CandidatosTable
            candidatos={candidatos}
            loading={loading}
            onFilter={(term: string) =>
              handleFilter({ ...filters, searchTerm: term })
            }
            totalCount={0}
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <p>Carregando candidatos...</p>
        </div>
      )}
    </div>
  );
}
