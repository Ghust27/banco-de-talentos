export const formatPhone = (phone: string | null) => {
  if (!phone) return "";
  // Formatar telefone brasileiro
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
