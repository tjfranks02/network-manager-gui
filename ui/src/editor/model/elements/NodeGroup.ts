import Element from "./Element";
import { ElementViewData } from "../../types";
import NodeGroupRenderer from "../../view/renderers/NodeGroupRenderer";
import Node from "./Node";

class NodeGroup extends Element {
  nodes: Array<Node>;

  constructor(id: string, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new NodeGroupRenderer(this);
    this.nodes = [];
  }

  addNode(node: Node): void {
    this.nodes.push(node);
  }
}

export default NodeGroup;