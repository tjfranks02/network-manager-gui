import Node from "../../model/elements/Node";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import Point from "../../utils/Point";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_ORIGIN, ElementStates } from "../../editorConstants";
import EditorView from "../EditorView";
import { NodeViewConstants as Constants } from "./constants/rendererConstants";
import { BaseElementViewData } from "../../types";


const DEFAULT_CONNECTION_POINT_DATA: BaseElementViewData = {
  viewPos: DEFAULT_ORIGIN,
  worldPos: DEFAULT_ORIGIN,
  state: ElementStates.IDLE, 
  zIndex: 1, 
  margin: 5, 
  padding: 0,
};

class NodeRenderer extends ElementRenderer {
  node: Node;

  width: number;
  height: number;

  constructor(node: Node, baseViewData: BaseElementViewData) {
    super(baseViewData);
    this.node = node;
    this.width = Constants.WIDTH;
    this.height = Constants.HEIGHT;
    this.setupConnectionPoints();
  }

  elementUnderMouse(): Element | null {
    // Check if mouse is over any sub-elements
    for (let connPoint of this.node.connectionPoints) {
      let subElement = connPoint.renderer.elementUnderMouse();

      if (subElement) {
        return subElement;
      }
    }

    for (let connection of this.node.connections) {
      let subElement = connection.renderer.elementUnderMouse();

      if (subElement) {
        return subElement;
      }
    }
    
    if (this.isMouseOverElement(EditorView.viewState.mousePos)) {
      return this.node;
    }

    return null;
  }

  isMouseOverElement(mousePos : Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.viewPos.x;
    let bbTopLeftY = this.viewPos.y;
    let bbBottomRightX = this.viewPos.x + this.width;
    let bbBottomRightY = this.viewPos.y + this.height;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(this.viewPos.x, this.viewPos.y, this.width, this.height, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(
      this.node.id.substring(0, 5), 
      this.viewPos.x, 
      this.viewPos.y + this.height + 10
    );

    ctx.closePath();

    // Draw connections
    this.node.connections.forEach((connection) => connection.renderer.draw(ctx));

    // Draw connection points
    this.node.connectionPoints.forEach(
      (connectionPoint: ConnectionPoint) => connectionPoint.renderer.draw(ctx)
    );
  }

  setupConnectionPoints(): void {
    this.node.connectionPoints = [];
    this.node.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        {...DEFAULT_CONNECTION_POINT_DATA}, 
        this.node
      )
    );

    this.node.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        {...DEFAULT_CONNECTION_POINT_DATA}, 
        this.node
      )
    );

    this.node.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        {...DEFAULT_CONNECTION_POINT_DATA}, 
        this.node
      )
    );

    this.node.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        {...DEFAULT_CONNECTION_POINT_DATA}, 
        this.node
      )
    );

    this.setConnectorPositions();
  }

  setConnectorPositions(): void {

    let topConnectorPos = new Point(
      this.worldPos.x + (this.width / 2), this.worldPos.y
    );
    let rightConnectorPos = new Point(
      this.worldPos.x + this.width, this.worldPos.y + (this.height / 2)
    );
    let bottomConnectorPos = new Point(
      this.worldPos.x + (this.width / 2), this.worldPos.y + this.height
    );
    let leftConnectorPos = new Point(
      this.worldPos.x, this.worldPos.y + (this.height / 2)
    );

    this.node.connectionPoints[0].renderer.worldPos = topConnectorPos;
    this.node.connectionPoints[0].renderer.viewPos = EditorView.mapViewPosToCanvasPos(topConnectorPos);
    
    this.node.connectionPoints[1].renderer.worldPos = rightConnectorPos;
    this.node.connectionPoints[1].renderer.viewPos = EditorView.mapViewPosToCanvasPos(rightConnectorPos);

    this.node.connectionPoints[2].renderer.worldPos = bottomConnectorPos;
    this.node.connectionPoints[2].renderer.worldPos = EditorView.mapViewPosToCanvasPos(bottomConnectorPos);

    this.node.connectionPoints[3].renderer.worldPos = leftConnectorPos;
    this.node.connectionPoints[3].renderer.worldPos = EditorView.mapViewPosToCanvasPos(leftConnectorPos);
  }

  moveNodeToPos(pos: Point): void {
    this.worldPos = pos;
    this.viewPos = EditorView.mapViewPosToCanvasPos(pos);
    this.setConnectorPositions();
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
        this.moveNodeToPos(EditorView.viewState.mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }

  updateViewPos(): void {
    this.viewPos.x = this.worldPos.x + EditorView.viewState.panVector.x;
    this.viewPos.y = this.worldPos.y + EditorView.viewState.panVector.y;
  }
}

export default NodeRenderer;