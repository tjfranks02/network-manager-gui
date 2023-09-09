import Connection from "./Connection";
import Element from "./Element";
import { ElementViewData } from "../../types";
import NodeViewManager from "../../editor/renderers/NodeViewManager";

class Node extends Element {
  connections: Array<Connection>;

  constructor(id: string, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new NodeViewManager(this);

    // Connections from this node to others
    this.connections = [];
  }
}

export default Node;