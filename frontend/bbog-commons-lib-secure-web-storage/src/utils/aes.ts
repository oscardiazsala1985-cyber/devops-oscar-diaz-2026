import forge from 'node-forge';
import {
  AES_ALGORITHM,
  AES_BYTE_SIZE,
  AES_INITIAL_VECTOR_BYTE_SIZE
} from '../constants/storage.constants.ts';
import { generateBuffer } from './hash.ts';
import { secureFingerprint } from '../facades/fingerprint.facade.ts';

export const encryptWithAES = (text: string): string => {
  const buffer = generateBuffer(secureFingerprint());
  const encodedText = forge.util.encodeUtf8(text);
  const cipher = forge.cipher.createCipher(
    AES_ALGORITHM,
    buffer(AES_BYTE_SIZE)
  );
  cipher.start({ iv: buffer(AES_INITIAL_VECTOR_BYTE_SIZE) });
  cipher.update(forge.util.createBuffer(encodedText));
  cipher.finish();
  return forge.util.encode64(cipher.output.data);
};

export const decryptWithAES = (
  aesEncryptedText: string | null
): string | null => {
  try {
    const buffer = generateBuffer(secureFingerprint());
    const decipher = forge.cipher.createDecipher(
      AES_ALGORITHM,
      buffer(AES_BYTE_SIZE)
    );
    decipher.start({ iv: buffer(AES_INITIAL_VECTOR_BYTE_SIZE) });
    decipher.update(
      forge.util.createBuffer(forge.util.decode64(aesEncryptedText as string))
    );
    decipher.finish();
    return forge.util.decodeUtf8(decipher.output.data);
  } catch (error) {
    throw new Error(`Unable to decrypt the value from storage: (${error})`);
  }
};
