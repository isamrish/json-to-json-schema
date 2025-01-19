"use client";
import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { findOtherProperties } from "@/utils";
import { StorageContextType, StorageDataKeys } from "@/types";

const StorageContext = createContext<StorageContextType | null>(null);

const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue, removeValue] = useLocalStorage("data", {
    converter: "",
    validator: "",
  } as Record<StorageDataKeys, string>);

  const addItem = (key: StorageDataKeys, value: string) => {
    setValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeItem = (key: StorageDataKeys) => {
    setValue((prev) => {
      return findOtherProperties(prev, key) as Record<StorageDataKeys, string>;
    });
  };

  return (
    <StorageContext.Provider
      value={{ data: value, addItem, removeItem, flush: removeValue }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
