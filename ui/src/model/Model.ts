import { v4 as uuidv4 } from "uuid";

import Node from "./elements/Node";
import Element from "./elements/Element";
import Point from "./utils/Point";
import { ElementStates } from "../constants/canvasConstants";

/**
 * Wrapper class around view elements in the canvas
 */
class Model {
  elements: Array<Element>;

  constructor() {
    this.elements = [];
    this.constructElements();
  }

  /**
   * Constructs a series of elements for testing purposes.
   */
  constructElements(): void {
    this.elements.push(new Node(uuidv4(), { pos: new Point(50, 100), state: ElementStates.IDLE }));
    this.elements.push(new Node(uuidv4(), { pos: new Point(500, 100), state: ElementStates.IDLE }));
    this.elements.push(new Node(uuidv4(), { pos: new Point(750, 200), state: ElementStates.IDLE }));
    this.elements.push(new Node(uuidv4(), { pos: new Point(250, 250), state: ElementStates.IDLE }));
  }
}

const singletonInstance: Model = new Model();
Object.freeze(singletonInstance);

export default singletonInstance;