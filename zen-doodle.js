!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.ZenDoodle=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Points = _dereq_("./Points");

var _Points2 = _interopRequireDefault(_Points);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var POINTS_THRESHOLD = 1000;

var Shape = function () {
  function Shape(_ref) {
    var _ref$points = _ref.points;
    var points = _ref$points === undefined ? [] : _ref$points;
    var _ref$percentage = _ref.percentage;
    var percentage = _ref$percentage === undefined ? 10 : _ref$percentage;

    _classCallCheck(this, Shape);

    this.points = new _Points2.default(points, { percentage: percentage });
  }

  _createClass(Shape, [{
    key: "draw",
    value: function draw() {
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          start = "M" + this.points.last().toPath(),
          i = 0;

      do {
        var point = this.points.buildBetween(i, i + 1);
        if (!this.points.add(point)) {
          break;
        }
      } while (++i < POINTS_THRESHOLD);

      path.setAttributeNS(null, "d", start + " " + this.points.toPath());

      this._setStyle(path);

      return path;
    }
  }, {
    key: "_setStyle",
    value: function _setStyle(path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;

      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", 2);
      path.setAttribute("fill", "none");
    }
  }]);

  return Shape;
}();

module.exports = Shape;

},{"./Points":4}],2:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Shape = _dereq_("./Shape");

var _Shape2 = _interopRequireDefault(_Shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullScreen = function () {
  function FullScreen(_ref) {
    var svg = _ref.svg;

    _classCallCheck(this, FullScreen);

    this.svg = svg;
  }

  _createClass(FullScreen, [{
    key: "build",
    value: function build() {
      var rect = this.svg.getBoundingClientRect(),
          width = rect.width,
          height = rect.height;

      var pointA = { x: 0, y: 0 },
          pointB = { x: width, y: 0 },
          pointC = { x: width, y: height },
          pointD = { x: 0, y: height };

      var shape = new _Shape2.default({
        sides: [{ from: pointA, to: pointB }, { from: pointB, to: pointC }, { from: pointC, to: pointD }, { from: pointD, to: pointA }]
      });

      return shape.split().map(function (s) {
        return {
          points: parseInt(Math.random() * 2) ? s.points : s.points.reverse()
        };
      });
    }
  }]);

  return FullScreen;
}();

module.exports = FullScreen;

},{"./Shape":5}],3:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = _dereq_("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
  function Point(_ref) {
    var x = _ref.x;
    var y = _ref.y;

    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "distanceFrom",
    value: function distanceFrom(point) {
      return _util2.default.distance(this, point);
    }
  }, {
    key: "toPath",
    value: function toPath() {
      return this.x + "," + this.y;
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;
    }
  }]);

  return Point;
}();

module.exports = Point;

},{"./util":8}],4:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = _dereq_("./Point");

var _Point2 = _interopRequireDefault(_Point);

var _util = _dereq_("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Points = function () {
  function Points(list, _ref) {
    var _ref$percentage = _ref.percentage;
    var percentage = _ref$percentage === undefined ? 10 : _ref$percentage;

    _classCallCheck(this, Points);

    this.list = list.map(function (point) {
      return new _Point2.default(point);
    });
    this.percentage = percentage;

    if (this.count() < 3) {
      throw new Error("At least three points are required to make a shape!");
    }
  }

  _createClass(Points, [{
    key: "add",
    value: function add(options) {
      var point = options instanceof _Point2.default ? options : new _Point2.default(options),
          distance = point.distanceFrom(this.last());

      if (distance <= 1) {
        return false;
      }

      this.list.push(point);
      return point;
    }
  }, {
    key: "buildBetween",
    value: function buildBetween(a, b) {
      var pointA = this.at(a),
          pointB = this.at(b),
          ratio = this.percentage / 100;

      return new _Point2.default({
        x: pointA.x + ratio * (pointB.x - pointA.x),
        y: pointA.y + ratio * (pointB.y - pointA.y)
      });
    }
  }, {
    key: "at",
    value: function at(i) {
      return this.list[i];
    }
  }, {
    key: "count",
    value: function count() {
      return this.list.length;
    }
  }, {
    key: "last",
    value: function last() {
      return this.list[this.count() - 1];
    }
  }, {
    key: "toPath",
    value: function toPath() {
      return this.list.map(function (point) {
        return point.toPath();
      }).join(" ");
    }
  }]);

  return Points;
}();

module.exports = Points;

},{"./Point":3,"./util":8}],5:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Side = _dereq_("./Side");

var _Side2 = _interopRequireDefault(_Side);

var _Point = _dereq_("./Point");

var _Point2 = _interopRequireDefault(_Point);

