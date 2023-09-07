import CanvasEventHandler from "./CanvasEventHandler";
import { CanvasState } from "../../types";
import View from "../View";

class CanvasMouseMoveEventHandler extends CanvasEventHandler {
  constructor() {
    super();
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

export default CanvasMouseMoveEventHandler;