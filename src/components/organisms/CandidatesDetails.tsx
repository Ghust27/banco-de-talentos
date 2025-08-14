import {
  Briefcase,
  Calendar,
  Eye,
  FileImage,
  Hash,
  Phone,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPhone } from "@/src/utils/formatPhone";
import DocumentViewer from "../molecules/DocumentViewer";
import { formatDate } from "@/src/utils/formatDate";
import { Badge } from "../ui/badge";
import { Candidato } from "@/src/lib/supabase/customTypes";

interface Props {
  selectedCandidato: Candidato | null;
  setCandidato: () => void;
}

export default function CandidatesDetails({
  selectedCandidato,
  setCandidato,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={setCandidato}>
          <Eye className="h-4 w-4 mr-1" />
          Detalhes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Candidato</DialogTitle>
          <DialogDescription>
            Informações completas de {selectedCandidato?.nome_completo}
          </DialogDescription>
        </DialogHeader>

        {selectedCandidato && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Nome Completo
                  </label>
                  <p className="text-base">
                    {selectedCandidato.nome_completo || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    CPF
                  </label>
                  <p className="text-base font-mono">
                    {selectedCandidato.cpf || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-base">
                    {selectedCandidato.email || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Endereço
                  </label>
                  <p className="text-base">
                    {selectedCandidato.endereco || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Localização
                  </label>
                  <p className="text-base">
                    {selectedCandidato.localizacao || "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Informações Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Informações Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Área Profissional
                  </label>
                  {selectedCandidato.area_profissional && (
                    <Badge className="ml-2">
                      {selectedCandidato.area_profissional}
                    </Badge>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Profissão
                  </label>
                  <p className="text-base">
                    {selectedCandidato.profissao || "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contatos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contatos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Telefone Principal
                  </label>
                  <p className="text-base font-mono">
                    {formatPhone(selectedCandidato.telefone_principal)}
                  </p>
                </div>
                {selectedCandidato.telefone_secundario && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Telefone Secundário
                    </label>
                    <p className="text-base font-mono">
                      {formatPhone(selectedCandidato.telefone_secundario)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    RG/Identidade
                  </label>
                  <p className="text-base font-mono">
                    {selectedCandidato.numero_identidade || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Título de Eleitor
                  </label>
                  <p className="text-base font-mono">
                    {selectedCandidato.numero_titulo_eleitor || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    CTPS
                  </label>
                  <p className="text-base font-mono">
                    {selectedCandidato.numero_ctps || "N/A"}
                  </p>
                </div>
                {selectedCandidato.numero_reservista && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Certificado Reservista
                    </label>
                    <p className="text-base font-mono">
                      {selectedCandidato.numero_reservista}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Imagens dos Documentos */}
            {(selectedCandidato.url_identidade_frente ||
              selectedCandidato.url_identidade_verso ||
              selectedCandidato.url_certificado_reservista) && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileImage className="h-5 w-5" />
                    Imagens dos Documentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-6">
                    {selectedCandidato.url_identidade_frente && (
                      <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium text-gray-500">
                          Identidade - Frente
                        </label>
                        <DocumentViewer
                          url={selectedCandidato.url_identidade_frente}
                          title="Identidade - Frente"
                        />
                      </div>
                    )}
                    {selectedCandidato.url_identidade_verso && (
                      <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium text-gray-500">
                          Identidade - Verso
                        </label>
                        <DocumentViewer
                          url={selectedCandidato.url_identidade_verso}
                          title="Identidade - Verso"
                        />
                      </div>
                    )}
                    {selectedCandidato.url_certificado_reservista && (
                      <div className="flex gap-2 items-center">
                        <label className="text-sm font-medium text-gray-500">
                          Certificado Reservista
                        </label>
                        <DocumentViewer
                          url={selectedCandidato.url_certificado_reservista}
                          title="Certificado Reservista"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informações do Sistema */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Informações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    ID
                  </label>
                  <p className="font-mono text-xs">
                    {selectedCandidato.id || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Data de Cadastro
                  </label>
                  <p className="text-base">
                    {formatDate(selectedCandidato.created_at)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Última Atualização
                  </label>
                  <p className="text-base">
                    {formatDate(selectedCandidato.updated_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
