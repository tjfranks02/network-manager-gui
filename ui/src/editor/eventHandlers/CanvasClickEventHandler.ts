import CanvasEventHandler from "./CanvasEventHandler";
import EditorView from "../EditorView";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node";
import Connection from "../elements/Connection";
import ConnectionPoint from "../elements/ConnectionPoint";

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
        clickedConnectionPoint.owner, null, ElementStates.INCOMPLETE
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
    clickedElement.state = ElementStates.CLICKED;
  }
}

export default CanvasClickEventHandler;