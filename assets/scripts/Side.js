import Point from "./Point";

class Side {
  constructor({ from, to }) {
    this.from = this._wrapPoint(from);
    this.to = this._wrapPoint(to);
  }

  get from() { return this._from; }
  set from(value) { this._from = value; }

  get to() { return this._to; }
  set to(value) { this._to = value; }

  _wrapPoint(point) {
    return (point instanceof Point) ? point : new Point(point);
  }
}

module.exports = Side;
