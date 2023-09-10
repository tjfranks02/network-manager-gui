import Element from "./Element";
import { ElementViewData } from "../../types";
import ConnectionViewManager from "../../editor/view/renderers/ConnectionViewManager";
import Node from "./Node";

class Connection extends Element {
  origin: Node;
  dest: Node | null;
  connections: Array<Connection>;

  constructor(id: string, origin: Node, dest: Node | null=null, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new ConnectionViewManager(this);
    this.origin = origin;
    this.dest = dest;

    this.connections = [];
  }
}

export default Connection;