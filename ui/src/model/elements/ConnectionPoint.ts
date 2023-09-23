import Connection from "./Connection";
import Element from "./Element";
import { ElementViewData } from "../../types";
import ConnectionPointRenderer from "../../editor/view/renderers/ConnectionPointRenderer";
import Node from "./Node";

class ConnectionPoint extends Element {
  connections: Array<Connection>;
  owner: Node;

  constructor(id: string, viewData: ElementViewData, owner: Node) {
    super(id, viewData);
    this.renderer = new ConnectionPointRenderer(this);
    this.owner = owner;

    // Connections from this node to others
    this.connections = [];
  }
}

export default ConnectionPoint;