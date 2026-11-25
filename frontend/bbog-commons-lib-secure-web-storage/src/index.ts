import {
  secureFingerprint,
  simpleFingerprint
} from './facades/fingerprint.facade.ts';
import { localStorage } from './functions/localStorage.ts';
import { sessionStorage } from './functions/sessionStorage.ts';

export { localStorage, sessionStorage, secureFingerprint, simpleFingerprint };
