import CanvasEventHandler from "./CanvasEventHandler";
import View from "../View";
import { CanvasState } from "../../types";

class CanvasUnclickEventHandler extends CanvasEventHandler {
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

export default CanvasUnclickEventHandler;