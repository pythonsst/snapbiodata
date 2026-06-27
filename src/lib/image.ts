/**
 * Downscale a data-URL image in the browser so published photos stay small
 * (fast links, comfortably under storage limits). Returns a JPEG data URL.
 */
export async function shrinkImage(dataUrl: string, maxDim = 600, quality = 0.82): Promise<string> {
  if (!dataUrl.startsWith("data:image")) return dataUrl;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
