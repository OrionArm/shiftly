#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(
  path.join(import.meta.url.replace('file://', ''), '../../'),
);
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node scripts/generate_icons.mjs <source_png>');
  process.exit(1);
}

const sourcePath = path.resolve(args[0]);

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generateAndroid() {
  const androidRes = path.join(
    projectRoot,
    'android',
    'app',
    'src',
    'main',
    'res',
  );
  const densities = [
    { dir: 'mipmap-mdpi', size: 48 },
    { dir: 'mipmap-hdpi', size: 72 },
    { dir: 'mipmap-xhdpi', size: 96 },
    { dir: 'mipmap-xxhdpi', size: 144 },
    { dir: 'mipmap-xxxhdpi', size: 192 },
  ];

  const circleMaskSvg = size =>
    Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
    );

  // Ensure adaptive icon XML and background color exist
  const anydpiDir = path.join(androidRes, 'mipmap-anydpi-v26');
  ensureDirSync(anydpiDir);
  const valuesDir = path.join(androidRes, 'values');
  ensureDirSync(valuesDir);

  const backgroundColor = '#FFFFFF';
  const adaptiveXml = foregroundName =>
    `<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n    <background android:drawable="@color/ic_launcher_background"/>\n    <foreground android:drawable="@mipmap/${foregroundName}"/>\n</adaptive-icon>\n`;

  // Write background color resource
  fs.writeFileSync(
    path.join(valuesDir, 'ic_launcher_background.xml'),
    `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${backgroundColor}</color>\n</resources>\n`,
  );

  // Write adaptive icon XMLs
  fs.writeFileSync(
    path.join(anydpiDir, 'ic_launcher.xml'),
    adaptiveXml('ic_launcher_foreground'),
  );
  fs.writeFileSync(
    path.join(anydpiDir, 'ic_launcher_round.xml'),
    adaptiveXml('ic_launcher_foreground'),
  );

  for (const { dir, size } of densities) {
    const outDir = path.join(androidRes, dir);
    ensureDirSync(outDir);
    await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(path.join(outDir, 'ic_launcher.png'));

    // Round icon with circular alpha mask (transparent corners)
    const squarePngBuffer = await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    await sharp(squarePngBuffer)
      .composite([{ input: circleMaskSvg(size), blend: 'dest-in' }])
      .png()
      .toFile(path.join(outDir, 'ic_launcher_round.png'));

    // Adaptive foreground: transparent background with safe padding
    await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(path.join(outDir, 'ic_launcher_foreground.png'));
  }
}

async function generateIOS() {
  const iosSet = path.join(
    projectRoot,
    'ios',
    'Shiftly',
    'Images.xcassets',
    'AppIcon.appiconset',
  );
  ensureDirSync(iosSet);

  const iosImages = [
    { name: 'Icon-App-20x20@2x.png', size: 40 },
    { name: 'Icon-App-20x20@3x.png', size: 60 },
    { name: 'Icon-App-29x29@2x.png', size: 58 },
    { name: 'Icon-App-29x29@3x.png', size: 87 },
    { name: 'Icon-App-40x40@2x.png', size: 80 },
    { name: 'Icon-App-40x40@3x.png', size: 120 },
    { name: 'Icon-App-60x60@2x.png', size: 120 },
    { name: 'Icon-App-60x60@3x.png', size: 180 },
    { name: 'ItunesArtwork@1x.png', size: 1024 },
  ];
  for (const { name, size } of iosImages) {
    await sharp(sourcePath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(path.join(iosSet, name));
  }
}

(async () => {
  try {
    await generateAndroid();
    await generateIOS();
    console.log('Icons generated successfully.');
  } catch (e) {
    console.error('Failed to generate icons:', e);
    process.exit(1);
  }
})();
