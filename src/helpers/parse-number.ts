export const parseNumber = (value: string, fieldLabel: string) => {
  if (!value || value.trim().length === 0) {
    return { error: `${fieldLabel} is required`, value: null };
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return { error: `${fieldLabel} must be a valid number`, value: null };
  }

  return { error: null, value: parsed };
};
