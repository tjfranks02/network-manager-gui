import Element from "../../model/elements/Element";
import ElementRenderer from "./ElementRenderer";
import NodeRenderer from "./NodeRenderer";
import NodeGroup from "../../model/elements/NodeGroup";
import Node from "../../model/elements/Node";
import Point from "../../utils/Point";
import { 
  ElementStates,
  NODE_GROUP_HOVER_COLOUR,
  NODE_GROUP_IDLE_COLOUR,
  DEFAULT_FONT,
  NodeGroupViewConstants as Constants, 
  NodeViewConstants as NodeConstants 
} from "../../../constants/editorConstants";
import EditorView from "../EditorView";
import { BaseElementViewData } from "../../types";

class NodeGroupRenderer extends ElementRenderer {
  nodeGroup: NodeGroup;

  width: number;
  height: number;

  constructor(nodeGroup: NodeGroup, baseViewData: BaseElementViewData, width: number, height: number) {
    super(baseViewData);
    this.nodeGroup = nodeGroup;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let worldMousePos: Point = EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos);

    ctx.beginPath();
    
    ctx.fillStyle = this.isMouseOverElement(worldMousePos) ? 
      NODE_GROUP_HOVER_COLOUR : NODE_GROUP_IDLE_COLOUR;
    ctx.roundRect(this.pos.x, this.pos.y, this.width, this.height, 5);
    ctx.fill();

    ctx.font = DEFAULT_FONT;
    ctx.fillText(
      this.nodeGroup.id.substring(0, 5), 
      this.pos.x, 
      this.pos.y + Constants.HEIGHT + 10
    );
    
    ctx.closePath();

    for (let node of this.nodeGroup.nodes) {
      node.renderer.draw(ctx);
    }
  }

  updateNodeGroupDimensions() {
    let totalPadding = 2 * this.padding;

    // Calculate and set width
    let totalHorizontalMargin: number = this.nodeGroup.nodes.length > 0 ? 
      this.nodeGroup.nodes[0].renderer.margin * (Constants.NUM_NODES_IN_ROW - 1) : 0;

    let width: number = Math.max(this.width, Constants.NUM_NODES_IN_ROW + 
      totalPadding + Constants.NUM_NODES_IN_ROW * NodeConstants.WIDTH + totalHorizontalMargin);

    this.width = width;

    // Calculate and set height
    let numRows: number = Math.ceil(this.nodeGroup.nodes.length / Constants.NUM_NODES_IN_ROW);

    let totalVerticalMargin: number = this.nodeGroup.nodes.length > 0 ? 
      this.nodeGroup.nodes[0].renderer.margin * numRows : 0;
    let nodeHeights: number = numRows * NodeConstants.HEIGHT;

    let height: number = Math.max(Constants.HEIGHT, totalPadding + totalVerticalMargin + nodeHeights);
    this.height = height;
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

    let nodeX: number = this.padding + this.pos.x + (j * NodeConstants.WIDTH) + 
      (j * this.nodeGroup.nodes[nodeIndex].renderer.margin);
    
    let nodeY: number = this.padding + this.pos.y + (i * NodeConstants.HEIGHT) + 
      (i * this.nodeGroup.nodes[nodeIndex].renderer.margin);

    let newNodePos = new Point(nodeX, nodeY);
    (<NodeRenderer>this.nodeGroup.nodes[nodeIndex].renderer).moveNodeToPos(newNodePos);
  }

  handleClick(): void {
    this.state = ElementStates.CLICKED;
  }

  handleUnclick(): void {
    this.state = ElementStates.ACTIVE;
  }

  handleMouseMove(): void {
    switch (this.state) {
      case ElementStates.CLICKED:
        this.moveNodeGroupToPos(EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos));
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }

  moveNodeGroupToPos(pos: Point) {
    this.pos = pos;
    this.updateNodeGrid();
  }

  isMouseOverElement(mousePos: Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.pos.x;
    let bbTopLeftY = this.pos.y;
    let bbBottomRightX = this.pos.x + this.width;
    let bbBottomRightY = this.pos.y + this.height;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }
    return false;
  }

  elementUnderMouse(mousePos: Point): Element | null {
    if (this.isMouseOverElement(mousePos)) {
      return this.nodeGroup;
    }

    return null;
  }

  addNodeToGroup(node: Node) {
    this.nodeGroup.nodes.push(node);
    this.updateNodeGroupDimensions();
    this.updateNodeGrid();
  }
}

export default NodeGroupRenderer;