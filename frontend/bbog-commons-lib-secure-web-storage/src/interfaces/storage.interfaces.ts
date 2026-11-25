export interface Storage {
  has(key: string): boolean;
  getItem(key: string, encrypted?: boolean): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export type Buffer = (byteSize: number) => string;
