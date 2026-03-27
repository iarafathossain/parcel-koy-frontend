export const catchError = (
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred.",
): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }
  return fallbackMessage;
};
