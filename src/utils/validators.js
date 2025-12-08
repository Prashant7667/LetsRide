export const isRequired = (value) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

export const isEmail = (value) => {
  if (!value) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(value).toLowerCase());
};

export const isPhone = (value) => {
  if (!value) return false;
  const onlyDigits = value.replace(/\D/g, '');
  return onlyDigits.length >= 7 && onlyDigits.length <= 15;
};

export const isStrongPassword = (value, options = { minLength: 8, upper: 1, number: 1 }) => {
  if (!value || typeof value !== 'string') return false;
  if (value.length < options.minLength) return false;
  const upperCount = (value.match(/[A-Z]/g) || []).length;
  const numberCount = (value.match(/[0-9]/g) || []).length;
  if (upperCount < (options.upper || 0)) return false;
  if (numberCount < (options.number || 0)) return false;
  return true;
};

export const matches = (value, regex) => {
  if (!value) return false;
  return regex.test(value);
};
