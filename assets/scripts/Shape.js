import Side from "./Side";
import Point from "./Point";
import util from "./util";

const MAX_AREA = 100000;

class Shape {
  constructor({ sides = [] }) {
    this.sides = this._wrapSides(sides);
  }

  get points() {
    return this.sides.map((side) => side.from);
  }

  split() {
    let longestSides = this._twoLongestSides(),
        a = longestSides[0],
        b = longestSides[1],
        randomPointA = this._randomPoint(this.sides[a]),
        randomPointB = this._randomPoint(this.sides[b]);

    let sideB2 = new Side({ from: randomPointB, to: this.sides[b].to }),
        sideA2 = new Side({ from: randomPointA, to: this.sides[a].to });

    let shapeA = new Shape({
      sides: [].concat(
        this.sides.slice(0, a),
        new Side({ from: this.sides[a].from, to: randomPointA }),
        new Side({ from: randomPointA, to: randomPointB }),
        sideB2,
        this.sides.slice(b + 1)
      )
    });

    let shapeB = new Shape({
      sides: [].concat(
        sideA2,
        this.sides.slice(a + 1, b),
        new Side({ from: this.sides[b].from, to: randomPointB }),
        new Side({ from: randomPointB, to: randomPointA })
      )
    });

    return [].concat(
      shapeA.area() > MAX_AREA ? shapeA.split() : shapeA,
      shapeB.area() > MAX_AREA ? shapeB.split() : shapeB
    );
  }

  area() {
    let points = this.points,
        area = 0,
        i;

    for (i = 0; i < points.length; ++i) {
      let i2 = (i + 1) % points.length;
      area += (points[i].x * points[i2].y) - (points[i].y * points[i2].x)
    }
    return Math.abs(area / 2);
  }

  _randomPoint(side) {
    let ratio = util.randomInterval(33, 66) / 100;

    return new Point({
      x: side.from.x + (ratio * (side.to.x - side.from.x)),
      y: side.from.y + (ratio * (side.to.y - side.from.y))
    });
  }

  _wrapSides(sides) {
    return sides.map((side) => {
      return (side instanceof Side) ? side : new Side(side);
    });
  }

  _twoLongestSides() {
    return this._longestSides()
      .slice(0, 2)
      .sort((a, b) => a - b);
  }

  _longestSides() {
    return this.sides.map((side, index) => {
      return {
        index: index,
        l: util.distance(side.from, side.to)
      }
    })
      .sort((a, b) => b.l - a.l)
      .map((side) => side.index);
  }
}

module.exports = Shape;
