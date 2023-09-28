import Element from "../../model/elements/Element";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import NodeGroup from "../../model/elements/NodeGroup";
import Point from "../../utils/Point";
import { ElementStates } from "../../editorConstants";
import { NodeGroupViewConstants as Constants } from "./constants/rendererConstants";

class NodeGroupRenderer extends ElementRenderer {
  nodeGroup: NodeGroup;

  constructor(nodeGroup: NodeGroup) {
    super();
    this.nodeGroup = nodeGroup;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    this.updateViewData();

    ctx.beginPath();
    
    ctx.fillStyle = this.isMouseOverElement(canvasState.mousePos) ? 'green' : 'red';
    ctx.roundRect(this.nodeGroup.viewData.pos.x, this.nodeGroup.viewData.pos.y, Constants.WIDTH, Constants.HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.nodeGroup.id.substring(0, 5), this.nodeGroup.viewData.pos.x, 
      this.nodeGroup.viewData.pos.y + Constants.HEIGHT + 10);
    
    ctx.closePath();
  }

  /**
   * Before drawing, update the dimensions, state and positioning of this node group and its 
   * sub-elements in case of changes since the last render.
   */
  updateViewData() {
    let numNodes: number = this.nodeGroup.nodes.length;
    let numRows: number = Math.floor(numNodes / Constants.NUM_NODES_IN_ROW);

    this.nodeGroup.viewData

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < Constants.NUM_NODES_IN_ROW; j++) {
        
      }
    }
  }

  handleClick(canvasState: CanvasState): void {
    this.nodeGroup.viewData.state = ElementStates.CLICKED;
  }

  handleUnclick(canvasState: CanvasState): void {
    this.nodeGroup.viewData.state = ElementStates.ACTIVE;
  }

  handleMouseMove(canvasState: CanvasState): void {
    switch (this.nodeGroup.viewData.state) {
      case ElementStates.CLICKED:
        this.moveNodeGroupToPos(canvasState.mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }

  moveNodeGroupToPos(pos: Point) {
    this.nodeGroup.viewData.pos = pos;
  }

  isMouseOverElement(mousePos: Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.nodeGroup.viewData.pos.x;
    let bbTopLeftY = this.nodeGroup.viewData.pos.y;
    let bbBottomRightX = this.nodeGroup.viewData.pos.x + Constants.WIDTH;
    let bbBottomRightY = this.nodeGroup.viewData.pos.y + Constants.HEIGHT;

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