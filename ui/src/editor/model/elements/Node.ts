import Connection from "./Connection";
import Element from "./Element";
import { ElementViewData } from "../../types";
import NodeRenderer from "../../../editor/view/renderers/NodeRenderer";

class Node extends Element {
  connections: Array<Connection>;

  constructor(id: string, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new NodeRenderer(this);

    // Connections from this node to others
    this.connections = [];
  }
}

export default Node;