import Element from "../../model/elements/Element";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import NodeGroup from "../../model/elements/NodeGroup";
import Point from "../../utils/Point";

class NodeGroupRenderer extends ElementRenderer {
  nodeGroup: NodeGroup;

  constructor(nodeGroup: NodeGroup) {
    super();
    this.nodeGroup = nodeGroup;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    ctx.beginPath();
    
    ctx.fillStyle = this.isMouseOverElement(canvasState.mousePos) ? 'green' : 'red';
    ctx.roundRect(this.nodeGroup.viewData.pos.x, this.nodeGroup.viewData.pos.y, 50, 50, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.nodeGroup.id.substring(0, 5), this.nodeGroup.viewData.pos.x, 
      this.nodeGroup.viewData.pos.y + 50 + 10);
    
    ctx.closePath();
  }

  handleClick(canvasState: CanvasState): void {
    // No additional action required
  }

  handleUnclick(canvasState: CanvasState): void {
    throw new Error("Method not implemented.");
  }

  handleMouseMove(canvasState: CanvasState): void {
    this.nodeGroup.viewData.pos = canvasState.mousePos;
  }

  isMouseOverElement(mousePos: Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.nodeGroup.viewData.pos.x;
    let bbTopLeftY = this.nodeGroup.viewData.pos.y;
    let bbBottomRightX = this.nodeGroup.viewData.pos.x + 50;
    let bbBottomRightY = this.nodeGroup.viewData.pos.y + 50;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }
    return false;
  }

  elementUnderMouse(canvasState: CanvasState): Element | null {
    if (this.isMouseOverElement(canvasState.mousePos)) {
      return this.nodeGroup;
    }

    return null;
  }
}

export default NodeGroupRenderer;