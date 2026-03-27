export const getBackendAPIResponseError = (
  error: unknown,
): { code?: string; message?: string } => {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    return { code: undefined, message: undefined };
  }

  const response = error.response;

  if (
    typeof response !== "object" ||
    response === null ||
    !("data" in response)
  ) {
    return { code: undefined, message: undefined };
  }

  const data = response.data;

  if (typeof data !== "object" || data === null) {
    return { code: undefined, message: undefined };
  }

  return data as { code?: string; message?: string };
};
