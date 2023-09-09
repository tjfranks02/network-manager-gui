import CanvasEventHandler from "./CanvasEventHandler";
import View from "../ViewController/View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";

class CanvasUnclickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    
  }

  static handleConnectionEvent(canvasState: CanvasState): void {

  }

  static handleNodeEvent(canvasState: CanvasState): void {
    View.viewState.activeElement!.state = ElementStates.ACTIVE;
  }
}

export default CanvasUnclickEventHandler;