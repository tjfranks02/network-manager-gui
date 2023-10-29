import Node from "../../model/elements/Node";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import Point from "../../utils/Point";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import { v4 as uuidv4 } from "uuid";
import { 
  DEFAULT_ORIGIN, 
  ElementStates, 
  NODE_HOVER_COLOUR, 
  NODE_IDLE_COLOUR,
  DEFAULT_FONT,
  NodeViewConstants as Constants
} from "../../../constants/editorConstants";
import { BaseElementViewData } from "../../types";


const DEFAULT_CONNECTION_POINT_DATA: BaseElementViewData = {
  pos: DEFAULT_ORIGIN,
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

  elementUnderMouse(mousePos: Point): Element | null {
    // Check if mouse is over any sub-elements
    for (let connPoint of this.node.connectionPoints) {
      let subElement = connPoint.renderer.elementUnderMouse(mousePos);

      if (subElement) {
        return subElement;
      }
    }

    for (let connection of this.node.connections) {
      let subElement = connection.renderer.elementUnderMouse(mousePos);

      if (subElement) {
        return subElement;
      }
    }
    
    if (this.isMouseOverElement(mousePos)) {
      return this.node;
    }

    return null;
  }

  isMouseOverElement(mousePos : Point): boolean {
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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = NODE_IDLE_COLOUR;
    ctx.roundRect(this.pos.x, this.pos.y, this.width, this.height, 5);
    ctx.fill();

    ctx.font = DEFAULT_FONT;
    ctx.fillText(
      this.node.id.substring(0, 5), 
      this.pos.x, 
      this.pos.y + this.height + 10
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

    let topConnectorPos = new Point(this.pos.x + (this.width / 2), this.pos.y);
    let rightConnectorPos = new Point(this.pos.x + this.width, this.pos.y + (this.height / 2));
    let bottomConnectorPos = new Point(this.pos.x + (this.width / 2), this.pos.y + this.height);
    let leftConnectorPos = new Point(this.pos.x, this.pos.y + (this.height / 2));

    this.node.connectionPoints[0].renderer.pos = topConnectorPos;
    
    this.node.connectionPoints[1].renderer.pos = rightConnectorPos;

    this.node.connectionPoints[2].renderer.pos = bottomConnectorPos;

    this.node.connectionPoints[3].renderer.pos = leftConnectorPos;
  }

  moveNodeToPos(pos: Point): void {
    this.pos = pos;
    this.setConnectorPositions();
  }

  handleClick(): void {
    this.state = ElementStates.CLICKED;
  }
  
  handleUnclick(): void {
    this.state = ElementStates.ACTIVE;
  }

  /**
   * Define the behaviour of the node when the mouse is moved.
   * 
   * Parameters:
   *   mousePos - the position of the mouse in world coordinates
   */
  handleMouseMove(mousePos: Point): void {
    switch (this.state) {
      case ElementStates.CLICKED:
        this.moveNodeToPos(mousePos);
        break;

      case ElementStates.ACTIVE:
        break;
    }
  }
}

export default NodeRenderer;