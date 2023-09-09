import CanvasEventHandler from "./CanvasEventHandler";
import { CanvasState } from "../../types";
import View from "../ViewController/View";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node/Node";

class CanvasMouseMoveEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(viewController: View, canvasState: CanvasState): void {
    
  }

  static handleConnectionEvent(viewController: View, canvasState: CanvasState): void {
    
  }

  static handleNodeEvent(viewController: View, canvasState: CanvasState): void {
    let activeNode: Node = <Node>viewController.viewState.activeElement!;

    switch (activeNode.state) {
      case ElementStates.CLICKED:
        activeNode.moveNodeToPos(canvasState.mousePos)
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }
}

export default CanvasMouseMoveEventHandler;