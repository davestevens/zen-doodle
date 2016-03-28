import Doodle from "./Doodle";
import FullScreen from "./FullScreen";

class ZenDoodle {
  constructor({ shapes = [], svg }) {
    this.svg = svg;
    this.shapes = shapes;
  }

  render() {
    this.shapes.map((shapeConfig) => {
      let doodle = new Doodle(shapeConfig);
      this.svg.appendChild(doodle.draw());
    });
  }

  fullScreen() {
    this.shapes = new FullScreen({ svg: this.svg }).build();
    this.render();
  }
}

module.exports = ZenDoodle;
