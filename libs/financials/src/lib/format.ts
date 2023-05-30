export const formatPercent = new Intl.NumberFormat('en-CA', {
  maximumFractionDigits: 2,
  style: 'percent',
}).format;

export const formatCurrency = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;
