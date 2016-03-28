import Shape from "./shape";

class ZenDoodle {
  constructor({ shapes, svg }) {
    this.svg = svg;
    this.shapes = shapes;
  }

  render() {
    this.shapes.map((shapeConfig) => {
      let shape = new Shape(shapeConfig);
      this.svg.appendChild(shape.draw());
    });
  }
}

module.exports = ZenDoodle;
