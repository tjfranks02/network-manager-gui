import Point from "../../utils/Point";
import Element from "../elements/Element";

class ElementClickEvent {
  clickedElement: Element;
  pos: Point;

  constructor(clickedElement: Element, pos: Point) {
    this.clickedElement = clickedElement;
    this.pos = pos;
  }
}

export default ElementClickEvent;