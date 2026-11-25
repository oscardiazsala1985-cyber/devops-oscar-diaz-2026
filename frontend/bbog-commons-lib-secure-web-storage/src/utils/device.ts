export const getCanvasProps = (): string => {
  return (() => {
    try {
      const canvasVal = document.createElement('canvas');
      const ctx = canvasVal.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?",
          2,
          15
        );
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText(
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?",
          4,
          17
        );
      } else {
        throw 'context es null';
      }

      return canvasVal.toDataURL();
    } catch (error) {
      throw new Error(`Unable to get canvas properties: (${error})`);
    }
  })();
};

export const getHashFromDevice = (secure = true): string => {
  const { userAgent, language, languages, hardwareConcurrency } =
    window.navigator;
  const { colorDepth, pixelDepth } = window.screen;
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const touchSupport = 'ontouchstart' in window;
  const canvas = getCanvasProps();
  return JSON.stringify(
    secure
      ? {
          userAgent,
          language,
          languages,
          hardwareConcurrency,
          colorDepth,
          pixelDepth,
          timezoneOffset,
          timezone,
          touchSupport,
          canvas
        }
      : { canvas }
  );
};
