// Twitter card image — same generator as the OG image.
// Note: `runtime` must be a string literal in this file (Next can't trace re-exports),
// so we duplicate the const here.
export { default } from "./opengraph-image";
export { alt, size, contentType } from "./opengraph-image";
export const runtime = "edge";
