import Point from "../../utils/Point";
import Connection from "../../model/elements/Connection";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import EditorView from "../EditorView";
import { ElementStates } from "../../editorConstants";

class ConnectionRenderer extends ElementRenderer {
  connection: Connection;

  constructor(connection: Connection) {
    super();
    this.connection = connection;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let originPos = this.connection.origin.viewData.pos;
    let destPos = this.connection.dest ? this.connection.dest.viewData.pos : EditorView.viewState.mousePos;

    ctx.beginPath();
    
    ctx.moveTo(originPos.x, originPos.y);
    ctx.lineTo(destPos.x, destPos.y);
    
    if (this.isMouseWithinThreshold()) {
      ctx.strokeStyle = 'red';
    } else {
      ctx.strokeStyle = 'green';
    }

    ctx.fill();
    ctx.stroke();
    
    ctx.closePath();
  }

  isMouseWithinThreshold(): boolean {
    if (!(this.connection.dest)) {
      return false;
    }

    let originPos: Point = this.connection.origin.viewData.pos;
    let destPos: Point = this.connection.dest!.viewData.pos;

    let m: number = (destPos.y - originPos.y) / (destPos.x - originPos.x);
    let c: number = originPos.y - m * originPos.x;
    let connectionY: number = m * EditorView.viewState.mousePos.x + c
    
    return Math.abs(connectionY - EditorView.viewState.mousePos.y) < 8;
  }

  elementUnderMouse(): Element | null {
    return this.isMouseWithinThreshold() ? this.connection : null;
  }

  handleClick(): void {
    this.connection.viewData.state = ElementStates.CLICKED;
  }

  handleUnclick(): void {
    this.connection.viewData.state = ElementStates.ACTIVE;
  }

  handleMouseMove(): void {

  }
}

export default ConnectionRenderer;