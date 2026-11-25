import { Storage } from '../interfaces/storage.interfaces.ts';
import { cipher, decipher, hashing } from '../facades/cipher.facade.ts';

export const localStorage: Storage = {
  has(key: string): boolean {
    return Boolean(window.localStorage.getItem(hashing(key)));
  },

  getItem(key: string, encrypted = false): string | null {
    return this.has(key)
      ? encrypted
        ? window.localStorage.getItem(hashing(key))
        : decipher(window.localStorage.getItem(hashing(key)))
      : null;
  },

  setItem(key: string, value: string): void {
    window.localStorage.setItem(hashing(key), cipher(value));
  },

  removeItem(key: string): void {
    window.localStorage.removeItem(hashing(key));
  },

  clear(): void {
    window.localStorage.clear();
  }
};
