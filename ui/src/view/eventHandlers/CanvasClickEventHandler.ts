import CanvasEventHandler from "./CanvasEventHandler";
import View from "../ViewController/View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node/Node";
import Connection from "../elements/Connection";
import ConnectionPoint from "../elements/ConnectionPoint";

class CanvasClickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    let clickedConnectionPoint: ConnectionPoint = 
      <ConnectionPoint>View.viewState.activeElement;

    if (View.viewState.prevActiveElement instanceof Connection) {
      View.viewState.prevActiveElement.dest = clickedConnectionPoint.owner;
    } else {
      let newConnection = new Connection(
        clickedConnectionPoint.owner, null, ElementStates.INCOMPLETE
      );
      clickedConnectionPoint.owner.connections.push(newConnection);
      View.assignNewActiveElement(newConnection);
    }
  }

  static handleConnectionEvent(canvasState: CanvasState): void {
    let clickedConnection: Connection = <Connection>View.viewState.lastClicked;
  }

  static handleNodeEvent(canvasState: CanvasState): void {
    let clickedElement: Node = <Node>View.viewState.activeElement!;
    View.resetElementStates();
    clickedElement.state = ElementStates.CLICKED;
  }
}

export default CanvasClickEventHandler;