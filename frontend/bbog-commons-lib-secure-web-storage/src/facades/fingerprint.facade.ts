import { getHashFromDevice } from '../utils/device.ts';

export const secureFingerprint = (): string => {
  return getHashFromDevice(true);
};

export const simpleFingerprint = (): string => {
  return getHashFromDevice();
};
