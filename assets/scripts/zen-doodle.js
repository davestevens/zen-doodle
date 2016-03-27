import Shape from "./shape";
import examples from "./examples.json";

let shapes = document.getElementById("shapes");

for (var key in examples) {
  let element = document.createElement("div");
  element.className = "shape";

  let header = document.createElement("h2");
  header.appendChild(document.createTextNode(key));
  element.appendChild(header);

  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      shape = new Shape({
        percentage: 20,
        points: examples[key]
      });
  svg.setAttribute("width", 200);
  svg.setAttribute("height", 200);
  svg.appendChild(shape.draw());
  element.appendChild(svg);

  shapes.appendChild(element);
}
