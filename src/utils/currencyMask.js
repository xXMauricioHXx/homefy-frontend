/**
 * Formats a number to Brazilian Real currency format
 * @param {string|number} value - The value to format
 * @returns {string} Formatted currency string with R$ prefix
 */
export function formatCurrency(value) {
  if (!value) return "";

  // Remove all non-numeric characters except comma and dot
  const numericValue = String(value).replace(/[^\d,]/g, "");

  // Convert to number
  const number = parseFloat(numericValue.replace(",", "."));

  if (isNaN(number)) return "";

  // Format to Brazilian Real
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

/**
 * Applies currency mask to input value
 * @param {string} value - The input value
 * @returns {string} Masked value
 */
export function applyCurrencyMask(value) {
  if (!value) return "";

  // Remove all non-numeric characters
  let numericValue = value.replace(/\D/g, "");

  // Convert to cents
  const cents = parseInt(numericValue, 10);

  if (isNaN(cents)) return "";

  // Convert cents to reais
  const reais = cents / 100;

  // Format to Brazilian Real
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(reais);
}

/**
 * Removes currency formatting and returns raw numeric value
 * @param {string} value - The formatted currency string
 * @returns {string} Raw numeric value
 */
export function removeCurrencyMask(value) {
  if (!value) return "";

  // Remove R$, dots, and spaces, replace comma with dot
  return value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
}
