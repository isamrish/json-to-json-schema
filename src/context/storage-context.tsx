"use client";
import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { findOtherProperties } from "@/utils";
import {
  StorageContextType,
  StorageDataKeys,
  StorageDataKeyPaths,
  SchemaWithData,
} from "@/types";

const StorageContext = createContext<StorageContextType | null>(null);

const StorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue, removeValue] = useLocalStorage("data", {
    converter: {
      data: "",
      schema: "",
    },
    validator: {
      data: "",
      schema: "",
    },
  } as Record<StorageDataKeys, Record<keyof SchemaWithData, string>>);

  const addItem = (keyPath: StorageDataKeyPaths, value: string) => {
    const [key, subKey] = keyPath.split(".") as [
      StorageDataKeys,
      keyof SchemaWithData
    ];

    setValue((prev) => {
      if (prev && key && subKey) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [subKey]: value,
          },
        };
      }
      return prev;
    });
  };

  const removeItem = (
    args: { key: StorageDataKeys } | { keyPath: StorageDataKeyPaths }
  ) => {
    setValue((prev) => {
      if (!prev) return prev;

      let updatedState = { ...prev };

      if ("key" in args) {
        updatedState = findOtherProperties(prev, args.key) as Record<
          StorageDataKeys,
          Record<keyof SchemaWithData, string>
        >;
      } else if ("keyPath" in args) {
        const [key, subKey] = args.keyPath.split(".") as [
          StorageDataKeys,
          keyof SchemaWithData
        ];
        if (key && subKey) {
          updatedState[key] = {
            ...updatedState[key],
            [subKey]: "",
          };
        }
      }

      return updatedState;
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
