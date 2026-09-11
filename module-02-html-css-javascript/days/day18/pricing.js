export const withVat = (amount) => {
  return amount * 1.15;
};

export const format = (amount) => {
  return `${amount.toFixed(2)} ETB`;
};
