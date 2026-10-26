import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

// Clean, mathematically precise vector SVG matching CalcIcon_1f054790.png
// 512x512 canvas with transparent background
const standardSvg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Outer Calculator Frame with smooth rounded corners -->
  <rect x="82" y="18" width="348" height="476" rx="64" fill="none" stroke="#f97316" stroke-width="36" stroke-linejoin="round" />
  <!-- Display Screen -->
  <rect x="125" y="68" width="262" height="98" rx="20" fill="#f97316" />
  <!-- Keypad Row 1 -->
  <rect x="125" y="188" width="66" height="66" rx="18" fill="#f97316" />
  <rect x="223" y="188" width="66" height="66" rx="18" fill="#f97316" />
  <rect x="321" y="188" width="66" height="66" rx="18" fill="#f97316" />
  <!-- Keypad Row 2 -->
  <rect x="125" y="284" width="66" height="66" rx="18" fill="#f97316" />
  <rect x="223" y="284" width="66" height="66" rx="18" fill="#f97316" />
  <!-- Keypad Row 3 -->
  <rect x="125" y="380" width="66" height="66" rx="18" fill="#f97316" />
  <rect x="223" y="380" width="66" height="66" rx="18" fill="#f97316" />
  <!-- Keypad Tall Column 3 Button (Row 2 & 3) -->
  <rect x="321" y="284" width="66" height="162" rx="18" fill="#f97316" />
</svg>`;

// Maskable Icon: Fits within the safe 80% circle (diameter 410px in 512x512)
// With solid slate dark background #0f172a matching the app's default dark mode
const maskableSvg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Solid Dark Background -->
  <rect width="512" height="512" fill="#0f172a" />
  <!-- Scaled Calculator centered strictly within 80% safe zone (safe area diameter = 410px) -->
  <g transform="translate(256, 256) scale(0.76) translate(-256, -256)">
    <rect x="82" y="18" width="348" height="476" rx="64" fill="none" stroke="#f97316" stroke-width="36" stroke-linejoin="round" />
    <rect x="125" y="68" width="262" height="98" rx="20" fill="#f97316" />
    <rect x="125" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="321" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="125" y="284" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="284" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="125" y="380" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="380" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="321" y="284" width="66" height="162" rx="18" fill="#f97316" />
  </g>
</svg>`;

// Apple Touch Icon: 180x180 with clean dark slate background and safe margins
const appleTouchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Slate-900 background -->
  <rect width="512" height="512" rx="112" fill="#0f172a" />
  <g transform="translate(256, 256) scale(0.80) translate(-256, -256)">
    <rect x="82" y="18" width="348" height="476" rx="64" fill="none" stroke="#f97316" stroke-width="36" stroke-linejoin="round" />
    <rect x="125" y="68" width="262" height="98" rx="20" fill="#f97316" />
    <rect x="125" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="321" y="188" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="125" y="284" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="284" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="125" y="380" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="223" y="380" width="66" height="66" rx="18" fill="#f97316" />
    <rect x="321" y="284" width="66" height="162" rx="18" fill="#f97316" />
  </g>
</svg>`;

// Write public/icon.svg
fs.writeFileSync('public/icon.svg', standardSvg512);

// Render high-res PNGs:
// 1. 512x512 standard
const resvg512 = new Resvg(standardSvg512, { fitTo: { mode: 'width', value: 512 } });
const png512 = resvg512.render().asPng();
fs.writeFileSync('public/pwa-512x512.png', png512);
fs.writeFileSync('public/CalcIcon.png', png512);
fs.writeFileSync('CalcIcon.png', png512);

// 2. 192x192 standard
const resvg192 = new Resvg(standardSvg512, { fitTo: { mode: 'width', value: 192 } });
const png192 = resvg192.render().asPng();
fs.writeFileSync('public/pwa-192x192.png', png192);

// 3. 512x512 maskable
const resvgMaskable = new Resvg(maskableSvg512, { fitTo: { mode: 'width', value: 512 } });
const pngMaskable = resvgMaskable.render().asPng();
fs.writeFileSync('public/pwa-maskable-512x512.png', pngMaskable);

// 4. Apple Touch Icon (180x180)
const resvgApple = new Resvg(appleTouchSvg, { fitTo: { mode: 'width', value: 180 } });
const pngApple = resvgApple.render().asPng();
fs.writeFileSync('public/apple-touch-icon.png', pngApple);

console.log('All high-resolution icons generated successfully!');
