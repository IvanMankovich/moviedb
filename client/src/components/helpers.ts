export const getClassName = (mainClass: string, modifiers: string[]): string => {
  return modifiers.map((modifier: string) => ` ${mainClass}_${modifier}`).join('');
};
