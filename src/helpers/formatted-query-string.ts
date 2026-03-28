export const formattedQueryString = (searchObject: {
  [key: string]: string | undefined | string[];
}): string => {
  const queryString = Object.keys(searchObject)
    .map((key) => {
      const value = searchObject[key];

      if (!value) return "";

      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  return queryString;
};
