import CanvasEventHandler from "./CanvasEventHandler";
import { CanvasState } from "../../../types";
import EditorView from "../../view/EditorView";
import { ElementStates } from "../../../constants/canvasConstants";
import Node from "../../../model/elements/Node";
import NodeViewManager from "../../view/renderers/NodeViewManager";

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
    let nodeRenderer: NodeViewManager = <NodeViewManager>activeNode.renderer;

    switch (activeNode.viewData.state) {
      case ElementStates.CLICKED:
        nodeRenderer.moveNodeToPos(canvasState.mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }
}

export default CanvasMouseMoveEventHandler;