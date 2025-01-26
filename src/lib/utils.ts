import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

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

const toCapitalize = (str: string) => {
  if (typeof str !== "string" || !str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export { cn, isJsonString, findOtherProperties, toCapitalize };
