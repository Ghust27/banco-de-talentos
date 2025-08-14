export const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");
  if (numericValue.length <= 11) {
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return value;
};
