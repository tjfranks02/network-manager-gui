import { CanvasState } from "../../types";
import EditorView from "../EditorView";
import ConnectionPoint from "../elements/ConnectionPoint";
import Connection from "../elements/Connection";
import Node from "../elements/Node";

class CanvasEventHandler {
  constructor() {

  }

  static handle(canvasState: CanvasState) : void {
    switch (EditorView.viewState.activeElement!.constructor) {
      case ConnectionPoint:
        this.handleConnectionPointEvent(canvasState);
        break;

      case Node:
        this.handleNodeEvent(canvasState);
        break;

      case Connection:
        this.handleConnectionEvent(canvasState);
        break;
    }
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }

  static handleConnectionEvent(canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }

  static handleNodeEvent(canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }
}

export default CanvasEventHandler;