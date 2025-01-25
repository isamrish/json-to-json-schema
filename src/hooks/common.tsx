import { StorageContext } from "@/context/storage-context";
import { useContext } from "react";
import { StorageDataKeyPaths } from "@/types";

const useCommon = () => {
  const { addItem } = useContext(StorageContext) ?? {};

  const handleBeautify = (key: StorageDataKeyPaths, data: string) => {
    addItem?.(key, JSON.stringify(JSON.parse(data), null, 2));
  };

  return {
    handleBeautify,
  };
};

export { useCommon };
