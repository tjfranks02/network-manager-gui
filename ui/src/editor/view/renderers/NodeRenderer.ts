import Node from "../../model/elements/Node";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import Point from "../../utils/Point";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_ORIGIN, ElementStates } from "../../editorConstants";
import EditorView from "../EditorView";
import { NodeViewConstants as Constants } from "./constants/rendererConstants";
import { ElementViewData } from "../../types";

// To be deleted later
const DEFAULT_CONNECTION_POINT_DATA: ElementViewData = {
  pos: DEFAULT_ORIGIN,
  canvasPos: DEFAULT_ORIGIN,
  state: ElementStates.IDLE, 
  zIndex: 1, 
  margin: 5, 
  padding: 0,
};

class NodeRenderer extends ElementRenderer {
  node: Node;

  constructor(node: Node) {
    super();
    this.node = node;

    this.setupConnectionPoints();
  }

  elementUnderMouse(): Element | null {
    // Check if mouse is over any sub-elements
    for (let connPoint of this.node.viewData.connectionPoints) {
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
    let bbTopLeftX = this.node.viewData.pos.x;
    let bbTopLeftY = this.node.viewData.pos.y;
    let bbBottomRightX = this.node.viewData.pos.x + Constants.WIDTH;
    let bbBottomRightY = this.node.viewData.pos.y + Constants.HEIGHT;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let canvasPos = this.node.viewData.pos;

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(canvasPos.x, canvasPos.y, Constants.WIDTH, Constants.HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.node.id.substring(0, 5), canvasPos.x, canvasPos.y + Constants.HEIGHT + 10);

    ctx.closePath();

    // Draw connections
    this.node.connections.forEach((connection) => connection.renderer.draw(ctx));

    // Draw connection points
    this.node.viewData.connectionPoints.forEach(
      (connectionPoint: ConnectionPoint) => connectionPoint.renderer.draw(ctx)
    );
  }

  setupConnectionPoints(): void {
    this.node.viewData.connectionPoints = [];
    this.node.viewData.connectionPoints.push(new ConnectionPoint(
        uuidv4(), 
        DEFAULT_CONNECTION_POINT_DATA, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(new ConnectionPoint(
        uuidv4(), 
        DEFAULT_CONNECTION_POINT_DATA, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(new ConnectionPoint(
        uuidv4(), 
        DEFAULT_CONNECTION_POINT_DATA, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(new ConnectionPoint(
        uuidv4(), 
        DEFAULT_CONNECTION_POINT_DATA, 
        this.node
      )
    );

    this.setConnectorPositions();
  }

  setConnectorPositions(): void {
    let topConnectorPos = new Point(
      this.node.viewData.pos.x + (Constants.WIDTH / 2), this.node.viewData.pos.y
    );
    let rightConnectorPos = new Point(
      this.node.viewData.pos.x + Constants.WIDTH, this.node.viewData.pos.y + (Constants.HEIGHT / 2)
    );
    let bottomConnectorPos = new Point(
      this.node.viewData.pos.x + (Constants.WIDTH / 2), this.node.viewData.pos.y + Constants.HEIGHT
    );
    let leftConnectorPos = new Point(
      this.node.viewData.pos.x, this.node.viewData.pos.y + (Constants.HEIGHT / 2)
    );

    this.node.viewData.connectionPoints[0].viewData.pos = topConnectorPos;
    this.node.viewData.connectionPoints[1].viewData.pos = rightConnectorPos;
    this.node.viewData.connectionPoints[2].viewData.pos = bottomConnectorPos;
    this.node.viewData.connectionPoints[3].viewData.pos = leftConnectorPos;
  }

  moveNodeToPos(pos: Point): void {
    this.node.viewData.pos = pos;
    this.setConnectorPositions();
  }

  handleClick(): void {
    this.node.viewData.state = ElementStates.CLICKED;
  }
  
  handleUnclick(): void {
    this.node.viewData.state = ElementStates.ACTIVE;
  }

  handleMouseMove(): void {
    switch (this.node.viewData.state) {
      case ElementStates.CLICKED:
        this.moveNodeToPos(EditorView.viewState.mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }

  /**
   * Map the node's coordinates to the canvas coordinates based on pan and scale values.
   */
  mapElementCoordsToCanvasCoords(): void {
    // Apply pan
    let newX: number = this.node.viewData.pos.x + EditorView.viewState.panVector.x;
    let newY: number = this.node.viewData.pos.y + EditorView.viewState.panVector.y;

    this.node.viewData.pos = new Point(newX, newY);
    
    for (let connectionPoint of this.node.viewData.connectionPoints) {
      connectionPoint.renderer.mapElementCoordsToCanvasCoords();
    }
  }
}

export default NodeRenderer;