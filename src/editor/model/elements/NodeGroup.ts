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

  /**
   * Maps NodeGroup to object that can be written to a network topology json file. 
   * 
   * Schema for a node group in a topology file:
   * id: string,
   * type: "nodegroup",
   * pos: {
   *   x: number,
   *   y: number
   * },
   * nodes: Array<Node>
   * 
   * Returns:
   *   Schema for a node group in a network topology json file.
   */
  mapElementToTopology(): any {
    return {
      id: this.id,
      type: "NodeGroup",
      pos: {
        x: this.renderer.pos.x,
        y: this.renderer.pos.y
      },
      nodes: this.nodes.map((node) => node.mapElementToTopology())
    };
  }
}

export default NodeGroup;