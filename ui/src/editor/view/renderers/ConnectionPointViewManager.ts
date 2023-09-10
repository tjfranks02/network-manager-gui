import CanvasUtils from "../../../model/utils/canvasUtils";
import { CanvasState } from "../../../types";
import ElementViewManager from "./ElementViewManager";
import Element from "../../../model/elements/Element";
import ConnectionPoint from "../../../model/elements/ConnectionPoint";

const CONNECTION_POINT_RADIUS: number = 5;

class ConnectionPointViewManager extends ElementViewManager {
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
}

export default ConnectionPointViewManager;