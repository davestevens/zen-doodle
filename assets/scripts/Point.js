import util from "./util";

class Point {
  constructor(options = {}) {
    this.x = options.x;
    this.y = options.y;
  }

  get x() { return this._x; }
  set x(value) { this._x = value; }

  get y() { return this._y; }
  set y(value) { this._y = value; }

  distanceFrom(point) {
    return util.distance(this, point);
  }

  toPath() {
    return `${this.x},${this.y}`;
  }
}

module.exports = Point;
