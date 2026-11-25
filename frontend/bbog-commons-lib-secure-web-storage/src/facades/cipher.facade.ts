import { generateHash } from '../utils/hash.ts';
import { decryptWithAES, encryptWithAES } from '../utils/aes.ts';

export const hashing = (text: string): string => {
  return generateHash(text);
};

export const cipher = (text: string): string => {
  return encryptWithAES(text);
};

export const decipher = (text: string | null): string | null => {
  return decryptWithAES(text);
};
