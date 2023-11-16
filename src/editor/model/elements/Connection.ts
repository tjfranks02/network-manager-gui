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

  /**
   * Maps Connection to object that can be written to a network topology json file.
   * 
   * Schema for a connection in a topology file:
   * id: string,
   * type: "connection",
   * origin: node id (string),
   * dest: node id (string)
   * 
   * Returns:
   *   Schema for a connection in a network topology json file.
   */
  mapElementToTopology(): any {
    return {
      id: this.id,
      type: "Connection",
      origin: {
        id: this.origin.id,
        pos: {
          x: this.origin.renderer.pos.x,
          y: this.origin.renderer.pos.y
        }
      },
      dest: {
        id: this.dest!.id,
        pos: {
          x: this.dest!.renderer.pos.x,
          y: this.dest!.renderer.pos.y
        }
      },
    };
  }
}

export default Connection;