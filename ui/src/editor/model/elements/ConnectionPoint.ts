import Connection from "./Connection";
import Element from "./Element";
import { BaseElementViewData } from "../../types";
import ConnectionPointRenderer from "../../../editor/view/renderers/ConnectionPointRenderer";
import Node from "./Node";

class ConnectionPoint extends Element {
  connections: Array<Connection>;
  owner: Node;

  constructor(id: string, baseViewData: BaseElementViewData, owner: Node) {
    super(id);
    this.renderer = new ConnectionPointRenderer(this, baseViewData);
    this.owner = owner;

    // Connections from this node to others
    this.connections = [];
  }
}

export default ConnectionPoint;