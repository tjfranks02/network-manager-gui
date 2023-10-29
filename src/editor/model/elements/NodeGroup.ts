import Element from "./Element";
import { BaseElementViewData } from "../../types";
import NodeGroupRenderer from "../../view/renderers/NodeGroupRenderer";
import Node from "./Node";

class NodeGroup extends Element {
  nodes: Array<Node>;

  constructor(id: string, baseViewData: BaseElementViewData) {
    super(id);
    this.renderer = new NodeGroupRenderer(this, baseViewData, 50, 50);
    this.nodes = [];
  }
}

export default NodeGroup;