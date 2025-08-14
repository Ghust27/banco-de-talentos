import { BriefcaseBusiness, HardHat, Search, User, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import CandidateRegister from "./CandidateRegister";
import { SelectWithSearch } from "../atoms/SelectWithSearch";
import { createClient } from "@/src/utils/supabase/client/createClient";
import { Profissoes, Segmentos } from "@/src/lib/supabase/customTypes";

interface Props {
  onFilter: (filters: {
    searchTerm: string;
    segmento: string;
    profissao: string;
  }) => void;
  totalCandidates?: number;
  filteredCandidates?: number;
}

export default function TableHeader({
  onFilter,
  totalCandidates,
  filteredCandidates,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentos, setSegmentos] = useState<Segmentos[] | null>(null);
  const [profissoes, setProfissoes] = useState<Profissoes[] | null>(null);
  const [selectedSegmento, setSelectedSegmento] = useState<string>("");
  const [selectedProfissao, setSelectedProfissao] = useState<string>("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilter({
      searchTerm: value,
      segmento: selectedSegmento,
      profissao: selectedProfissao,
    });
  };

  const handleSegmentoChange = (value: string) => {
    setSelectedSegmento(value);
    onFilter({
      searchTerm,
      segmento: value,
      profissao: selectedProfissao,
    });
  };

  const handleProfissaoChange = (value: string) => {
    setSelectedProfissao(value);
    onFilter({
      searchTerm,
      segmento: selectedSegmento,
      profissao: value,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSegmento("");
    setSelectedProfissao("");
    onFilter({
      searchTerm: "",
      segmento: "",
      profissao: "",
    });
  };

  // Hook para buscar os SEGMENTOS uma única vez
  useEffect(() => {
    const supabase = createClient();
    const fetchSegmentos = async () => {
      try {
        const { data: segmentos, error } = await supabase
          .from("segmentos")
          .select("*")
          .order("nome");

        if (error) {
          console.error("Erro ao buscar segmentos:", error);
          return;
        }

        setSegmentos(segmentos);
      } catch (err) {
        console.error("Erro inesperado ao buscar segmentos:", err);
      }
    };

    fetchSegmentos();
  }, []);

  // Hook para buscar as PROFISSÕES sempre que o SEGMENTO selecionado mudar
  useEffect(() => {
    const supabase = createClient();
    const fetchProfissoesBySegmento = async () => {
      if (!selectedSegmento) {
        // Se não há segmento selecionado, buscar todas as profissões
        try {
          const { data: profissoes, error } = await supabase
            .from("profissoes")
            .select("*")
            .order("nome");

          if (error) {
            console.error("Erro ao buscar profissões:", error);
            return;
          }

          setProfissoes(profissoes);
        } catch (err) {
          console.error("Erro inesperado ao buscar profissões:", err);
        }
        return;
      }

      try {
        // Buscar o ID do segmento selecionado
        const segmentoId = segmentos?.find(
          (s) => s.nome === selectedSegmento
        )?.id;

        if (!segmentoId) return;

        // Buscar profissões que contêm esse segmento no array
        const { data: profissoes, error } = await supabase
          .from("profissoes")
          .select("*")
          .contains("segmentos", [segmentoId])
          .order("nome");

        if (error) {
          console.error("Erro ao buscar profissões:", error);
          setProfissoes(null);
          return;
        }

        setProfissoes(profissoes);
        // Limpar profissão selecionada quando mudar o segmento
        if (selectedProfissao) {
          const profissaoExiste = profissoes?.some(
            (p) => p.nome === selectedProfissao
          );
          if (!profissaoExiste) {
            setSelectedProfissao("");
            onFilter({
              searchTerm,
              segmento: selectedSegmento,
              profissao: "",
            });
          }
        }
      } catch (err) {
        console.error("Erro inesperado ao buscar profissões:", err);
        setProfissoes(null);
      }
    };

    fetchProfissoesBySegmento();
  }, [selectedSegmento, segmentos, onFilter, searchTerm, selectedProfissao]);

  const hasActiveFilters = searchTerm || selectedSegmento || selectedProfissao;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Candidatos Cadastrados
        </CardTitle>
        <CardDescription>
          Total: {totalCandidates} candidatos | Exibindo: {filteredCandidates}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por nome, CPF, email, área ou profissão..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-[350px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
            <SelectWithSearch
              items={segmentos || []}
              value={selectedSegmento}
              onValueChange={handleSegmentoChange}
              placeholder="Selecione um segmento..."
            />
          </div>

          <div className="flex items-center gap-2">
            <HardHat className="h-4 w-4 text-gray-500" />
            <SelectWithSearch
              items={profissoes || []}
              value={selectedProfissao}
              onValueChange={handleProfissaoChange}
              placeholder="Selecione uma profissão..."
              disabled={!profissoes || profissoes.length === 0}
            />
          </div>

          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
            disabled={!hasActiveFilters}
          >
            <X className="h-4 w-4 text-destructive" />
            Limpar Filtros
          </Button>
        </div>
        <div className="pl-6">
          <CandidateRegister />
        </div>
      </CardContent>
    </Card>
  );
}
