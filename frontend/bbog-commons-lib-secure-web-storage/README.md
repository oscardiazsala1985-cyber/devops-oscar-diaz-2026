# bbog-commons-lib-secure-web-storage

Librería TypeScript para cifrar/descifrar valores almacenados en `localStorage` y `sessionStorage`, usando AES con una llave derivada de un fingerprint del dispositivo. Versión BBOG basada en `@avaldigitallabs/adl-commons-lib-secure-web-storage`.

## Instalación (monorepo local)

Este paquete se consume como dependencia local (`file:`) desde proyectos hermanos en la misma carpeta:

```json
"dependencies": {
  "bbog-commons-lib-secure-web-storage": "file:../bbog-commons-lib-secure-web-storage"
}
```

## Build

```bash
npm install
npm run build
```

Genera `build/bbog-commons-lib-secure-web-storage.{js,cjs,d.ts}`.

## API

```ts
import { localStorage, sessionStorage, secureFingerprint, simpleFingerprint } from 'bbog-commons-lib-secure-web-storage';

sessionStorage.setItem('key', 'value');
sessionStorage.getItem('key'); // 'value' (descifrado)
sessionStorage.getItem('key', true); // valor cifrado tal cual está en el storage
sessionStorage.has('key');
sessionStorage.removeItem('key');
sessionStorage.clear();
```

`localStorage` expone la misma interfaz sobre `window.localStorage`.
