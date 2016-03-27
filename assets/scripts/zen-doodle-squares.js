import Shape from "./shape";

let svg = document.getElementById("stage"),
    rect = svg.getBoundingClientRect(),
    width = rect.width,
    height = rect.height;

let calc = (dimension, size) => {
  if (size > dimension) return calc(dimension, (size / 3));
  return dimension / Math.floor(dimension / size);
}

let size = 300,
    calculatedWidth = calc(width, size),
    calculatedHeight = calc(height, size);

for (var row = 0; row < height; row += calculatedHeight) {
  for (var column = 0; column < width; column += calculatedWidth) {
    let points = [
      { x: column + 0,               y: row + 0 },
      { x: column + calculatedWidth, y: row + 0 },
      { x: column + calculatedWidth, y: row + calculatedHeight },
      { x: column + 0,               y: row + calculatedHeight }
    ]

    let shape = new Shape({
      percentage: 10,
      points: parseInt(Math.random() * 2) ? points : points.reverse()
    });
    svg.appendChild(shape.draw());
  }
}
