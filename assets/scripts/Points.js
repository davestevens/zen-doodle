import Point from "./Point";
import util from "./util";

class Points {
  constructor(list, { percentage = 10, distanceThreshold = 10 }) {
    this.list = list.map((point) => new Point(point));
    this.percentage = percentage;
    this.distanceThreshold = distanceThreshold;

    if (this.count() < 3) {
      throw new Error("At least three points are required to make a shape!");
    }
  }

  add(options) {
    let point = (options instanceof Point) ? options : new Point(options),
        distance = point.distanceFrom(this.last());

    if (distance < this.distanceThreshold) {
      return false;
    }

    this.list.push(point);
    return point;
  }

  buildBetween(a, b) {
    let pointA = this.at(a),
        pointB = this.at(b),
        ratio = this.percentage / util.distance(pointA, pointB);

    return new Point({
      x: pointA.x + (ratio * (pointB.x - pointA.x)),
      y: pointA.y + (ratio * (pointB.y - pointA.y))
    });
  }

  at(i) {
    return this.list[i];
  }

  count() {
    return this.list.length;
  }

  last() {
    return this.list[this.count() - 1];
  }

  toPath() {
    return this.list.map((point) => point.toPath()).join(" ");
  }
}

module.exports = Points;
