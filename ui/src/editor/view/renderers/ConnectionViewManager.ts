import Point from "../../utils/Point";
import Connection from "../../../model/elements/Connection";
import { CanvasState } from "../../../types";
import ElementViewManager from "./ElementViewManager";
import Element from "../../../model/elements/Element";

class ConnectionViewManager extends ElementViewManager {
  connection: Connection;

  constructor(connection: Connection) {
    super();
    this.connection = connection;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    let originPos = this.connection.origin.viewData.pos;
    let destPos = this.connection.dest ? this.connection.dest.viewData.pos : canvasState.mousePos;

    ctx.beginPath();
    
    ctx.moveTo(originPos.x, originPos.y);
    ctx.lineTo(destPos.x, destPos.y);
    ctx.stroke();
    
    ctx.fillStyle = 'green';
    ctx.fill();
    
    ctx.closePath();
  }

  elementUnderMouse(canvasState: CanvasState): Element | null {
    return null;
  }

  isMouseOverElement(mousePos: Point): boolean {
    return false;
  }

  handleMouseDown(canvasState: CanvasState): void {

  }

  handleMouseMove(canvasState: CanvasState): void {
    
  }
}

export default ConnectionViewManager;