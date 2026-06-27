/**
 * Client-side PDF export.
 *
 * We deliberately do NOT use window.print(): every browser's print engine
 * paginates differently (iOS WebKit ignores @page margin:0 and inserts blank
 * sheets, desktop Chrome needs "Background graphics" enabled, etc.). Instead we
 * rasterise each already-laid-out A4 page and place one per A4 sheet in a PDF,
 * so the output is identical on every device — and the biodata never leaves the
 * browser.
 */

const A4_PT = { w: 595.28, h: 841.89 }; // A4 in points (72dpi), jsPDF default

/**
 * Render every `.a4` page inside `container` into a downloaded A4 PDF.
 * Returns the number of pages written.
 */
export async function downloadBiodataPdf(container: HTMLElement, filename = "biodata.pdf"): Promise<number> {
  const pages = Array.from(container.querySelectorAll<HTMLElement>(".a4"));
  if (pages.length === 0) throw new Error("Nothing to export yet.");

  // Make sure web fonts are ready so text isn't captured in a fallback face.
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* non-fatal */
    }
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (!page) continue;
    const canvas = await html2canvas(page, {
      scale: 2, // crisp on retina / when zoomed
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
      // The preview scales the document down with a CSS transform to fit the
      // screen (heavily on mobile). Capturing under that transform squishes the
      // layout, so reset it on the clone html2canvas renders — every device then
      // captures the page at its true A4 size.
      onclone: (doc: Document) => {
        const area = doc.getElementById("print-area");
        if (area) {
          area.style.transform = "none";
          area.style.position = "static";
          area.style.width = "210mm";
        }
      },
    });
    const img = canvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) pdf.addPage();
    // Fill the whole A4 sheet; the captured page already has the A4 aspect ratio.
    pdf.addImage(img, "JPEG", 0, 0, A4_PT.w, A4_PT.h);
  }

  pdf.save(filename);
  return pages.length;
}
