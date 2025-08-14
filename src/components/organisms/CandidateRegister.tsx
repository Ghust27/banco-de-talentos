import React, { useState } from "react";
import { User, Phone, Briefcase, FileText, Save, UserPlus } from "lucide-react";
import { formatPhone } from "@/src/utils/formatPhone";
import { formatCPF } from "@/src/utils/formatCPF";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Checkbox } from "@/src/components/ui/checkbox";
import { BaseSelect } from "../atoms/BaseSelect";
import SegmentsSelect from "../molecules/SegmentsSelect";

interface CandidatoFormData {
  nome_completo: string;
  cpf: string;
  endereco: string;
  telefone_principal: string;
  telefone_secundario: string;
  email: string;
  area_profissional: string;
  profissao: string;
  localizacao: string;
  numero_identidade: string;
  numero_titulo_eleitor: string;
  numero_ctps: string;
  numero_reservista: string;
  foto_identidade_frente: string | null;
  foto_identidade_verso: string | null;
  foto_certificado_reservista: string | null;
  ativo: "S" | "N";
}
interface ValidationErrors {
  [key: string]: string;
}

const CandidateRegister: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CandidatoFormData>({
    nome_completo: "",
    cpf: "",
    endereco: "",
    telefone_principal: "",
    telefone_secundario: "",
    email: "",
    area_profissional: "",
    profissao: "",
    localizacao: "",
    numero_identidade: "",
    numero_titulo_eleitor: "",
    numero_ctps: "",
    numero_reservista: "",
    foto_identidade_frente: null,
    foto_identidade_verso: null,
    foto_certificado_reservista: null,
    ativo: "S",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange = <K extends keyof CandidatoFormData>(
    field: K,
    value: CandidatoFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    const requiredFields: Array<{
      field: keyof CandidatoFormData;
      message: string;
    }> = [
      { field: "nome_completo", message: "Nome completo é obrigatório" },
      { field: "cpf", message: "CPF é obrigatório" },
      { field: "endereco", message: "Endereço é obrigatório" },
      {
        field: "telefone_principal",
        message: "Telefone principal é obrigatório",
      },
      { field: "email", message: "E-mail é obrigatório" },
      {
        field: "area_profissional",
        message: "Área profissional é obrigatória",
      },
      { field: "profissao", message: "Profissão é obrigatória" },
      { field: "localizacao", message: "Localização é obrigatória" },
      {
        field: "numero_identidade",
        message: "Número de identidade é obrigatório",
      },
    ];

    requiredFields.forEach(({ field, message }) => {
      const value = formData[field];
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[field] = message;
      }
    });

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido";
    }
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (formData.cpf && !cpfRegex.test(formData.cpf)) {
      newErrors.cpf = "Formato de CPF inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Candidato cadastrado com sucesso!");
      setIsOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      nome_completo: "",
      cpf: "",
      endereco: "",
      telefone_principal: "",
      telefone_secundario: "",
      email: "",
      area_profissional: "",
      profissao: "",
      localizacao: "",
      numero_identidade: "",
      numero_titulo_eleitor: "",
      numero_ctps: "",
      numero_reservista: "",
      foto_identidade_frente: null,
      foto_identidade_verso: null,
      foto_certificado_reservista: null,
      ativo: "S",
    });
    setErrors({});
  };

  const handleFileUpload = (
    field:
      | "foto_identidade_frente"
      | "foto_identidade_verso"
      | "foto_certificado_reservista",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, [field]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="mr-2 h-4 w-4" /> Cadastrar Candidato
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cadastrar Novo Candidato</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="dados-pessoais">
            <TabsList className="mb-4">
              <TabsTrigger value="dados-pessoais">
                <User className="mr-2 h-4 w-4" /> Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="contato">
                <Phone className="mr-2 h-4 w-4" /> Contato
              </TabsTrigger>
              <TabsTrigger value="profissional">
                <Briefcase className="mr-2 h-4 w-4" /> Profissional
              </TabsTrigger>
              <TabsTrigger value="documentos">
                <FileText className="mr-2 h-4 w-4" /> Documentos
              </TabsTrigger>
            </TabsList>

            {/* Dados Pessoais */}
            <TabsContent value="dados-pessoais" className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Nome completo *</label>
                <Input
                  value={formData.nome_completo}
                  onChange={(e) =>
                    handleInputChange("nome_completo", e.target.value)
                  }
                  placeholder="Digite o nome"
                />
                {errors.nome_completo && (
                  <p className="text-xs text-red-500">{errors.nome_completo}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">CPF *</label>
                <Input
                  value={formData.cpf}
                  onChange={(e) =>
                    handleInputChange("cpf", formatCPF(e.target.value))
                  }
                  placeholder="000.000.000-00"
                />
                {errors.cpf && (
                  <p className="text-xs text-red-500">{errors.cpf}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Endereço *</label>
                <Textarea
                  value={formData.endereco}
                  onChange={(e) =>
                    handleInputChange("endereco", e.target.value)
                  }
                  placeholder="Digite o endereço completo"
                  rows={3}
                />
                {errors.endereco && (
                  <p className="text-xs text-red-500">{errors.endereco}</p>
                )}
              </div>

              <BaseSelect
                placeholder="Selecione uma região"
                label="Regiões"
                items={[
                  { id: 1, nome: "Zona Sul" },
                  { id: 2, nome: "Zona Norte" },
                  { id: 3, nome: "Zona Leste" },
                  { id: 4, nome: "Zona Oeste" },
                ]}
              />
            </TabsContent>

            {/* Contato */}
            <TabsContent value="contato" className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Telefone Principal *
                </label>
                <Input
                  type="tel"
                  value={formData.telefone_principal}
                  onChange={(e) =>
                    handleInputChange(
                      "telefone_principal",
                      formatPhone(e.target.value)
                    )
                  }
                  placeholder="(11) 99999-9999"
                />
                {errors.telefone_principal && (
                  <p className="text-xs text-red-500">
                    {errors.telefone_principal}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Telefone Secundário
                </label>
                <Input
                  type="tel"
                  value={formData.telefone_secundario}
                  onChange={(e) =>
                    handleInputChange(
                      "telefone_secundario",
                      formatPhone(e.target.value)
                    )
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">E-mail *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="exemplo@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </TabsContent>

            {/* Profissional */}
            <TabsContent value="profissional" className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Área Profissional *
                </label>
                <SegmentsSelect />
                {errors.area_profissional && (
                  <p className="text-xs text-red-500">
                    {errors.area_profissional}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Profissão *</label>
                <Input
                  value={formData.profissao}
                  onChange={(e) =>
                    handleInputChange("profissao", e.target.value)
                  }
                  placeholder="Digite a profissão"
                />
                {errors.profissao && (
                  <p className="text-xs text-red-500">{errors.profissao}</p>
                )}
              </div>
            </TabsContent>

            {/* Documentos */}
            <TabsContent value="documentos" className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Número de Identidade (RG) *
                </label>
                <Input
                  value={formData.numero_identidade}
                  onChange={(e) =>
                    handleInputChange("numero_identidade", e.target.value)
                  }
                  placeholder="Digite o RG"
                />
                {errors.numero_identidade && (
                  <p className="text-xs text-red-500">
                    {errors.numero_identidade}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Título de Eleitor</label>
                <Input
                  value={formData.numero_titulo_eleitor}
                  onChange={(e) =>
                    handleInputChange("numero_titulo_eleitor", e.target.value)
                  }
                  placeholder="Digite o título"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">CTPS</label>
                <Input
                  value={formData.numero_ctps}
                  onChange={(e) =>
                    handleInputChange("numero_ctps", e.target.value)
                  }
                  placeholder="Digite o número da CTPS"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Certificado de Reservista
                </label>
                <Input
                  value={formData.numero_reservista}
                  onChange={(e) =>
                    handleInputChange("numero_reservista", e.target.value)
                  }
                  placeholder="Digite o número"
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">Anexos</h4>
                {[
                  {
                    field: "foto_identidade_frente" as const,
                    label: "Identidade (Frente)",
                  },
                  {
                    field: "foto_identidade_verso" as const,
                    label: "Identidade (Verso)",
                  },
                  {
                    field: "foto_certificado_reservista" as const,
                    label: "Certificado de Reservista",
                  },
                ].map(({ field, label }) => (
                  <div key={field} className="space-y-1">
                    <label className="text-sm">{label}</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(field, e)}
                    />
                    {formData[field] && (
                      <p className="text-xs text-green-600">
                        Arquivo carregado
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.ativo === "S"}
                onCheckedChange={(checked) =>
                  handleInputChange("ativo", checked ? "S" : "N")
                }
              />
              <span className="text-sm">Candidato ativo</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" /> Salvar Candidato
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidateRegister;
