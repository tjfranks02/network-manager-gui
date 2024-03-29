import { v4 as uuidv4 } from "uuid";

import Node from "./elements/Node";
import NodeGroup from "./elements/NodeGroup";
import Element from "./elements/Element";
import Point from "../../editor/utils/Point";
import { ElementStates } from "../../constants/editorConstants";
import NodeGroupRenderer from "../view/renderers/NodeGroupRenderer";

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
    
    let node1 = new Node(uuidv4(), { pos: new Point(0, 0), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    let node2 = new Node(uuidv4(), { pos: new Point(75, 75), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    // let node3 = new Node(uuidv4(), { pos: new Point(50, 240), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    let node4 = new Node(uuidv4(), { pos: new Point(850, 325), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });

    this.elements.push(node1);
    this.elements.push(node2);
    // this.elements.push(node3);
    this.elements.push(node4);

    let node5 = new Node(uuidv4(), { pos: new Point(50, 100), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    let node6 = new Node(uuidv4(), { pos: new Point(500, 100), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    let node7 = new Node(uuidv4(), { pos: new Point(750, 200), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
    let node8 = new Node(uuidv4(), { pos: new Point(250, 250), state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });

    // Add node group for debugging purposes
    let nodeGroup: NodeGroup = new NodeGroup(uuidv4(), { pos: new Point(450, 150), state: ElementStates.IDLE, zIndex: 5, margin: 0, padding: 8 });
    let ngRenderer: NodeGroupRenderer = <NodeGroupRenderer>nodeGroup.renderer;
    ngRenderer.addNodeToGroup(node5);
    ngRenderer.addNodeToGroup(node6);
    ngRenderer.addNodeToGroup(node7);
    ngRenderer.addNodeToGroup(node8);

    this.elements.push(nodeGroup);
  }

  removeElementById(id: string): void {
    let index = this.elements.findIndex((element) => element.id === id);
    this.elements.splice(index, 1);
  }
}

const singletonInstance: Model = new Model();
Object.freeze(singletonInstance);

export default singletonInstance;