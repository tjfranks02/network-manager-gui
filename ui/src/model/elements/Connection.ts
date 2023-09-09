import Element from "./Element";
import { ElementViewData } from "../../types";
import ConnectionViewManager from "../../editor/renderers/ConnectionViewManager";

class Connection extends Element {
  origin: Element;
  dest: Element | null;
  connections: Array<Connection>;

  constructor(id: string, origin: Element, dest: Element | null=null, viewData: ElementViewData) {
    super(id, viewData);
    this.renderer = new ConnectionViewManager(this);
    this.origin = origin;
    this.dest = dest;

    this.connections = [];
  }
}

export default Connection;