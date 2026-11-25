export const isValidJSON = (json?: string): boolean => {
  if (typeof json !== 'string') return false;

  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
