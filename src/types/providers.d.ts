export interface SchemaWithData {
  data: string;
  schema: string;
}
export interface StorageData {
  converter: SchemaWithData;
  validator: SchemaWithData;
}

export type StorageDataKeys = keyof StorageData;

export type StorageDataKeyPaths =
  `${keyof StorageData}.${keyof SchemaWithData}`;

export interface StorageContextType {
  data: StorageData | null;
  addItem: (keyPath: StorageDataKeyPaths, value: string) => void;
  removeItem: (
    args: { key: StorageDataKeys } | { keyPath: StorageDataKeyPaths }
  ) => void;
  flush: () => void;
}
