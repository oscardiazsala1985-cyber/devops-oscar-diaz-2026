import forge, { md } from 'node-forge';

// Hashing
export const HASHING_ALGORITHM = md.sha256;

// AES
export const AES_ALGORITHM: forge.cipher.Algorithm = 'AES-CBC';
export const AES_BYTE_SIZE = 16;
export const AES_INITIAL_VECTOR_BYTE_SIZE = 16;
