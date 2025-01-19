export interface StorageData {
  converter: string;
  validator: string;
}

export type StorageDataKeys = keyof StorageData;

export interface StorageContextType {
  data: StorageData | null;
  addItem: (key: StorageDataKeys, value: string) => void;
  removeItem: (key: StorageDataKeys) => void;
  flush: () => void;
}
