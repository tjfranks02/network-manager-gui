import Element from "./Element";
import { ElementViewData } from "../../types";
import ConnectionRenderer from "../../editor/view/renderers/ConnectionRenderer";
import Node from "./Node";

class Connection extends Element {
  origin: Node;
  dest: Node | null;

  constructor(id: string, origin: Node, dest: Node | null=null, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new ConnectionRenderer(this);
    this.origin = origin;
    this.dest = dest;
  }
}

export default Connection;