const isJsonString = (str: string) => {
  if (!str?.trim()) {
    return false;
  }
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

const findOtherProperties = <T extends Record<string, unknown>>(
  obj: T,
  knownKey: string
): Omit<T, typeof knownKey> => {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key !== knownKey) {
      result[key as keyof T] = value as T[keyof T];
    }
  }

  return result as Omit<T, typeof knownKey>;
};

export { isJsonString, findOtherProperties };