var _util = _dereq_("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_AREA = 100000;

var Shape = function () {
  function Shape(_ref) {
    var _ref$sides = _ref.sides;
    var sides = _ref$sides === undefined ? [] : _ref$sides;

    _classCallCheck(this, Shape);

    this.sides = this._wrapSides(sides);
  }

  _createClass(Shape, [{
    key: "split",
    value: function split() {
      var longestSides = this._twoLongestSides(),
          a = longestSides[0],
          b = longestSides[1],
          randomPointA = this._randomPoint(this.sides[a]),
          randomPointB = this._randomPoint(this.sides[b]);

      var sideB2 = new _Side2.default({ from: randomPointB, to: this.sides[b].to }),
          sideA2 = new _Side2.default({ from: randomPointA, to: this.sides[a].to });

      var shapeA = new Shape({
        sides: [].concat(this.sides.slice(0, a), new _Side2.default({ from: this.sides[a].from, to: randomPointA }), new _Side2.default({ from: randomPointA, to: randomPointB }), sideB2, this.sides.slice(b + 1))
      });

      var shapeB = new Shape({
        sides: [].concat(sideA2, this.sides.slice(a + 1, b), new _Side2.default({ from: this.sides[b].from, to: randomPointB }), new _Side2.default({ from: randomPointB, to: randomPointA }))
      });

      return [].concat(shapeA.area() > MAX_AREA ? shapeA.split() : shapeA, shapeB.area() > MAX_AREA ? shapeB.split() : shapeB);
    }
  }, {
    key: "area",
    value: function area() {
      var points = this.points,
          area = 0,
          i = void 0;

      for (i = 0; i < points.length; ++i) {
        var i2 = (i + 1) % points.length;
        area += points[i].x * points[i2].y - points[i].y * points[i2].x;
      }
      return Math.abs(area / 2);
    }
  }, {
    key: "_randomPoint",
    value: function _randomPoint(side) {
      var ratio = _util2.default.randomInterval(33, 66) / 100;

      return new _Point2.default({
        x: side.from.x + ratio * (side.to.x - side.from.x),
        y: side.from.y + ratio * (side.to.y - side.from.y)
      });
    }
  }, {
    key: "_wrapSides",
    value: function _wrapSides(sides) {
      return sides.map(function (side) {
        return side instanceof _Side2.default ? side : new _Side2.default(side);
      });
    }
  }, {
    key: "_twoLongestSides",
    value: function _twoLongestSides() {
      return this._longestSides().slice(0, 2).sort(function (a, b) {
        return a - b;
      });
    }
  }, {
    key: "_longestSides",
    value: function _longestSides() {
      return this.sides.map(function (side, index) {
        return {
          index: index,
          l: _util2.default.distance(side.from, side.to)
        };
      }).sort(function (a, b) {
        return b.l - a.l;
      }).map(function (side) {
        return side.index;
      });
    }
  }, {
    key: "points",
    get: function get() {
      return this.sides.map(function (side) {
        return side.from;
      });
    }
  }]);

  return Shape;
}();

module.exports = Shape;

},{"./Point":3,"./Side":6,"./util":8}],6:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = _dereq_("./Point");

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Side = function () {
  function Side(_ref) {
    var from = _ref.from;
    var to = _ref.to;

    _classCallCheck(this, Side);

    this.from = this._wrapPoint(from);
    this.to = this._wrapPoint(to);
  }

  _createClass(Side, [{
    key: "_wrapPoint",
    value: function _wrapPoint(point) {
      return point instanceof _Point2.default ? point : new _Point2.default(point);
    }
  }, {
    key: "from",
    get: function get() {
      return this._from;
    },
    set: function set(value) {
      this._from = value;
    }
  }, {
    key: "to",
    get: function get() {
      return this._to;
    },
    set: function set(value) {
      this._to = value;
    }
  }]);

  return Side;
}();

module.exports = Side;

},{"./Point":3}],7:[function(_dereq_,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Doodle = _dereq_("./Doodle");

var _Doodle2 = _interopRequireDefault(_Doodle);

var _FullScreen = _dereq_("./FullScreen");

var _FullScreen2 = _interopRequireDefault(_FullScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZenDoodle = function () {
  function ZenDoodle(_ref) {
    var _ref$shapes = _ref.shapes;
    var shapes = _ref$shapes === undefined ? [] : _ref$shapes;
    var svg = _ref.svg;

    _classCallCheck(this, ZenDoodle);

    this.svg = svg;
    this.shapes = shapes;
  }

  _createClass(ZenDoodle, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.shapes.map(function (shapeConfig) {
        var doodle = new _Doodle2.default(shapeConfig);
        _this.svg.appendChild(doodle.draw());
      });
    }
  }, {
    key: "fullScreen",
    value: function fullScreen() {
      this.shapes = new _FullScreen2.default({ svg: this.svg }).build();
      this.render();
    }
  }]);

  return ZenDoodle;
}();

module.exports = ZenDoodle;

},{"./Doodle":1,"./FullScreen":2}],8:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  distance: function distance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  },
  getRandom: function getRandom(array, count) {
    var result = new Array(count),
        len = array.length,
        taken = new Array(len);
    if (count > len) throw new RangeError("getRandom: more elements taken than available");
    while (count--) {
      var x = Math.floor(Math.random() * len);
      result[count] = array[x in taken ? taken[x] : x];
      taken[x] = --len;
    }
    return result;
  },
  randomInterval: function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

},{}]},{},[7])
(7)
});