import CanvasUtils from "../../utils/canvasUtils";
import { ElementStates } from "../../constants/canvasConstants";
import Element from "./Element";
import Point from "../../utils/Point";
import { CanvasState } from "../../types";
import Node from "./Node";

class ConnectionPoint extends Element {

  owner: Node;
  radius: number;

  constructor(owner: Node, pos: Point, radius: number=5, state=ElementStates.IDLE) {
    super('test', pos, state);

    this.owner = owner;
    this.radius = radius;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    let shouldDisplay = CanvasUtils.isMouseInRangeOfPoint(
      canvasState.mousePos, 
      { x: this.pos.x, y: this.pos.y }, 5
    );
    
    if (shouldDisplay) {
      ctx.beginPath();

      ctx.fillStyle = 'red';
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
      
      ctx.closePath();
    }
  }

  isMouseOverElement(mousePos: Point): boolean {
    return CanvasUtils.isMouseInRangeOfPoint(
      mousePos, 
      { x: this.pos.x, y: this.pos.y }, 
      this.radius
    );
  }

  getElementAtMousePos(canvasState: CanvasState): Element | null {
    if (this.isMouseOverElement(canvasState.mousePos)) {
      return this;
    } 
    
    return null;
  }

  handleMouseMove(canvasState: CanvasState): void {
    
  }

  handleMouseUp(canvasState: CanvasState): void {

  }
}

export default ConnectionPoint;