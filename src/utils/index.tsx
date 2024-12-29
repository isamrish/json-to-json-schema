const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

export { isJsonString };
