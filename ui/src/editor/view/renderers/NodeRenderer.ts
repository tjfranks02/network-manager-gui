import Node from "../../model/elements/Node";
import { CanvasState } from "../../types";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import Point from "../../utils/Point";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../editorConstants";
import EditorView from "../EditorView";

const NODE_WIDTH: number = 50;
const NODE_HEIGHT: number = 50;

class NodeRenderer extends ElementRenderer {
  node: Node;

  constructor(node: Node) {
    super();
    this.node = node;

    this.setupConnectionPoints();
  }

  elementUnderMouse(canvasState: CanvasState): Element | null {
    // Check if mouse is over any sub-elements
    for (let connPoint of this.node.viewData.connectionPoints) {
      let subElement = connPoint.renderer.elementUnderMouse(canvasState);

      if (subElement) {
        return subElement;
      }
    }

    for (let connection of this.node.connections) {
      let subElement = connection.renderer.elementUnderMouse(canvasState);

      if (subElement) {
        return subElement;
      }
    }
    
    if (this.isMouseOverElement(canvasState.mousePos)) {
      return this.node;
    }

    return null;
  }

  isMouseOverElement(mousePos : Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.node.viewData.pos.x;
    let bbTopLeftY = this.node.viewData.pos.y;
    let bbBottomRightX = this.node.viewData.pos.x + NODE_WIDTH;
    let bbBottomRightY = this.node.viewData.pos.y + NODE_HEIGHT;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(this.node.viewData.pos.x, this.node.viewData.pos.y, NODE_WIDTH, NODE_HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.node.id.substring(0, 5), this.node.viewData.pos.x, 
      this.node.viewData.pos.y + NODE_HEIGHT + 10);

    ctx.closePath();

    // Draw connections
    this.node.connections.forEach((connection) => connection.renderer.draw(ctx, canvasState));

    // Draw connection points
    this.node.viewData.connectionPoints.forEach(
      (connectionPoint: ConnectionPoint) => connectionPoint.renderer.draw(ctx, canvasState)
    );
  }

  setupConnectionPoints(): void {
    let defaultPoint = new Point(0, 0);

    this.node.viewData.connectionPoints = [];
    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1 }, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1 }, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1}, 
        this.node
      )
    );

    this.node.viewData.connectionPoints.push(
      new ConnectionPoint(
        uuidv4(), 
        { pos: defaultPoint, state: ElementStates.IDLE, zIndex: 1 }, 
        this.node
      )
    );

    this.setConnectorPositions();
  }

  setConnectorPositions(): void {

    let topConnectorPos = new Point(
      this.node.viewData.pos.x + (NODE_WIDTH / 2), this.node.viewData.pos.y
    );
    let rightConnectorPos = new Point(
      this.node.viewData.pos.x + NODE_WIDTH, this.node.viewData.pos.y + (NODE_HEIGHT / 2)
    );
    let bottomConnectorPos = new Point(
      this.node.viewData.pos.x + (NODE_WIDTH / 2), this.node.viewData.pos.y + NODE_HEIGHT
    );
    let leftConnectorPos = new Point(
      this.node.viewData.pos.x, this.node.viewData.pos.y + (NODE_HEIGHT / 2)
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

  handleNodeEvent(canvasState: CanvasState): void {
    let clickedElement: Node = <Node>EditorView.viewState.activeElement!;
    EditorView.resetElementStates();
    clickedElement.viewData.state = ElementStates.CLICKED;
  }

  handleClick(canvasState: CanvasState): void {
    let clickedElement: Node = <Node>EditorView.viewState.activeElement!;
    EditorView.resetElementStates();
    clickedElement.viewData.state = ElementStates.CLICKED;
  }
  
  handleUnclick(canvasState: CanvasState): void {
    EditorView.viewState.activeElement!.viewData.state = ElementStates.ACTIVE;
  }

  handleMouseMove(canvasState: CanvasState): void {
    let activeNode: Node = <Node>EditorView.viewState.activeElement!;
    let nodeRenderer: NodeRenderer = <NodeRenderer>activeNode.renderer;

    switch (activeNode.viewData.state) {
      case ElementStates.CLICKED:
        nodeRenderer.moveNodeToPos(canvasState.mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }
}

export default NodeRenderer;