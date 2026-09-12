const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const projectRoot = path.join(__dirname, '..');
const inputPath = path.join(projectRoot, 'public', 'logo.png');
const outputDir = path.join(projectRoot, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons from logo.png...\n');
  console.log('Input:', inputPath);
  console.log('Output:', outputDir, '\n');

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    try {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 15, g: 23, b: 42, alpha: 1 },
        })
        .png()
        .toFile(outputPath);
      console.log(`  ✓ Created icon-${size}x${size}.png`);
    } catch (err) {
      console.error(`  ✗ Failed icon-${size}x${size}.png:`, err.message);
    }
  }

  // Generate apple-touch-icon (180x180)
  try {
    const applePath = path.join(outputDir, 'apple-touch-icon.png');
    await sharp(inputPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .png()
      .toFile(applePath);
    console.log(`  ✓ Created apple-touch-icon.png (180x180)`);
  } catch (err) {
    console.error(`  ✗ Failed apple-touch-icon.png:`, err.message);
  }

  // Create screenshots directory and generate placeholders
  const screenshotsDir = path.join(projectRoot, 'public', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  try {
    await sharp(inputPath)
      .resize(1280, 720, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .png()
      .toFile(path.join(screenshotsDir, 'desktop.png'));
    console.log(`  ✓ Created desktop screenshot placeholder`);

    await sharp(inputPath)
      .resize(390, 844, {
        fit: 'contain',
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .png()
      .toFile(path.join(screenshotsDir, 'mobile.png'));
    console.log(`  ✓ Created mobile screenshot placeholder`);
  } catch (err) {
    console.error(`  ✗ Failed screenshots:`, err.message);
  }

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
