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
}

export default Node;