import convert from "color-convert";

const RESOLUTION = 50;

export function getMainColors(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = RESOLUTION;
  canvas.height = RESOLUTION;

  if (!ctx) {
    throw new Error("Could not get 2D context from canvas");
  }

  ctx.drawImage(img, 0, 0, RESOLUTION, RESOLUTION);
  const imageData = ctx.getImageData(0, 0, RESOLUTION, RESOLUTION).data;

  const hues = new Map<number, number>();
  for (let i = 0; i < imageData.length; i += 4) {
    const [r, g, b] = [imageData[i], imageData[i + 1], imageData[i + 2]];
    const [h] = convert.rgb.hsl(r, g, b);
    const hue = Math.round(h);
    hues.set(hue, (hues.get(hue) || 0) + 1);
  }

  const sortedHues = [...hues.entries()].sort((a, b) => b[1] - a[1]);
  const [mainHue] = sortedHues[0];
  const [secondaryHue] = sortedHues[Math.floor(sortedHues.length / 4)];

  return [`hsl(${mainHue}, 60%, 30%)`, `hsl(${secondaryHue}, 40%, 3%)`];
}
