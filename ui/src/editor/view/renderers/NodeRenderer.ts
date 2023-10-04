import Node from "../../model/elements/Node";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import Point from "../../utils/Point";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../editorConstants";
import EditorView from "../EditorView";
import { NodeViewConstants as Constants } from "./constants/rendererConstants";

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
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(this.node.viewData.pos.x, this.node.viewData.pos.y, Constants.WIDTH, Constants.HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.node.id.substring(0, 5), this.node.viewData.pos.x, 
      this.node.viewData.pos.y + Constants.HEIGHT + 10);

    ctx.closePath();

    // Draw connections
    this.node.connections.forEach((connection) => connection.renderer.draw(ctx));

    // Draw connection points
    this.node.viewData.connectionPoints.forEach(
      (connectionPoint: ConnectionPoint) => connectionPoint.renderer.draw(ctx)
    );
  }

  setupConnectionPoints(): void {
    let defaultPoint = new Point(0, 0);

    this.node.viewData.connectionPoints = [];
    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1, margin: 5, padding: 0 }, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1, margin: 5, padding: 0 }, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1, margin: 5, padding: 0 }, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1, margin: 5, padding: 0 }, 
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
}

export default NodeRenderer;