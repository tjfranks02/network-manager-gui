import CanvasUtils from "../../utils/CanvasUtils";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import EditorView from "../EditorView";
import Connection from "../../model/elements/Connection";
import { ElementStates } from "../../editorConstants";
import ModelUtils from "../../model/utils/modelUtils";

const CONNECTION_POINT_RADIUS: number = 5;

class ConnectionPointRenderer extends ElementRenderer {
  connectionPoint: ConnectionPoint;

  constructor(connectionPoint: ConnectionPoint) {
    super();

    this.connectionPoint = connectionPoint;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    let connectionPointPos = this.connectionPoint.viewData.pos;

    let shouldDisplay = CanvasUtils.isMouseInRangeOfPoint(canvasState.mousePos, 
      connectionPointPos, 5);

    if (shouldDisplay) {
      ctx.beginPath();

      ctx.fillStyle = 'red';
      ctx.arc(connectionPointPos.x, connectionPointPos.y, CONNECTION_POINT_RADIUS, 0, 2 * Math.PI, 
        false);
      ctx.fill();
      
      ctx.closePath();
    }
  }

  elementUnderMouse(canvasState: CanvasState): Element | null {
    if (this.isMouseOverElement(canvasState)) {
      return this.connectionPoint;
    } 
    
    return null;
  }

  isMouseOverElement(canvasState: CanvasState): boolean {
    return CanvasUtils.isMouseInRangeOfPoint(
      canvasState.mousePos, 
      this.connectionPoint.viewData.pos,
      5
    );
  } 

  handleClick(): void {
    if (EditorView.viewState.prevActiveElement instanceof Connection) {
      EditorView.viewState.prevActiveElement.dest = this.connectionPoint.owner;
    } else {
      let newConnection = new Connection(
        ModelUtils.generateUUID(),
        this.connectionPoint.owner, 
        null,
        { pos: this.connectionPoint.owner.viewData.pos, state: ElementStates.INCOMPLETE, zIndex: -1, margin: 0, padding: 0 }
      );
      this.connectionPoint.owner.connections.push(newConnection);
      EditorView.assignNewActiveElement(newConnection);
    }
  }

  handleUnclick(): void {

  }

  handleMouseMove(): void {

  }
}

export default ConnectionPointRenderer;