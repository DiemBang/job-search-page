export const appendParams = (
  baseUrl: string,
  params: Record<string, string | null | string[]>
) => {
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length) {
      value.forEach((item) => {
        baseUrl += `&${key}=${item}`;
      });
    } else if (value) {
      baseUrl += `&${key}=${value}`;
    }
  });
  return baseUrl;
};
