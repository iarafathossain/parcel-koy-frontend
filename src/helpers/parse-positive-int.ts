export const parsePositiveInt = (
  value: string | null,
  fallbackValue: number,
): number => {
  if (!value) return fallbackValue;

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return fallbackValue;
  }
  return parsedValue;
};
