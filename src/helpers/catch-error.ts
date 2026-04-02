import { getBackendAPIResponseError } from "@/helpers/backend-api-res";

export const catchError = (
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred.",
): string => {
  const { message } = getBackendAPIResponseError(error);

  if (message) {
    return message;
  }

  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }
  return fallbackMessage;
};
