import ConnectionPoint from "./ConnectionPoint";
import Connection from "./Connection";
import { ElementStates } from "../../constants/canvasConstants";
import Point from "../../utils/Point";
import Element from "./Element";
import { CanvasState } from "../../types";

const NODE_WIDTH = 50;
const NODE_HEIGHT = 50;

class Node extends Element {
  name: string;
  connectionPoints: Array<ConnectionPoint>;
  connections: Array<Connection>;

  constructor(name: string, pos: Point, state=ElementStates.IDLE) {
    super('test2', pos, state);
    this.name = name;

    // Little circles that allow you to connect this element to others
    this.connectionPoints = [];
    this.initConnectionPoints();

    this.connections = [];
  }

  initConnectionPoints(): void {
    let defaultPoint = new Point(0, 0);

    for (let i = 0; i < 4; i++) {
      this.connectionPoints.push(new ConnectionPoint(this, defaultPoint));
    }

    this.setConnectorPositions();
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(this.pos.x, this.pos.y, NODE_WIDTH, NODE_HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.name, this.pos.x, this.pos.y + NODE_HEIGHT + 10);

    ctx.closePath();

    // Draw 'Add connection circle'
    this.connectionPoints.forEach(
      (connector) => connector.draw(ctx, canvasState)
    );
  }

  setConnectorPositions(): void {
    let topConnectorPos = new Point(
      this.pos.x + (NODE_WIDTH / 2), this.pos.y
    );
    let rightConnectorPos = new Point(
      this.pos.x + NODE_WIDTH, this.pos.y + (NODE_HEIGHT / 2)
    );
    let bottomConnectorPos = new Point(
      this.pos.x + (NODE_WIDTH / 2), this.pos.y + NODE_HEIGHT
    );
    let leftConnectorPos = new Point(
      this.pos.x, this.pos.y + (NODE_HEIGHT / 2)
    );

    this.connectionPoints[0].pos = topConnectorPos;
    this.connectionPoints[1].pos = rightConnectorPos;
    this.connectionPoints[2].pos = bottomConnectorPos;
    this.connectionPoints[3].pos = leftConnectorPos;
  }

  isMouseOverElement(mousePos : Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.pos.x;
    let bbTopLeftY = this.pos.y;
    let bbBottomRightX = this.pos.x + NODE_WIDTH;
    let bbBottomRightY = this.pos.y + NODE_HEIGHT;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }
    return false;
  }

  getElementAtMousePos(canvasState: CanvasState): Element | null {
    // Check if mouse is over any sub-elements
    for (let i = 0; i < this.connectionPoints.length; i++) {
      let subElementEvent = this.connectionPoints[i].getElementAtMousePos(
        canvasState
      );

      if (subElementEvent) {
        return this.connectionPoints[i];
      }
    }
    
    if (this.isMouseOverElement(canvasState.mousePos)) {
      this.state = ElementStates.ACTIVE;
      return this;
    }

    return null;
  }

  resetState(): void {
    super.resetState();

    for (let connectionPoint of this.connectionPoints) {
      connectionPoint.resetState();
    }
  }

  handleMouseMove(canvasState: CanvasState): void {
    
  }

  handleMouseUp(canvasState: CanvasState): void {

  }
}

export default Node;