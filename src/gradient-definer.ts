export default function getMainColors(img: HTMLImageElement) {
  // Step 1: Draw the image onto a canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 100;
  canvas.height = 100;

  if (ctx === null) {
    throw new Error("Could not get 2D context from canvas");
  }

  ctx.drawImage(img, 0, 0, 100, 100);

  // Step 2: Get the image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Step 3: Analyze the image data
  const colorCounts: { [x: string]: number } = {};
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const alpha = imageData[i + 3];

    // Avoid colors that are
    const isTooWhite = r > 240 && g > 240 && b > 240;
    const isTooBlack = r < 20 && g < 20 && b < 20;

    // Skipping transparent pixels, too white or too black
    if (alpha === 0 || isTooWhite || isTooBlack) continue;

    const color = `${r},${g},${b}`;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  // Step 4: Determine the main colors
  const sortedColors = Object.keys(colorCounts).sort(
    (a, b) => colorCounts[b] - colorCounts[a],
  );

  // Return the top two colors
  return [`rgb(${sortedColors.at(0)})`, `rgb(${sortedColors.at(-1)})`];
}
