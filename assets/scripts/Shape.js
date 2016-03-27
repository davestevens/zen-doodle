import Points from "./Points";

class Shape {
  constructor(options = {}) {
    this.points = new Points(
      options.points || [],
      {
        percentage: options.percentage || 10,
        distanceThreshold: options.distanceThreshold || 10
      }
    );
  }

  draw() {
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        start = "M" + this.points.last().toPath(),
        i = 0;

    do {
      let point = this.points.buildBetween(i, i + 1);
      if(!this.points.add(point)) {
        break;
      }
    } while(++i < 200); // Just incase the distanceThreshold doesn't kick in

    path.setAttributeNS(null, "d", `${start} ${this.points.toPath()}`);

    this._setStyle(path);

    return path;
  }

  _setStyle(path) {
    let length = path.getTotalLength();
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;

    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", 2);
    path.setAttribute("fill", "none");
  }
}

module.exports = Shape;
