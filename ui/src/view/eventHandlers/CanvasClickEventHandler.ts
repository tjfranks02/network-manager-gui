import CanvasEventHandler from "./CanvasEventHandler";
import View from "../View";
import { CanvasState } from "../../types";
import { ElementStates } from "../../constants/canvasConstants";
import Node from "../elements/Node/Node";
import Connection from "../elements/Connection";
import ConnectionPoint from "../elements/ConnectionPoint";

class CanvasClickEventHandler extends CanvasEventHandler {
  constructor() {
    super();
  }

  static handleConnectionPointEvent(viewController: View, canvasState: CanvasState): void {
    let clickedConnectionPoint: ConnectionPoint = 
      <ConnectionPoint>viewController.viewState.activeElement;

    let newConnection = new Connection(clickedConnectionPoint.owner, null, ElementStates.INCOMPLETE);
    clickedConnectionPoint.owner.connections.push(newConnection);
  }

  static handleConnectionEvent(viewController: View, canvasState: CanvasState): void {
    let clickedConnection: Connection = <Connection>viewController.viewState.lastClicked;
  }

  static handleNodeEvent(viewController: View, canvasState: CanvasState): void {
    let clickedElement: Node = <Node>viewController.viewState.activeElement!;
    viewController.resetElementStates();
    clickedElement.state = ElementStates.CLICKED;
  }
}

export default CanvasClickEventHandler;