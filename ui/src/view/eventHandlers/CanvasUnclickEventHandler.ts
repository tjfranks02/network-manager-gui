import CanvasEventHandler from "./CanvasEventHandler";
import View from "../ViewController/View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";

class CanvasUnclickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(viewController: View, canvasState: CanvasState): void {
    
  }

  static handleConnectionEvent(viewController: View, canvasState: CanvasState): void {

  }

  static handleNodeEvent(viewController: View, canvasState: CanvasState): void {
    viewController.viewState.activeElement!.state = ElementStates.ACTIVE;
  }
}

export default CanvasUnclickEventHandler;