import { CURRENCY } from './constants';

export const formatCurrency = (num) => {
  if (num === null || num === undefined) return '';
  const n = typeof num === 'number' ? num : Number(num);
  if (Number.isNaN(n)) return '';
  return `${CURRENCY}${n.toFixed(2)}`;
};

export const shortText = (text, len = 40) => {
  if (!text) return '';
  const s = String(text);
  return s.length > len ? `${s.slice(0, len - 3)}...` : s;
};
