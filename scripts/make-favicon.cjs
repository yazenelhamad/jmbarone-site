// Crops the brand mark (stars + flag) from logo.jpg and produces favicon
// + apple-icon at the sizes Next.js expects.
//
// Run: node scripts/make-favicon.cjs

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.resolve(__dirname, "..", "public", "brand", "logo.jpg");
const OUT_DIR = path.resolve(__dirname, "..", "src", "app");

// Inspect: logo.jpg is 684x119. The flag/stars brand mark sits in the
// leftmost ~160px. Crop that, then extend to square with white padding.
const CROP = { left: 10, top: 0, width: 160, height: 119 };
const SQUARE = 180; // pad to 180x180 (apple-icon spec)

async function main() {
  const cropped = await sharp(SRC).extract(CROP).toBuffer();

  // Pad to square white canvas, centered
  const padX = Math.round((SQUARE - CROP.width) / 2);
  const padY = Math.round((SQUARE - CROP.height) / 2);
  const square = await sharp({
    create: {
      width: SQUARE,
      height: SQUARE,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: cropped, left: padX, top: padY }])
    .png()
    .toBuffer();

  // 32x32 favicon (Next.js auto-uses src/app/icon.png as 32x32 by default,
  // but writing higher-res lets browsers downscale cleanly)
  fs.writeFileSync(
    path.join(OUT_DIR, "icon.png"),
    await sharp(square).resize(64, 64).png().toBuffer(),
  );
  console.log("wrote src/app/icon.png (64x64)");

  // 180x180 apple-touch-icon
  fs.writeFileSync(path.join(OUT_DIR, "apple-icon.png"), square);
  console.log("wrote src/app/apple-icon.png (180x180)");

  // Larger 512x512 (used in manifest)
  fs.writeFileSync(
    path.join(OUT_DIR, "..", "..", "public", "icon-512.png"),
    await sharp(square).resize(512, 512).png().toBuffer(),
  );
  console.log("wrote public/icon-512.png (512x512)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
