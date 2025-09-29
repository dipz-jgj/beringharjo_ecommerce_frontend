export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
