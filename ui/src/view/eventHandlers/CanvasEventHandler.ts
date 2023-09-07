import { CanvasState } from "../../types";
import View from "../View";
import ConnectionPoint from "../elements/ConnectionPoint";
import Connection from "../elements/Connection";

class CanvasEventHandler {
  constructor() {

  }

  static handle(viewController: View, canvasState: CanvasState) : void {


    switch (viewController.viewState.activeElement!.constructor) {
      case ConnectionPoint:
        this.handleConnectionPointEvent(viewController, canvasState);
        break;

      case Node:
        this.handleNodeEvent(viewController, canvasState);
        break;

      case Connection:
        this.handleConnectionEvent(viewController, canvasState);
        break;
    }
  }

  static handleConnectionPointEvent(viewController: View, canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }

  static handleConnectionEvent(viewController: View, canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }

  static handleNodeEvent(viewController: View, canvasState: CanvasState): void {
    throw new Error("Method should be implemented by subclass.");
  }
}

export default CanvasEventHandler;