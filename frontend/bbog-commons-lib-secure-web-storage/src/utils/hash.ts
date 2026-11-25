import forge from 'node-forge';
import { HASHING_ALGORITHM } from '../constants/storage.constants.ts';
import { Buffer } from '../interfaces/storage.interfaces.ts';

const prepareHash = (text: string): forge.util.ByteStringBuffer => {
  return HASHING_ALGORITHM.create().update(text).digest();
};

export const generateHash = (text: string): string => {
  return prepareHash(text).toHex();
};

export const generateBuffer = (fingerprint: string): Buffer => {
  const hashBytes = prepareHash(fingerprint).getBytes();
  return (byteSize: number): string =>
    forge.util.createBuffer(hashBytes).getBytes(byteSize);
};
