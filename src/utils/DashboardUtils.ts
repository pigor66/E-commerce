export default function formatPriceBRL(value: number) {
  if (isNaN(value)) {
    return "Valor inválido";
  }
  const formatValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return formatValue;
}
