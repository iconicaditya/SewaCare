const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const projectRoot = path.join(__dirname, '..');
const inputPath = path.join(projectRoot, 'public', 'applogo.png');
const outputDir = path.join(projectRoot, 'public', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons from applogo.png with white background...\n');
  console.log('Input:', inputPath);

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    try {
      // Create a white background, then composite the logo centered
      const bgSize = size;
      const logoSize = Math.round(size * 0.7); // logo takes 70% of the canvas
      const offset = Math.round((bgSize - logoSize) / 2);

      const bg = Buffer.from(
        `<svg width="${bgSize}" height="${bgSize}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${bgSize}" height="${bgSize}" fill="white"/>
        </svg>`
      );

      const resizedLogo = await sharp(inputPath)
        .resize(logoSize, logoSize, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png()
        .toBuffer();

      await sharp(bg)
        .composite([{ input: resizedLogo, left: offset, top: offset }])
        .png()
        .toFile(outputPath);

      console.log(`  ✓ icon-${size}x${size}.png`);
    } catch (err) {
      console.error(`  ✗ icon-${size}x${size}.png:`, err.message);
    }
  }

  // Apple touch icon (180x180)
  try {
    const applePath = path.join(outputDir, 'apple-touch-icon.png');
    const logoSize = Math.round(180 * 0.7);
    const offset = Math.round((180 - logoSize) / 2);
    const bg = Buffer.from(`<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="white"/></svg>`);
    const resizedLogo = await sharp(inputPath).resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
    await sharp(bg).composite([{ input: resizedLogo, left: offset, top: offset }]).png().toFile(applePath);
    console.log(`  ✓ apple-touch-icon.png (180x180)`);
  } catch (err) {
    console.error(`  ✗ apple-touch-icon.png:`, err.message);
  }

  console.log('\nAll icons generated with white background!');
}

generateIcons().catch(console.error);
