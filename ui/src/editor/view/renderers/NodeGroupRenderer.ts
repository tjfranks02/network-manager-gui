import Element from "../../model/elements/Element";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import NodeRenderer from "./NodeRenderer";
import NodeGroup from "../../model/elements/NodeGroup";
import Point from "../../utils/Point";
import { ElementStates } from "../../editorConstants";
import { 
  NodeGroupViewConstants as Constants, 
  NodeViewConstants as NodeConstants 
} from "./constants/rendererConstants";

class NodeGroupRenderer extends ElementRenderer {
  nodeGroup: NodeGroup;

  constructor(nodeGroup: NodeGroup) {
    super();
    this.nodeGroup = nodeGroup;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    this.updateNodeGrid();
    this.updateNodeGroupDimensions();

    ctx.beginPath();
    
    ctx.fillStyle = this.isMouseOverElement(canvasState.mousePos) ? "green" : "red";
    ctx.roundRect(this.nodeGroup.viewData.pos.x, this.nodeGroup.viewData.pos.y, 
      this.nodeGroup.viewData.width, this.nodeGroup.viewData.height, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.nodeGroup.id.substring(0, 5), this.nodeGroup.viewData.pos.x, 
      this.nodeGroup.viewData.pos.y + Constants.HEIGHT + 10);
    
    ctx.closePath();

    for (let node of this.nodeGroup.nodes) {
      node.renderer.draw(ctx, canvasState);
    }
  }

  updateNodeGroupDimensions() {
    let totalPadding = 2 * this.nodeGroup.viewData.padding;

    // Calculate and set width
    let totalHorizontalMargin: number = this.nodeGroup.nodes.length > 0 ? 
      this.nodeGroup.nodes[0].viewData.margin * (Constants.NUM_NODES_IN_ROW - 1) : 0;

    let width: number = Math.max(Constants.WIDTH, Constants.NUM_NODES_IN_ROW + 
      totalPadding + Constants.NUM_NODES_IN_ROW * NodeConstants.WIDTH + totalHorizontalMargin);

    this.nodeGroup.viewData.width = width;

    // Calculate and set height
    let numRows: number = Math.ceil(this.nodeGroup.nodes.length / Constants.NUM_NODES_IN_ROW);

    let totalVerticalMargin: number = this.nodeGroup.nodes.length > 0 ? 
      this.nodeGroup.nodes[0].viewData.margin * numRows : 0;
    let nodeHeights: number = numRows * NodeConstants.HEIGHT;

    let height: number = Math.max(Constants.HEIGHT, totalPadding + totalVerticalMargin + nodeHeights);
    this.nodeGroup.viewData.height = height;
  }

  updateNodeGrid() {
    let numNodes: number = this.nodeGroup.nodes.length;

    for (let nodeIndex = 0; nodeIndex < numNodes; nodeIndex++) {
      this.updateNodeInGrid(nodeIndex);
    }
  }

  updateNodeInGrid(nodeIndex: number) {
    let i: number = Math.floor(nodeIndex / Constants.NUM_NODES_IN_ROW);
    let j: number = nodeIndex % Constants.NUM_NODES_IN_ROW;

    let nodeX: number = this.nodeGroup.viewData.padding + this.nodeGroup.viewData.pos.x + 
      (j * NodeConstants.WIDTH) + (j * this.nodeGroup.nodes[nodeIndex].viewData.margin);
    
    let nodeY: number = this.nodeGroup.viewData.padding + this.nodeGroup.viewData.pos.y + 
      (i * NodeConstants.HEIGHT) + (i * this.nodeGroup.nodes[nodeIndex].viewData.margin);

    let newNodePos = new Point(nodeX, nodeY);
    (<NodeRenderer>this.nodeGroup.nodes[nodeIndex].renderer).moveNodeToPos(newNodePos);
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
    let bbBottomRightX = this.nodeGroup.viewData.pos.x + this.nodeGroup.viewData.width;
    let bbBottomRightY = this.nodeGroup.viewData.pos.y + this.nodeGroup.viewData.height;

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