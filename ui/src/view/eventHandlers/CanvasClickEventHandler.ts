import CanvasEventHandler from "./CanvasEventHandler";
import View from "../View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node";
import Connection from "../elements/Connection";

class CanvasClickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(viewController: View, canvasState: CanvasState): void {
    
  }

  static handleConnectionEvent(viewController: View, canvasState: CanvasState): void {
    let clickedElement: Connection = <Connection>viewController.viewState.lastClicked;
  }

  static handleNodeEvent(viewController: View, canvasState: CanvasState): void {
    let clickedElement: Node = <Node>viewController.viewState.activeElement!;
    viewController.resetElementStates();

    clickedElement.state = ElementStates.CLICKED;
    clickedElement.pos = canvasState.mousePos;
  }
}

export default CanvasClickEventHandler;