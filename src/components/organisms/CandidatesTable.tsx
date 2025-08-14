"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";

import { formatPhone } from "@/src/utils/formatPhone";
import { formatDate } from "@/src/utils/formatDate";
import CandidatesDetails from "./CandidatesDetails";
import { Candidato } from "@/src/lib/supabase/customTypes";

interface CandidatosTableProps {
  candidatos: Candidato[];
  loading?: boolean;
  onFilter: (searchTerm: string) => void;
  totalCount: number; // Total de candidatos antes do filtro
}

export default function CandidatesTable({
  candidatos,
  loading = false,
}: CandidatosTableProps) {
  const [selectedCandidato, setSelectedCandidato] = useState<Candidato | null>(
    null
  );

  // Função para lidar com mudança no termo de busca
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Carregando candidatos...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableCaption>
              {candidatos.length === 0
                ? "Nenhum candidato atende ao filtro selecionado"
                : `Tabela de candidatos cadastrados`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="text-center">Nome</div>
                </TableHead>
                <TableHead>
                  <div className="text-center">CPF</div>
                </TableHead>
                <TableHead>
                  <div className="text-center">Contato</div>
                </TableHead>
                <TableHead>
                  <div className="text-center">Área Profissional</div>
                </TableHead>
                <TableHead>
                  <div className="">Localização</div>
                </TableHead>
                {/* <TableHead>Documentos</TableHead> */}
                <TableHead>
                  <div className="">Data Cadastro</div>
                </TableHead>
                <TableHead>
                  <div className="text-center">Ações</div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidatos.map((candidato) => (
                <TableRow key={candidato.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">
                        {candidato.nome_completo || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {candidato.profissao || "N/A"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm py-1 rounded">
                      {candidato.cpf || "N/A"}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {formatPhone(candidato.telefone_principal)}
                      </div>
                      {candidato.telefone_secundario && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          {formatPhone(candidato.telefone_secundario)}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-[150px]">
                          {candidato.email || "N/A"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {candidato.area_profissional && (
                      <Badge variant="secondary">
                        {candidato.area_profissional}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {candidato.localizacao || "N/A"}
                    </div>
                  </TableCell>

                  {/* <TableCell>
                    <div className="flex flex-col gap-1">
                      {candidato.url_identidade_frente && (
                        <DocumentViewer
                          url={candidato.url_identidade_frente}
                          title="Identidade - Frente"
                        />
                      )}
                      {candidato.url_identidade_verso && (
                        <DocumentViewer
                          url={candidato.url_identidade_verso}
                          title="Identidade - Verso"
                        />
                      )}
                      {candidato.url_certificado_reservista && (
                        <DocumentViewer
                          url={candidato.url_certificado_reservista}
                          title="Certificado Reservista"
                        />
                      )}
                    </div>
                  </TableCell> */}

                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formatDate(candidato.created_at)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <CandidatesDetails
                      selectedCandidato={selectedCandidato}
                      setCandidato={() => setSelectedCandidato(candidato)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
