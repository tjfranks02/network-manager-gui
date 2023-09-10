import { CanvasState } from "../../../types";
import EditorView from "../../view/EditorView";
import ConnectionPoint from "../../../model/elements/ConnectionPoint";
import Connection from "../../../model/elements/Connection";
import Node from "../../../model/elements/Node";

class CanvasEventHandler {
  constructor() {

  }

  static handle(canvasState: CanvasState) : void {
    // console.log(EditorView.viewState.activeElement!);

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