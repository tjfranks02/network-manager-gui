import CanvasUtils from "../../utils/CanvasUtils";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import EditorView from "../EditorView";
import Connection from "../../model/elements/Connection";
import { ElementStates } from "../../editorConstants";
import ModelUtils from "../../model/utils/modelUtils";
import { BaseElementViewData } from "../../types";

const CONNECTION_POINT_RADIUS: number = 5;

class ConnectionPointRenderer extends ElementRenderer {
  connectionPoint: ConnectionPoint;

  constructor(connectionPoint: ConnectionPoint, baseViewData: BaseElementViewData) {
    super(baseViewData);

    this.connectionPoint = connectionPoint;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let connectionPointPos = this.viewPos;

    let shouldDisplay = CanvasUtils.isMouseInRangeOfPoint(EditorView.viewState.mousePos, 
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

  elementUnderMouse(): Element | null {
    if (this.isMouseOverElement()) {
      return this.connectionPoint;
    } 
    
    return null;
  }

  isMouseOverElement(): boolean {
    return CanvasUtils.isMouseInRangeOfPoint(EditorView.viewState.mousePos, this.viewPos, 5);
  } 

  handleClick(): void {
    if (EditorView.viewState.prevActiveElement instanceof Connection) {
      EditorView.viewState.prevActiveElement.dest = this.connectionPoint.owner;
    } else {
      let newConnection = new Connection(
        ModelUtils.generateUUID(),
        this.connectionPoint.owner,
        null,
        { 
          worldPos: this.connectionPoint.owner.renderer.worldPos,
          viewPos: this.connectionPoint.owner.renderer.viewPos,
          state: ElementStates.INCOMPLETE, 
          zIndex: -1, 
          margin: 0, 
          padding: 0
        }
      );

      this.connectionPoint.owner.connections.push(newConnection);
      EditorView.assignNewActiveElement(newConnection);
    }
  }

  handleUnclick(): void {

  }

  handleMouseMove(): void {

  }

  updateViewPos(): void {
    this.viewPos.x = this.worldPos.x + EditorView.viewState.panVector.x;
    this.viewPos.y = this.worldPos.y + EditorView.viewState.panVector.y;
  }
}

export default ConnectionPointRenderer;