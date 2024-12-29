const isJsonString = (str: string) => {
  if (!str.trim()) {
    return false;
  }
  try {
    JSON.parse(str);
  } catch {
    return false;
  }
  return true;
};

export { isJsonString };
