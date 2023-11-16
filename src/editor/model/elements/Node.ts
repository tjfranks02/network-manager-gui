import Connection from "./Connection";
import ConnectionPoint from "./ConnectionPoint";
import Element from "./Element";
import { BaseElementViewData } from "../../types";
import NodeRenderer from "../../../editor/view/renderers/NodeRenderer";

class Node extends Element {
  connections: Array<Connection>;
  connectionPoints!: Array<ConnectionPoint>;

  constructor(id: string, baseViewData: BaseElementViewData) {
    super(id);
    this.renderer = new NodeRenderer(this, baseViewData);

    // Connections from this node to others
    this.connections = [];
  }

  /**
   * Maps node to object that can be written to a network topology json file.

   * Schema for a node in a topology file:
   * id: string,
   * type: string,
   * pos: { 
   *   x: number, 
   *   y: number 
   * }
   * connections: Array<Connection>,
   * 
   * Returns:
   *   Schema for a node in a network topology json file.
   */
  mapElementToTopology(): any {
    return {
      id: this.id,
      type: "node",
      pos: {
        x: this.renderer.pos.x,
        y: this.renderer.pos.y
      },
      connections: this.connections.map((connection) => connection.mapElementToTopology())
    };
  }
}

export default Node;