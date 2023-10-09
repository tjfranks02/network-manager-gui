import Element from "./Element";
import { BaseElementViewData } from "../../types";
import ConnectionRenderer from "../../../editor/view/renderers/ConnectionRenderer";
import Node from "./Node";

class Connection extends Element {
  origin: Node;
  dest: Node | null;

  constructor(id: string, origin: Node, dest: Node | null=null, baseViewData: BaseElementViewData) {
    super(id);
    this.renderer = new ConnectionRenderer(this, baseViewData);
    this.origin = origin;
    this.dest = dest;
  }
}

export default Connection;