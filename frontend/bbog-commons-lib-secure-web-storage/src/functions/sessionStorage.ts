import { Storage } from '../interfaces/storage.interfaces.ts';
import { cipher, decipher, hashing } from '../facades/cipher.facade.ts';

export const sessionStorage: Storage = {
  has(key: string): boolean {
    return Boolean(window.sessionStorage.getItem(hashing(key)));
  },

  getItem(key: string, encrypted = false): string | null {
    return this.has(key)
      ? encrypted
        ? window.sessionStorage.getItem(hashing(key))
        : decipher(window.sessionStorage.getItem(hashing(key)))
      : null;
  },

  setItem(key: string, value: string): void {
    window.sessionStorage.setItem(hashing(key), cipher(value));
  },

  removeItem(key: string): void {
    window.sessionStorage.removeItem(hashing(key));
  },

  clear(): void {
    window.sessionStorage.clear();
  }
};
