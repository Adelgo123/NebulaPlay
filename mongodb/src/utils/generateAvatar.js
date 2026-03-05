import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";

export async function generateAvatarPNG(userId, avatar) {

  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext("2d");

  const layers = [
    `assets/avatar/skin/${avatar.skin}.png`,
    `assets/avatar/eyes/${avatar.eyes}.png`,
    `assets/avatar/mouth/${avatar.mouth}.png`,
    `assets/avatar/hair/${avatar.hair}.png`
  ];

  for (const layer of layers) {
    if (!layer) continue;

    try {
      const img = await loadImage(layer);
      ctx.drawImage(img, 0, 0, 256, 256);
    } catch (err) {
      console.log("Layer no encontrada:", layer);
    }
  }

  const buffer = canvas.toBuffer("image/png");

  const outputPath = path.join("public/avatars", `${userId}.png`);

  fs.writeFileSync(outputPath, buffer);
}