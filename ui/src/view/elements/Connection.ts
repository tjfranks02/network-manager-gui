import { ElementStates } from "../../constants/canvasConstants";
import Element from "./Element";
import Point from "../../utils/Point";
import { CanvasState } from "../../types";

class Connection extends Element {
  origin: Element;
  dest: Element | null;
  state: ElementStates;
  connections: Array<Connection>;

  constructor(origin: Element, dest: Element | null=null, state=ElementStates.INCOMPLETE) {
    super("example id", origin.pos);
    this.origin = origin;
    this.dest = dest;
    this.state = state;

    this.connections = [];
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    let originPos = this.origin.pos;
    let destPos = this.dest ? this.dest.pos : canvasState.mousePos;

    ctx.beginPath();
    
    ctx.moveTo(originPos.x, originPos.y);
    ctx.lineTo(destPos.x, destPos.y);
    ctx.stroke();
    
    ctx.fillStyle = 'green';
    ctx.fill();
    
    ctx.closePath();
  }

  isMouseOverElement(mousePos: Point): boolean {
    return false;
  }

  handleMouseDown(canvasState: CanvasState): void {

  }

  handleMouseMove(canvasState: CanvasState): void {
    
  }
  
  /**
   * Return whether this connection is incomplete or not (i.e. does not have a
   * destination node yet).
   * 
   * Returns:
   *   Whether this Connection element is incomplete or not.
   */
  isIncomplete(): boolean {
    if (this.dest) {
      return false;
    }

    return true;
  }
}

export default Connection;