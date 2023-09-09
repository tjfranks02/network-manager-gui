import CanvasEventHandler from "./CanvasEventHandler";
import View from "../ViewController/View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node/Node";
import Connection from "../elements/Connection";
import ConnectionPoint from "../elements/ConnectionPoint";
import Element from "../elements/Element";

class CanvasClickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(canvasState: CanvasState): void {
    let clickedConnectionPoint: ConnectionPoint = 
      <ConnectionPoint>View.viewState.activeElement;

    // If we click a connection point there are a few conditions
    // 1. If the PREVIOUSLY active element is NOT a connection => create a new connection and make it active
    // 2. If active element IS a connection => set the destination of the active connection as this connection point
    
    let prevActiveElement: Element | null = View.viewState.prevActiveElement;

    if (prevActiveElement instanceof Connection) {
      
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