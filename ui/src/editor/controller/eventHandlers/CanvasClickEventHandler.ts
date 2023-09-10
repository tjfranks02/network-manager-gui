import CanvasEventHandler from "./CanvasEventHandler";
import EditorView from "../../view/EditorView";
import { CanvasState } from "../../../types";
import { ElementStates } from "../../../constants/canvasConstants";
import Node from "../../../model/elements/Node";
import Connection from "../../../model/elements/Connection";
import ConnectionPoint from "../../../model/elements/ConnectionPoint";
import ModelUtils from "../../../model/utils/modelUtils";

class CanvasClickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    let clickedConnectionPoint: ConnectionPoint = 
      <ConnectionPoint>EditorView.viewState.activeElement;

    if (EditorView.viewState.prevActiveElement instanceof Connection) {
      EditorView.viewState.prevActiveElement.dest = clickedConnectionPoint.owner;
    } else {
      let newConnection = new Connection(
        ModelUtils.generateUUID(),
        clickedConnectionPoint.owner, 
        null,
        { pos: clickedConnectionPoint.owner.viewData.pos, state: ElementStates.INCOMPLETE }
      );
      clickedConnectionPoint.owner.connections.push(newConnection);
      EditorView.assignNewActiveElement(newConnection);
    }
  }

  static handleConnectionEvent(canvasState: CanvasState): void {
    let clickedConnection: Connection = <Connection>EditorView.viewState.lastClicked;
  }

  static handleNodeEvent(canvasState: CanvasState): void {
    let clickedElement: Node = <Node>EditorView.viewState.activeElement!;
    EditorView.resetElementStates();
    clickedElement.viewData.state = ElementStates.CLICKED;
  }
}

export default CanvasClickEventHandler;