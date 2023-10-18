export default function getMainColors(imgElement: HTMLImageElement) {
  // Step 1: Draw the image onto a canvas
  const canvas = document.createElement("canvas");
  canvas.width = imgElement.width;
  canvas.height = imgElement.height;

  const aspectRatio = canvas.width / canvas.height;
  let newWidth = canvas.width / aspectRatio;
  let newHeight = canvas.height / aspectRatio;

  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    throw new Error("Could not get 2D context from canvas");
  }
  ctx.drawImage(imgElement, 0, 0, newWidth, newHeight);

  // Step 2: Get the image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  // Step 3: Analyze the image data
  let colorCounts = {} as any;
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const alpha = imageData[i + 3];

    function isNearWhite(
      r: number,
      g: number,
      b: number,
      threshold: number = 200
    ): boolean {
      return r > threshold && g > threshold && b > threshold;
    }

    // Skipping transparent pixels
    if (alpha === 0 || isNearWhite(r, g, b)) continue;

    const color = `${r},${g},${b}`;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  // Step 4: Determine the main colors
  const sortedColors = Object.keys(colorCounts).sort(
    (a, b) => colorCounts[b] - colorCounts[a]
  );

  // Return the top two colors
  return [`rgb(${sortedColors.at(0)})`, `rgb(${sortedColors.at(-1)})`];
}
