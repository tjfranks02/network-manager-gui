import CanvasEventHandler from "./CanvasEventHandler";
import { CanvasState } from "../../types";
import EditorView from "../EditorView";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node";

class CanvasMouseMoveEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    
  }

  static handleConnectionEvent(canvasState: CanvasState): void {
    
  }

  static handleNodeEvent(canvasState: CanvasState): void {
    let activeNode: Node = <Node>EditorView.viewState.activeElement!;

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