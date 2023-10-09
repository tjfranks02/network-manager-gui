import Point from "../../utils/Point";
import Connection from "../../model/elements/Connection";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import EditorView from "../EditorView";
import { ElementStates } from "../../editorConstants";
import { BaseElementViewData } from "../../types";

class ConnectionRenderer extends ElementRenderer {
  connection: Connection;

  constructor(connection: Connection, baseViewData: BaseElementViewData) {
    super(baseViewData);
    this.connection = connection;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let originPos = this.connection.origin.renderer.viewPos;
    let destPos = this.connection.dest ? this.connection.dest.renderer.viewPos : 
      EditorView.viewState.mousePos;

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

    let originPos: Point = this.viewPos;
    let destPos: Point = this.viewPos;

    let m: number = (destPos.y - originPos.y) / (destPos.x - originPos.x);
    let c: number = originPos.y - m * originPos.x;
    let connectionY: number = m * EditorView.viewState.mousePos.x + c
    
    return Math.abs(connectionY - EditorView.viewState.mousePos.y) < 8;
  }

  elementUnderMouse(): Element | null {
    return this.isMouseWithinThreshold() ? this.connection : null;
  }

  handleClick(): void {
    this.state = ElementStates.CLICKED;
  }

  handleUnclick(): void {
    this.state = ElementStates.ACTIVE;
  }

  handleMouseMove(): void {

  }

  updateViewPos(): void {
    this.viewPos.x = this.worldPos.x + EditorView.viewState.panVector.x;
    this.viewPos.y = this.worldPos.y + EditorView.viewState.panVector.y;
  }
}

export default ConnectionRenderer;