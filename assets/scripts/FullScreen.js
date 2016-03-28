import Shape from "./Shape";

class FullScreen {
  constructor({ svg }) {
    this.svg = svg;
  }

  build() {
    let rect = this.svg.getBoundingClientRect(),
        width = rect.width,
        height = rect.height;

    let pointA = { x: 0, y: 0 },
        pointB = { x: width, y: 0 },
        pointC = { x: width, y: height },
        pointD = { x: 0, y: height };

    let shape = new Shape({
      sides: [
        { from: pointA, to: pointB },
        { from: pointB, to: pointC },
        { from: pointC, to: pointD },
        { from: pointD, to: pointA }
      ]
    });

    return shape.split().map((s) => {
      return {
        points: parseInt(Math.random() * 2) ? s.points : s.points.reverse()
      }
    });
  }
}

module.exports = FullScreen;
