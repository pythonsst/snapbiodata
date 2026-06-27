/**
 * A4 page geometry — the single source of truth for page dimensions used by the
 * paginator (FramedDoc), the live preview (BiodataPreview) and the template
 * picker thumbnails. Keep all page-size math here so the three never disagree.
 */

/** CSS pixels per millimetre at 96 DPI. */
export const MM = 3.779527559;

export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

/** A4 width/height in CSS pixels (≈ 793.7 × 1122.5). */
export const A4_W = A4_WIDTH_MM * MM;
export const A4_H = A4_HEIGHT_MM * MM;

/** Height ÷ width — the portrait A4 aspect ratio (≈ 1.4142). */
export const A4_RATIO = A4_HEIGHT_MM / A4_WIDTH_MM;
