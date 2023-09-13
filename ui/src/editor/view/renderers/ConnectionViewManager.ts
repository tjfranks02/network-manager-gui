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
    if (!(this.connection.dest)) {
      return null;
    }

    let originPos: Point = this.connection.origin.viewData.pos;
    let destPos: Point = this.connection.dest!.viewData.pos;

    let m: number = (destPos.y - originPos.y) / (destPos.x - originPos.x);
    let c: number = originPos.y - m * originPos.x;
    let connectionY: number = m * canvasState.mousePos.x + c

    return Math.abs(connectionY - canvasState.mousePos.y) ? this.connection : null;
  }

  handleMouseDown(canvasState: CanvasState): void {

  }

  handleMouseMove(canvasState: CanvasState): void {
    
  }
}

export default ConnectionViewManager;