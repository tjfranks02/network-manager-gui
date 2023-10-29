import Point from "../../utils/Point";
import Connection from "../../model/elements/Connection";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import EditorView from "../EditorView";
import { 
  CONNECTION_IDLE_COLOUR, 
  CONNECTION_HOVER_COLOUR, 
  ElementStates 
} from "../../../constants/editorConstants";
import { BaseElementViewData } from "../../types";

class ConnectionRenderer extends ElementRenderer {
  connection: Connection;

  constructor(connection: Connection, baseViewData: BaseElementViewData) {
    super(baseViewData);
    this.connection = connection;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let worldMousePos: Point = EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos);

    let originPos = this.connection.origin.renderer.pos;
    let destPos = this.connection.dest ? this.connection.dest.renderer.pos : worldMousePos;

    ctx.beginPath();
    
    ctx.moveTo(originPos.x, originPos.y);
    ctx.lineTo(destPos.x, destPos.y);
    
    if (this.isMouseWithinThreshold(worldMousePos)) {
      ctx.strokeStyle = CONNECTION_HOVER_COLOUR;
    } else {
      ctx.strokeStyle = CONNECTION_IDLE_COLOUR;
    }

    ctx.fill();
    ctx.stroke();
    
    ctx.closePath();
  }

  isMouseWithinThreshold(mousePos: Point): boolean {
    if (!(this.connection.dest)) {
      return false;
    }

    let originPos = this.connection.origin.renderer.pos;
    let destPos = this.connection.dest ? this.connection.dest.renderer.pos : mousePos;

    let m: number = (destPos.y - originPos.y) / (destPos.x - originPos.x);
    let c: number = originPos.y - m * originPos.x;
    let connectionY: number = m * mousePos.x + c
    
    return Math.abs(connectionY - mousePos.y) < 8;
  }

  elementUnderMouse(mousePos: Point): Element | null {
    return this.isMouseWithinThreshold(mousePos) ? this.connection : null;
  }

  handleClick(): void {
    this.state = ElementStates.CLICKED;
  }

  handleUnclick(): void {
    this.state = ElementStates.ACTIVE;
  }

  handleMouseMove(): void {

  }
}

export default ConnectionRenderer;